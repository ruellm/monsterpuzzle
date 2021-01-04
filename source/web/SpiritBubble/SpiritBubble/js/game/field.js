/**
    field.js
    a blank playing field
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 10, 2014
*/

function Field() {
    this.bubble = null;
    this.bank = null;
}

Field.prototype = new BaseObject;

Field.prototype.LoadBank = function () {
    this.bank = new AnimatedObject();
    this.bank.Load("images/game_screen/balls/ball bank.png");
    this.bank.Set(3, 8.0, true);
    this.bank._frameWidth = 40;
    this.bank._fnCallback = (function () {
        //...
    });
}

Field.prototype.Update = function (elapsed) {

    if (this.bank) {
        this.bank.Update(elapsed);
    }
    if (this.bubble) {
        this.bubble.Update(elapsed);
    }
}

Field.prototype.Draw = function (gfx) {
   /*
    var context = gfx._canvasBufferContext;

    var centerX = this._X + (this._width / 2);
    var centerY = this._Y + (this._height / 2);
    context.save();


    context.beginPath();
    context.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false);
    // context.fillStyle = 'green';
    // context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();

    context.restore();
    /**/
    if (this.bank) {
        this.bank._X = this._X;
        this.bank._Y = this._Y;
        this.bank.Draw(gfx);
    }
    if (this.bubble) {
        this.bubble.Draw(gfx);
    }
}