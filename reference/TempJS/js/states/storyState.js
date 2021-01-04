/**
 *   splash.js
 *   animated splash sprite
 *   Author: Ruell Magpayo <ruellm@yahoo.com>
 *   Created: July 29, 2014
*/
function StoryState_1()
{
    this._stateID = SLIDE_STORY_STATE_0;
}


StoryState_1.prototype = new State;

StoryState_1.prototype.Load = function ()
{
    this.images = new Array();
    this.internalState = 0;

    for (var i = 0; i < g_slides1_images.length; i++) {
        var image = new ImageObject();
        image.Load(g_slides1_images[i]);
        this.images.push(image);
    }

    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = false;

    this.text = "An ordinary girl by day...";

    this.bg_music = GetAudioResource("203706__setuniman__sappy-1d29");
    if (this.bg_music) {
       // this.bg_music.loop = true;
        this.bg_music.play();
    }
}

StoryState_1.prototype.BaseUpdate = function (elapsed)
{
    if (this.internalState == 0) {
        if (this.alpha < 1.0) {
            this.alpha += (2 * elapsed);
            if (this.alpha > 1.0)
                this.alpha = 1;
        } else {
            this.alpha = 1;
            this.internalState = 1;
            this.lastTime = new Date().getTime();
        }
    } else if (this.internalState == 1) {
        var thisTime = new Date().getTime();
        var diff = (thisTime - this.lastTime) / 1000.0;
        if (diff >= 3) {
            this.internalState = 2;
        }
    } else if (this.internalState == 2) {
        if (this.alpha > 0) {
            this.alpha -= (2 * elapsed);

            if (this.alpha < 0)
                this.alpha = 0;
        } else {
            this.alpha = 0;
         //   this.internalState = 0;

           
        }
    }
}

StoryState_1.prototype.Update = function (/**Number*/ elapsed) {
    this.BaseUpdate(elapsed);

    if (this.internalState == 2 && this.alpha == 0) {
        if (!this.isImage) {
            this.isImage = true;
            this.internalState = 0;
        } else {
            if (this.index + 1 < 3) {
                ++this.index;
                this.internalState = 0;
            } else {
                this.internalState = 4;
                g_Engine.SetState(GAME_STATE);
            }
        }
    }
}

StoryState_1.prototype.Draw = function (/**Graphics*/gfx) {
    if (!this.isImage) {
        var ctx = gfx._canvasBufferContext;
        var style = "40pt ERASDEMI";
        ctx.font = style;
        var text = this.text;

        var textWidth = ctx.measureText(text);
        var x = (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2);
        var y = (DEFAULT_WINDOW_HEIGHT / 2);

        gfx.DrawText(text,
            x, y, "rgb(255,255,255)", style, this.alpha);
    } else {
        var image = this.images[this.index];
       
        if (this.alpha <= 0) return;
        gfx.DrawImageFullA(image._image,
             (DEFAULT_WINDOW_WIDTH / 2) - (image._image.width / 2),
              (DEFAULT_WINDOW_HEIGHT / 2) - (image._image.height / 2),
              this.alpha);
    }
}

StoryState_1.prototype.Unload = function () {
    this.CleanupUIManager();

    if (this.bg_music) {
        this.bg_music.pause();
        this.bg_music.currentTime = 0;
    }
}

StoryState_1.prototype.EventHandler = function (e) {

    if (e.type == "keydown") {
      //  var keycode = e.keyCode;
        g_Engine.SetState(GAME_STATE);
    }

    this.EventHandlerBase(e);
}
/**/

function StoryState_2()
{
    this._stateID = SLIDE_STORY_STATE_1;
}


StoryState_2.prototype = new StoryState_1;

StoryState_2.prototype.Load = function ()
{
    this.images = new Array();
    this.internalState = 0;

    for (var i = 0; i < g_slides1_images.length; i++) {
        var image = new ImageObject();
        image.Load(g_slides2_images[i]);
        this.images.push(image);
    }

    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = true;

    this.text = "... a secret life at night";

    this.bg_music = GetAudioResource("203706__setuniman__sappy-1d29");
    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
}

StoryState_2.prototype.Update = function (/**Number*/ elapsed) {
    this.BaseUpdate(elapsed);

    if (this.internalState == 2 && this.alpha == 0) {
         if (this.index + 1 < 3) {
             ++this.index;
             this.internalState = 0;
        } else if (this.isImage) {
            this.isImage = false;
            this.internalState = 0;
            this.alpha = 0;
        } else {
            this.isImage = 0;
            this.internalState = 4;
            this.alpha = 0;
            this.isImage = true;
            g_Engine.SetState(GAME_STATE);
        }
    }
}
