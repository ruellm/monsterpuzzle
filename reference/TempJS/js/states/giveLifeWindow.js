/**
  *  giveLifeWindow.js
  *  Give Life window screen
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: June 29, 2014
*/

function GiveLifeWindow()
{
    this.textSprite = null;
    this.uimanagerLocal = null;
    this.listBg = null;
    this.pictureHandle = null;

    this.buttonList = null;
    this.selected = null;
    this.check = null;
    this.totalLoop = 10;

}

GiveLifeWindow.prototype = new WindowBig;


GiveLifeWindow.prototype.LoadInternal = function () {
    this.LoadInternalBase();

    this.uimanagerLocal = new UIManager();

    var context = this;
    this.giveLife = new Button;
    this.giveLife.LoadImages(
	    "images/generics/button blank XL.png",
        "images/generics/button blank XL hover.png",
	    "images/generics/button blank XL.png");

    this.giveLife._width = 281;
    this.giveLife._height = 300;
    this.giveLife._X = this.bg._image.width/2 - (281/2);
    this.giveLife._Y = 440;
    this.giveLife._fnMouseDownEvnt = (function () {
       
	   var list = new Array();	   
	   for(var i=0; i < context.selected.length; i++){
			if(context.selected[i][2]){				
				list.push(g_beggarsList[i].recordID);
			}
	   }
	   
	   Ajax_GrantLife(list);
	   context.substate = ANIMWINDOW_STATE_GOOUT;
    });

    this._uimanager.Add(this.giveLife);

    this.textSprite = new ImageObject();
    this.textSprite.Load("images/give_life/Send Lives.png");

    this.listBg = new ImageObject();
    this.listBg.Load("images/give_life/list friends bg.png");

    this.pictureHandle = new ImageObject();
    this.pictureHandle.Load("images/give_life/picture handle XS.png");

    this.check = new ImageObject();
    this.check.Load("images/give_life/check S.png");
    
    this.buttonList = new Array();
    this.selected = new Array();

    var x = (this.bg._image.width / 2) - (this.listBg._image.width / 2);

    multiplier = 0;

    //this.totalLoop = 10;
    this.totalLoop = (g_beggarsList.length < 10) ? g_beggarsList.length : 10;
    for (var i = 0; i < this.totalLoop; i++) {
        var select = new Button;

        y = 133 + (60 * multiplier);

        select.LoadImages(
            "images/give_life/list diamond S.png",
            "images/give_life/list diamond S hover.png",
            "images/give_life/list diamond S.png");

        select._width = 23;
        select._height = 23;
        select._X = x + (this.pictureHandle._image.width-7);
        select._Y = y + (this.pictureHandle._image.height - 25);
        select.id = i;
        select._fnMouseDownEvnt = (function () {
            var value = context.selected[this.id][2];
            context.selected[this.id][2] = !value;
        });

        this.uimanagerLocal.Add(select);

        var data = new Array();
        data.push(select._X);
        data.push(select._Y);
        data.push(false);
        this.selected.push(data);
        
        if (i + 1 == 5) {
            x = (this.bg._image.width / 2) - (this.listBg._image.width / 2);
            x += 400;
            multiplier = 0;
        } else {
            multiplier++;
        }
    }
}

GiveLifeWindow.prototype.UpdateInternal = function (elapsed) {
    this.uimanagerLocal.Update(elapsed);
}

GiveLifeWindow.prototype.DrawInternal = function (gfx) {
    var ctx = gfx._canvasBufferContext;
    var style = "30pt ERASDEMI";
    ctx.font = style;
    text = "Your friends need help. Send them lives!";

    var textWidth = ctx.measureText(text);
    var x = (this.bg._image.width / 2) - (textWidth.width / 2);
    var y = 115;

    gfx.DrawText(text,
        x, y, "rgb(41,14,3)", style);

    this.textSprite.Draw(gfx,
        this.giveLife._X + 63,
        this.giveLife._Y + 6);

    var x = (this.bg._image.width / 2) - (this.listBg._image.width / 2);
    var y = 130;
    this.listBg.Draw(gfx, x, y);

    y = 133;
    multiplier = 0;
    for (var i = 0; i < this.totalLoop; i++) {
        y = 133 + (60 * multiplier);
        this.pictureHandle.Draw(gfx, x + 5, y);
      
		var profile = g_beggarsList[i].fbProfile;
		if(profile.image) {
			gfx.DrawImage(profile.image, 0, 0,
				profile.image.width, profile.image.height,
				x+5, y ,
				this.pictureHandle._image.width, 
				this.pictureHandle._image.height, 1.0);
		}
	  
		gfx.DrawText(profile.name,
			x + this.pictureHandle._image.width + 30, 
			y + 33, "rgb(234,217,174)", "15pt ERASDEMI");
	  
        if (i + 1 == 5) {
            x = (this.bg._image.width / 2) - (this.listBg._image.width / 2);
            x += 400;
            multiplier = 0;
        } else {
            multiplier++;
        }
		
		
		
    }
    this.uimanagerLocal.Draw(gfx);

    for (var i = 0; i < this.totalLoop; i++) {
        var v = this.selected[i];
        if (v[2]) {
            this.check.Draw(gfx, v[0], v[1]);
        }
    }
    
}

GiveLifeWindow.prototype.EventHandlerInternal = function (e) {
    for (var i = 0; i < this.uimanagerLocal._uiList.length; i++) {
        if (this.uimanagerLocal._uiList[i]._visible) {
            this.uimanagerLocal._uiList[i]._X += this._X;
            this.uimanagerLocal._uiList[i]._Y += this._Y;
        }
    }

    this.EventHandlerBase(e, this.uimanagerLocal);

    //hack solution -- because problem was encountered
    for (var i = 0; i < this.uimanagerLocal._uiList.length; i++) {
        if (this.uimanagerLocal._uiList[i]._visible) {
            this.uimanagerLocal._uiList[i]._X -= this._X;
            this.uimanagerLocal._uiList[i]._Y -= this._Y;
        }
    }
}
