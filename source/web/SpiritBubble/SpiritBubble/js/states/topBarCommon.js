/**
  *  topBarCommon.js
  *  Common screen with top bar menus
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: May 31, 2014
*/

var TOPBAR_MULT_PURCHASE_STATE = 0x13c;
var TOBAR_SNGL_PURCHASE_STATE = 0x13d;
var TOPBAR_GAMESCRN_QUITSCREEN = 0x13e;

function TopBarCommon() {
    this.topBarUI = null;
    this.woodPlank = null;
    this.woodPlank2 = null;

    this.handleImgs = null;

    this.dollarCoin = null;
    this.goldBar = null;
    this.heart = null;

    this.uiManagerLocal = null;

    this.top_bar_score = 0;
    this.top_bar_gold = 0;
    this.substate = 0;
    this.purchaseScreenMultiple = null;
    this.purchaseScreenSingle = null;
    this.quitScreen = null;
    this.rightBarSprite = null;
    this.offSprite = null;
    
}

// set base class to State
TopBarCommon.prototype = new State;

TopBarCommon.prototype.Load = function () {
    //...
}

TopBarCommon.prototype.LoadMenuBar = function () {

    this.uiManagerLocal = new UIManager();

    this.topBarUI = new ImageObject();
    this.topBarUI.Load("images/game_screen/topbar/top bar.png");

    this.woodPlank = new ImageObject();
    this.woodPlank.Load("images/game_screen/topbar/wood plank.png");

    this.woodPlank2 = new ImageObject();
    this.woodPlank2.Load("images/game_screen/topbar/wood plank2.png");

    this.handleImgs = new Array();

    var dollarCoin = new ImageObject();
    dollarCoin.Load("images/game_screen/topbar/Dollar coin.png");

    var goldBar = new ImageObject();
    goldBar.Load("images/game_screen/topbar/gold bar icon.png");

    var heart = new ImageObject();
    heart.Load("images/game_screen/topbar/heart.png");

    this.handleImgs.push(heart);
    this.handleImgs.push(goldBar);
    this.handleImgs.push(dollarCoin);

    this.sideBar = new ImageObject();
    this.sideBar.Load("images/game_screen/sidebar/side bar.png");

    this.boosterPanel = new ImageObject();
    this.boosterPanel.Load("images/game_screen/sidebar/boosters game screen.png");

    this.offSprite = new ImageObject();
    this.offSprite.Load("images/game_screen/right_bar/off.png");

    // "+" Setup Buttons
    this._uimanager = new UIManager();
    var context = this;

    var addLife = new Button;
    addLife.LoadImages(
		"images/game_screen/topbar/Plus sign no click.png",
        "images/game_screen/topbar/Plus sign mouse hover.png",
	    "images/game_screen/topbar/Plus sign no click.png");

    addLife._width = 38;
    addLife._height = 31;
    addLife._X = 160;
    addLife._Y = 13;
    addLife._fnMouseDownEvnt = (function () {
        context.substate = TOBAR_SNGL_PURCHASE_STATE;
        //TODO: setup purchase types and other parameters
        context.purchaseScreenSingle.SetType(ITEM_HEART_LIFE);
		
        context.purchaseScreenSingle.Show();
    });


    var addgold = new Button;
    addgold.LoadImages(
		"images/game_screen/topbar/Plus sign no click.png",
        "images/game_screen/topbar/Plus sign mouse hover.png",
	    "images/game_screen/topbar/Plus sign no click.png");

    addgold._width = 38;
    addgold._height = 31;
    addgold._X = addLife._X + 50 + this.woodPlank._image.width;
    addgold._Y = 13;
    addgold._fnMouseDownEvnt = (function () {
	
		g_fbTransact= null;
        context.substate = TOPBAR_MULT_PURCHASE_STATE;
        context.purchaseScreenMultiple.SetType(PURCHASE_MULTIPLE_TYPE_GOLD);
        context.purchaseScreenMultiple.Show();

    });

    var addcoin = new Button;
    addcoin.LoadImages(
		"images/game_screen/topbar/Plus sign no click.png",
        "images/game_screen/topbar/Plus sign mouse hover.png",
	    "images/game_screen/topbar/Plus sign no click.png");

    addcoin._width = 38;
    addcoin._height = 31;
    addcoin._X = addgold._X + 50 + this.woodPlank._image.width;
    addcoin._Y = 13;
    addcoin._fnMouseDownEvnt = (function () {
        context.substate = TOPBAR_MULT_PURCHASE_STATE;
        context.purchaseScreenMultiple.SetType(PURCHASE_MULTIPLE_TYPE_COINS);
        context.purchaseScreenMultiple.Show();
    });

    this.uiManagerLocal.Add(addLife);
    this.uiManagerLocal.Add(addgold);
    this.uiManagerLocal.Add(addcoin);

    // Create purchase window object
    this.purchaseScreenMultiple = new PurchaseWindowMultiple();
    this.purchaseScreenMultiple.Load();

    this.purchaseScreenSingle = new PurchaseWindowSingle();
    this.purchaseScreenSingle.Load();

    this.quitScreen = new QuitWindow();
    this.quitScreen.Load();

    this.purchaseScreenMultiple.fnOnClose = function () {
        context.substate = 0;
    };

    this.purchaseScreenSingle.fnOnClose = function () {
        context.substate = 0;
    };

    this.quitScreen.fnOnClose = function () {
        context.substate = 0;
    };

    // load right bar
    this.rightBarSprite = new ImageObject();
    this.rightBarSprite.Load("images/game_screen/right_bar/right bar.png");

    var home = new Button;
    home.LoadImages(
    "images/game_screen/right_bar/home.png",
    "images/game_screen/right_bar/home HOVER.png",
    "images/game_screen/right_bar/home.png");

    home._width = 32;
    home._height = 32;
    home._X = DEFAULT_WINDOW_WIDTH - (home._width + 2);
    home._Y = 60;
    home._fnMouseDownEvnt = (function () {
        if (context._stateID == GAME_STATE) {
            context.substate = TOPBAR_GAMESCRN_QUITSCREEN;
            context.quitScreen.Show();            
        }
    });

    var music = new Button;
    music.LoadImages(
        "images/game_screen/right_bar/music.png",
        "images/game_screen/right_bar/music HOVER.png",
        "images/game_screen/right_bar/music.png");

    music._width = 32;
    music._height = 32;
    music._X = DEFAULT_WINDOW_WIDTH - (music._width + 2);
    music._Y = home._Y + home._height + 8;
    music._fnMouseDownEvnt = (function () {
        UpdateAudio(!VOLUME_BGMUSIC_FLAG, false);
    });
    
    var sound = new Button;
    sound.LoadImages(
        "images/game_screen/right_bar/sound.png",
        "images/game_screen/right_bar/sound HOVER.png",
        "images/game_screen/right_bar/sound.png");

    sound._width = 32;
    sound._height = 32;
    sound._X = DEFAULT_WINDOW_WIDTH - (sound._width + 2);
    sound._Y = music._Y + music._height + 12;
    sound._fnMouseDownEvnt = (function () {
        //UpdateAudio(!VOLUME_FLAG);
        UpdateAudio(!VOLUME_SFX_FLAG, true);
    });

    var about = new Button;
    about.LoadImages(
          "images/game_screen/right_bar/about.png",
        "images/game_screen/right_bar/about HOVER.png",
         "images/game_screen/right_bar/about.png");

    about._width = 32;
    about._height = 32;
    about._X = DEFAULT_WINDOW_WIDTH - (about._width + 2);
    about._Y = sound._Y + sound._height + 12;
    about._fnMouseDownEvnt = (function () {
       // if (context._stateID == GAME_STATE) {
            context.OnAbout();
        //}
    }); 

    this.uiManagerLocal.Add(home);
    this.uiManagerLocal.Add(music);
    this.uiManagerLocal.Add(sound);
    this.uiManagerLocal.Add(about);
}

