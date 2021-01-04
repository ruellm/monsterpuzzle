/**
 *   dailySpinWindow.js
 *   Daily Bunos screeen
 *   Author: Ruell Magpayo <ruellm@yahoo.com>
 *   Created: July 28, 2014
*/


var DAILYSPIN_STATE_NORMAL = 0;
var DAILYSPIN_STATE_ROTATE = 1;
var DAILYSPIN_STATE_REWARD = 2;

function DailySpinWindow()
{
    //...
}

DailySpinWindow.prototype = new WindowBig;

DailySpinWindow.prototype.LoadInternal = function () {
    var context = this;
    this.LoadInternalBase();

    this.outer = new ImageObject();
    this.outer.Load("images/daily_spinner/outer.png");

    this.logo = new ImageObject();
    this.logo.Load("images/daily_spinner/logo.png");

    this.inner = new ImageObject();
    this.inner.Load("images/daily_spinner/inner with nails.png");

    this.pointer = new ImageObject();
    this.pointer.Load("images/daily_spinner/pointer.png");
    
    this.header = new ImageObject();
    this.header.Load("images/daily_spinner/Daily Spin.png");

    this.spintTxt = new ImageObject();
    this.spintTxt.Load("images/daily_spinner/SPIN.png");

    var spin = new Button;
    spin.LoadImages(
       "images/generics/button blank M.png",
           "images/generics/button blank M hover.png",
           "images/generics/button blank M.png");

    spin._width = 133;
    spin._height = 58;
    spin._X = (645 + (this.header._image.width / 2)) - (spin._width / 2);
    spin._Y = 380;
    spin._fnMouseDownEvnt = (function () {
        if (context.spined) return;

        context.internalState = DAILYSPIN_STATE_ROTATE;
        context.target_Angle = Math.floor(Math.random() * 1000) + 500;
        context.spined = true;
    });

    this._uimanager.Add(spin);

    // Reset the Angle
    this.angle = 0;
    this.target_Angle = 0;
    this.internalState = DAILYSPIN_STATE_NORMAL;
    this.spined = false;

    this.rewardSfx = GetAudioResource("alertwin");

    this.rewardWnd = new RewardWindow();
    this.rewardWnd.Load();
    this.rewardWnd.fnOnClose = function () {
        context.substate = ANIMWINDOW_STATE_GOOUT;
    };
}

DailySpinWindow.prototype.HandleAward = function (value)
{
    var reward_array = [
        {
            id: ITEM_HEART_LIFE,
            from: 0,
            to: 36
        },
        {
            id: ITEM_GOLD_SINGLE,
            from: 37,
            to: 71
        },
        {
            id: ITEM_HORIZONTAL_BOOSTER,
            from: 72,
            to: 108
        },
        {
            id: ITEM_VERTICAL_BOOSTER,
            from: 109,
            to: 143
        },
        {
            id: ITEM_BOMB_BOOSTER,
            from: 144,
            to: 180
        },
        {
             id: ITEM_BUBBLE_PAINT_A,
             from: 181,
             to: 215
        },
        {
             id: ITEM_BUBBLE_PAINT_B,
             from: 216,
             to: 252
        },
        {
             id: ITEM_BUBBLE_PAINT_C,
             from: 253,
             to: 287
         },
         {
             id: ITEM_BUBBLE_PAINT_D,
             from: 288,
             to: 324
         },
         {
             id: ITEM_RAINBOW_BOOSTER,
             from: 325,
             to: 360
         }
    ];

    var id = -1;
    for (var i = 0; i < reward_array.length; i++) {
        if (value >= reward_array[i].from && value <= reward_array[i].to) {
            id = reward_array[i].id;
            break;
        }
    }

    if (id == -1) return;

    if (id == ITEM_GOLD_SINGLE) {
        g_gameData.gold += 10;
        Ajax_UpdateGold();
    } else if (id == ITEM_HEART_LIFE) {
        g_gameData.UpdateLife(5);
    } else {
        UpdateBooster(id, 1);
    }

    this.internalState = DAILYSPIN_STATE_REWARD;
    this.rewardWnd.Show();
    this.rewardWnd.SetType(id);

    if (this.rewardSfx) {
        this.rewardSfx.play();
    }
}

