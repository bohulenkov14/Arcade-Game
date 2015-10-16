/**
* @description Basic GUI object
* @constructor
* @param {number} x - x coordinate for rendering on canvas
* @param {number} y - y coordinate for rendering on canvas
* @param {function} textGetter - function for lazy acquisition of text to render
*/
var GuiObject = function(x, y, textGetter) {
  this.x = x;
  this.y = y;
  this.textGetter = textGetter;
};

/**
* @description Handler for mouse down event for GUI objects
* @param {object} event
*/
GuiObject.prototype.handleMouseDown = function(event) {
};

/**
* @description Handler for mouse up event for GUI objects
* @param {object} event
*/
GuiObject.prototype.handleMouseUp = function(event) {
};



/**
* @description GUI Label object for simple text rendering
* @constructor
* @param {number} x - x coordinate for rendering on canvas
* @param {number} y - y coordinate for rendering on canvas
* @param {function} textGetter - function for lazy acquisition of text to render
*/
var GuiLabel = function(x, y, textGetter) {
  GuiObject.call(this, x, y, textGetter);
};

//inheritance
GuiLabel.prototype = Object.create(GuiObject.prototype);
GuiLabel.prototype.constructor = GuiLabel;

/**
* @description Method for rendering label text
*/
GuiLabel.prototype.render = function() {
  ctx.font = '45px Comic Sans MS';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(this.textGetter(), this.x, this.y);
};

/**
* @description GUI Button object for general purposes
* @constructor
* @param {number} x - x coordinate for rendering on canvas
* @param {number} y - y coordinate for rendering on canvas
* @param {string} buttonColor - color for button in default state
* @param {string} buttonPushedColor - color for button in pushed state
* @param {function} clickHandler - handler for processing button clicks
* @param {function} textGetter - function for lazy acquisition of text to render
*/
var GuiButton = function(x, y, w, h, buttonColor, buttonPushedColor, clickHandler, textGetter) {
  GuiObject.call(this, x, y, textGetter);
  this.buttonColor = buttonColor;
  this.buttonPushedColor = buttonPushedColor;
  this.currentColor = buttonColor;
  this.w = w;
  this.h = h;
  this.clickHandler = clickHandler;
};

//inheritance
GuiButton.prototype = Object.create(GuiObject.prototype);
GuiButton.prototype.constructor = GuiButton;

/**
* @description Method for rendering label text
*/
GuiButton.prototype.render = function() {
  ctx.fillStyle = this.currentColor;
  ctx.fillRect(this.x-this.w/2, this.y, this.w, this.h);

  ctx.strokeStyle = 'black';
  ctx.strokeRect(this.x-this.w/2, this.y, this.w, this.h);

  ctx.font = '45px Comic Sans MS';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(this.textGetter(), this.x, this.y+60);
};

/**
* @description Handler for mouse down event for button
* @param {object} event
*/
GuiButton.prototype.handleMouseDown = function(event) {

  var mouseX = event.offsetX;
  var mouseY = event.offsetY;

  if (mouseX > this.x-this.w/2 &&
      mouseX < this.x+this.w/2 &&
      mouseY > this.y &&
      mouseY < this.y + this.h) {
    this.currentColor = this.buttonPushedColor;
    gameState.lastButttonClickInteractionBegan = this;
  }
};

/**
* @description Handler for mouse up event for button
* @param {object} event
*/
GuiButton.prototype.handleMouseUp = function(event) {
  this.currentColor = this.buttonColor;
  this.clickHandler();
};

