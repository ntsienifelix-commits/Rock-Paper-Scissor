const $ = id => document.getElementById(id);

// Game state
let playerName = 'Player';
let selectedChar = '🗡️';
let betAmount = 5;
let coins = 100;
let round = 1;
let playerScore = 0;
let cpuScore = 0;
let streak = 0;
let combo = 1;
let highScore = parseInt(localStorage.getItem('slotrps_highscore')) || 0;
let playerHP = 100;
let cpuHP = 100;
let gameOver = false;
let bossEnabled = true;
let critEnabled = true;
let gameSettings = { soundEnabled: true };
let achievements = JSON.parse(localStorage.getItem('slotrps_achievements')) || [];

// Audio
const bgMusic = $('bgMusic');
if(bgMusic) bgMusic.volume = 0.2;
let isMuted = false;
let musicEnabled = true;

// Choices
const choices = ['Rock', 'Paper', 'Scissors'];
const emojis = { Rock: '✊', Paper: '✋', Scissors: '✌️' };
const tips = [
  "Tip: Watch for patterns in CPU behavior!",
  "Boss rounds deal double damage!",
  "3+ wins = combo multiplier!",
  "Daily bonus resets every 24 hours",
  "Critical hits deal 2x damage!"
];

// Loading screen
window.addEventListener('load', () => {
  const tipEl = $('loadingTip');
  if(tipEl) {
    const tipIndex = Math.floor(Math.random() * tips.length);
    tipEl.textContent = tips[tipIndex];
  }

  setTimeout(() => {
    const loading = $('loadingScreen');
    const menu = $('menuScreen');
    if(loading) loading.style.display = 'none';
    if(menu) menu.style.display = 'block';
  }, 3000);
});

// Initialize
function init() {
  if($('highScore')) $('highScore').textContent = highScore;
  checkDailyBonus();
  loadLeaderboard();
  loadAchievements();

  // Character select
document.querySelectorAll('.charOption')?.forEach(img => {
  img.addEventListener('click', () => {
    document.querySelectorAll('.charOption').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    selectedCharImg = img.src;
    if ($('selectedCharBig')) $('selectedCharBig').src = selectedCharImg;
    if ($('playerAvatar')) $('playerAvatar').src = selectedCharImg;
    safePlay('clickSound');
  });
  });

  // Bet select
  document.querySelectorAll('.betBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.betBtn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      betAmount = parseInt(btn.dataset.bet);
    });
  });

  // Nav buttons
  if($('playBtn')) $('playBtn').addEventListener('click', startGame);
  if($('aboutBtn')) $('aboutBtn').addEventListener('click', () => $('aboutModal').style.display = 'flex');
  if($('historyBtn')) $('historyBtn').addEventListener('click', () => $('historyModal').style.display = 'flex');
  if($('leaderboardBtn')) $('leaderboardBtn').addEventListener('click', () => $('leaderboardModal').style.display = 'flex');
  if($('achievementsBtn')) $('achievementsBtn').addEventListener('click', () => $('achievementsModal').style.display = 'flex');
  if($('settingsBtn')) $('settingsBtn').addEventListener('click', () => $('settingsModal').style.display = 'flex');
  if($('creditsBtn')) $('creditsBtn').addEventListener('click', () => $('creditsModal').style.display = 'flex');

  // Game buttons
  document.querySelectorAll('.choiceBtn').forEach(btn => {
    btn.addEventListener('click', () => makeChoice(btn.dataset.choice));
  });
  if($('restartBtn')) $('restartBtn').addEventListener('click', resetGame);
  if($('dailyBonusBtn')) $('dailyBonusBtn').addEventListener('click', claimDailyBonus);

  // Modals close
  document.querySelectorAll('.closeBtn').forEach(btn => {
    btn.addEventListener('click', () => $(btn.dataset.modal).style.display = 'none');
  });

  if($('menuReturnBtn')) $('menuReturnBtn').addEventListener('click', () => {
    toggleBgMusic(false);
    $('gameScreen').style.display = 'none';
    $('menuScreen').style.display = 'block';
  });

  // Settings
  if($('soundToggle')) $('soundToggle').addEventListener('change', e => gameSettings.soundEnabled = e.target.checked);
  if($('musicToggle')) $('musicToggle').addEventListener('change', e => {
    musicEnabled = e.target.checked;
    toggleBgMusic(!gameOver);
  });
  if($('bossToggle')) $('bossToggle').addEventListener('change', e => bossEnabled = e.target.checked);
  if($('critToggle')) $('critToggle').addEventListener('change', e => critEnabled = e.target.checked);
  if($('resetDataBtn')) $('resetDataBtn').addEventListener('click', resetAllData);

  // Mute
  if($('muteBtn')) $('muteBtn').addEventListener('click', () => {
    isMuted =!isMuted;
    $('muteBtn').textContent = isMuted? '🔇' : '🔊';
    if(bgMusic) bgMusic.muted = isMuted;
    toggleBgMusic(!gameOver);
  });
}

