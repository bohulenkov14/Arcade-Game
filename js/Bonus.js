/**
* @description Represents bonus objects
* @constructor
*/
var Bonus = function() {
  this.x = -1000;
  this.y = -1000;
  this.sprite = 'images/Star.png';
};

/**
* @description Renders object object
*/
Bonus.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Sets new random position for enemy object
* @param {object} bonus
*/
var placeBonusOnMap = function(bonus) {
  var cols = currentMapConfig.colsNum;

  var xTile = Math.floor(Math.random() * (currentMapConfig.colsNum - 0));
  var yTile = Math.floor(Math.random() * (currentMapConfig.rowsNum-2 - 1) + 1);

  bonus.x = xTile * 101;
  bonus.y = yTile * 83  - 10;
};