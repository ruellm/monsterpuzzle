/**
    mapState.js
    The Map Screen
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 31, 2014
*/

var MAP_SUBSTATE_MAP = 0;
var MAP_SUBSTATE_LEVELINFO = 1;
var MAP_SUBSTATE_PANNING = 2;
var MAP_SUBSTATE_GIVELIFE = 3;
var MAP_SUBSTATE_REWARD = 4;
var MAP_SUBSTATE_GUIDE = 5;
var MAP_SUBSTATE_DAILYSPIN = 6;

var MOUSE_BORDER = 40;
var MOUSE_SCROLL_SENSITIVITY = 10;
var mouse_down = false;
var mouse_cache_x = 0;
var mouse_cache_y = 0;

var movement_topx = 0;
var movement_topy = 0;
var default_topLook = [[30, 974], [695, 410]];
var target_topX = 0;
var target_topY = 0;

function MapState() {
    // State ID 
    this._stateID = MAP_STATE;

    this.map = null;
    this.levelInfoScrn = null;
    this.progressBarBase = null;
    this.progressBarMarker = null;
    this.progressBar = null;
    this.giveLifeWnd = null;
}

// set base class to State
MapState.prototype = new TopBarCommon;

MapState.prototype.Load = function () {
    var context = this;
   
   // this._uimanager = new UIManager();
    this.LoadMenuBar();

    this.levelInfoScrn = new LevelInfoScreen;
    this.levelInfoScrn.Load();
    this.levelInfoScrn.fnOut = (function (levelID) {
        context.substate = MAP_SUBSTATE_MAP;
        mouse_down = false;
    });

    this.map = new WorldMap_1();
    this.map.Load(this._uimanager);

    //this.map.LookAtLevel(0);
    this.map.setTopLook(5, 974);
    this.map.fnLevelClick = (function (levelID) {
        context.substate = MAP_SUBSTATE_LEVELINFO;
        context.levelInfoScrn.Show(levelID);
    });

    //-------------------------------------------
    this.map.SetUserCurrentLevel(g_gameData.top_level);
    //-------------------------------------------
    this.rewardSfx = GetAudioResource("alertwin");
    this.bg_music = GetAudioResource("map01");
    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }

    var yb = (DEFAULT_WINDOW_HEIGHT/2) - (77/2);
    var left = new Button;
    left.LoadImages(
		"images/map/1/arrow left.png",
        "images/map/1/arrow left HOVER.png",
	    "images/map/1/arrow left.png");

    left._width = 64;
    left._height = 77;
    left._X = 5;
    left._Y = yb;
    left._fnMouseDownEvnt = (function () {
        context.PrePan(0);
    });

    var right = new Button;
    right.LoadImages(
		"images/map/1/arrow right.png",
        "images/map/1/arrow right HOVER.png",
	    "images/map/1/arrow right.png");

    right._width = 64;
    right._height = 77;
    right._X = DEFAULT_WINDOW_WIDTH - ( right._width+40);
    right._Y = yb;
    right._fnMouseDownEvnt = (function () {
        context.PrePan(1);
    });
    
    this._uimanager.Add(right);
    this._uimanager.Add(left);
    
    this.progressBarBase = new ImageObject();
    this.progressBarBase.Load("images/map/1/progress bar map base.png");

    this.progressBarMarker = new ImageObject();
    this.progressBarMarker.Load("images/map/1/progress bar map marker.png");

    this.progressBar = new ImageObject();
    this.progressBar.Load("images/map/1/progress bar map.png");

    this.rewardWnd = new RewardWindow();
    this.rewardWnd.Load();
    this.rewardWnd.fnOnClose = function () {
        context.substate = 0;
    };

    this.giveLifeWnd = new GiveLifeWindow();
    this.giveLifeWnd.Load();
    this.giveLifeWnd.fnOnClose = function () {
        context.substate = 0;
    };

    if (g_beggarsList.length>0) {
        this.substate = MAP_SUBSTATE_GIVELIFE;
        this.giveLifeWnd.Show();
    } else {
        this.substate = MAP_SUBSTATE_MAP;
    }

    //////////////////////////////////////////////////////////
    var reward = CheckReward();
    if (reward != null) {
        this.substate = MAP_SUBSTATE_REWARD;
        this.rewardWnd.Show();
        this.rewardWnd.SetType(reward);
        if (this.rewardSfx) {
            this.rewardSfx.play();
        }

    }

    if (g_gameData.top_level <= 49) {
        this.map.topX = default_topLook[0][0];
        this.map.topY = default_topLook[0][1];
    } else {
        this.map.topX = default_topLook[1][0];
        this.map.topY = default_topLook[1][1];
    }

    this.guideWnd = new GuideWindow();
    this.guideWnd.Load();
    this.guideWnd.fnOnClose = function () {
        context.substate = 0;
    };

    this.dailySpinWindow = new DailySpinWindow();
    this.dailySpinWindow.Load();
    this.dailySpinWindow.fnOnClose = function () {
        context.substate = 0;
    };

    if (g_gameData.isFirstLogin) {
        this.substate = MAP_SUBSTATE_DAILYSPIN;
        this.dailySpinWindow.Show();
        g_gameData.isFirstLogin = false;
    }
}

