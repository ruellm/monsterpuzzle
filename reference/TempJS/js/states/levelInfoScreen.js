/**
    levelInfoScreen.js
    Base class for Level Info, complete/failed screens 
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 1, 2014
*/

var LEVELINF_STATE_IDLE = 0;
var LEVELINF_STATE_IN = 1;
var LEVELINF_STATE_OUT = 2;
var LEVELINF_STATE_GAMELOADING = 3;
var LEVELINF_STATE_PURCHASE = 4;
var LEVEL_INFO_MSGDLG = 5;

var LEVELINFO_YLOC = 30;
var LEVELINFO_OUTSIDEY = -100;

function LevelWindowBase() {
    this.levelInfoBase = null;
    this.topScoreBase - null;
    this._X = 50;
    this._Y = LEVELINFO_OUTSIDEY;
    this.state = LEVELINF_STATE_IN;     

    this.observer = null;
    this.observer_origY = null
    this.fnOut = null;

    //top score window
    this.topScore = null;
    this.userScore = null;
    this.topScoreTxt = null;
    this.pictureHandle = null;
    this.sendHeart = null;
    this.sendPlus = null;
    this.starEmpty = null;
    this.starglow = null;
    this.starshine = null;
    this.playText = null;
 
    this.levelID = -1;

    this.displayProfileList = null;
    this.purchaseScreenSingle = null;
    this.levelToLoad = 0;
}

LevelWindowBase.prototype = new State;

LevelWindowBase.prototype.Load = function () {

    this._uimanager = new UIManager();

    this.observer = new Array();
    this.observer_origY = new Array();

    this.playText = new ImageObject();
    this.playText.Load("images/level_info_complete/PLAY.png");

    this.levelInfoBase = new ImageObject();
    this.levelInfoBase.Load("images/level_info_complete/level marker base.png");

    this.topScoreBase = new ImageObject();
    this.topScoreBase.Load("images/level_info_complete/top scores base.png");

    this.starEmpty = new ImageObject();
    this.starEmpty.Load("images/level_info_complete/star empty.png");

    this.starglow = new AnimatedObject();
    this.starglow.Load("images/level_info_complete/star glow.png");
    this.starglow.Set(7, 24.0, true);
    this.starglow._frameWidth = 128;
    this.starglow._fnCallback = (function () {
        //...
    });

    this.loading = new AnimatedObject();
    this.loading.Load("images/game_screen/load.png");
    this.loading.Set(10, 2.0, true);
    this.loading._frameWidth = 727;
    this.loading._fnCallback = (function () {
        //...
    });

    this.canvas = document.createElement('canvas');
    this.canvas.width = 727;
    this.canvas.height = 427;
    this.context = this.canvas.getContext('2d');

   /*
    this.starshine = new AnimatedObject();
    this.starshine.Load("images/level_info_complete/star shine.png");
    this.starshine.Set(5, 2.0, true);
    this.starshine._frameWidth = 128;
    this.starshine._fnCallback = (function () {
        //...
    });
    */

    this.purchaseScreenSingle = new PurchaseWindowSingle();
    this.purchaseScreenSingle.Load();
    this.purchaseScreenSingle.fnOnClose = function () {
        context.substate = 0;
    };

    this.msgWnd = new TipWindow;
    this.msgWnd.Load();
    this.msgWnd.fnOnClose = function () {
        context.substate = 0;
    };   

    this.LoadButtons();
    this.LoadContent();
    this.LoadTopScore();

}

LevelWindowBase.prototype.LoadFBProfiles = function ()
{
	//if(g_FBInvitableList.length == 0) return;	
	
	var friendlist =  g_gameData.level_list[this.levelID].friends_list;
	this.displayProfileList = new Array();

	var i = 0;
	if (friendlist != null) {
	    while (friendlist.length > 0 &&
            this.displayProfileList.length < 4) {
	        if (i >= friendlist.length) {
	            break;
	        }
	        var profile = friendlist[i];
	        this.displayProfileList.push(profile);
	        i++;
	    }
	}
	
	var v = 0;
    var indexdone = new Array();
    while (this.displayProfileList.length < 4) {
        var index = Math.floor(Math.random() * g_FBInvitableList.length);

		if( v++ >= g_FBInvitableList.length ) break;
		
        var exist = false;
        for (var i = 0; i < indexdone.length; i++) {
            if (indexdone[i] == index) {
                exist = true;
                break;
            }
        }

        if (exist) continue;
        var profile = g_FBInvitableList[index];
		var temp = new FB_Profile_Level;
		temp.fbProfile = profile;
		temp.score = -1;
		
        this.displayProfileList.push(temp);
		indexdone.push(index);
    }
	
	if( this.displayProfileList.length > 0 ) {
		this.displayProfileList.sort(SortScore);
	}

    /////////////////////////////////////////////////////////
    for (var i = 0; i < this._uimanager._uiList.length; i++) {
        for(var x=0; x < this.displayProfileList.length; x++){
            if (this._uimanager._uiList[i].id == x) {
                this._uimanager._uiList[i].enable = true;
                this._uimanager._uiList[i]._visible = true;
            }
        }        
    }
}

