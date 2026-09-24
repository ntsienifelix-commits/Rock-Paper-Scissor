# Rock-Paper-Scissor
GAME
# SlotRPS Project Documentation

This document explains the HTML, CSS, and JavaScript used in the SlotRPS game project.

## 1. Project Overview

The project is a browser-based Rock Paper Scissors game with arcade styling. It includes:

- A loading screen
- A main menu
- A game screen with HUD and score tracking
- Modal windows for information and settings
- Sound effects and background music
- Persistent data using browser localStorage

## 2. File Structure

- index.html - Contains the page structure and all visible UI elements
- style.css - Handles the visual design, layout, colors, animations, and responsive behavior
- java.js - Contains the game logic, event listeners, UI updates, sounds, and local storage features

---

# 3. HTML Documentation

The HTML file defines the complete structure of the game interface.

## 3.1 Document Setup

### `<!DOCTYPE html>`
- Declares that the document is an HTML5 file.

### `<html lang="en">`
- The root element of the page.
- `lang="en"` tells browsers and assistive tools that the page is in English.

### `<head>`
- Contains metadata and linked files.

### `<meta charset="UTF-8">`
- Ensures the page uses UTF-8 character encoding so letters and symbols display correctly.

### `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Makes the layout responsive on mobile and desktop screens.

### `<title>SlotRPS - Ultimate Arcade</title>`
- Sets the browser tab title.

### `<link rel="stylesheet" href="style.css">`
- Connects the HTML page to the CSS file for styling.

---

## 3.2 Body Structure

### `<body>`
- Contains all visible page content.

## 3.3 Loading Screen

### `<div id="loadingScreen">`
- A container for the introductory loading screen.
- The `id` lets JavaScript and CSS target it easily.

### `<h1>NEFELINT GAMES</h1>`
- Displays the game studio title.

### `<div class="loader">`
- A container for the loading bar animation.

### `<div class="loaderBar"></div>`
- A visual bar that animates to show the loading progress.

### `<p id="loadingTip">Loading neural network...</p>`
- A paragraph that shows a random loading tip when the page loads.

---

## 3.4 Menu Screen

### `<div id="menuScreen" style="display:none;">`
- The main menu container.
- It is hidden by default until the loading screen finishes.

### `<h1>SLOT RPS</h1>`
- Shows the main game name.

### `<input type="text" id="playerNameInput" placeholder="Enter your name" maxlength="12">`
- Lets the player type a name.
- `maxlength="12"` limits the name length to 12 characters.

### `<label>Choose Character:</label>`
- A label for the character selection section.

### `<div id="characterPreview">`
- Wraps the selected character preview image.

### `<img id="selectedCharBig" src="assets/images/rock.png" alt="Selected">`
- Displays a bigger image of the currently selected character.

### `<div id="characterSelect">`
- Holds the character options.

### `<img src="player.jpg" data-char="char1" class="charOption" alt="masked">`
- A selectable character image.
- The `class` is used by CSS and JavaScript.
- The `data-char` attribute stores custom data for the character.

### `<div id="betSelect">`
- Contains the betting buttons.

### `<button class="betBtn selected" data-bet="5">5</button>`
- A button that lets the player choose a bet amount.
- The `data-bet` attribute stores the numeric value.

### `<div class="menuGrid">`
- A grid container for menu buttons.

### Menu Buttons
- `PLAY`, `ABOUT`, `HISTORY`, `LEADERBOARD`, `ACHIEVEMENTS`, `SETTINGS`, `CREDITS`
- These buttons trigger different screens or modals in the game.

---

## 3.5 Game Screen

### `<div id="gameScreen" style="display:none;">`
- The main gameplay screen.
- It is hidden until the player starts the game.

### `<div id="topHUD">`
- The top heads-up display.
- Contains the player name, coin count, combo status, and mute/menu buttons.

### `<span id="playerName">Player</span>`
- Displays the current player name.

