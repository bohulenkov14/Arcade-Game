//=========================================
//Basic GUI Object class
//=========================================
var GuiObject = function(x, y, text) {
  this.x = x;
  this.y = y;
  this.text = text;
};

//basic dummy method for handling mousedown events for gui objects
GuiObject.prototype.handleMouseDown = function(event) {
};

//basic dummy method for handling mouseup events for gui objects
GuiObject.prototype.handleMouseUp = function(event) {
};



//=========================================
//GUI Label class
//=========================================
var GuiLabel = function(x, y, text) {
  GuiObject.call(this, x, y, text);
};

//inheritance
GuiLabel.prototype = Object.create(GuiObject.prototype);
GuiLabel.prototype.constructor = GuiLabel;

//methods
GuiLabel.prototype.render = function() {
  ctx.font = "45px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(this.text, this.x, this.y);
};

//=========================================
//GUI Button class
//=========================================
var GuiButton = function(x, y, w, h, text, buttonColor, buttonPushedColor, clickHandler) {
  GuiObject.call(this, x, y, text);
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

//methods
GuiButton.prototype.render = function() {

  ctx.fillStyle = this.currentColor;
  ctx.fillRect(this.x-this.w/2, this.y, this.w, this.h);

  ctx.strokeStyle = "black";
  ctx.strokeRect(this.x-this.w/2, this.y, this.w, this.h);

  ctx.font = "45px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(this.text, this.x, this.y+60);
};

GuiButton.prototype.handleMouseDown = function(event) {

  var mouseX = event.offsetX;
  var mouseY = event.offsetY;
  if (mouseX > this.x-this.w/2 &&
      mouseX < this.x+this.w/2 &&
      mouseY > this.y &&
      mouseY < this.y + this.h)
  {
    this.currentColor = this.buttonPushedColor;
    gameState.lastButttonClickInteractionBegan = this;
  }
};

GuiButton.prototype.handleMouseUp = function(event) {
  this.currentColor = this.buttonColor;
  this.clickHandler();
};

