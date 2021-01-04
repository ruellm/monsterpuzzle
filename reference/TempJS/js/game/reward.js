/**
 *   reward.js
 *   classes for reward 
 *   Author: Ruell Magpayo <ruellm@yahoo.com>
 *   Created: July 9, 2014
*/

var REWARD_TYPE_RANDOM = 123; /*magic number*/

function RewardWindow()
{
    this.type = 0;
}

RewardWindow.prototype = new WindowSmall;

RewardWindow.prototype.LoadInternal = function () {
    this.LoadInternalBase();

    //this.splashSprite = new ImageObject();
    //this.splashSprite.Load("images/purchase_window/splash.png");

    this.splashSprite = new SplashSprite();
    this.splashSprite._X = (this.bg._image.width / 2) - (this.splashSprite.bg._image.width / 2);
    this.splashSprite._Y = 100;
    this.splashSprite.Load();

    this.contentImage = new ImageObject();

    var context = this;
    this.buyBtn = new Button;
    this.buyBtn.LoadImages(
	    "images/generics/button blank XL.png",
        "images/generics/button blank XL hover.png",
	    "images/generics/button blank XL.png");

    this.buyBtn._width = 281;
    this.buyBtn._height = 42;
    this.buyBtn._X = (this.bg._image.width / 2) - (this.buyBtn._width / 2);
    this.buyBtn._Y = 430;
    this.buyBtn._fnMouseDownEvnt = (function () {
       
		//FBAccess_PostToFeed("I just earned a " + g_purchaseSingleText[context.type] + " in Spirit Bubble!",
		//	g_purchaseSingle[context.type]);
        if (g_mainUser.id == -1) return;

		FBAccess_ShareReward(
			g_purchaseSingleText[context.type],
			g_inAppDescription[context.type],
			g_rewardSprite[context.type]);			
	   
    });

    this._uimanager.Add(this.buyBtn);

    this.shareSprite = new ImageObject();
    this.shareSprite.Load("images/level_info_complete/share.png");
}

RewardWindow.prototype.SetType = function (type) {
    this.type = type;
    this.contentImage.Load(g_purchaseSingle[this.type]);
   
    if (g_mainUser.id == -1) return;

   FBAccess_RewardToFeed(
			g_purchaseSingleText[this.type],
			g_inAppDescription[this.type],
			g_rewardSprite[this.type]);
		
}
RewardWindow.prototype.UpdateInternal = function (elapsed) {
    this.splashSprite.Update(elapsed);
}

RewardWindow.prototype.DrawInternal = function (gfx) {

    //this.splashSprite.Draw(gfx,
    //   (this.bg._image.width / 2) - (this.splashSprite._image.width / 2),
     //  100);

    this.splashSprite.Draw(gfx);

    this.contentImage.Draw(gfx,
            (this.bg._image.width / 2) - (this.contentImage._image.width / 2),
            (this.bg._image.height / 2) - (this.contentImage._image.height / 2));

    var ctx = gfx._canvasBufferContext;
    var style = "20pt ERASDEMI";
    ctx.font = style;

    var y = 108;

    var textArr = ["Congratulations!", "You earned ", g_purchaseSingleText[this.type]];
    for (var i = 0; i < 3; i++) {
        var text = textArr[i];

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
        gfx.DrawText(text,
         x, y, "rgb(41,14,3)", style);
        y += 32;
    }

    this.shareSprite.Draw(gfx,
        (this.bg._image.width / 2) - (this.shareSprite._image.width / 2),
        this.buyBtn._Y + 5);

    text = g_inAppDescription[this.type];

    var count = 1;
    if (text.length > 45) {
        count = text.length / 45;
    }

    var y = 380;
    var currIdx = 0;
    for (i = 0; i < count; i++) {

        var ctx = gfx._canvasBufferContext;
        var style = "10pt ERASDEMI";
        ctx.font = style;
        var ctext = text.substring(currIdx, currIdx + 45);

        var textWidth = ctx.measureText(ctext);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);

        gfx.DrawText(ctext,
            x, y,
            "rgb(41,14,3)", style);

        y += 15;
        currIdx += 45;
    }
}

RewardWindow.prototype.EventHandlerInternal = function (e) {
    this.EventHandlerBase(e, this.uimanagerLocal);
    
}

/**/