LevelWindowBase.prototype.Show = function (levelID) {
    this.state = LEVELINF_STATE_IN;

    this.levelID = levelID;
    
    for (var i = 0; i < this.observer.length; i++) {
        this.observer[i]._Y = this._Y + this.observer_origY[i];
    }
	
    this.LoadFBProfiles();
    this.LoadBooster();
}

LevelWindowBase.prototype.LoadBooster = function ()
{
    //...
}

LevelWindowBase.prototype.ShowMsgDlg_CoinReq = function ()
{
    this.substate = LEVEL_INFO_MSGDLG;
    this.msgWnd.strings = new Array();
    this.msgWnd.strings.push("You need " + g_gameData.level_list[context.levelID].coins_requirement
        + " coins ");
    this.msgWnd.strings.push("to play this level");
    this.msgWnd.Show();
}

LevelWindowBase.prototype.LoadTopScore = function () {
    //TODO/NOTE: Use temporary data

    this.topScore = null;
    this.userScore = null;

    this.topScore = new ImageObject();
    this.topScore.Load("images/level_info_complete/top score bg.png");

    this.userScore = new ImageObject();
    this.userScore.Load("images/level_info_complete/user score bg.png");

    this.topScoreTxt = new ImageObject();
    this.topScoreTxt.Load("images/level_info_complete/top score.png");


    var sendtoall = new Button;
    sendtoall.LoadImages(
		"images/level_info_complete/button send to all.png",
        "images/level_info_complete/button send to all HOVER.png",
	   "images/level_info_complete/button send to all.png");

    var locY = 485;
    sendtoall._width = 217;
    sendtoall._height = 43;
    sendtoall._X = this._X + this.levelInfoBase._image.width + 70;
    sendtoall._Y = this._Y + locY;
    sendtoall._fnMouseDownEvnt = (function () {
        if (g_mainUser.id == -1) return;
		FBAccess_SendToAll();
    });

    this._uimanager.Add(sendtoall);
    this.observer.push(sendtoall);
    this.observer_origY.push(locY);

    this.pictureHandle = new ImageObject();
    this.pictureHandle.Load("images/level_info_complete/picture handle.png");
	var context = this;
    for (var i = 0; i < 4; i++) {

        var heart_button = new Button;
        heart_button.LoadImages(
		    "images/generics/button blank S.png",
            "images/generics/button blank S hover.png",
	       "images/generics/button blank S.png");

        var locY = 165 + (i * 85);
        heart_button._width = 217;
        heart_button._height = 43;
        heart_button._X = this._X + this.levelInfoBase._image.width + 270;
        heart_button._Y = this._Y + locY;
        heart_button.id = i;
        heart_button.enable = false;
        heart_button._visible = false;
        heart_button._fnMouseDownEvnt = (function () {
            context.HandleSideBarButton(this.id);         
        });

        this._uimanager.Add(heart_button);
        this.observer.push(heart_button);
        this.observer_origY.push(locY);
    }

    this.sendHeart = new ImageObject();
    this.sendHeart.Load("images/level_info_complete/send heart.png");

    this.sendPlus = new ImageObject();
    this.sendPlus.Load("images/level_info_complete/send plus.png");

}

LevelWindowBase.prototype.LoadContent = function(){
    // Template Pattern
}

LevelWindowBase.prototype.LoadButtons = function () {

  //  this.LoadMenuBar();
    var context = this;

    var close = new Button;
    close.LoadImages(
		"images/level_info_complete/x.png",
        "images/level_info_complete/x HOVER.png",
	    "images/level_info_complete/x.png");

    var close_offset = 80;
    close._width = 61;
    close._height = 62;
    close._X = this._X + this.levelInfoBase._image.width - 115;
    close._Y = this._Y + close_offset;
    close._fnMouseDownEvnt = (function () {
        context.state = LEVELINF_STATE_OUT;
    });

    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);
}