TopBarCommon.prototype.OnAbout = function ()
{
    //...
}

TopBarCommon.prototype.Update = function (elapsed) {
    //...
}

TopBarCommon.prototype.Draw = function (gfx) {
    //...
}

TopBarCommon.prototype.DrawMenuBar = function (gfx) {
    this.topBarUI.Draw(gfx, 0, 0);

    var distance = 50;
    for (var i = 0; i < 4; i++) {
        var x = 12 + ((distance + this.woodPlank._image.width) * i);
        if( i == 3 )
            this.woodPlank2.Draw(gfx, x, 3);
        else
            this.woodPlank.Draw(gfx, x, 3);

        if (i < 3) {
            this.handleImgs[i].Draw(gfx, x - 10, 3);
        }
    }

    this.rightBarSprite.Draw(gfx,
       DEFAULT_WINDOW_WIDTH - this.rightBarSprite._image.width,
       this.topBarUI._image.height);

    this.uiManagerLocal.Draw(gfx);


    ///////////////////////////////////////////////////
    // Life computation
    var text = g_gameData.life;
    if (g_gameData.life == 0) {
        var currentTime = new Date().getTime();
        var diff = (g_targetTimer - currentTime) / 1000.0;

        if (diff <= 0) {
            g_gameData.UpdateLife(DEFAULT_LIFE);
			g_targetTimer = 0;
			Ajax_doRequest(REQ_SET_EPOCH, 0);
        } 

        text = FormatTimeStr(diff);
    }

    //////////////////////////////////////////////////
    
    var ctx = gfx._canvasBufferContext;
    var style = "Bold 15pt ERASDEMI";
    ctx.font = style;
    

    var textWidth = ctx.measureText(text);
    var cx = 0;
    var x = 112 - textWidth.width / 2;
  
    gfx.DrawText(text,
        x, 35, "rgb(253,235,185)", style);

    text = g_gameData.gold;
    textWidth = ctx.measureText(text);
    x = 371 - textWidth.width / 2;
    gfx.DrawText(text,
       x, 35, "rgb(253,235,185)", style);

    text = this.top_bar_gold;//g_gameData.coins;
    textWidth = ctx.measureText(text);
    x = 625 - textWidth.width / 2;
    gfx.DrawText(text,
       x, 35, "rgb(253,235,185)", style);

    style = "Bold 15pt ERASDEMI";
    gfx.DrawText("Score:",
       828, 35, "rgb(253,235,185)", style);

    text = this.top_bar_score;
    textWidth = ctx.measureText(text);
    x = 900 /*- textWidth.width / 2*/;
    gfx.DrawText(text,
       x, 35, "rgb(255,255,255)", style);

    if (VOLUME_BGMUSIC_FLAG == false) {
        this.offSprite.Draw(gfx, DEFAULT_WINDOW_WIDTH - 34, 100);
    }

    if (VOLUME_SFX_FLAG == false) {
        this.offSprite.Draw(gfx, DEFAULT_WINDOW_WIDTH - 34, 144);
    }
}


///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
TopBarCommon.prototype.Unload = function () {
    this.CleanupUIManager();
}

TopBarCommon.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e, this.uiManagerLocal);
}

