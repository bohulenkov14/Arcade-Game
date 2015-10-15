//=========================================
//Level class
//=========================================
var Level = function(enemies, players, bonuses, guiObjects) {
  this.enemies = enemies;
  this.players = players;
  this.bonuses = bonuses;
  this.guiObjects = guiObjects;
};

Level.prototype.load = function() {
  this.enemies.forEach(placeEnemyToStartPosition);
  this.players.forEach(placePlayerToStartPosition);
  this.bonuses.forEach(placeBonusOnMap);
};