### `<span id="coins">100</span>`
- Shows the player’s current coin balance.

### `<span id="combo">x1</span>`
- Shows the current combo multiplier.

### `<button id="muteBtn">🔊</button>`
- Mutes or unmutes the game audio.

### `<button id="menuReturnBtn">Menu</button>`
- Returns the player to the main menu.

### `<div id="scoreboard">`
- Shows match statistics such as round number, player score, CPU score, streak, and best score.

### `<div id="hpBars">`
- Contains the health bars for the player and CPU.

### `<img id="playerAvatar" class="miniAvatar" src="player.jpg" alt="Player">`
- Displays the player avatar image.

### `<div class="hpBar"><div id="playerHP"></div></div>`
- The player’s health bar container and inner bar.

### `<div id="reels">`
- Holds the visual “reels” that show the player and CPU choices.

### `<div class="reel" id="playerReel">❓</div>`
- Displays the player’s selected move.

### `<div id="hands">`
- Holds the hand emojis used to animate the round result.

### `<div id="result">Choose your move!</div>`
- Shows the outcome of the round.

### `<div id="comboText"></div>`
- Used to display combo messages like “COMBO x1.5”.

### `<div id="choices">`
- Holds the Rock, Paper, and Scissors action buttons.

### Choice Buttons
- Each button uses `data-choice` to store the move value.

### `<button id="dailyBonusBtn" style="display:none;">🎁 CLAIM DAILY BONUS</button>`
- A bonus button that appears when the daily reward is available.

### `<button id="restartBtn" style="display:none;">RESTART</button>`
- Lets the player restart the game after a round ends.

---

## 3.6 Modal Windows

The game uses multiple modal popups for extra information.

### `<div id="aboutModal" class="modal" style="display:none;">`
- A modal that explains how to play the game.

### `<div id="historyModal" class="modal" style="display:none;">`
- A modal with the history of Rock Paper Scissors.

### `<div id="leaderboardModal" class="modal" style="display:none;">`
- Opens the leaderboard page.

### `<div id="achievementsModal" class="modal" style="display:none;">`
- Displays unlocked achievements.

### `<div id="creditsModal" class="modal" style="display:none;">`
- Shows game credits.

### `<div id="settingsModal" class="modal" style="display:none;">`
- Lets the player adjust sound and game settings.

### `<span class="closeBtn" data-modal="aboutModal">&times;</span>`
- A close button for each modal.

### `<table>`
- Used in the leaderboard modal to display rows of scores.

---

## 3.7 Audio Elements

### `<audio id="winSound" ...></audio>`
- Plays when the player wins.

### `<audio id="loseSound" ...></audio>`
- Plays when the player loses.

### `<audio id="tieSound" ...></audio>`
- Plays on a tie round.

### `<audio id="bossSound" ...></audio>`
- Plays during boss rounds.

### `<audio id="bgMusic" loop ...></audio>`
- Plays looping background music.

---

## 3.8 Footer

### `<footer>`
- Displays the footer text with the game title and version.

### `<script src="java.js"></script>`
- Links the JavaScript file to the page so the game logic runs.

---

# 4. CSS Documentation

The CSS file controls the visual design and behavior of the game.

## 4.1 Root Variables

### `:root { ... }`
- Defines reusable color variables such as:
  - `--neon-blue`
  - `--neon-pink`
  - `--neon-green`
  - `--neon-gold`
  - `--dark-bg`
  - `--card-bg`

These variables keep the styling consistent and easier to maintain.

## 4.2 Global Reset

### `* { margin: 0; padding: 0; box-sizing: border-box; }`
- Removes default spacing from all elements.
- Makes element sizing more predictable.

## 4.3 Body Styling

### `body { ... }`
- Sets the page font, background color, text color, and layout.
- Uses `display: flex` to center content.
- Uses `background-image` to create the neon glow effect.