MapState.prototype.OnAbout = function () {
    this.substate = MAP_SUBSTATE_GUIDE;
    this.guideWnd.Show();
}

MapState.prototype.Update = function (elapsed) {
    //...
    this.top_bar_score = g_gameData.totalScore;
    this.top_bar_gold = g_gameData.coins;

    switch (this.substate) {
        case TOBAR_SNGL_PURCHASE_STATE:
            this.purchaseScreenSingle.Update(elapsed);
            break;
        case TOPBAR_MULT_PURCHASE_STATE:
            this.purchaseScreenMultiple.Update(elapsed);
            break;
        case MAP_SUBSTATE_LEVELINFO:
            this.levelInfoScrn.Update(elapsed);
            break;
        case MAP_SUBSTATE_GIVELIFE:
            this.giveLifeWnd.Update(elapsed);
            break;
        case MAP_SUBSTATE_REWARD:
            this.rewardWnd.Update(elapsed);
            break;
        case MAP_SUBSTATE_GUIDE:
            this.guideWnd.Update(elapsed);
            break;
        case MAP_SUBSTATE_DAILYSPIN:
            this.dailySpinWindow.Update(elapsed);
            break;
        case MAP_SUBSTATE_PANNING:

            var PAN_SPEED = 1.8;

            var distX = (target_topX - this.map.topX) ;
            var distY = (target_topY - this.map.topY);
            var tolerant = 2;
            var tolerantY = 2;

            if (Math.abs(distX) > tolerant) {
                var stepx = (distX * elapsed * PAN_SPEED);
                var realx = stepx;
              /*  stepx = Math.abs(stepx);
                if (stepx < 1)
                    stop = 1;
                stepx = Math.ceil(stepx);
                
                if (stepx == 0)
                    stepx = 1 * elapsed;
                if (distX < 0)
                    stepx = -stepx;
                    */
                this.map.topX += stepx;
            } else {

                this.map.topX = target_topX;
            }         

            if (Math.abs(distY) > tolerantY) {
                var stepy = (distY * elapsed * PAN_SPEED);
                var realy = stepy;
             /*   stepy = Math.abs(stepy);
                if (stepy < 1)
                    stop = 1;

                stepy = Math.ceil(stepy);

                if (stepy == 0)
                    stepy = 1 * elapsed;
                if (distY < 0)
                    stepy = -stepy;
                  */  
                this.map.topY += stepy;
                
            } else {
                this.map.topY = target_topY;
            }
         
            /*
            var distX = (target_topX - this.map.topX);
            var distY = (target_topY - this.map.topY);
            var PANSPEED = 250;
            if (distX < 0) {
             
                var tempX = this.map.topX - (PANSPEED * elapsed);
                if (tempX <= target_topX) {
                    this.map.topX = target_topX;
                } else {
                    this.map.topX = tempX;
                }
            } else {
                var tempX = this.map.topX + (PANSPEED * elapsed);
                if (tempX >= target_topX) {
                    this.map.topX = target_topX;
                } else {
                    this.map.topX = tempX;
                }
            }

            if (distY < 0) {

                var tempY = this.map.topY - (PANSPEED * elapsed);
                if (tempY <= target_topY) {
                    this.map.topY = target_topY;
                } else {
                    this.map.topY = tempY;
                }
            } else {
                var tempY = this.map.topY + (PANSPEED * elapsed);
                if (tempY >= target_topY) {
                    this.map.topY = target_topY;
                } else {
                    this.map.topY = tempY;
                }
            }*/


            if (this.map.topX == target_topX &&
                this.map.topY == target_topY) {
                this.substate = MAP_SUBSTATE_MAP;

                this.map.VisibleLevelText(true);
            } else {
                this.map.VisibleLevelText(false);
            }

        case MAP_SUBSTATE_MAP:        
        default:
            this._uimanager.Update(elapsed);
            break;

    }
	
	this.map.Update(elapsed);
}