LevelWindowBase.prototype.HandleSideBarButton = function(index)
{
	if( this.displayProfileList == null ) return;
	if( index >= this.displayProfileList.length) return;
	
	var profile = this.displayProfileList[index].fbProfile;
	if(profile.isPlayer){
		//Ask for heart
		FBAccess_AskLife(profile.id);
	}else{
		//invite screen
		FBAccess_InviteFriend(profile.id);
	}
	
}

LevelWindowBase.prototype.Update = function (elapsed) {
    var tolerant = 1;
    if (this.state == LEVELINF_STATE_IN) {
        if (this._Y <= LEVELINFO_YLOC - tolerant) {
            var diff = LEVELINFO_YLOC - this._Y;
            var value = (diff * WINDOW_ANIM_SPEED * elapsed);

            this._Y += value;

        } else {
            this._Y = LEVELINFO_YLOC;
            this.state = LEVELINF_STATE_IDLE;
        }

        //update observers too
        for (var i = 0; i < this.observer.length; i++) {
            this.observer[i]._Y = this._Y + this.observer_origY[i];
        }

    } else if (this.state == LEVELINF_STATE_OUT) {
        var goal = -604;
        if (this._Y > goal) {
            var value = (-1000 * elapsed);
            this._Y += value;

        } else {
            this._Y = LEVELINFO_OUTSIDEY;
            this.state = LEVELINF_STATE_IDLE;
            if (this.fnOut) {
                this.fnOut();
            }
        }

        //update observers too
        for (var i = 0; i < this.observer.length; i++) {
            this.observer[i]._Y = this._Y + this.observer_origY[i];
        }
    }else if (this.substate == LEVELINF_STATE_PURCHASE) {
        this.purchaseScreenSingle.Update(elapsed);
    } else if (this.substate == LEVEL_INFO_MSGDLG) {
        this.msgWnd.Update(elapsed);
    }

    this._uimanager.Update(elapsed);

    this.starglow.Update(elapsed);

    if (this.state == LEVELINF_STATE_GAMELOADING) {
        
        /*
         * Temporary!!
           add loading thru image levels and audio
        */
        if (g_imageResourceList.length + g_errorImageList.length >=
                /*(g_gameImageList_1.length + 
                g_imageFileList.length)*/ g_resourceLoadCount)
        {
            var audio_loaded = 0;
            for (var aud = 0; aud < g_audioResourceList.length; aud++) {
                if (g_audioResourceList[aud].loaded) {
                    audio_loaded++;
                }
            }

            if (audio_loaded >= g_audioLoadCount) {            
                this.SwitchToGame();
            }
        }
        this.loading.Update(elapsed);
    } 

    this.UpdateInternal(elapsed);
}

LevelWindowBase.prototype.SwitchToGame = function () {
    g_gameData.currentLevelIdx = this.levelToLoad;
    if (this.levelToLoad == g_gameData.top_level) {
        switch (this.levelToLoad) {
            case 0:
                g_Engine.SetState(SLIDE_STORY_STATE_0);
                break;
            case 21:
                g_Engine.SetState(SLIDE_STORY_STATE_1);
                break;
            case 43:
                //break;   // TEMPORARY SINCE THERE WAS  NO SLIDES YET
            case 65:
                //break;  // TEMPORARY SINCE THERE WAS  NO SLIDES YET
            default:
                g_Engine.SetState(GAME_STATE);
                break;
        }
    } else {       
        g_Engine.SetState(GAME_STATE);
    }
}

LevelWindowBase.prototype.UpdateInternal = function (elapsed)
{
    // To be inherited
}

LevelWindowBase.prototype.DrawHeartPlus = function (gfx) {

	if( this.displayProfileList == null) return;
	
    var panelY = this._Y + 94 + this.topScore._image.height;
    for (var i = 0; i < this.displayProfileList.length; i++) {
        var y = panelY + (i * (this.userScore._image.height + 3)) + 28;
		var profile = this.displayProfileList[i].fbProfile;
		
		if( profile.isPlayer ) {
			this.sendHeart.Draw(gfx,
				this._X + this.levelInfoBase._image.width + 275,
				y);
		} else {
			this.sendPlus.Draw(gfx,
				this._X + this.levelInfoBase._image.width + 278,
				y);
        
		}        
    }
}

