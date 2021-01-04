/**
    demon.js
    The demon class
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 24, 2014
*/

var DEMON_IDLE_IDX = 0;
var DEMON_TURNCCW_IDX = 1;
var DEMON_TURNCW_IDX = 2;
var DEMON_WORRIED_CW_IDX = 3;
var DEMON_WORRIED_CCW_IDX = 4;
var DEMON_WIN_IDX = 5;

function Demon() {
    this.currIdx = DEMON_IDLE_IDX;
    this.image = null;
}

Demon.prototype = new BaseObject;

Demon.prototype.Load = function () {
   //..
}

Demon.prototype.Update = function (elapsed) {
    //...
    this.image[this.currIdx].Update(elapsed);
}

Demon.prototype.Draw = function (gfx) {
    this.image[this.currIdx]._X = this._X;
    this.image[this.currIdx]._Y = this._Y;
    this.image[this.currIdx].Draw(gfx);
}

Demon.prototype.TurnCCW = function(){
    this.currIdx = DEMON_TURNCCW_IDX;
    this.image[this.currIdx].Reset();
}

Demon.prototype.TurnCW = function () {
    this.currIdx = DEMON_TURNCW_IDX;
    this.image[this.currIdx].Reset();
}

//..
//@}--;--
//..

function Demon1() {
    //...
}

Demon1.prototype = new Demon;

Demon1.prototype.Load = function () {
    var context = this;
    this.image = new Array();

    var idle = new ImageObject();
    idle.Load("images/game_screen/demons/demon 1 idle.png");

    var turnCCW = new AnimatedObject();
    turnCCW.Load("images/game_screen/demons/demon 1 turn CCW.png");
    turnCCW.Set(8, 8.0, false);
    turnCCW._frameWidth = 79;
    turnCCW._fnCallback = (function () {
       // context.currIdx = DEMON_IDLE_IDX;
    });

    var turnCW = new AnimatedObject();
    turnCW.Load("images/game_screen/demons/demon 1 turn CW.png");
    turnCW.Set(8, 8.0, false);
    turnCW._frameWidth = 79;
    turnCW._fnCallback = (function () {
       // context.currIdx = DEMON_IDLE_IDX;
    });

    this.image.push(idle);
    this.image.push(turnCCW);
    this.image.push(turnCW);
    this.image.push(idle);
    this.image.push(idle);
    this.image.push(idle);
}


//..
//@}--;--
//..

function Demon2() {
    this.worried = false;
}

Demon2.prototype = new Demon;

Demon2.prototype.Load = function () {
    this.image = new Array();

    var idle = new ImageObject();
    idle.Load("images/game_screen/demons/demon 2 idle.png");

    var turnCCW = new AnimatedObject();
    turnCCW.Load("images/game_screen/demons/demon 2 turn CCW.png");
    turnCCW.Set(4, 8.0, false);
    turnCCW._frameWidth = 97;
    turnCCW._fnCallback = (function () {
        //...
    });

    var turnCW = new AnimatedObject();
    turnCW.Load("images/game_screen/demons/demon 2 turn CW.png");
    turnCW.Set(4, 8.0, false);
    turnCW._frameWidth = 97;
    turnCW._fnCallback = (function () {
        //...
    });

    var worriedCCW = new AnimatedObject();
    worriedCCW.Load("images/game_screen/demons/demon 2 worried CCW.png");
    worriedCCW.Set(4, 8.0, false);
    worriedCCW._frameWidth = 97;
    worriedCCW._fnCallback = (function () {
        //...
    });

    var worriedCW = new AnimatedObject();
    worriedCW.Load("images/game_screen/demons/demon 2 worried CW.png");
    worriedCW.Set(4, 8.0, false);
    worriedCW._frameWidth = 97;
    worriedCW._fnCallback = (function () {
        //...
    });

    var win = new AnimatedObject();
    win.Load("images/game_screen/demons/demon 2 win.png");
    win.Set(4, 8.0, true);
    win._frameWidth = 104;
    win._fnCallback = (function () {
        //...
    });

    this.image.push(idle);
    this.image.push(turnCCW);
    this.image.push(turnCW);
    this.image.push(worriedCCW);
    this.image.push(worriedCW);
    this.image.push(win);
}
Demon.prototype.TurnCCW = function () {
    this.currIdx = (this.worried)?DEMON_WORRIED_CCW_IDX:DEMON_TURNCCW_IDX;
    this.image[this.currIdx].Reset();
}

Demon.prototype.TurnCW = function () {
    this.currIdx = (this.worried) ? DEMON_WORRIED_CW_IDX : DEMON_TURNCW_IDX;
     this.image[this.currIdx].Reset();
}

Demon.prototype.Win = function () {
    this.currIdx = DEMON_WIN_IDX;
    this.image[this.currIdx].Reset();
}