DailySpinWindow.prototype.UpdateInternal = function (elapsed) {
    if (this.internalState == DAILYSPIN_STATE_ROTATE) {

        if (this.angle < this.target_Angle - 0.5) {
            var diff = this.target_Angle - this.angle;
            
            if (diff <= 250) {
                this.angle += (diff * 0.5 * elapsed);
            } else {
                this.angle += (150 * elapsed);
            }
        } else {
            this.internalState = DAILYSPIN_STATE_NORMAL;
            this.angle = this.target_Angle;
            var value = this.angle % 360;

            DEBUG_LOG("Daily Spin award is " + value);

            this.HandleAward(value);
        }

    } else if (this.internalState == DAILYSPIN_STATE_REWARD) {
        this.rewardWnd.Update(elapsed);
    }
}

DailySpinWindow.prototype.DrawWheelSpin = function (gfx, x, y)
{
    var angleRadians = this.angle;// * Math.PI / 180.0;
                    // we will not use angle radians

    gfx.DrawRotateFull(x, y,
       this.inner._image.width / 2,
       this.inner._image.height / 2,
        angleRadians,                            // This is the Angle
        this.inner._image,
        1.0);

    this.pointer.Draw(gfx,
     x + (this.outer._image.width / 2) -
         (this.pointer._image.width / 2),
     40);
}

DailySpinWindow.prototype.DrawInternal = function (gfx) {
    
    var y = 60;
    var x = 180;

    this.outer.Draw(gfx, x, y);

    ////////////////////////////////////////////////
    //Draw the Spinner!
    this.DrawWheelSpin(gfx, x, y);
    ////////////////////////////////////////////////

    this.logo.Draw(gfx,
        x+ (this.outer._image.width / 2) -
            (this.logo._image.width / 2),
        y + (this.outer._image.height / 2) -
            (this.logo._image.height / 2));

    this.header.Draw(gfx, 630, 60);

    var textArray = ["The Daily Bonus Wheel is finally",
            "here!",
            "",
            "You can spin the wheel for free",
            "once every day for a chance to win boosters,",
            "free gold or lives!",
            "",
            "Good Luck Spinning!"
    ];

    var yi = 170;
    for (var i = 0; i < textArray.length; i++) {
        var ctx = gfx._canvasBufferContext;
        var style = "13pt ERASDEMI";
        ctx.font = style;
        text = textArray[i];
        var textWidth = ctx.measureText(text);
        var xi = (645 + (this.header._image.width/2)) - (textWidth.width / 2);
			
        gfx.DrawText(text,
			xi, yi, "rgb(0,0,0)", style);
		
            yi += 23;
    }

    this.spintTxt.Draw(gfx,
        (645 + (this.header._image.width / 2)) - (this.spintTxt._image.width / 2),
        393);

}

DailySpinWindow.prototype.DrawChildWindow = function (gfx)
{
    if (this.internalState == DAILYSPIN_STATE_REWARD) {
        // gfx._canvasBufferContext = g_Engine._graphics._canvasBufferContext;  // Hack!
        this.rewardWnd.Draw(gfx);
    }
}

DailySpinWindow.prototype.EventHandlerInternal = function (e) {

    /////////////////////////////////////////////////////////////
    // TEMPORARY FOR TESTING
    /*
    if (e.type == "keydown") {
        var keycode = e.keyCode;
        var FRICTION = 1;
        if (keycode == RIGHT_KEY) {
            this.angle += (FRICTION);
        } else if (keycode == LEFT_KEY) {
            this.angle += (-FRICTION);
        }
        this.angle = (this.angle > 360) ? 0 : this.angle;
        this.angle = (this.angle <0) ? 360 : this.angle;
        console.log(this.angle);
    }*/
    ///////////////////////////////////////////////////////////

    if (this.internalState == DAILYSPIN_STATE_REWARD) {
        this.rewardWnd.EventHandler(e);
        return;
    }

    this.EventHandlerBase(e);
}
