//=========================================
//GameState class
//=========================================
var GameState = function(gameStateLevelDictionary, currentState) {
  this.currentState  = currentState;
  this.gameStateLevelDictionary = gameStateLevelDictionary;
  this.currentLevel = this.gameStateLevelDictionary[currentState];
  this.lastButttonClickInteractionBegan = new GuiObject(0,0,"");
  this.score = 0;
};

GameState.prototype.changeState = function(newState) {
  this.currentState = newState;
  this.currentLevel = this.gameStateLevelDictionary[newState];
  this.lastButttonClickInteractionBegan = new GuiObject(0,0,"");
  this.currentLevel.load();
};