## 4.4 Loading Screen Styling

### `#loadingScreen { ... }`
- Positions the loading screen over the whole viewport.
- Uses `display: flex` to center its contents.

### `#loadingScreen h1 { ... }`
- Styles the title with a gradient text effect.

### `.loader { ... }`
- Styles the loading progress bar container.

### `.loaderBar { ... }`
- Styles the animated progress bar.

### `@keyframes loadProgress { ... }`
- Animates the loading bar from 0% to 100%.

## 4.5 Menu Screen Styling

### `#menuScreen { ... }`
- Styles the main menu card with padding, rounded corners, borders, shadows, and glow effects.

### `#playerNameInput { ... }`
- Styles the name input field.

### `#playerNameInput:focus { ... }`
- Adds a glow effect when the user clicks into the input.

### `.betBtn { ... }`
- Styles the bet selection buttons.

### `.betBtn:hover, .betBtn.selected { ... }`
- Changes the button look when hovered or selected.

### `.menuGrid { ... }`
- Sets up the 3-column grid layout for menu buttons.

### `button { ... }`
- Applies a shared style to all buttons.

### `button:hover { ... }`
- Adds hover effects to buttons.

### `#playBtn { ... }`
- Gives the play button a special gradient background and larger size.

## 4.6 Game Screen Styling

### `#gameScreen { ... }`
- Sets the maximum width and spacing for the game screen.

### `#topHUD { ... }`
- Styles the top information bar.

### `#scoreboard { ... }`
- Creates a grid of score cards.

### `#hpBars { ... }`
- Arranges the health bars side by side.

### `.hpBar { ... }`
- Styles the health bar container.

### `#playerHP { ... }`
- Styles the player health bar fill.

### `#cpuHP { ... }`
- Styles the CPU health bar fill.

## 4.7 Reels and Hands Styling

### `#reels { ... }`
- Positions the visual move reels.

### `.reel { ... }`
- Styles the game reels with a neon border and circular shape.

### `.reel.spinning { ... }`
- Applies the spinning animation when the player makes a move.

### `@keyframes spin { ... }`
- Rotates the reels during the animation.

### `#hands { ... }`
- Positions the hand emoji display.

### `#playerHand, #cpuHand { ... }`
- Styles the hand icons.

### `#playerHand.winner, #cpuHand.winner { ... }`
- Adds the win animation to the winning hand.

## 4.8 Result and Combo Styling

### `#result { ... }`
- Styles the round outcome text.

### `#comboText { ... }`
- Styles combo messages with gold color.

## 4.9 Modal Styling

### `.modal { ... }`
- Makes the modal cover the screen with a dark overlay.

### `.modal-content { ... }`
- Styles the content box inside each modal.

### `.closeBtn { ... }`
- Styles the close button.

## 4.10 Animation and Effects

### `.screen-shake { ... }`
- Adds a shaking effect on losing rounds.

### `.boss-mode.reel { ... }`
- Gives the reels a special red boss appearance.

### `@keyframes shake { ... }`
- Creates the screen shake effect.

### `@keyframes bossPulse { ... }`
- Creates the pulsing boss animation.

## 4.11 Responsive Design

### `@media (max-width: 768px) { ... }`
- Adjusts the layout for smaller screens.
- Changes the menu grid, reel size, hand size, and scoreboard layout.

## 4.12 Character and Avatar Styling

### `#characterPreview { ... }`
- Adds spacing around the character preview.

### `#selectedCharBig { ... }`
- Styles the selected character image as a circular preview.

### `#characterSelect { ... }`
- Positions the character options in a row.

### `.charOption { ... }`
- Styles each character option image.

### `.miniAvatar { ... }`
- Styles the small avatars shown in the game screen.

---

# 5. JavaScript Documentation

The JavaScript file controls the game logic and connects the HTML and CSS.

## 5.1 Helper Shortcut

