//=========================================
//Enemy class
//=========================================
var Enemy = function(assignedMapRow) {
  this.spawnX = -1000;
  this.spawnY = 100;
  this.minMovementSpeed = 100;
  this.maxMovementSpeed = 1000;

  this.movementSpeed = this.minMovementSpeed;
  this.assignedMapRow = assignedMapRow;

  this.x = this.spawnX;
  this.y = this.spawnY;

  this.sprite = 'images/enemy-bug.png';
};

//methods
Enemy.prototype.update = function(dt) {
  var caller = this;
  caller.x += this.movementSpeed * dt;
  if (caller.x > currentMapConfig.colsNum * 171) {
      caller.x = caller.spawnX;
      caller.setNewMovementSpeed();
  }
  gameState.currentLevel.players.forEach(function(player) {
    if (caller.checkPlayerCollision(player)) {
        gameState.changeState("LostScreen");
    }
  });
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.setNewMovementSpeed = function() {
  this.movementSpeed = Math.random() * (this.maxMovementSpeed - this.minMovementSpeed) + this.minMovementSpeed;
};

Enemy.prototype.checkPlayerCollision = function(player) {
  if  ((
             (player.x < this.x + 81 && player.x > this.x)
          || (player.x + 81< this.x + 81 && player.x + 81> this.x)
      )
      &&
      (
             (player.y < this.y + 63 && player.y > this.y)
          || (player.y + 63 < this.y + 63 && player.y + 63 > this.y)
      )) {
      return true;
  }
  else
      return false;
};

//global functions for interracting with enemy objects
var placeEnemyToStartPosition = function(enemy) {
    var res = Resources.get(enemy.sprite);
    enemy.spawnX = -res.width;
    enemy.spawnY = enemy.assignedMapRow * 83 - 20;
    console.log(enemy.spawnY);

    enemy.x = enemy.spawnX;
    enemy.y = enemy.spawnY;

    enemy.setNewMovementSpeed();
};