function startGame() {
  playerName = $('playerNameInput').value || 'Player';
  if($('playerName')) $('playerName').textContent = playerName;
  if($('playerAvatar')) $('playerAvatar').textContent = selectedChar;
  $('menuScreen').style.display = 'none';
  $('gameScreen').style.display = 'block';
  resetGame();
  startBgMusic();
}

function resetGame() {
  round = 1;
  playerScore = 0;
  cpuScore = 0;
  streak = 0;
  combo = 1;
  playerHP = 100;
  cpuHP = 100;
  gameOver = false;
  coins = 100;

  if($('restartBtn')) $('restartBtn').style.display = 'none';
  if($('choices')) $('choices').style.display = 'flex';
  if($('comboText')) $('comboText').textContent = '';
  updateUI();
  safeText('result', 'Choose your move!');
  if($('playerReel')) $('playerReel').textContent = '❓';
  if($('cpuReel')) $('cpuReel').textContent = '❓';
  if($('playerHand')) $('playerHand').textContent = '✊';
  if($('cpuHand')) $('cpuHand').textContent = '✊';
}

function makeChoice(playerChoice) {
  if (gameOver) return;

  spinReels();

  setTimeout(() => {
    const cpuChoice = choices[Math.floor(Math.random() * 3)];
    const result = getWinner(playerChoice, cpuChoice);

    if($('playerReel')) $('playerReel').textContent = emojis[playerChoice];
    if($('cpuReel')) $('cpuReel').textContent = emojis[cpuChoice];
    if($('playerHand')) $('playerHand').textContent = emojis[playerChoice];
    if($('cpuHand')) $('cpuHand').textContent = emojis[cpuChoice];

    handleResult(result, playerChoice, cpuChoice);
    round++;
    updateUI();
    checkGameOver();
  }, 1000);
}

function spinReels() {
  if($('playerReel')) $('playerReel').classList.add('spinning');
  if($('cpuReel')) $('cpuReel').classList.add('spinning');
  setTimeout(() => {
    if($('playerReel')) $('playerReel').classList.remove('spinning');
    if($('cpuReel')) $('cpuReel').classList.remove('spinning');
  }, 1000);
}

function getWinner(player, cpu) {
  if (player === cpu) return 'Tie';
  if (
    (player === 'Rock' && cpu === 'Scissors') ||
    (player === 'Paper' && cpu === 'Rock') ||
    (player === 'Scissors' && cpu === 'Paper')
  ) return 'Player';
  return 'CPU';
}

function handleResult(result, playerChoice, cpuChoice) {
  let baseDamage = bossEnabled && round % 5 === 0? 30 : 20;
  let playerDamage = bossEnabled && round % 5 === 0? 25 : 15;

  // Critical hit
  let isCrit = critEnabled && Math.random() < 0.1;
  if (isCrit) {
    baseDamage *= 2;
    playerDamage *= 2;
    playSound('critSound');
  }

  // Combo multiplier
  if (streak >= 3) {
    combo = 1.5;
    if($('comboText')) $('comboText').textContent = `COMBO x${combo}!`;
  } else {
    combo = 1;
    if($('comboText')) $('comboText').textContent = '';
  }

  if (result === 'Player') {
    cpuHP -= baseDamage * combo;
    playerScore++;
    streak++;
    coins += betAmount;
    safeText('result', `YOU WIN! ${playerChoice} beats ${cpuChoice}${isCrit? ' CRITICAL!' : ''}`);
    if($('playerHand')) {
      $('playerHand').classList.add('winner');
      setTimeout(() => $('playerHand').classList.remove('winner'), 700);
    }
    playSound('winSound');
    checkAchievement('firstWin');
  } else if (result === 'CPU') {
    playerHP -= playerDamage;
    cpuScore++;
    streak = 0;
    combo = 1;
    coins -= betAmount;
    screenShake();
    safeText('result', `YOU LOSE! ${cpuChoice} beats ${playerChoice}`);
    if($('cpuHand')) {
      $('cpuHand').classList.add('winner');
      setTimeout(() => $('cpuHand').classList.remove('winner'), 700);
    }
    playSound('loseSound');
  } else {
    streak = 0;
    combo = 1;
    safeText('result', `TIE! Both chose ${playerChoice}`);
    playSound('tieSound');
  }
}