### `const $ = id => document.getElementById(id);`
- A small helper function that gets an element by its ID.
- It makes the code shorter and cleaner.

## 5.2 Game State Variables

These variables store the current game state:

- `playerName` - Name typed in the menu
- `selectedChar` - Selected character symbol
- `betAmount` - Current bet value
- `coins` - Player currency
- `round` - Current round number
- `playerScore` and `cpuScore` - Match scores
- `streak` - Current winning streak
- `combo` - Current combo multiplier
- `highScore` - Highest score saved in browser storage
- `playerHP` and `cpuHP` - Health points
- `gameOver` - Whether the game is finished
- `bossEnabled` and `critEnabled` - Gameplay settings
- `gameSettings` - Stores sound preference
- `achievements` - Collection of unlocked achievements

## 5.3 Audio Setup

### `const bgMusic = $('bgMusic');`
- Retrieves the background music audio element.

### `bgMusic.volume = 0.2;`
- Sets the music volume to a lower level.

### `let isMuted = false;`
- Tracks whether the sound is currently muted.

### `let musicEnabled = true;`
- Controls whether background music is allowed to play.

## 5.4 Game Choices and Tips

### `const choices = ['Rock', 'Paper', 'Scissors'];`
- Defines the available moves.

### `const emojis = { Rock: '✊', Paper: '✋', Scissors: '✌️' };`
- Maps each move name to its display emoji.

### `const tips = [...]`
- Stores the random tip messages shown on the loading screen.

## 5.5 Loading Screen Logic

### `window.addEventListener('load', () => { ... })`
- Runs when the page has fully loaded.
- Picks a random tip and shows it.
- After 3 seconds, it hides the loading screen and shows the menu.

## 5.6 Initialization Function

### `function init() { ... }`
- Runs when the script starts.
- Connects the HTML elements to JavaScript behavior.

### `checkDailyBonus();`
- Checks whether the daily bonus should be displayed.

### `loadLeaderboard();`
- Loads the leaderboard data from localStorage.

### `loadAchievements();`
- Displays the achievement list.

## 5.7 Character Selection

### `document.querySelectorAll('.charOption')...`
- Finds all character option images.
- Adds a click event listener to each one.
- Updates the selected preview image and avatar image.

## 5.8 Bet Selection

### `document.querySelectorAll('.betBtn').forEach(...)`
- Adds click handlers to bet buttons.
- Updates the selected bet value and highlights the chosen button.

## 5.9 Button Event Listeners

The script attaches events to:

- Play button → starts the game
- About/History/Leaderboard/Achievements/Settings/Credits buttons → open modals
- Restart button → resets the game
- Daily bonus button → claims the reward
- Close buttons → hide modals
- Menu return button → returns to the menu

## 5.10 Starting the Game

### `function startGame() { ... }`
- Reads the player name from the input box.
- Updates the name display.
- Hides the menu and shows the game screen.
- Resets the round state and starts background music.

## 5.11 Resetting the Game

### `function resetGame() { ... }`
- Resets the round counters, health, coins, and UI.
- Restores the start-of-match state.

## 5.12 Making a Choice

### `function makeChoice(playerChoice) { ... }`
- Runs when the player chooses Rock, Paper, or Scissors.
- Calls `spinReels()` to animate the result.
- After 1 second, it selects a random CPU move and resolves the round.

## 5.13 Spinning Reels Animation

### `function spinReels() { ... }`
- Adds the `spinning` class to the reels.
- Removes the class after the animation finishes.

## 5.14 Determining the Winner

### `function getWinner(player, cpu) { ... }`
- Compares the player move and CPU move.
- Returns one of three values:
  - `Tie`
  - `Player`
  - `CPU`

## 5.15 Resolving the Round

### `function handleResult(result, playerChoice, cpuChoice) { ... }`
- Calculates damage based on boss rounds and critical hit chances.
- Applies combo multipliers.
- Updates score, coins, HP, and the result text.
- Plays the appropriate sound effect.

