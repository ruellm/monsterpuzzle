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

StoryState_1.prototype.BaseDraw = function (/**Graphics*/gfx) {
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

StoryState_1.prototype.Draw = function (/**Graphics*/gfx) {
    this.BaseDraw(gfx);
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
/**/

function StoryState_3() {
    this._stateID = SLIDE_STORY_STATE_2;
}

StoryState_3.prototype = new StoryState_1;

StoryState_3.prototype.Load = function () {
    this.images = new Array();
    this.internalState = 0;

    for (var i = 0; i < g_slides1_images.length; i++) {
        var image = new ImageObject();
        image.Load(g_slides3_images[i]);
        this.images.push(image);
    }

    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = false;

    this.text = "A merchant of spirits...";

    this.bg_music = GetAudioResource("234106__setuniman__piano-loop-1e71");
    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
}

StoryState_3.prototype.Update = function (/**Number*/ elapsed) {
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

/**/

function StoryState_4() {
    this._stateID = SLIDE_STORY_STATE_3;
}

StoryState_4.prototype = new StoryState_1;


StoryState_4.prototype.Load = function () {
    this.images = new Array();
    this.internalState = 0;
    
    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = false;
    this.loopTime = 5;

    this._animator = new Animator();
    this._animator.Set(10);
    this.loopCount = 0;
   
    this.text = "A girl with a mission ...";
    
    for (var i = 0; i < g_slides4_images.length; i++) {
        var image = new ImageObject();
        image.Load(g_slides4_images[i]);
        this.images.push(image);
    }

    this.bg_music = GetAudioResource("234106__setuniman__piano-loop-1e71");
    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
}


StoryState_4.prototype.Update = function (/**Number*/ elapsed) {
    this.BaseUpdate(elapsed);

    if (this.internalState == 2 && this.alpha == 0) {
        if (!this.isImage) {
            this.isImage = true;
            this.internalState = 5;
        } 
    } else if (this.internalState == 5) {      
        if (this.index+1 < g_slides4_images.length) {
            if (this._animator.Update(elapsed)) {
                ++this.index;
            }
        } else {
            if (this.loopCount+1 >= this.loopTime) {
                g_Engine.SetState(GAME_STATE);
            } else {
                this.index = 0;
                this.loopCount++;
            }
        }

    }
}

StoryState_4.prototype.Draw = function (/**Graphics*/gfx) {
    if (this.internalState < 5) {
        this.BaseDraw(gfx);
    } else {
        var image = this.images[this.index];
        gfx.DrawImageFullA(image._image,
           (DEFAULT_WINDOW_WIDTH / 2) - (image._image.width / 2),
            (DEFAULT_WINDOW_HEIGHT / 2) - (image._image.height / 2),
            1.0);
    }
}

StoryState_4.prototype.Unload = function () {
    this.CleanupUIManager();

    if (this.bg_music) {
        this.bg_music.pause();
        this.bg_music.currentTime = 0;
    }
}

StoryState_4.prototype.EventHandler = function (e) {

    if (e.type == "keydown") {
        //  var keycode = e.keyCode;
        g_Engine.SetState(GAME_STATE);
    }

    this.EventHandlerBase(e);
}

/**/
function StoryState_5() {
    this._stateID = SLIDE_STORY_STATE_4;
}

StoryState_5.prototype = new StoryState_4;


StoryState_5.prototype.Load = function () {
    this.images = new Array();
    this.internalState = 0;

    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = false;
    this.loopTime = 1;

    this._animator = new Animator();
    this._animator.Set(2);
    this.loopCount = 0;

    this.text = "a determination to collect spirits ...";

    for (var i = 0; i < g_slides5_images.length; i++) {
        var image = new ImageObject();
        image.Load(g_slides5_images[i]);
        this.images.push(image);
    }

    this.bg_music = GetAudioResource("234106__setuniman__piano-loop-1e71");
    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
}

/**/
function StoryState_6() {
    this._stateID = SLIDE_STORY_STATE_5;
}

StoryState_6.prototype = new StoryState_4;


StoryState_6.prototype.Load = function () {
    this.images = new Array();
    this.internalState = 5;

    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = true;
    this.loopTime = 2;

    this._animator = new Animator();
    this._animator.Set(5);
    this.loopCount = 0;

    for (var i = 0; i < g_slide6_images.length; i++) {
        var image = new ImageObject();
        image.Load(g_slide6_images[i]);
        this.images.push(image);
    }

    this.bg_music = GetAudioResource("234106__setuniman__piano-loop-1e71");
    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
}

StoryState_6.prototype.Update = function (/**Number*/ elapsed) {
    this.BaseUpdate(elapsed);

    if (this.internalState == 2 && this.alpha == 0) {
        if (!this.isImage) {
            this.isImage = true;
            this.internalState = 5;
        }
    } else if (this.internalState == 5) {
        if (this.index + 1 < g_slide6_images.length) {
            if (this._animator.Update(elapsed)) {
                ++this.index;
            }
        } else {
            if (this.loopCount + 1 >= this.loopTime) {
                g_Engine.SetState(GAME_STATE);
            } else {
                this.index = 0;
                this.loopCount++;
            }
        }

    }
}

/**/
/**/
function EndStory() {
    this._stateID = FINAL_STORY_STATE;
}

EndStory.prototype = new StoryState_1;


EndStory.prototype.Load = function () {
    this.internalState = 0;

    this.alpha = 0;
    this.lastTime = 0;
    this.index = 0;
    this.isImage = false;
    this.storyDisplayed = false;

    this.targetY = 0;
    this.dir = 0;

    this.text = "Everything she did...";
    this.bgImage = new ImageObject();
    this.bgImage.Load("images/slides/slide13/bg.png");

    this.pandaImage = new ImageObject();
    this.pandaImage.Load("images/slides/slide13/panda.png");
    this.origY = ((DEFAULT_WINDOW_HEIGHT / 2) - (this.pandaImage._image.height / 2) - 130)
    this.pandaY = this.origY;

    this.fgImage = new AnimatedObject();
    this.fgImage.Load("images/slides/slide13/bubbles.png");
    this.fgImage.Set(14, 8.0, true);
    this.fgImage._frameWidth = 380;
    this.fgImage._fnCallback = (function () {
        //...
    });

    this.bg_music = GetAudioResource("234106__setuniman__piano-loop-1e71");
    if (this.bg_music) {
        // this.bg_music.loop = true;
        this.bg_music.play();
    }
}


EndStory.prototype.Update = function (/**Number*/ elapsed) {
    this.BaseUpdate(elapsed);

    if (this.internalState == 2 && this.alpha == 0 ) {
        if (!this.storyDisplayed) {
            this.internalState = 3;
            this.lastTime = new Date().getTime();
            this.storyDisplayed = true;

            var random = Math.floor(Math.random() * 5);
            this.targetY = this.origY;
            this.targetY += random;
            this.dir  = 0;
        } else {
            var textArray = [
                "Thank you for playing!",
                "(C) 2014 Kayoobi Games"];

            if (this.index < textArray.length) {
                this.text = textArray[this.index++];;
                this.internalState = 0;
            } else {
                g_Engine.SetState(MAP_STATE);
            }
        }
    } else if (this.internalState == 3) {

        var currTime = new Date().getTime();
        var elapsed_x = (currTime - this.lastTime) / 1000.0;

        if (elapsed_x >= 10) {
            this.internalState = 0;
            this.text = "Is for a friend...";
        } else {
            this.fgImage.Update(elapsed);

            if (this.dir == 0) {
                if (this.pandaY < this.targetY) {
                    this.pandaY += 8 * elapsed;
                } else {
                    this.pandaY = this.targetY;
                    this.dir = 1;
                    var random = Math.floor(Math.random() * 10);
                    this.targetY = this.origY;
                    this.targetY -= random;
                }
            } else {
                if (this.pandaY > this.targetY) {
                    this.pandaY -= 8 * elapsed;
                } else {
                    this.pandaY = this.targetY;
                    this.dir = 0;
                    var random = Math.floor(Math.random() * 10);
                    this.targetY = this.origY;
                    this.targetY += random;
                }
            }
            
        }
    } 
}

EndStory.prototype.Draw = function (/**Graphics*/gfx) {
    if (this.internalState < 3) {
        this.BaseDraw(gfx);
    } else if (this.internalState == 3) {
        
        this.bgImage.Draw(gfx,
            (DEFAULT_WINDOW_WIDTH / 2) - (this.bgImage._image.width / 2),
            (DEFAULT_WINDOW_HEIGHT / 2) - (this.bgImage._image.height / 2));
       
        this.fgImage._X = (DEFAULT_WINDOW_WIDTH / 2) - (380 / 2)-10;
        this.fgImage._Y = 75;
        this.fgImage.Draw(gfx);
     
        this.pandaImage.Draw(gfx,
           (DEFAULT_WINDOW_WIDTH / 2) - (this.pandaImage._image.width / 2),
           this.pandaY);

    }
}

EndStory.prototype.Unload = function () {
    this.CleanupUIManager();

    if (this.bg_music) {
        this.bg_music.pause();
        this.bg_music.currentTime = 0;
    }
}

EndStory.prototype.EventHandler = function (e) {

    if (e.type == "keydown") {
        //  var keycode = e.keyCode;
       // g_Engine.SetState(MAP_STATE);
    }

    this.EventHandlerBase(e);
}
