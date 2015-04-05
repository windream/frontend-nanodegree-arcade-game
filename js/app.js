// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = this.genY();
    this.speed = this.genSpeed();
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype.genY = function() {
    var candidate = [60, 140, 220];
    var rand = Math.floor(Math.random() * 3);
    return candidate[rand];
}

Enemy.prototype.genSpeed = function() {
    var candidate = [120, 200, 280];
    var rand = Math.floor(Math.random() * 3);
    return candidate[rand];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var curSpeed = this.speed * dt;
    if(this.x < 500){
        this.x += curSpeed;
    }else{
        this.x = -100;
        this.y = this.genY();
        this.speed = this.genSpeed();
    }
    checkCollisions(this, player);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 200;
    this.y = 380;
    this.xspeed = 100;
    this.yspeed = 80;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    checkCollisions(allEnemies, this);
    checkWin(this);
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x - this.xspeed > -50)
                this.x -= this.xspeed;
            break;
        case 'right':
            if(this.x + this.xspeed < 500)
                this.x += this.xspeed;
            break;
        case 'up':
            if(this.y - this.yspeed > -50)
                this.y -= this.yspeed;
            break;
        case 'down':
            if(this.y + this.yspeed < 400)
                this.y += this.yspeed;
            break;
        default :
            break;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.win = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.die = function() {
    this.x = 200;
    this.y = 380;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];

var checkCollisions = function(allEnemies, player) {
    for(enemy in allEnemies){
        if(tooClose(enemy, player))
            player.die();
    }
}

var checkCollisions = function(enemy, player) {
    if(tooClose(enemy, player))
        player.die();
}

var tooClose = function(enemy, player) {
    return Math.abs(enemy.x - player.x) < 40 && Math.abs(enemy.y - player.y) < 10;
}

var checkWin = function(player) {
    if(reachRiver(player))
        player.win();
}

var reachRiver = function(player) {
    return player.y === 380 - 5 * player.yspeed;
}

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