### Important logic pieces:
- `baseDamage` and `playerDamage` change on boss rounds.
- `isCrit` may double damage with a random chance.
- A streak of 3 or more increases the combo multiplier.

## 5.16 Updating the UI

### `function updateUI() { ... }`
- Updates all visible counters and bars.
- Changes the health bar widths.
- Refreshes the round, score, streak, coins, and combo values.

## 5.17 Game Over Logic

### `function checkGameOver() { ... }`
- Checks whether the player or CPU has run out of HP or coins.
- Stops the game and shows the restart button.
- Displays a victory or game-over message.
- Saves the high score in localStorage.

## 5.18 Screen Shake Effect

### `function screenShake() { ... }`
- Adds the `screen-shake` CSS class briefly for a dramatic visual effect.

## 5.19 Safe Text Helper

### `function safeText(id, text) { ... }`
- Updates an element’s text content only if that element exists.
- Helps prevent runtime errors.

## 5.20 Sound Playback

### `function playSound(id) { ... }`
- Plays an audio file if sound is enabled.
- Uses `currentTime = 0` to restart the sound each time.

## 5.21 Background Music Controls

### `function startBgMusic() { ... }`
- Starts the background music if enabled and not muted.

### `function toggleBgMusic(on) { ... }`
- Plays or pauses the music depending on the provided parameter.

## 5.22 Daily Bonus

### `function checkDailyBonus() { ... }`
- Checks whether the user already claimed the bonus today.

### `function claimDailyBonus() { ... }`
- Adds 50 coins and stores the today’s date in localStorage.

## 5.23 Leaderboard and Achievements

### `function loadLeaderboard() { ... }`
- Reads leaderboard data from `localStorage`.
- Sorts and displays the top scores.

### `function loadAchievements() { ... }`
- Builds the achievement list and shows which achievements are unlocked.

### `function checkAchievement(id) { ... }`
- Unlocks an achievement if it has not already been earned.
- Saves the achievement list in `localStorage`.

## 5.24 Resetting Stored Data

### `function resetAllData() { ... }`
- Prompts the user to confirm clearing the saved game data.
- Clears localStorage and reloads the page.

## 5.25 JavaScript Features Used

The script uses common web development features such as:

- Variables and constants
- Functions
- Event listeners
- `setTimeout()` for delayed animations
- DOM selection via `getElementById()` and `querySelectorAll()`
- CSS class manipulation with `classList.add()` and `classList.remove()`
- Updating text and styles with `textContent` and `style`
- Storing data with `localStorage`
- Template literals for dynamic text

---

# 6. How the Files Work Together

1. HTML creates the structure of the game.
2. CSS makes the interface look like a neon arcade game.
3. JavaScript adds interactivity, game rules, animations, and persistent features.

In simple terms:
- HTML = structure
- CSS = appearance
- JavaScript = behavior

---

# 7. Quick Summary of Main Elements

## HTML Elements Used
- `div` for containers and sections
- `h1`, `h2`, `h3` for headings
- `p` for paragraphs
- `button` for clickable actions
- `input` for the player name field
- `img` for character and avatar images
- `span` for inline values such as score and coins
- `table` for the leaderboard
- `audio` for game sounds
- `script` to load JavaScript

## CSS Features Used
- Variables (`:root`)
- Selectors by ID and class
- Flexbox and Grid
- Borders, shadows, gradients, and animations
- Media queries for responsiveness

## JavaScript Concepts Used
- Variables and arrays
- Functions and event handlers
- DOM updates
- Random number generation
- Local storage persistence

---

# 8. Final Notes

This project is a good example of how HTML, CSS, and JavaScript work together to build a complete interactive web game. If you want, the next step could be to add:

- better comments inside the code
- a README with setup instructions
- a bug-fix pass for small JavaScript issues
- extra game modes or animations