function updateUI() {
  if($('round')) $('round').textContent = round;
  if($('playerScore')) $('playerScore').textContent = playerScore;
  if($('cpuScore')) $('cpuScore').textContent = cpuScore;
  if($('streak')) $('streak').textContent = streak;
  if($('coins')) $('coins').textContent = coins;
  if($('combo')) $('combo').textContent = `x${combo}`;
  if($('playerHP')) $('playerHP').style.width = Math.max(0, playerHP) + '%';
  if($('cpuHP')) $('cpuHP').style.width = Math.max(0, cpuHP) + '%';
  if($('playerHPText')) $('playerHPText').textContent = Math.max(0, Math.floor(playerHP));
  if($('cpuHPText')) $('cpuHPText').textContent = Math.max(0, Math.floor(cpuHP));

  if (bossEnabled && round % 5 === 0) {
    document.body.classList.add('boss-mode');
    safeText('result', 'BOSS ROUND! Double damage!');
    playSound('bossSound');
  } else {
    document.body.classList.remove('boss-mode');
  }
}

function checkGameOver() {
  if (playerHP <= 0 || cpuHP <= 0 || coins <= 0) {
    gameOver = true;
    if($('restartBtn')) $('restartBtn').style.display = 'block';
    if($('choices')) $('choices').style.display = 'none';
    toggleBgMusic(false);

    if (playerHP <= 0 || coins <= 0) {
      safeText('result', 'GAME OVER!');
      checkAchievement('gameOver');
    } else {
      safeText('result', 'VICTORY! You defeated the CPU!');
      if (playerScore > highScore) {
        highScore = playerScore;
        localStorage.setItem('slotrps_highscore', highScore);
        if($('highScore')) $('highScore').textContent = highScore;
      }
      checkAchievement('victory');
    }
  }
}

function screenShake() {
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 400);
}

function safeText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function playSound(id) {
  if (gameSettings.soundEnabled) {
    const sound = $(id);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }
}

function startBgMusic() {
  if (musicEnabled &&!isMuted && bgMusic) {
    bgMusic.currentTime = 0;
    toggleBgMusic(true);
  }
}

function toggleBgMusic(on) {
  if (!bgMusic ||!musicEnabled || isMuted) {
    if(bgMusic) bgMusic.pause();
    return;
  }
  if (on) {
    bgMusic.play().catch(() => console.log('Autoplay blocked'));
  } else {
    bgMusic.pause();
  }
}

// Bonus features
function checkDailyBonus() {
  const lastClaim = localStorage.getItem('slotrps_daily');
  const today = new Date().toDateString();
  if(lastClaim!== today && $('dailyBonusBtn')) {
    $('dailyBonusBtn').style.display = 'block';
  }
}

function claimDailyBonus() {
  coins += 50;
  localStorage.setItem('slotrps_daily', new Date().toDateString());
  if($('dailyBonusBtn')) $('dailyBonusBtn').style.display = 'none';
  updateUI();
  alert('Claimed 50 coins! Come back tomorrow for more.');
}

function loadLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('slotrps_leaderboard')) || [];
  const tbody = $('leaderboardBody');
  if(!tbody) return;
  tbody.innerHTML = '';
  scores.sort((a,b) => b.score - a.score).slice(0,10).forEach((s,i) => {
    tbody.innerHTML += `<tr><td>${i+1}</td><td>${s.name}</td><td>${s.score}</td></tr>`;
  });
}

function loadAchievements() {
  const list = $('achievementsList');
  if(!list) return;
  const allAchievements = [
    {id: 'firstWin', name: 'First Blood', desc: 'Win your first round'},
    {id: 'victory', name: 'Victor', desc: 'Defeat the CPU'},
    {id: 'streak5', name: 'On Fire', desc: '5 win streak'},
    {id: 'gameOver', name: 'Try Again', desc: 'Lose a game'}
  ];
  list.innerHTML = allAchievements.map(a =>
    `<div style="padding:10px;margin:5px 0;border:2px solid ${achievements.includes(a.id)? 'var(--neon-green)' : '#444'};border-radius:8px;">
      <strong>${a.name}</strong><br>${a.desc} ${achievements.includes(a.id)? '✅' : '🔒'}
    </div>`
  ).join('');
}

function checkAchievement(id) {
  if(!achievements.includes(id)) {
    achievements.push(id);
    localStorage.setItem('slotrps_achievements', JSON.stringify(achievements));
    alert(`Achievement Unlocked: ${id}!`);
    loadAchievements();
  }
  if(streak >= 5) checkAchievement('streak5');
}

function resetAllData() {
  if(confirm('Reset all data? This cannot be undone!')) {
    localStorage.clear();
    location.reload();
  }
}

// Start
init();