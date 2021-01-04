/**
    launcher.js
    The Gun
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 23, 2014
*/

function Launcher() {
    this.gunSprite = null;
    this.bigWheel = null;
    this.smallWheel = null;
    this._X = 0;
    this._Y = 0;
    this.angle = 0;
    this.bubble = null;
    this.typeNext = -1;

    this.currentBubble = null;
}

Launcher.prototype = new BaseObject;

Launcher.prototype.Load = function () {
    this.gunSprite = new ImageObject();
    this.gunSprite.Load("images/game_screen/launcher/launcher.png");

    this.bigWheel = new ImageObject();
    this.bigWheel.Load("images/game_screen/launcher/gear big.png");

    this.smallWheel = new ImageObject();
    this.smallWheel.Load("images/game_screen/launcher/gear small.png");
    this.bubble = new ImageObject();
}

Launcher.prototype.Update = function (elapsed) { 
    //...
}

Launcher.prototype.LoadNextBubble = function (type)
{
    this.typeNext = type;
    if (this.typeNext > -1) {

        var staticList = ["images/game_screen/balls/static/ball static A.png",
         "images/game_screen/balls/static/ball static B.png",
         "images/game_screen/balls/static/ball static C.png",
         "images/game_screen/balls/static/ball static D.png"];

        this.bubble.Load(staticList[this.typeNext]);
        this.bubble._X = this._X - this.bubble._image.width / 2;
        this.bubble._Y = this._Y + 60;
    }/*else{
		this.bubble = null;
	}*/
}

Launcher.prototype.Draw = function (gfx) {
    //...
    var angleRadians = this.angle * Math.PI / 180.0;

    this.gunSprite.Draw(gfx, this._X - this.gunSprite._image.width / 2, this._Y);
    /* gfx.DrawRotateFull(
    this._X - this.gunSprite._image.width / 2,
    this._Y,

    this.gunSprite._image.width / 2,
    this.gunSprite._image.height,
    angleRadians * 2,
    this.gunSprite._image,
    1.0);
    */
    // this.bigWheel.Draw(gfx, this._X - this.bigWheel._image.width / 2, this._Y + 80);

    if (this.currentBubble) {
        this.currentBubble.Draw(gfx);
    }

	if( this.typeNext != -1){
		this.bubble.Draw(gfx);
	}
	
    var x = this._X - this.bigWheel._image.width / 2;
    var y = this._Y + 75;

    gfx.DrawRotateFull(x, y,
        this.bigWheel._image.width / 2,
        this.bigWheel._image.height / 2,
         angleRadians * 10,
         this.bigWheel._image,
         1.0);

    x = (this._X - this.bigWheel._image.width / 2) - (this.smallWheel._image.width - 8);
    y = this._Y + 80;
    gfx.DrawRotateFull(x, y,
        this.smallWheel._image.width / 2,
        this.smallWheel._image.height / 2,
         -angleRadians * 20,
         this.smallWheel._image,
         1.0);

    x = (this._X - this.bigWheel._image.width / 2) + this.bigWheel._image.width - 8;
    y = this._Y + 80;
    gfx.DrawRotateFull(x, y,
        this.smallWheel._image.width / 2,
        this.smallWheel._image.height / 2,
         -angleRadians * 20,
         this.smallWheel._image,
         1.0);
    // this.smallWheel.Draw(gfx, (this._X - this.bigWheel._image.width / 2) - (this.smallWheel._image.width - 8),
    //            this._Y + 90);

    //this.smallWheel.Draw(gfx, (this._X - this.bigWheel._image.width / 2) + this.bigWheel._image.width - 8,
    //           this._Y + 90);
}
