//=========================================
//Bonus class
//=========================================
var Bonus = function() {
  this.x = -1000;
  this.y = -1000;
  this.sprite = 'images/Star.png';
};

//methods
Bonus.prototype.update = function(dt) {

};

Bonus.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//global functions for interracting with bonus objects
var placeBonusOnMap = function(bonus) {

    var cols = currentMapConfig.colsNum;

    var xTile = Math.floor(Math.random() * (currentMapConfig.colsNum - 0));
    var yTile = Math.floor(Math.random() * (currentMapConfig.rowsNum-2 - 1) + 1);

    console.log('xTile: ' + xTile);
    console.log('yTile: ' + yTile);
    bonus.x = xTile * 101;
    bonus.y = yTile * 83  - 10;
};