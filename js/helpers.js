// Helpers


//Bullets

function ABIntersection(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
}

function Bullet(x, y, velocity, w, h, color) {
	this.x = x;
	this.y =y;
	this.velocity = velocity;
	this.width = w;
	this.height =h; 
	this.color =color;
};

Bullet.prototype.update = function() {
	this.y += this.velocity;
};

// Display
function Display(width, height) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.context = this.canvas.getContext("2d");
	document.body.appendChild(this.canvas);
};

Display.prototype.clear = function () {
	this.context.clearRect(0, 0, this.width, this.height);
};

Display.prototype.drawSprite = function(sp, x, y) {
	this.context.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

Display.prototype.drawBullet = function(bullet) {

	this.context.fillStyle = bullet.color;
	this.context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
};


// Sprite
function Sprite(img, x, y, w, h) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
};

// Input
function InputHandler() {
	this.down = {};
	this.pressed = {};

	var _this = this;
	document.addEventListener("keydown", function(event) {
		_this.down[event.keyCode] = true;
	});

	document.addEventListener("keyup", function(event) {
		delete _this.down[event.keyCode];
		delete _this.pressed[event.keyCode];
	});
};

InputHandler.prototype.isDown = function(code) {
	return this.down[code];
};

InputHandler.prototype.isPressed = function(code) {
	if (this.pressed[code]) {
		return false;
	} else if (this.down[code]) {
		return this.pressed[code] = true;
	} 
	return false;
};