var REWARD_TYPE_SCORE= 0;
var REWARD_TYPE_LEVEL = 1;
var REWARD_TYPE_DIVISIBLE_SCORE = 2;
var REWARD_TYPE_COINS = 3;

var REWARD_COINS = 20;

var g_rewardData = [

	////////////////////////////////////////////
	// Score type reward
   /*
   {
        id: 2,
        type: REWARD_TYPE_SCORE,
        value: 5000,
        award: REWARD_TYPE_RANDOM
    },

     {
         id: 4,
         type: REWARD_TYPE_SCORE,
         value: 10000,
         award: REWARD_TYPE_RANDOM
     },
	*/
	 ////////////////////////////////////////////
	// Score type reward
    {
        id: 8,
        type: REWARD_TYPE_LEVEL,
        value: 9,
        award: REWARD_TYPE_RANDOM
    },

     {
         id: 16,
         type: REWARD_TYPE_LEVEL,
         value: 21,
         award: REWARD_TYPE_RANDOM
     },

    {
        id: 32,
        type: REWARD_TYPE_SCORE,
        value: 15000,
        award: REWARD_TYPE_RANDOM
    },
	
	///////////////////////////////////////////
	// THE MAP Markers
	// This is based on MAX_SCORE value of 500k
	{
        id: 64,
        type: REWARD_TYPE_SCORE,
        value: 92964,
        award: ITEM_GOLD_SINGLE
    },
	
	{
        id: 128,
        type: REWARD_TYPE_SCORE,
        value: 173366,
        award: ITEM_GOLD_SINGLE
    },
	
	{
        id: 256,
        type: REWARD_TYPE_SCORE,
        value: 320351,
        award: ITEM_GOLD_SINGLE
    },
	
	{
        id: 512,
        type: REWARD_TYPE_SCORE,
        value: 445979,
        award: ITEM_GOLD_SINGLE
    },
	
	///////////////////////////////////////////
	// Coin type reward
	{
        id: 1024,
        type: REWARD_TYPE_COINS,
        value: 100,
        award: ITEM_HEART_LIFE
    },
	
	{
        id: 2048,
        type: REWARD_TYPE_COINS,
        value: 200,
        award: ITEM_HEART_LIFE
    }
	
	///////////////////////////////////////////
];

function RandomizeReward()
{
	var reward_array = [
                ITEM_RAINBOW_BOOSTER,
                ITEM_BOMB_BOOSTER,
                ITEM_BUBBLE_PAINT_A,
                ITEM_BUBBLE_PAINT_B,
                ITEM_BUBBLE_PAINT_C,
                ITEM_BUBBLE_PAINT_D,
                ITEM_HORIZONTAL_BOOSTER,
                ITEM_VERTICAL_BOOSTER
            ];

            var index = Math.floor(Math.random() * reward_array.length);
            reward = reward_array[index];
			
	return reward;
}

function CheckReward()
{
    var ret = false;
    
    for (var i = 0; i < g_rewardData.length; i++) {
        
        if(g_gameData.reward_flag_bit & g_rewardData[i].id) 
            continue;

        if (g_rewardData[i].type == REWARD_TYPE_SCORE) {
            if (g_gameData.totalScore > g_rewardData[i].value) {
                ret = true;
                break;
            }

        } else if (g_rewardData[i].type == REWARD_TYPE_LEVEL) {
            if (g_gameData.top_level > g_rewardData[i].value) {
                ret = true;
                break;
            }
        } else if (g_rewardData[i].type == REWARD_TYPE_COINS) {
            if (g_gameData.coins > g_rewardData[i].value) {
                ret = true;
                break;
            }
        } 		
    }

    if (ret) {
        var reward = g_rewardData[i].award;
        if (g_rewardData[i].award == REWARD_TYPE_RANDOM) {
            reward = RandomizeReward();
        }

        if (reward == ITEM_GOLD_SINGLE) {
            g_gameData.gold += 10; 
            Ajax_UpdateGold();
        } else if(reward == ITEM_HEART_LIFE){
			g_gameData.UpdateLife(5);			
		} else {
            UpdateBooster(reward, 1);
        }

        // update flagbit
        g_gameData.reward_flag_bit |= g_rewardData[i].id;
        Ajax_UpdateRewardFlag();

        return reward;
    }

    return null;
}