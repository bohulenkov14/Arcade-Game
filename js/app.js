
//levels

var player = new Player();

var gameLevel = new Level(
  [ new Enemy(1),
    new Enemy(2),
    new Enemy(3),
    new Enemy(4),
    new Enemy(5) ],
  [player],
  [new Bonus()],
  []);

var guiLevel = new Level(
  [],
  [],
  [],
  [new GuiButton(350, 250, 400, 90, 'New Game', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      gameState.changeState("Game");
    }),
   new GuiButton(350, 350, 400, 90, 'Choose Character', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      gameState.changeState("ChooseCharacter");
    })]
  );

var chooseCharacter = new Level(
  [],
  [player],
  [],
  [new GuiButton(250, 410, 90, 90, '<-', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      player.selectPrevPlayerModel();
    }),
   new GuiButton(450, 410, 90, 90, '->', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      player.selectNextPlayerModel();
    }),
   new GuiButton(350, 550, 180, 90, 'OK', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      gameState.changeState("MainMenu");
    }),
   ]
  );

var lostScreen = new Level(
  [],
  [],
  [],
  [new GuiLabel(350, 310, 'You lost! Want to try again ?'),
   new GuiButton(250, 410, 100, 90, 'Yes', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      gameState.changeState("Game");
    }),
   new GuiButton(450, 410, 100, 90, 'No', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      gameState.changeState("MainMenu");
    }),
   ]
  );

//GameStates to Levels mapping
var gameStateLevelDictionary = {
  "MainMenu": guiLevel,
  "Game": gameLevel,
  "ChooseCharacter": chooseCharacter,
  "LostScreen": lostScreen
};

//Game state
var gameState = new GameState(gameStateLevelDictionary, gameStateLevelDictionary.MainMenu);

//Event Listeners
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    if (gameState.currentState === "Game") {
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


//Game loader
Resources.onReady(function() {
  gameState.changeState("MainMenu");
});