LevelWindowBase.prototype.DrawUI = function (gfx) {
    this.DrawHeartPlus(gfx);
}

LevelWindowBase.prototype.DrawStarType = function (gfx, x, y, angle, type) {

    if (type == 0) {
        // Empty Star
        gfx.DrawRotateFull(
                x, y,
                this.starEmpty._image.width / 2,
                this.starEmpty._image.height / 2,
                angle,
                this.starEmpty._image,
                1.0);

    } else if (type == 1) {
        // Draw animated star
        this.starglow._X = x;
        this.starglow._Y = y;
        this.starglow.DrawRotate(gfx, angle);
    }
}

LevelWindowBase.prototype.DrawEmptyStar = function (gfx) {
    var startX = this._X + 145;
    
   // var count = g_gameData.level_list[this.levelID].starCount;

    for (var i = 0; i < 3; i++) {

       /// var type = 0;
       // if (i + 1 <= count)
        //    type = 1;

        if (i == 0) {

            this.DrawStarType(gfx,
                startX + (i * this.starEmpty._image.width),
                this._Y + 115,
                -10, 0);

        } else if (i == 2) {
            this.DrawStarType(gfx,
                startX + (i * this.starEmpty._image.width),
                this._Y + 115,
                10, 0);
        } else {
            this.DrawStarType(gfx,
                startX + (i * this.starEmpty._image.width),
                this._Y + 115,
                0, 0);
        }
    }
}

LevelWindowBase.prototype.Draw = function (gfx) {

    gfx.FillRect(0, 56, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
            "rgb(0,0,0)", 0.4);

    this.levelInfoBase.Draw(gfx, this._X, this._Y);
    this.topScoreBase.Draw(gfx,
            this._X + this.levelInfoBase._image.width,
            this._Y + 60);

    var topscore_locx = this._X + this.levelInfoBase._image.width + 40;
    this.topScore.Draw(gfx, topscore_locx, this._Y + 95);

    this.DrawEmptyStar(gfx);

    this.topScoreTxt.Draw(gfx, topscore_locx + 45, this._Y + 88);
    var panelY = this._Y + 94 + this.topScore._image.height;


    /********************************************************************/
	if (this.displayProfileList == null )
	{
		// Draw text here
	}else
	{
		for (var i = 0; i < this.displayProfileList.length; i++) {
			var y = panelY + (i * (this.userScore._image.height + 3));
			this.userScore.Draw(gfx, topscore_locx, y);
			this.pictureHandle.Draw(gfx, topscore_locx + 40, y + 4);

			gfx.DrawText(i+1,
				topscore_locx + 10, y +48, 
				"rgb(234,223,81)", "20pt ERASDEMI");
			
			var profile = this.displayProfileList[i].fbProfile;
			var scoreText = this.displayProfileList[i].score;
			if( !profile.isPlayer ) 
				scoreText = "Invite";
				
			gfx.DrawText(scoreText,
				topscore_locx + 120, y + 33, "rgb(234,217,174)", "15pt ERASDEMI");
	
			gfx.DrawText(profile.name,
			  topscore_locx + 120, y + 63, "rgb(234,217,174)", "15pt ERASDEMI");

			if (true/*profile.image_loaded*/) {
				if(profile.image) {
					gfx.DrawImage(profile.image, 0, 0,
						profile.image.width, profile.image.height,
						topscore_locx + 40 + 2, y + 4 +3,
						this.pictureHandle._image.width-5, 
						this.pictureHandle._image.height-5, 1.0);
				}
			}
			
		}
	}
    /********************************************************************/

	var cx = 377;

	var ctx = gfx._canvasBufferContext;
	var style = "Bold 41pt ERASDEMI";
	ctx.font = style;
	var text = "Level " + (this.levelID + 1);

	var textWidth = ctx.measureText(text);
	var x = cx - textWidth.width / 2;
	var y = this._Y + 90;

	gfx.DrawText(text,
        x - 1, y - 1, "rgb(9,14,0)", "Bold 41pt ERASDEMI");

	gfx.DrawText(text,
        x, y, "rgb(226,205,148)", "Bold 40pt ERASDEMI");


    if (this.state != LEVELINF_STATE_IDLE) {

        this.DrawContent(gfx);

        this._uimanager.Draw(gfx);
        this.DrawUI(gfx);

       // this.DrawMenuBar(gfx);
      
    }
    else {
     /*   var cx = 377;

        var ctx = gfx._canvasBufferContext;
        var style = "Bold 41pt ERASDEMI";
        ctx.font = style;
        var text = "Level " + (this.levelID + 1);

        var textWidth = ctx.measureText(text);
        var x = cx - textWidth.width / 2;
        var y = 118;

        gfx.DrawText(text,
            x - 1, y - 1, "rgb(9,14,0)", "Bold 41pt ERASDEMI");

        gfx.DrawText(text,
            x, y, "rgb(226,205,148)", "Bold 40pt ERASDEMI");
        */
        this.DrawContent(gfx);
       // this.DrawMenuBar(gfx);

        this._uimanager.Draw(gfx);
        this.DrawUI(gfx);        
    }

    if (this.state == LEVELINF_STATE_GAMELOADING) {
        //...
        gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
           "rgb(0,0,0)", 0.9);

        //gfx.DrawText("Loading animation here...",
        //     280, 320, "rgb(253,255,110)", "Bold 50pt ERASDEMI");

        var context = gfx._canvasBufferContext;
        gfx._canvasBufferContext = this.context;

        var width = 727;
        var height = 427;
        var nwidth = width * 0.75;
        var nheight = height * 0.75;

        this.context.clearRect(0, 0, width, height);
        this.loading.Draw(gfx, 0, 0);
           // (DEFAULT_WINDOW_WIDTH / 2) - (727 / 2),
            //(DEFAULT_WINDOW_HEIGHT / 2) - (this.loading._image.height / 2));

        gfx._canvasBufferContext = context;

        gfx.DrawImage(this.canvas, 0, 0,
           width, height,
           (DEFAULT_WINDOW_WIDTH / 2) - (nwidth / 2), (DEFAULT_WINDOW_HEIGHT / 2)-(nheight/2),
           nwidth, nheight, 1.0);
    }

    if (this.substate == LEVELINF_STATE_PURCHASE) {
        this.purchaseScreenSingle.Draw(gfx);
    } else if (this.substate == LEVEL_INFO_MSGDLG) {
        this.msgWnd.Draw(gfx);
    }
}

