
//levels
var gameLevel = new Level(
  [ new Enemy(1),
    new Enemy(2),
    new Enemy(3),
    new Enemy(4),
    new Enemy(5) ],
  [new Player()],
  [new Bonus()],
  []);

var guiLevel = new Level(
  [],
  [],
  [],
  [new GuiButton(350, 250, 250, 80, 'New Game', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){
      gameState.changeState("Game");
    }),
   new GuiButton(350, 350, 250, 80, 'Choose Map', 'rgba(255,255,255,0.5)', 'rgba(0,255,0,0.5)',
    function(){

    })]
  );

var gameStateLevelDictionary = {
  "MainMenu": guiLevel,
  "Game": gameLevel
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

    gameState.currentLevel.players.forEach(function(player) {
      player.handleInput(allowedKeys[e.keyCode]);
    });
});

document.addEventListener('mousedown', function(e) {
    gameState.currentLevel.guiObjects.forEach(function(guiObject) {
      guiObject.handleMouseDown(e);
    });
});

document.addEventListener('mouseup', function(e) {
  gameState.lastButttonClickInteractionBegan.handleMouseUp(e);
});


Resources.onReady(function() {
  gameState.changeState("MainMenu");
});