MapState.prototype.Draw = function (gfx) {

    this.map.Draw(gfx);
   
    this._uimanager.Draw(gfx); 

    if (this.substate == MAP_SUBSTATE_LEVELINFO) {
        this.levelInfoScrn.Draw(gfx);
    } else if (this.substate == TOPBAR_MULT_PURCHASE_STATE) {
        this.purchaseScreenMultiple.Draw(gfx);
    } else if( this.substate == TOBAR_SNGL_PURCHASE_STATE){
        this.purchaseScreenSingle.Draw(gfx);
    
    } else if( this.substate == MAP_SUBSTATE_GIVELIFE){
        this.giveLifeWnd.Draw(gfx);    
    } else if ( this.substate == MAP_SUBSTATE_REWARD) {
        this.rewardWnd.Draw(gfx);
    } else if (this.substate == MAP_SUBSTATE_GUIDE) {
        this.guideWnd.Draw(gfx);
    } else if (this.substate == MAP_SUBSTATE_DAILYSPIN) {
        this.dailySpinWindow.Draw(gfx);
    }

    this.DrawMenuBar(gfx);

    var x = DEFAULT_WINDOW_WIDTH - (this.progressBarBase._image.width + 8);
    var y = DEFAULT_WINDOW_HEIGHT - (this.progressBarBase._image.height + 20) + 18;
    this.progressBarBase.Draw(gfx, x, y);


    // Progress Bar computation
	
    var percentage = g_gameData.totalScore / MAX_SCORE;
    percentage = (percentage > 1) ? 1 : percentage;

    var part = this.progressBar._image.height -
        (percentage * this.progressBar._image.height);   
    var canvasY = (y + part);
    var height = this.progressBar._image.height - part;
    if (percentage > 0) {
        gfx.DrawImage(this.progressBar._image, 0, part,
               this.progressBar._image.width, height,
               x, canvasY,
               this.progressBar._image.width, height,
               1.0);
    }
	
    // the milestone scores are:
	var markerY = [43, 143, 260, 324];
	//DEBUG_LOG("Target Scores are :");
	for (var i = 0; i < markerY.length; i++) {
        this.progressBarMarker.Draw(gfx, x - 2, y + markerY[i]);
    
		/////////////////////////////////////////////////////////////////
		//TEMPORARY for knowing the milestone only		
		/*var percentage = 1- (markerY[i]/this.progressBar._image.height);
		var value = percentage * MAX_SCORE;
		DEBUG_LOG(value);*/
		/////////////////////////////////////////////////////////////////
	}
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
MapState.prototype.Unload = function () {

    if (this.bg_music) {
        this.bg_music.pause();
        this.bg_music.currentTime = 0;
    }

    this.CleanupUIManager();
}



MapState.prototype.EventHandler = function (e) {

    switch (this.substate) {
        case MAP_SUBSTATE_MAP:
            this.MapState_EventHandler(e);
            break;
        case MAP_SUBSTATE_LEVELINFO:
            this.levelInfoScrn.EventHandler(e);
            break;
        case TOBAR_SNGL_PURCHASE_STATE:
            this.purchaseScreenSingle.EventHandler(e);
            break;
        case TOPBAR_MULT_PURCHASE_STATE:
            this.purchaseScreenMultiple.EventHandler(e);
            break;
        case MAP_SUBSTATE_GIVELIFE:
            this.giveLifeWnd.EventHandler(e);
            break;
        case MAP_SUBSTATE_REWARD:
            this.rewardWnd.EventHandler(e);
            break;
        case MAP_SUBSTATE_GUIDE:
            this.guideWnd.EventHandler(e);
            break;
        case MAP_SUBSTATE_DAILYSPIN:
            this.dailySpinWindow.EventHandler(e);
            break;
    }


}

MapState.prototype.PrePan = function (index)
{
    if (this.substate != 0) {

        this.map.topX = default_topLook[index][0];
        this.map.topY = default_topLook[index][1];
        return;
    }

    // 1 is pressed
    target_topX = default_topLook[index][0];
    target_topY = default_topLook[index][1];

    this.substate = MAP_SUBSTATE_PANNING;

}

MapState.prototype.MapState_EventHandler = function (e) {
    if (e.type == "keydown") {
        
        var key = e.keyCode;
        if (key == LEFT_KEY) {
            this.PrePan(0);
        } else if (key == RIGHT_KEY ) {
            this.PrePan(1);
        }

    } else if (e.type == "mousemove" ||
                e.type == "touchmove") {

       /* if (mouse_down) {
            var mouse = getNormalizedMouse(e);

            var deltax = mouse.x - mouse_cache_x;
            var deltay = mouse.y - mouse_cache_y;

            if (deltax != 0) {
                this.map.topX += (-deltax);
            }

            if (deltay != 0) {
                this.map.topY += (-deltay);
            }

            mouse_cache_x = mouse.x;
            mouse_cache_y = mouse.y;

        }
        */

    } else if (e.type == "mousedown" || e.type == "touchstart") {
        mouse_down = true;

        var mouse = getNormalizedMouse(e);
        mouse_cache_x = mouse.x;
        mouse_cache_y = mouse.y;

    } else if (e.type == "mouseup" || e.type == "touchend") {

        mouse_down = false;
    }

    this.EventHandlerBase(e);
    this.EventHandlerBase(e, this.uiManagerLocal);
}