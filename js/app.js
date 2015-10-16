
//Button colors
//==========================================
var defaultButtonColor = 'rgba(255,255,255,0.5)';
var pressedButtonColor = 'rgba(0,255,0,0.5)';


//Level transitions
//==========================================
var toGameStateTranitioner = function(){
  gameState.score = 0;
  gameState.changeState('Game');
};

var toCharacterSelectTranitioner = function(){
  gameState.changeState('ChooseCharacter');
};

var toMainMenuTransitioner = function(){
  gameState.changeState('MainMenu');
};

//==========================================
//Levels
//==========================================
var player = new Player();


//Game level
//==========================================
var gameLevelEnemies = [
  new Enemy(1),
  new Enemy(2),
  new Enemy(3),
  new Enemy(4),
  new Enemy(5)
];
var gameLevelPlayers = [ player ];
var gameLevelBonuses = [ new Bonus() ];
var gameLevelScoreLabel = new GuiLabel(90, 40, function(){
  return 'Score: ' + gameState.score;
});
var gameLevelGuiObjects = [ gameLevelScoreLabel ];
var gameLevel = new Level(gameLevelEnemies, gameLevelPlayers, gameLevelBonuses, gameLevelGuiObjects);

//Main menu
//==========================================
var mainMenuNewGameButton = new GuiButton(350, 250, 400, 90, defaultButtonColor, pressedButtonColor, toGameStateTranitioner,
  function() {
    return 'New Game';
  }
);

var mainMenuCharacterSelectButton = new GuiButton(350, 350, 400, 90,
  defaultButtonColor,
  pressedButtonColor,
  toCharacterSelectTranitioner,
  function() {
    return 'Choose Character';
  }
);

var mainMenuGuiObjects = [ mainMenuNewGameButton, mainMenuCharacterSelectButton ];

var mainMenuLevel = new Level([], [], [], mainMenuGuiObjects);


//Character select
//==========================================
var choosePrevCharacterButton = new GuiButton(250, 410, 90, 90,
  defaultButtonColor,
  pressedButtonColor,
  function() {
    player.selectPrevPlayerModel();
  },
  function() {
    return '<-';
  }
);

var chooseNextCharacterButton = new GuiButton(450, 410, 90, 90,
  defaultButtonColor,
  pressedButtonColor,
  function() {
    player.selectNextPlayerModel();
  },
  function() {
    return '->';
  }
);

var confirmChoiseButtonButton = new GuiButton(350, 550, 180, 90,
  defaultButtonColor,
  pressedButtonColor,
  toMainMenuTransitioner,
  function() {
    return 'OK';
  }
);

var characterSelectLevelGuiObjects = [ choosePrevCharacterButton, chooseNextCharacterButton, confirmChoiseButtonButton ];
var chooseCharacterLevel = new Level([], [ player ], [], characterSelectLevelGuiObjects);

//Loose screen
//==========================================

var lostLabel = new GuiLabel(350, 310, function(){
  return 'You lost! Want to try again ?';
});

var newGameLooseScreenButton = new GuiButton(250, 410, 100, 90,
  defaultButtonColor,
  pressedButtonColor,
  toGameStateTranitioner,
  function() {
    return 'Yes';
  }
);

var mainMenuLooseScreenButton = new GuiButton(450, 410, 100, 90,
  defaultButtonColor,
  pressedButtonColor,
  toMainMenuTransitioner,
  function() {
    return 'No';
  }
);

var lostScreenGuiObjects = [ lostLabel, newGameLooseScreenButton, mainMenuLooseScreenButton ];
var lostScreen = new Level([], [], [], lostScreenGuiObjects);

//Win screen
//==========================================

var winLabel = new GuiLabel(350, 310, function(){
  return 'You won! Your score is ' + gameState.score;
});

var tryAgainLabel = new GuiLabel(350, 410, function(){
  return 'Want to try again ?';
});

var newGameWinScreenButton = new GuiButton(250, 510, 100, 90,
  defaultButtonColor,
  pressedButtonColor,
  toGameStateTranitioner,
  function() {
    return 'Yes';
  }
);

var mainMenuWinScreenButton = new GuiButton(450, 510, 100, 90,
  defaultButtonColor,
  pressedButtonColor,
  toMainMenuTransitioner,
  function() {
    return 'No';
  }
);

var winScreenGuiObjects = [ winLabel, tryAgainLabel, newGameWinScreenButton, mainMenuWinScreenButton ];
var winScreen = new Level([], [], [], winScreenGuiObjects);


//==========================================
//Game states and states to level mappings
//==========================================
var gameStateLevelDictionary = {
  'MainMenu': mainMenuLevel,
  'Game': gameLevel,
  'ChooseCharacter': chooseCharacterLevel,
  'LostScreen': lostScreen,
  'WinScreen': winScreen
};

//Game state
var gameState = new GameState(gameStateLevelDictionary, gameStateLevelDictionary.MainMenu);

//==========================================
//Event listeners
//==========================================
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  if (gameState.currentState === 'Game') {
    gameState.currentLevel.players.forEach(function(player) {
      player.handleInput(allowedKeys[e.keyCode]);
    });
  }
});

document.addEventListener('mousedown', function(e) {
  gameState.currentLevel.guiObjects.forEach(function(guiObject) {
    guiObject.handleMouseDown(e);
  });
});

document.addEventListener('mouseup', function(e) {
  gameState.lastButttonClickInteractionBegan.handleMouseUp(e);
});

//disable scrolling from
//http://stackoverflow.com/questions/16637031/completely-disable-scrolling-of-webpage
window.addEventListener('keydown', function(e) {
  // space, page up, page down and arrow keys:
  if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);


//==========================================
//Game state initial init
//==========================================
Resources.onReady(function() {
  gameState.changeState('MainMenu');
});
