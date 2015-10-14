// Enemies our player must avoid
var Enemy = function(assignedMapRow) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.spawnX = -1000;
    this.spawnY = 100;
    this.minMovementSpeed = 100;
    this.maxMovementSpeed = 1000;

    this.movementSpeed = this.minMovementSpeed;
    this.assignedMapRow = assignedMapRow;

    this.x = this.spawnX;
    this.y = this.spawnY;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.movementSpeed * dt;
    if (this.x > currentMapConfig.colsNum * 171) {
        this.x = this.spawnX;
        this.setNewMovementSpeed();
    }
    if (this.checkPlayerCollision()) {
        placePlayerToStartPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.setNewMovementSpeed = function() {
    this.movementSpeed = Math.random() * (this.maxMovementSpeed - this.minMovementSpeed) + this.minMovementSpeed;
};

Enemy.prototype.checkPlayerCollision = function() {
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.spawnX = -1000;
    this.spawnY = -1000;
    this.sprite = 'images/char-boy.png';

    this.x = this.spawnX;
    this.y = this.spawnY;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    this.movePlayer(keyCode);
};

Player.prototype.movePlayer = function(keyCode) {
    var yStep = 83;
    var xStep = 101;
    switch(keyCode) {
        case 'up':
            this.y -= yStep;
            break;
        case 'down':
            this.y += yStep;
            break;
        case 'left':
            this.x -= xStep;
            break;
        case 'right':
            this.x += xStep;
            break;
        default:
            break;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies =
    [
        new Enemy(1),
        new Enemy(2),
        new Enemy(3),
        new Enemy(4),
        new Enemy(5)
    ];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


var placePlayerToStartPosition = function() {
    player.spawnX = Math.floor(currentMapConfig.colsNum / 2) * 101;
    player.spawnY = currentMapConfig.rowsNum * 83 - 100;
    player.x = player.spawnX;
    player.y = player.spawnY;
};

var placeEnemyToStartPosition = function(enemy) {
    var res = Resources.get(enemy.sprite);
    enemy.spawnX = -res.width;
    enemy.spawnY = enemy.assignedMapRow * 83 - 20;
    console.log(enemy.spawnY);

    enemy.x = enemy.spawnX;
    enemy.y = enemy.spawnY;

    enemy.setNewMovementSpeed();
};

Resources.onReady(function() {
    allEnemies.forEach(placeEnemyToStartPosition);
    placePlayerToStartPosition();
});
