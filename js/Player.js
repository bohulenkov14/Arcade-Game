//=========================================
//Player class
//=========================================
var Player = function() {
  this.spawnX = -1000;
  this.spawnY = -1000;
  this.sprite = 'images/char-boy.png';
  this.currentPlayerModelIndex = 0;
  this.sprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ];

  this.x = this.spawnX;
  this.y = this.spawnY;
};

//methods
Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
  var caller = this;
  caller.movePlayer(keyCode);
  gameState.currentLevel.bonuses.forEach(function(bonus) {
    if (caller.checkBonusCollision(bonus)) {
        currentScore += 100;
        placeBonusOnMap(bonus);
    }
  });
};

Player.prototype.movePlayer = function(keyCode) {
  var yStep = 83;
  var xStep = 101;
  switch(keyCode) {
      case 'up':
          if (this.y - yStep + 100 > 0)
              this.y -= yStep;
          break;
      case 'down':
          if (this.y + yStep + 221 < ctx.canvas.height)
              this.y += yStep;
          break;
      case 'left':
          if (this.x - xStep >= 0)
              this.x -= xStep;
          break;
      case 'right':
          if (this.x + xStep + 101 <= ctx.canvas.width)
              this.x += xStep;
          break;
      default:
          break;
  }
};

Player.prototype.checkBonusCollision = function(bonus) {
  if  ((
             (this.x <= bonus.x + 81 && this.x >= bonus.x)
          || (this.x + 81<= bonus.x + 81 && this.x + 81>= bonus.x)
      )
      &&
      (
             (this.y <= bonus.y + 63 && this.y >= bonus.y)
          || (this.y + 63 <= bonus.y + 63 && this.y + 63 >= bonus.y)
      )) {
      return true;
  }
  else
      return false;
};

Player.prototype.selectNextPlayerModel = function() {
  this.currentPlayerModelIndex = (this.currentPlayerModelIndex + 1) % this.sprites.length;
  this.sprite = this.sprites[this.currentPlayerModelIndex];
};

Player.prototype.selectPrevPlayerModel = function() {
  this.currentPlayerModelIndex = this.currentPlayerModelIndex - 1;
  if (this.currentPlayerModelIndex < 0)
    this.currentPlayerModelIndex += this.sprites.length;

  this.sprite = this.sprites[this.currentPlayerModelIndex];
};
//global functions for interracting with player objects
var placePlayerToStartPosition = function(player) {
    if (gameState.currentState === 'Game') {
      player.spawnX = Math.floor(currentMapConfig.colsNum / 2) * 101;
      player.spawnY = currentMapConfig.rowsNum * 83 - 95;
    } else if (gameState.currentState === 'ChooseCharacter') {
      player.spawnX = ctx.canvas.width  / 2 - 101 / 2;
      player.spawnY = ctx.canvas.height / 2 - 83  / 2;
    }

    player.x = player.spawnX;
    player.y = player.spawnY;
};