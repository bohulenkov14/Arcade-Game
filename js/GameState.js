/**
* @description Object, representing common state of game: current score, current level
* @constructor
* @param {object} gameStateLevelDictionary - Object, that contains mapping from string representation of game states to game level objects
* @param {string} currentState - String representation of current game state
*/
var GameState = function(gameStateLevelDictionary, currentState) {
  this.currentState  = currentState;
  this.gameStateLevelDictionary = gameStateLevelDictionary;
  this.currentLevel = this.gameStateLevelDictionary[currentState];
  this.lastButttonClickInteractionBegan = new GuiObject(0,0,"");
  this.score = 0;
};

/**
* @description Executes transition between game states and levels
* @param {string} newState - String representation of new game state
*/
GameState.prototype.changeState = function(newState) {
  this.currentState = newState;
  this.currentLevel = this.gameStateLevelDictionary[newState];
  this.lastButttonClickInteractionBegan = new GuiObject(0,0,"");
  this.currentLevel.load();
};