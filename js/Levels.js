/**
* @description Represents information about current screen
* @constructor
* @param {Array} enemies - Array of enemies to be placed on current level screen
* @param {Array} players - Array of players to be placed on current level screen
* @param {Array} bonuses - Array of bonuses to be placed on current level screen
* @param {Array} guiObjects - Array of GUI objects to be placed on current level screen
*/
var Level = function(enemies, players, bonuses, guiObjects) {
  this.enemies = enemies;
  this.players = players;
  this.bonuses = bonuses;
  this.guiObjects = guiObjects;
};

/**
* @description Prepares all objects for current screen for rendering
*/
Level.prototype.load = function() {
  this.enemies.forEach(placeEnemyToStartPosition);
  this.players.forEach(placePlayerToStartPosition);
  this.bonuses.forEach(placeBonusOnMap);
};