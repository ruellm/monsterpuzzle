/**
  *  animScrollWindow.js
  *  Base class for animated scroll window screens/states
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: June 19, 2014
*/


var ANIMWINDOW_STATE_READY = 0;
var ANIMWINDOW_STATE_READY_STATE_GOIN = 1;
var ANIMWINDOW_STATE_GOOUT = 2;

function AnimScrollWindow()
{
    //...
    this.substate = -1;
    this._X = 0;
    this._Y = 300;
    this.targetY = 0;

    this.canvas = null;
    this.context = null;

    this.bg = null; // the background sprite
    this.close = null;
    this.alpha = 0;

    this.fnOnClose = null;
   
}

AnimScrollWindow.prototype = new State;

AnimScrollWindow.prototype.Load = function () {
    //...
    var context = this;
    this._uimanager = new UIManager();

    this.close = new Button;
    this.close.LoadImages(
		 "images/purchase_window/X window.png",
        "images/purchase_window/X HOVER window.png",
	     "images/purchase_window/X window.png");
     
    this.close._width = 57;
    this.close._height = 59;
    this.close._X = 0;
    this.close._Y = 0;
    this.close._fnMouseDownEvnt = (function () {
        context.substate = ANIMWINDOW_STATE_GOOUT;
    });
   
    this._uimanager.Add(this.close);    
    this.LoadInternal();  
}

AnimScrollWindow.prototype.BuildTempSurface = function (width, height)
{
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');

}

AnimScrollWindow.prototype.LoadInternal = function ()
{
    // FOr internal, load the X and Y coordinates and
    // target Y
}

AnimScrollWindow.prototype.Update = function (elapsed) {
    //...
    var complete = 0;
    if (this.substate == ANIMWINDOW_STATE_READY_STATE_GOIN) {
        var tolerant = 1;        
        if (this._Y < this.targetY - 1) {
            var diff = this.targetY - this._Y;
            var value = (diff * WINDOW_ANIM_SPEED * elapsed);
            this._Y += value;

        } else {
            this._Y = this.targetY;          
            complete++;
        }

        if (this.alpha < 0.9) {
            this.alpha += (ALPHA_SPEED * elapsed);
        } else {
            this.alpha = 1;
            complete++;
        }

        if (complete >= 2) {
            this.state = ANIMWINDOW_STATE_READY;
        }
    } else if (this.substate == ANIMWINDOW_STATE_GOOUT) {
        if (this._Y >= 3) {
            var diff = 1 - this._Y;
            var value = (diff * WINDOW_ANIM_SPEED * elapsed);
            this._Y += value;
        } else {
            this._Y = 0;
            complete++;
        }

        if (this.alpha > 0.2) {
            this.alpha -= (ALPHA_SPEED * elapsed);;
        } else {
            this.alpha = 0;
            complete++;

        }
        if (complete >= 2) {
            this.state = ANIMWINDOW_STATE_READY;
            if (this.fnOnClose) {
                this.fnOnClose();
            }
        }
    }

    this._uimanager.Update(elapsed);
    this.UpdateInternal(elapsed);
}

AnimScrollWindow.prototype.UpdateInternal = function (elapsed)
{
    //.. Inherited
}

AnimScrollWindow.prototype.DrawChildWindow = function (gfx)
{
    // Child window must be rendered separate from this window 
    // because of offsetting issue encountered during render
}

AnimScrollWindow.prototype.Draw = function (gfx) {

    gfx.FillRect(0, 56, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
            "rgb(0,0,0)", 0.4);

    //this will be the magic trick: Draw to temporary surface first
    //then flip draw to actual rendering surface after
    this.context.clearRect(0, 0,
          DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT);

    var context = gfx._canvasBufferContext;
    gfx._canvasBufferContext = this.context;

    this.bg.Draw(gfx, 0, 0);  
    this._uimanager.Draw(gfx);
    this.DrawInternal(gfx);
    
    gfx._canvasBufferContext = context;
    gfx.DrawImage(this.canvas, 0, 0,
            this.bg._image.width, this.bg._image.height,
            this._X, this._Y,
            this.bg._image.width, this.bg._image.height, this.alpha);

    this.DrawChildWindow(gfx);
}

AnimScrollWindow.prototype.Show = function ()
{
    this.substate = ANIMWINDOW_STATE_READY_STATE_GOIN;
    this._Y = 0;
}

AnimScrollWindow.prototype.DrawInternal = function (gfx) {
    //.. Inherited
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
AnimScrollWindow.prototype.Unload = function () {
    this.CleanupUIManager();
}

AnimScrollWindow.prototype.EventHandler = function (e) {

    //hack solution -- because problem was encountered
    for (var i = 0; i < this._uimanager._uiList.length; i++) {
        if (this._uimanager._uiList[i]._visible) {
            this._uimanager._uiList[i]._X += this._X;
            this._uimanager._uiList[i]._Y += this._Y;
        }
    }

    this.EventHandlerBase(e);
    this.EventHandlerInternal(e);

    //hack solution -- because problem was encountered
    for (var i = 0; i < this._uimanager._uiList.length; i++) {
        if (this._uimanager._uiList[i]._visible) {
            this._uimanager._uiList[i]._X -= this._X;
            this._uimanager._uiList[i]._Y -= this._Y;
        }
    }
}
AnimScrollWindow.prototype.EventHandlerInternal = function (e)
{
    //...
}
/**/

function WindowBig()
{
    //...
}

WindowBig.prototype = new AnimScrollWindow;

WindowBig.prototype.LoadInternalBase = function () {
    
    // load bg image
    this.bg = new ImageObject();
    this.bg.Load("images/purchase_window/window big.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.bg._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.bg._image.height / 2) + 25;

    this.close._X = 927;
    this.close._Y = 35;

    this.BuildTempSurface(this.bg._image.width,
        this.bg._image.height);
  }

/**/

function WindowSmall()
{
    //...
}

WindowSmall.prototype = new AnimScrollWindow;

WindowSmall.prototype.LoadInternalBase = function () {
    //...
    // load bg image
    this.bg = new ImageObject();
    this.bg.Load("images/purchase_window/window small.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.bg._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.bg._image.height / 2) + 25;

    this.close._X = 445;
    this.close._Y = 30;

    this.BuildTempSurface(this.bg._image.width,
        this.bg._image.height);

}

/**/
function WindowMini()
{
    //...
}

WindowMini.prototype = new AnimScrollWindow;

WindowMini.prototype.LoadInternalBase = function () {
    //...
    // load bg image
    this.bg = new ImageObject();
    this.bg.Load("images/generics/window extra small.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.bg._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.bg._image.height / 2);

    this.close._X = 450;
    this.close._Y = 10;
    
    this.BuildTempSurface(this.bg._image.width,
        this.bg._image.height);

}