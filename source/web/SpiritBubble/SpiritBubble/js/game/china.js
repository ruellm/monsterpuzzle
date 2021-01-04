/**
    china.js
    China/Meg sprite
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 24, 2014
*/

var CHINA_IDLE_IDX = 0;
var CHINA_LOOSE_IDX = 1;
var CHINA_CLAP_IDX = 2;

function China() {
    this.currIdx = CHINA_IDLE_IDX;
    this.image = null;
    this.blink = false;
    this.lastTime = 0;
}

China.prototype = new BaseObject;

China.prototype.Load = function () {
    this.image = new Array();
    var context = this;
    var idle = new AnimatedObject();
    idle.Load("images/game_screen/china/china blink.png");
    idle.Set(2, 8.0, false);
    idle._frameWidth = 142;
    idle._fnCallback = (function () {
        context.blink = false;
        context.lastTime = new Date().getTime();
        this.Reset();
    });

    var loose = new AnimatedObject();
    loose.Load("images/game_screen/china/china lose.png");
    loose.Set(4, 12.0, false);
    loose._frameWidth = 142;
    loose._fnCallback = (function () {
        //...
    });
    
    var clap = new AnimatedObject();
    clap.Load("images/game_screen/china/chinaclap.png");
    clap.Set(2, 8.0, true);
    clap._frameWidth = 142;
    clap._fnCallback = (function () {
        //...
    });

    this.image.push(idle);
    this.image.push(loose);
    this.image.push(clap);

    this.lastTime = new Date().getTime();
}

China.prototype.Update = function (elapsed) {
    //...

    if (this.currIdx == CHINA_IDLE_IDX) {
        var currTime = new Date().getTime();
        var diff = (currTime - this.lastTime) / 1000;
        if (diff >= 3 && !this.blink)
            this.blink = true;

        if (this.blink) {
            this.image[this.currIdx].Update(elapsed);
        }
    } else {
        this.image[this.currIdx].Update(elapsed);
    }
}

China.prototype.Draw = function (gfx) {

    this.image[this.currIdx]._X = this._X;
    this.image[this.currIdx]._Y = this._Y;
    this.image[this.currIdx].Draw(gfx);
}

China.prototype.Loose = function ()
{
    this.currIdx = CHINA_LOOSE_IDX;
}

China.prototype.Win = function () {
    this.currIdx = CHINA_CLAP_IDX;
}