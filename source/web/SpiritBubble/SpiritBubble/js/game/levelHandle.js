/**
    levelHandle.js
    Hit points in the Map
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 31, 2014
*/

function LevelHandle() {
    this.levelID = -1;
    this.origX = 0;
    this.origY = 0;
    this.selected = false;
    this.emblem_circle = null;
    this.angle = 0;

    this.show_handle = false;
   // this.picture_handle = null;
    this.starsCount = 3; //TODO: TEMPORARY!! CHeck this from global data.level[levelid]

    this.starImg = null;

    this.displayText = true;
    this.pictureHandle = null;
}

LevelHandle.prototype = new Button;

LevelHandle.prototype.Load = function () {

    this.LoadImages(
		"images/map/1/emblem.png",
         "images/map/1/emblem HOVER.png",
	     "images/map/1/emblem.png",
         "images/map/1/emblem DISABLED.png");

    this._width = 65;
    this._height = 65;

    this.emblem_circle = new ImageObject();
    this.emblem_circle.Load("images/map/1/emblem circle.png");

   // this.picture_handle = new ImageObject();
    // this.picture_handle.Load("images/map/1/picture handle S.png");

    this.starImg = new ImageObject();
    this.starImg.Load("images/map/1/map star.png");
        
    this.pictureHandle = new ImageObject();
    this.pictureHandle.Load("images/map/1/picture handle S.png");

    this.coin = new ImageObject();
    this.coin.Load("images/map/1/coin XS.png");

    this.lock = new ImageObject();
    this.lock.Load("images/map/1/lock 2.png");
}

LevelHandle.prototype.Update = function (elapsed) {
    if (this.selected) {
        var ANGLE_FRICTION = 1000.0;
        this.angle += (ANGLE_FRICTION * elapsed);
    }
}

LevelHandle.prototype.Draw = function (gfx) {


    if (this.show_handle) {        

		 if(g_gameData.level_list[this.levelID].friends_list != null &&
			g_gameData.level_list[this.levelID].friends_list.length > 0 ){
			
			var profile = g_gameData.level_list[this.levelID].friends_list[0].fbProfile;			
			if(profile.image) {
				this.pictureHandle.Draw(gfx, this._X + 30, this._Y - 30);		
				
				gfx.DrawImage(profile.image, 0, 0,
					profile.image.width, profile.image.height,
					this._X + 30 + 2, this._Y - 30 +2,
					this.pictureHandle._image.width-5, 
					this.pictureHandle._image.height-5, 1.0);
			}
		}
			
		
        var count = 0
        if (this.levelID < g_gameData.level_list.length)
            count = g_gameData.level_list[this.levelID].starCount;

        var dist = 30;
        var y = this._Y - 11;
        for (var i = 0; i < count; i++) {
            var x = this._X -3;
            if (i == 1)
                x -= 15;
            this.starImg.Draw(gfx, x, y);
           
            y += 30;
        }

    }

    ////////////////////////////////////////////////////////////////
    // Taken from Button Base Class
    if (this._currentImg && this._currentImg.IsLoaded()) {
        gfx.DrawImageFull(this._currentImg._image, this._X, this._Y);
    }
    ////////////////////////////////////////////////////////////////

    //...
    //Draw picture

    // Draw circle emblem when selected
    if (this.selected) {
        var angleRadians = this.angle * Math.PI / 180.0;

        gfx.DrawRotateFull(this._X-1, this._Y-1,
           this.emblem_circle._image.width / 2,
           this.emblem_circle._image.height / 2,
            angleRadians,
            this.emblem_circle._image,
            1.0);
    }

    var style = "Bold 20pt ERASDEMI";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;
    var text = this.levelID + 1;

    var textWidth = ctx.measureText(text);
    var fx =  (this._X + this.emblem_circle._image.width / 2) - (textWidth.width/2);
    var fy = this._Y+40;

    var color = "rgb(234,178,0)";
    if (!this.enable) {
        color = "rgb(195, 195, 195)";
    } else if (this.show_handle) {
        color = "rgb(112, 0, 0)";

    }
    if (this.displayText) {
        gfx.DrawText(text,
          fx, fy, color, style);
    }

    if (this.levelID <= g_gameData.level_list.length-1 &&
        g_gameData.level_list[this.levelID].coins_requirement > 0) {
        this.coin.Draw(gfx, 
            (this._X + this.emblem_circle._image.width / 2) - (this.coin._image.width/2),
            this._Y + this.emblem_circle._image.height - 20);

        this.lock.Draw(gfx,
            (this._X + this.emblem_circle._image.width / 2) - (this.lock._image.width / 2),
            this._Y + this.emblem_circle._image.height - 20);
    }
}

LevelHandle.prototype.Select = function () {
    //...
    if (!this.enable) return;
    if (this._highLightImg) {
        this._currentImg = this._highLightImg;
    }

    this.show_handle = true;
}

LevelHandle.prototype.UnSelect = function () {
    if (!this.enable) return;
    if (this._idleImg) {
        this._currentImg = this._idleImg;
    }

    this.show_handle = false;
}
