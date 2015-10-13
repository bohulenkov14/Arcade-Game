// Enemies our player must avoid
var Enemy = function(assignedMapRow) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.spawnX = -1000;
    this.spawnY = 100;
    this.minMovementSpeed = 100;
    this.maxMovementSpeed = 700;
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
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.setNewMovementSpeed = function() {
    this.movementSpeed = Math.random() * (this.maxMovementSpeed - this.minMovementSpeed) + this.minMovementSpeed;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {

}

Player.prototype.handleInput = function(keyCode) {

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies =
    [
        new Enemy(1),
        new Enemy(2),
        new Enemy(3)
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

Resources.onReady(function() {
    allEnemies.forEach(function(enemy){
        var res = Resources.get(enemy.sprite);
        enemy.spawnX = -res.width;
        enemy.spawnY = enemy.assignedMapRow * 83 - 20;
        console.log(enemy.spawnY);

        enemy.x = enemy.spawnX;
        enemy.y = enemy.spawnY;
        enemy.setNewMovementSpeed();
    });

})