LevelWindowBase.prototype.DrawContent = function(gfx){
    // Template pattern
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
LevelWindowBase.prototype.Unload = function () {
    this.CleanupUIManager();
}

LevelWindowBase.prototype.EventHandler = function (e) {

    if (this.substate == LEVELINF_STATE_PURCHASE) {
        this.purchaseScreenSingle.EventHandler(e);
        return;
    } else if (this.substate == LEVEL_INFO_MSGDLG) {
        this.msgWnd.EventHandler(e);
        return;
    }

    this.EventHandlerBase(e);
}

var game_loaded = false;
LevelWindowBase.prototype.LoadGame = function (next) {
    
    this.levelToLoad = this.levelID;
    if (next)
        this.levelToLoad = g_gameData.currentLevelIdx;

    var type = g_gameData.level_list[this.levelToLoad].bg_type + 1;
    g_resourceToLoad = new Array();
    g_resourceLoadCount = 0;
    g_audioLoadCount = 0;
    var loading = false;

    // level background
    var gameImageList = [g_commonImageList, g_world1_List, g_world2_List,
               g_world3_List, g_world4_List];

    // audio resource
    var gameAudioList = [g_gameAudioCommonList_1, g_world1Audio_List,
        g_world2Audio_List, g_world3Audio_List];

    // story slides
    var storyImageList = [g_slides1_images, g_slides2_images];

    var storyAudioList = [g_storyAudio_1];

    // Compute already loaded count
    g_resourceLoadCount = g_imageFileList.length;
    g_audioLoadCount = g_audioFileList.length;

    for (var ed = 0; ed < g_resource_load_flag.length; ed++) {
        if (g_resource_load_flag[ed]) {
            g_resourceLoadCount += gameImageList[ed].length;

            if (ed < gameAudioList.length) {
                g_audioLoadCount += gameAudioList[ed].length;
            }
        }
    }

    for (var es = 0; es < g_storySlideImage.length; es++) {
        if (g_storySlideImage[es] && es < storyImageList.length) {
            g_resourceLoadCount += storyImageList[es].length;
        }
    }

    if (g_resource_load_flag[0] == false) {
        // check if common resource is loaded
        //resourceToLoad = g_commonImageList;

        for (var ed = 0; ed < g_commonImageList.length; ed++) {
            g_resourceToLoad.push(g_commonImageList[ed]);
        }

        for (var idx = 0; idx < g_gameAudioCommonList_1.length; idx++) {
            new AudioResource().Load(g_gameAudioCommonList_1[idx]);
        }
        g_audioLoadCount += g_gameAudioCommonList_1.length;
        g_resource_load_flag[0] = true;

        loading = true;
    }

    if (g_resource_load_flag[type] == false) {

        var candidate1 = gameImageList[type];
        for (var ed = 0; ed < candidate1.length; ed++) {
            g_resourceToLoad.push(candidate1[ed]);
        }

        if (type < gameAudioList.length) {
            var audioToLoad = gameAudioList[type];
            g_audioLoadCount += audioToLoad.length;

            for (var idx = 0; idx < audioToLoad.length; idx++) {
                new AudioResource().Load(audioToLoad[idx]);
            }
        }

        g_resource_load_flag[type] = true;
        loading = true;
    }

    ////////////////////////////////////////////////////////////////////////////////////
    if (this.levelToLoad == g_gameData.top_level) {
        var index = 0;
        switch (this.levelToLoad) {
            case 0:
                index = 0;
                break;
            case 21:
                index = 1;
                break;
            case 43:
                index = 2;
                break;
            case 65:
                index = 3;
                break;
        }

        if (index < storyImageList.length && !g_storySlideImage[index]) {
            var imageList = storyImageList[index];
            for (var i = 0; i < imageList.length; i++) {
                g_resourceToLoad.push(imageList[i]);
            }
            g_storySlideImage[index] = true;
            loading = true;

        }

        // load the story audio
        new AudioResource().Load(g_storyAudio_1[0]);
        g_audioLoadCount++;
    }
    ///////////////////////////////////////////////////////////////////////////////////

    if (!loading) {

        g_resourceLoadCount = 0;
        g_resourceToLoad = null;
        g_audioLoadCount = 0;
        //g_Engine.SetState(GAME_STATE);
        this.SwitchToGame();
        return;
    }

    g_resourceLoadCount += g_resourceToLoad.length;

    DEBUG_LOG("To be loaded " + g_resourceLoadCount);

    this.state = LEVELINF_STATE_GAMELOADING;
    g_currentResource = g_resourceToLoad;
    global_resource_index = 0;
    new ImageResource().Load(g_resourceToLoad[0]);

}


/*************************************************************************************/
                /*Level Info Screen derived class*/
/*************************************************************************************/

function LevelInfoScreen() {
    //...
    this.goalsPanel = null;
    this.boostersPanel = null;
    this.boosterList = null;
    
}

LevelInfoScreen.prototype = new LevelWindowBase;

LevelInfoScreen.prototype.LoadContent = function () {
    // Template Pattern

    this.goalsPanel = new ImageObject();
    this.goalsPanel.Load("images/level_info_complete/goals panel.png");

    this.boostersPanel = new ImageObject();
    this.boostersPanel.Load("images/level_info_complete/select boosters panel.png");

  
    var play = new Button;
    play.LoadImages(
		   "images/generics/button blank M.png",
           "images/generics/button blank M hover.png",
	       "images/generics/button blank M.png");

    var locY = 495;
    play._width = 133;
    play._height = 58;
    play._X = this._X + 500;
    play._Y = this._Y + locY;

    context = this;
    play._fnMouseDownEvnt = (function () {
        
        if (g_gameData.coins < g_gameData.level_list[context.levelID].coins_requirement) {
            context.ShowMsgDlg_CoinReq();
        } else if(g_gameData.life > 0) {            
            context.LoadGame();
           // g_gameData.currentLevelIdx = context.levelID;

        } else {
            context.substate = LEVELINF_STATE_PURCHASE;
            context.purchaseScreenSingle.SetType(ITEM_HEART_LIFE);
            context.purchaseScreenSingle.Show();
        }
    });

    this._uimanager.Add(play);
    this.observer.push(play);
    this.observer_origY.push(locY);

    // load the booster menu
}

LevelInfoScreen.prototype.LoadBooster = function ()
{
    var context = this;
    var includeList = new Array();

    // TEMPORARY FOR TESTING
    // since no other boosters arts are available yet
    //TODO: modify this in actual
   // includeList.push(0);
   // includeList.push(1);
  //  includeList.push(0);

    while (includeList.length < 3) {
        var index = Math.floor(Math.random() * g_boosterInfo.length);
        var found = false;
        for (var i = 0; i < includeList.length; i++) {
            if (includeList[i] == index) {
                found = true;
                break;
            }
        }

        if (found) continue;
        includeList.push(index);
    }

    this.boosterList = new Array();
    var locY = 450;
    var x = this._X + 220 + 33;

    for (var i = 0; i < includeList.length; i++) {
        var index = includeList[i];
        var imageIdx = g_boosterInfo[index].boosterID;

        var image = new ImageObject();
        image.Load(g_levelInfoBoosters[imageIdx]);

        this.boosterList.push(image);

        var add = new Button;
        add.LoadImages(
             "images/generics/button circle_S.png",
             "images/generics/button circle_S_HOVER.png",
             "images/generics/button circle_S.png");

        add._width = 33;
        add._height = 33;
        add._X = x;
        add._Y = this._Y + locY;
        add.id = imageIdx;
        add._fnMouseDownEvnt = (function () {
            context.substate = LEVELINF_STATE_PURCHASE;           
            context.purchaseScreenSingle.SetType(this.id);
            context.purchaseScreenSingle.Show();
        });

        this._uimanager.Add(add);
        this.observer.push(add);
        this.observer_origY.push(locY);

        x += 100;
    }
}

LevelInfoScreen.prototype.DrawContent = function (gfx) {

    var y = 225;
    this.goalsPanel.Draw(gfx,
        this._X + 130, this._Y + y);

    this.boostersPanel.Draw(gfx, this._X + 130,
        this._Y + y + this.goalsPanel._image.height);
   
    if (true/*this.state == LEVELINF_STATE_IDLE*/) {
        // TODO: crate a common function for this
      
        //--------------------------------------

        // Draw level goal description
        var description = g_gameData.level_list[this.levelID].description;

        for (var i = 0; i < description.length; i++) {

            gfx.DrawText(description[i],
                189, this._Y + 290 + (i * 30), "rgb(253,255,110)", "18pt ERASDEMI");

            // gfx.DrawText(description[i],
            //    189, 320, "rgb(41,28,3)", "Bold 14.5pt ERASDEMI");
        }

        // Draw "Select Boosters" text
        gfx.DrawText("Select Boosters",
             260, this._Y +  400, "rgb(226,205,148)", "Bold 30pt ERASDEMI");

    }

    // Draw the boosters
    var xloc = this._X + 220;
    var yloc = this._Y + y + this.goalsPanel._image.height + 50;

    for (var i = 0; i < this.boosterList.length; i++) {
        var boosterImg = this.boosterList[i];
        boosterImg.Draw(gfx, xloc, yloc);

        xloc += 100;
    }

   
}

// override from base
LevelInfoScreen.prototype.DrawUI = function (gfx) {
    this.DrawHeartPlus(gfx);

    this.playText.Draw(gfx, this._X + 520, this._Y + 508);

}

/*************************************************************************************/
/*Level Complete Screen derived class*/
/*************************************************************************************/
function LevelCompleteScreen() {
    //...
    this.type = 0; //0: complete, 1: failed

    this.failedSprite = null;
    this.completeSprite = null;

    this.shareSparite = null;
    this.nextSprite = null;
    this.retryText = null;
    this.scorePanel = null;

    this.score = 0;
}

LevelCompleteScreen.prototype = new LevelWindowBase;

LevelCompleteScreen.prototype.LoadContent = function ()
{
    this.failedSprite = new ImageObject();
    this.failedSprite.Load("images/level_info_complete/failed.png");

    this.completeSprite = new ImageObject();
    this.completeSprite.Load("images/level_info_complete/completed.png");

    this.shareSparite = new ImageObject();
    this.shareSparite.Load("images/level_info_complete/share.png");

    this.nextSprite = new ImageObject();
    this.nextSprite.Load("images/level_info_complete/next.png");

    this.retryText = new ImageObject();
    this.retryText.Load("images/level_info_complete/retry.png");

    this.scorePanel = new ImageObject();
    this.scorePanel.Load("images/level_info_complete/score pane.png");
    
    var next = new Button;
    next.LoadImages(
           "images/generics/button blank M.png",
           "images/generics/button blank M hover.png",
           "images/generics/button blank M.png");

    var locY = 495;
    next._width = 133;
    next._height = 58;
    next._X = this._X + 500;
    next._Y = this._Y + locY;

    context = this;
    next._fnMouseDownEvnt = (function () {

        if (g_gameData.coins < g_gameData.level_list[context.levelID].coins_requirement) {
            context.ShowMsgDlg_CoinReq();
        }else if (g_gameData.life > 0) {
            if (context.type == 0) {
                //next level
                //set gamedata.currentlevelindex++, 
                // check if there are still levels

                if (g_gameData.currentLevelIdx + 1 < g_gameData.level_list.length)
                    g_gameData.currentLevelIdx++;
                else
                    g_gameData.currentLevelIdx = g_gameData.level_list.length - 1;

            }

            // g_Engine.SetState(GAME_STATE);
            if (context.type == 0) {
                context.LoadGame(true);
            } else {
                context.LoadGame();
            }
        } else {
            context.substate = LEVELINF_STATE_PURCHASE;
            context.purchaseScreenSingle.SetType(ITEM_HEART_LIFE);
            context.purchaseScreenSingle.Show();
        }
    });

    this._uimanager.Add(next);
    this.observer.push(next);
    this.observer_origY.push(locY);

    this.share = new Button;
    this.share.LoadImages(
           "images/generics/button blank M.png",
           "images/generics/button blank M hover.png",
           "images/generics/button blank M.png");

    var locY = 495;
    this.share._width = 133;
    this.share._height = 58;
    this.share._X = this._X + 350;
    this.share._Y = this._Y + locY;

    context = this;
    this.share._fnMouseDownEvnt = (function () {
       FBAccess_ShareScore( 
		"Yay, I completed level " + (context.levelID+1) + " in Spirit Bubble!",
		"I just completed level "+ (context.levelID+1) + ", scored "+ context.score + 
		" points and got " + g_gameData.level_list[context.levelID].starCount +" stars." +
		" Click here to follow my progress!");

    });

    this._uimanager.Add(this.share);
    this.observer.push(this.share);
    this.observer_origY.push(locY);
 }

LevelCompleteScreen.prototype.DrawContent = function (gfx)
{
    var image = this.completeSprite;
    if (this.type == 0) {
        this.completeSprite.Draw(gfx, this._X + 170, this._Y + 240);
    } else {
        this.failedSprite.Draw(gfx, this._X + 235, this._Y + 240);
    }

    this.scorePanel.Draw(gfx, this._X + 125, this._Y + 350);

    gfx.DrawText("Score : " + this.score,
			this._X + 140, this._Y + 380,
            "rgb(234,217,174)", "25pt ERASDEMI");

    var score = 0;
    if (g_gameData.level_list[this.levelID].friends_list) {
        for (var i = 0; i < g_gameData.level_list[this.levelID].friends_list.length; i++) {
            var fb = g_gameData.level_list[this.levelID].friends_list[i];
            if (fb.fbProfile.id == g_mainUser.id) {
                score = fb.score;
                break;
            }
        }
    }

    gfx.DrawText("Your Best Score : " + score,
         this._X + 140, this._Y + 410,
         "rgb(234,217,174)", "15pt ERASDEMI");

    if (this.type == 0) {
        this.DrawStar(gfx);
    }
}

// override from base
LevelCompleteScreen.prototype.DrawUI = function (gfx) {
    this.DrawHeartPlus(gfx);

    if (this.type == 0) {
        this.nextSprite.Draw(gfx, this._X + 520, this._Y + 508);
        this.shareSparite.Draw(gfx, this._X + 365, this._Y + 508);

        this.share._visible = true;
        this.share.enable = true;
    } else {
        this.retryText.Draw(gfx, this._X + 520, this._Y + 508);

        this.share._visible = false;
        this.share.enable = false;
    }
}

LevelCompleteScreen.prototype.DrawStar = function (gfx) {
    var startX = this._X + 145;

    var count = g_gameData.level_list[this.levelID].starCount;

    for (var i = 0; i < count; i++) {

        /// var type = 0;
        // if (i + 1 <= count)
        //    type = 1;

        if (i == 0) {

            this.DrawStarType(gfx,
                startX + (i * this.starEmpty._image.width),
                this._Y + 115,
                -10, 1);

        } else if (i == 2) {
            this.DrawStarType(gfx,
                startX + (i * this.starEmpty._image.width),
                this._Y + 115,
                10, 1);
        } else {
            this.DrawStarType(gfx,
                startX + (i * this.starEmpty._image.width),
                this._Y + 115,
                0, 1);
        }
    }
}