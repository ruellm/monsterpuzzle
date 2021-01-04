/**
  *  gameState.js
  *  Game State
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: May 9, 2014
  *
  *  note: Inspired by Flash Game Development by example
*/

/* Line Guide definitions */
var mouse_x = 0;
var mouse_y = 0;
var circ_dist = 20;
var D = RADIUS * Math.sqrt(3);
var bounced = false;

var TEXT_START_WIDTH = 1;
var TEXT_START_HEIGHT = 1;
var GAMESTATE_SUBSTATE_GAME = 0;
var GAMESTATE_SUBSTATE_READYANIM = 1;
var GAMESTATE_SUBSTATE_GOANIM = 2;
var GAMESTATE_SUBSTATE_GAMEDONE_ANIM = 3;
var GAMESTATE_SUBSTATE_GAMEDONE = 4;
var GAMESTATE_SUBSTATE_LEVELINFOSCRN = 5;
var GAMESTATE_SUBSTATE_END = 6;
var GAMESTATE_NOMOREBUBBLES = 7;
var GAMESTATE_TIPSCREEN = 8;
var GAMESTATE_SWITCHAROO = 9;
var GAMESTATE_RUSHLEVEL_TEXT = 10;
var GAMESTATE_SUBSTATE_REWARD = 11;

//var GAMESTATE_SUBSTATE_FAILEDANIM = 4;

var GAME_STATUS_COMPLETE = 1;
var GAME_STATUS_FAIL = 2;

function GameState() {
    // State ID 
    this._stateID = GAME_STATE;
   
    // Line of sight image list
    this.LOSImgList = null;
    
    // the launcher
    this.gun = null;

    this.currentBubble = null;
    // ----------------------------------

    this.chainList = null;
    this.dropList = null;

    this.jumpList = null;

    // background image list
    this.backgroundImg = 0;
    this.borderImg = 0;

    //UI Related Sprites

    this.sideBar = null;
    this.boosterPanel = null;

    this.staticBubble = null;

    // DEMON SPRITES
    this.demon1 = null;
    this.demon2 = null;
    this.meg = null;

    //audio resource
    this.bg_music = null;
    this.launchSfx = null;
    this.deployedSfx = null;
    this.matchSfx = null;
    this.rotateSfx = null;
    this.bounceSfx = null;

    this.readySprite = null;
    this.goSprite = null;
    this.goodJobSprite = null;
    this.gameOverSprite = null;
	this.rushLevelSprite = null;
    this.noMoreBubblesSprite = null;
    this.rightBarSprite = null;
    this.progressBar = null;
    this.progressBarPlay = null;

    // level complete screen
    this.level_complete_screen = null;
    this.tipScreen = null;

    this.currentBackground = null;

    //HACK SOLUTION
    // cache last levelid
    this.level_id = 0;
}

// set base class to State
GameState.prototype = new TopBarCommon;

GameState.prototype.LoadDefaults = function ()
{
    this.currentBubble = null;
    this.jumpList = new Array();
    // ----------------------------------
    // PLAYING FIELD related definitions
    var field_allowance = 5;
    this.fieldX = (DEFAULT_WINDOW_WIDTH / 2) - ((RADIUS * 2) * FIELD_WIDTH / 2) - field_allowance;
    this.fieldY = 56;
    this.fieldLimitX = this.fieldX + ((RADIUS * 2) * FIELD_WIDTH) + field_allowance;
    this.bubbleField = null;

    //-------------------------------------------------------------
    // GUN DEFINITIONS
    // Maybe we create a separate class for the GUN? just like turrent
    // in inweirders?
    this.gunLocX = (DEFAULT_WINDOW_WIDTH / 2);
    this.gunLocY = 485;
    var line_height = 150;
    this.nozzlePointX = this.gunLocX;
    this.nozzlePointY = this.gunLocY - line_height;
    this.angle = 0;

    this.substate = GAMESTATE_SUBSTATE_READYANIM;

    this.ready_width = TEXT_START_WIDTH;
    this.ready_height = TEXT_START_HEIGHT;

    this.bubbleCount = 0;
    this.bubble_reserve = null;    
    this.bubbleIdx = 0;    

    // game status, 0: playing, 1: complete 2 failed/gameover
    this.game_status = 0;

    // for game over and game complete animation
    this.game_pause_timer = 0;

    // player's turn is limited to 5 seconds only
    // bubble will be automatically shot after 5 secs
    this.shotTimer = 0;
    this.elapsed = 0;

    // score to reach to earn a star, this will be divided to
    // the current value the user scored on current level
    this.score_for_star = 0;

    // ------------------------------------------------
    // Running score implementation
    this.targetScore = 0;
    this.scoreStep = 8;

    //the current game score
    this.game_score = 0;
    this.gold_target = 0;
    // ------------------------------------------------  
    
    // scores for every star
    this.scores_for_star = 0;

    this.boosterIncludeList = null;

    //switch counter
    this.switch_used = 0;

    // Coin array animation list
    this.coin_list = new Array();
}

GameState.prototype.Load = function () {
   
    //...
    this.LoadDefaults();
    this._uimanager = new UIManager();

    this.LoadGameField();
    this.LoadLevelData();

    this.LoadUI();
    this.LoadLevelBackground();

    this.LoadBoostersUI();

    this.gun = new Launcher();
    this.gun.Load();
    this.gun._X = this.gunLocX;
    this.gun._Y = 515;

    // Line of shight graphics
    var imagelist = [
         "images/game_screen/cursor/cursor A.png",
        "images/game_screen/cursor/cursor B.png",
        "images/game_screen/cursor/cursor C.png",
        "images/game_screen/cursor/cursor D.png"];

    this.LOSImgList = new Array();
    for (var i = 0; i < 4; i++) {
        var image = new ImageObject();
        image.Load(imagelist[i]);
        this.LOSImgList.push(image);
    }

    this.demon1 = new Demon1();
    this.demon2 = new Demon2();
    this.demon1.Load();
    this.demon2.Load();

    this.demon1._X = this.gun._X - 120;
    this.demon1._Y = this.gun._Y + 44;

    this.demon2._X = this.gun._X + 45;
    this.demon2._Y = this.gun._Y + 46;

    this.meg = new China();
    this.meg.Load();
    this.meg._X = this.demon2._X + 140;
    this.meg._Y = 410;

    // At the start of the game screen, 
    // lets start playing the background music

    this.launchSfx = GetAudioResource("shoot_bubble", 0.5);
    this.deployedSfx = GetAudioResource("no_match02", 0.2);
    this.matchSfx = GetAudioResource("match_colors", 0.5);    
    this.rotateSfx = GetAudioResource("change_direction_squeak_1click", 0.1);
    this.bounceSfx = GetAudioResource("wood_knock", 1.0);
    this.switchSfx = GetAudioResource("bounce_1", 0.8);
    this.explosionSfx = GetAudioResource("RMBLE", 0.5);
    this.levelSuccessSfx = GetAudioResource("level_success", 0.5);
    this.levelFailedSfx = GetAudioResource("level_fail", 0.5);
    this.rewardSfx = GetAudioResource("alertwin");
    this.coin = GetAudioResource("coin01");

    this.readySprite = new ImageObject();
    this.readySprite.Load("images/game_screen/text/Ready.png");

    this.goSprite = new ImageObject();
    this.goSprite.Load("images/game_screen/text/GO.png");

    this.goodJobSprite = new ImageObject
    this.goodJobSprite.Load("images/game_screen/text/Good Job.png");

    this.gameOverSprite = new ImageObject();
    this.gameOverSprite.Load("images/game_screen/text/Game Over.png");

    this.noMoreBubblesSprite = new ImageObject();
    this.noMoreBubblesSprite.Load("images/game_screen/text/No More Bubbles.png");
      
    var context = this;
    this.level_complete_screen = new LevelCompleteScreen();    
    this.level_complete_screen.Load();
    this.level_complete_screen.fnOut = (function (levelID) {
        context.substate = GAMESTATE_SUBSTATE_END;
        context.game_status = 0;
        g_Engine.SetState(MAP_STATE);
       
    });

    this.tipScreen = new TipWindow;
    this.tipScreen.Load();
    this.tipScreen.fnOnClose = function () {
        context.substate = GAMESTATE_SUBSTATE_READYANIM;
    };

    if (g_gameData.currentLevelIdx == g_gameData.top_level
        && g_gameData.level_list[g_gameData.currentLevelIdx].tip.length) {
        this.substate = GAMESTATE_TIPSCREEN;
        this.tipScreen.strings = g_gameData.level_list[g_gameData.currentLevelIdx].tip;
        this.tipScreen.Show();
    }

    if (g_gameData.life <= 0) {
        this.substate = GAMESTATE_SUBSTATE_LEVELINFOSCRN;
        this.level_complete_screen.type = 1;
        this.level_complete_screen.score = 0;
        this.level_complete_screen.Show(g_gameData.currentLevelIdx);
    }

    this.rewardWnd = new RewardWindow();
    this.rewardWnd.Load();
    this.rewardWnd.fnOnClose = function () {
        context.substate = 0;
    };

    var reward = CheckReward();
    if (reward != null) {
        this.substate = GAMESTATE_SUBSTATE_REWARD;
        this.rewardWnd.Show();
        this.rewardWnd.SetType(reward);
        if (this.rewardSfx) {
            this.rewardSfx.play();
        }
    }

    this.hitDisplay = false;
    this.ballLauncherHint = new AnimatedObject();
    this.ballLauncherHint.Load("images/game_screen/hint_sprite.png");
    this.ballLauncherHint.Set(11, 24.0, false);
    this.ballLauncherHint._frameWidth = 70;
    this.ballLauncherHint._fnCallback = (function () {
        context.hitDisplay = false;
        this.Reset();
    });

    this.gold_target = g_gameData.coins;


    this.show_lightning = false;
    this.lightning_Y = this.fieldY;

    this.lightning = new AnimatedObject();
    this.lightning.Load("images/game_screen/boosters/lightningboosterdestroy.png");
    this.lightning.Set(10, 24.0, false);
    this.lightning._frameWidth = 653;
    this.lightning._fnCallback = (function () {
        this.Reset();
        context.show_lightning = false;
    });

    this.level_id = g_gameData.currentLevelIdx;
}

GameState.prototype.LoadLevelBackground = function () {

    //-----------------------------------------------------
    //TODO: load background depending on location in the Map
    //-----------------------------------------------------
    switch (g_gameData.level_list[g_gameData.currentLevelIdx].bg_type)
    {
        case 0:
            this.currentBackground = new Background_1();
            this.bg_music = GetAudioResource("level-music-01", 0.5);
            break;
        case 1:
            this.currentBackground = new Background_2();
            this.bg_music = GetAudioResource("level-music-02", 0.5);            

            break;
        case 2:
            this.currentBackground = new Background_3();
            this.bg_music = GetAudioResource("level-music-03_shortversion", 0.5);
            break;
        case 3:
            this.currentBackground = new Background_4();
        default:
            break;
    }
    this.currentBackground.Load();
    //-----------------------------------------------------

    // Load the border of playing field
    this.borderImg = new ImageObject();
    this.borderImg.Load("images/game_screen/border.png");

    if (this.bg_music) {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
}

GameState.prototype.LoadBoostersUI = function ()
{
    
    this.boosterIncludeList = new Array();
    includeList = this.boosterIncludeList;
    var ITEM_MAX = 4;

    var index = Math.floor(Math.random() * g_boosterInfo.length);
    for (var iz = 0; iz < g_boosterInfo.length; iz++) {
        if (g_boosterInfo[iz].count > 0) {
            includeList.push(iz);
        }
		
		if(includeList.length >= ITEM_MAX)
			break;
    }
     
    while (includeList.length < ITEM_MAX) {

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

    var x = 35;
    var y = 120;
    var context = this;
    for (var ix = 0; ix < includeList.length ; ix++) {
        var booster = new Button;
        var id = g_boosterInfo[includeList[ix]].boosterID;

        booster.LoadImages(
		    g_gaameBoosters_sideBar[id],
            g_gaameBoosters_sideBarHover[id],
	        g_gaameBoosters_sideBar[id]);

        booster._width = 40;
        booster._height = 40;
        booster._X = x;
        booster._Y = y;
        booster.id = includeList[ix];
        booster._fnMouseDownEvnt = (function () {
            if (g_boosterInfo[this.id].count > 0) {
                context.AddBooster(g_boosterInfo[this.id].boosterID);
            } else {
                //show purchase screen
                context.substate = TOBAR_SNGL_PURCHASE_STATE;                
                context.purchaseScreenSingle.SetType(g_boosterInfo[this.id].boosterID);
                context.purchaseScreenSingle.Show();
            }

        });

        this._uimanager.Add(booster);
        y += 60;
    }
}

GameState.prototype.LoadUI = function () {

    var context = this;
    // load menu bar
    this.LoadMenuBar();

    // load static bubble on "+" menu
    this.staticBubble = new Array();
    var staticBubley = ["images/game_screen/balls/static/ball static A.png",
        "images/game_screen/balls/static/ball static B.png",
        "images/game_screen/balls/static/ball static C.png",
        "images/game_screen/balls/static/ball static D.png"];

    // Add extra bubbles buttons
    for (var i = 0; i < 4; i++) {
        var addBallD = new Button;
        addBallD.LoadImages(
		"images/game_screen/sidebar/plus1_click.png",
        "images/game_screen/sidebar/plus1_mouse hover.png",
	    "images/game_screen/sidebar/plus1_click.png");

        addBallD._width = 103;
        addBallD._height = 57;
        addBallD._X = 1;
        addBallD._Y = 400 + ((addBallD._height + 5) * i);
        addBallD.id = i;
        addBallD._fnMouseDownEvnt = (function () {
            context.substate = TOBAR_SNGL_PURCHASE_STATE;
            context.purchaseScreenSingle.SetType(this.id);
			var internal_context = this;
			context.purchaseScreenSingle.OnTransactComplete = function(){				
			    context.bubble_reserve.push(internal_context.id);
				context.bubbleIdx = context.bubble_reserve.length - 1;
				context.ReloadBubble();

				context.hitDisplay = true;
			};
			
            context.purchaseScreenSingle.Show();			
					
        });

        this._uimanager.Add(addBallD);

        var statbub = new ImageObject();
        statbub.Load(staticBubley[i]);
        statbub._X = addBallD._X + 53;
        statbub._Y = addBallD._Y + 8;
        this.staticBubble.push(statbub);
    }

    var home = new Button;
    home.LoadImages(
    "images/game_screen/right_bar/home.png",
    "images/game_screen/right_bar/home HOVER.png",
    "images/game_screen/right_bar/home.png");

    home._width = 32;
    home._height = 32;
    home._X = DEFAULT_WINDOW_WIDTH - (home._width+2);
    home._Y = 60;
    home.id = i;
    home._fnMouseDownEvnt = (function () {
        //...
    });

    this.progressBar = new ImageObject();
    this.progressBar.Load("images/game_screen/right_bar/progress bar play frame.png");

    this.progressBarPlay = new ImageObject();
    this.progressBarPlay.Load("images/game_screen/right_bar/progress bar play.png");
}

GameState.prototype.LoadLevelData = function ()
{
    var currentLevel = g_gameData.level_list[g_gameData.currentLevelIdx];
    var cbuble = currentLevel.bubbleMap;

    if (cbuble) {
        for (var i = 0; i < cbuble.length; i++) {
            //..
            for (var x = 0; x < FIELD_WIDTH; x++) {

                if (this.bubbleField[i][x] == null) continue;
                if (currentLevel.type & LEVEL_TYPE_CLEAR_BANK
                    && i == 0) {
                    this.bubbleField[i][x].LoadBank();
                }

                var type = cbuble[i][x] - 1;
                if (type < 0) continue;
                if (i % 2 && x >= FIELD_WIDTH - 2) continue;

                var bubble = new Bubble();
                bubble._X = this.bubbleField[i][x]._X;
                bubble._Y = this.bubbleField[i][x]._Y;
                bubble._width = RADIUS * 2;
                bubble._height = RADIUS * 2;
                bubble.Load(type);
                bubble.state = BUBBLE_STATE_DEPLOYED;
                bubble.currSpriteIdx = 3;
                this.bubbleField[i][x].bubble = bubble;
            }
        }
    }

    this.bubbleCount = g_gameData.level_list[g_gameData.currentLevelIdx].max_bubble_count;
    this.bubble_reserve = new Array();

	if (currentLevel.type & LEVEL_TYPE_PREDEFINE_BUBBLES ){
		for (var i = 0; i < currentLevel.pre_define_bubble.length; i++) {
			this.bubble_reserve.push(currentLevel.pre_define_bubble[i] - 1);
		}
	
	}else{
		for (var i = 0; i < this.bubbleCount; i++) {
			var type = Math.floor(Math.random() * BUBBLE_TYPE_COUNT);
			this.bubble_reserve.push(type);
		}
	}

	this.bubbleIdx = this.bubble_reserve.length-1;	
    
    if (currentLevel.type & LEVEL_TYPE_SURVIVAL_MODE) {
       this.scores_for_star = 3000;
   } else if (currentLevel.type & LEVEL_TYPE_TARGET_SCORE) {
      // var third = currentLevel.scoreTarget / 3;
       // this.scores_for_star = (currentLevel.scoreTarget + third) * BUBBLE_POINTS;
       this.scores_for_star = currentLevel.scoreTarget;
   } else {

       if (currentLevel.bubbleMap != null) {
           var totalScore = 0;
           for (var y = 0; y < FIELD_HEIGHT; y++) {
               for (var x = 0; x < FIELD_WIDTH; x++) {
                   if (this.bubbleField[y][x] && this.bubbleField[y][x].bubble)
                       totalScore++;
               }
           }

           var third = totalScore / 3;
           totalScore += (third * 2);
           totalScore *= BUBBLE_POINTS;
           this.scores_for_star = totalScore;// / 3;
       }
   }
    
    
    if (currentLevel.type & LEVEL_TYPE_TIMER) {
        this.timeSurvival = new Date().getTime();
    }

    if (currentLevel.type & LEVEL_TYPE_SURVIVAL_MODE) {
        this.timerMove = new Date().getTime();      
        this.survivalDead = 0;
		this.rushLevelSprite = new ImageObject();
		this.rushLevelSprite.Load("images/game_screen/text/Rush Level.png");
		this.substate = GAMESTATE_RUSHLEVEL_TEXT;
    }
	
	if (currentLevel.type & LEVEL_TYPE_OBSTACLE) {
	    this.ballBank = new ImageObject();
		this.ballBank.Load("images/game_screen/ball block.png");
	
		this.bar_width = this.ballBank._image.width;// * currentLevel.barCount;
        this.bar_Xloc = (DEFAULT_WINDOW_WIDTH / 2) - (this.bar_width / 2);
		this.bar_move_dir = 0;
    }   
}

GameState.prototype.LoadGameField = function () {
    this.bubbleField = new Array();

    for (var y = 0; y < FIELD_HEIGHT; y++) {
        this.bubbleField[y] = new Array();

        for (var x = 0; x < FIELD_WIDTH; x++) {
            var field = new Field();
            var pass = true;

            if ((y % 2) == 0) {
                field._X = x * (RADIUS * 2) + this.fieldX;
            } else {
                if (x < FIELD_WIDTH - 1) {
                    field._X = RADIUS + (x * (RADIUS * 2) + this.fieldX);
                } else {
                    pass = false;
                }
            }

            //field._Y = (y * (RADIUS * 2)) + this.fieldY;
            //field._Y -= (VERTICAL_DISTANCE * y);
            field._Y = (y * D) + this.fieldY;

            field._width = (RADIUS * 2);
            field._height = (RADIUS * 2);

            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //TODO: TEMPORARY FOR TESTING ONLY, TRANSFER THIS TO LEVEL CLASS
            //BANK WILL MATTER BASED ON LEVEL OBJECTIVE
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            /* if (y == 0) {
            field.LoadBank();
            }
            */

            if (pass) {
                this.bubbleField[y].push(field);
            } else {
                this.bubbleField[y].push(null);
            }

        }
    }
}

GameState.prototype.ReadyAnimState_Update = function (elapsed) {
    var tolerant = 1;
    var animation_speed = 7;

    sprite = null;
    if (this.substate == GAMESTATE_SUBSTATE_READYANIM) {
        sprite = this.readySprite;

    } else if (this.substate == GAMESTATE_SUBSTATE_GOANIM) {
        sprite = this.goSprite;

    } else if (this.substate == GAMESTATE_RUSHLEVEL_TEXT){
		sprite = this.rushLevelSprite;
		
	} else if (this.substate == GAMESTATE_SUBSTATE_GAMEDONE_ANIM) {
        var sprite = this.goodJobSprite;
        if (this.game_status == GAME_STATUS_FAIL) {

            if (g_gameData.level_list[g_gameData.currentLevelIdx].type
               & LEVEL_TYPE_SURVIVAL_MODE || 
                g_gameData.level_list[g_gameData.currentLevelIdx].type
               & LEVEL_TYPE_TIMER) {
                sprite = this.gameOverSprite;
            } else {
                sprite = this.noMoreBubblesSprite;
            }
        }
    }

    if (this.ready_width < sprite._image.width - tolerant) {
        var diff = sprite._image.width - this.ready_width;
        this.ready_width += (diff * animation_speed * elapsed);
    } else {
        this.ready_width = sprite._image.width;
    }
    if (this.ready_height < sprite._image.height - tolerant) {
        var diff = sprite._image.height - this.ready_height;
        this.ready_height += (diff * animation_speed * elapsed);
    } else {
        this.ready_height = sprite._image.height;
    }

    if (this.ready_width == sprite._image.width &&
            this.ready_height == sprite._image.height) {

        if (this.substate == GAMESTATE_SUBSTATE_READYANIM) {
            this.substate = GAMESTATE_SUBSTATE_GOANIM;

        } else if (this.substate == GAMESTATE_SUBSTATE_GOANIM ||
			this.substate == GAMESTATE_RUSHLEVEL_TEXT) {
            this.substate = GAMESTATE_SUBSTATE_GAME;
        } else if (this.substate == GAMESTATE_SUBSTATE_GAMEDONE_ANIM) {
            this.substate = GAMESTATE_SUBSTATE_GAMEDONE;
        } 

        this.ready_width = TEXT_START_WIDTH;
        this.ready_height = TEXT_START_HEIGHT;
    }
}

GameState.prototype.CheckGameStatus = function ()
{
    //...
    if (this.substate != GAMESTATE_SUBSTATE_GAME) return;
    if (this.substate == GAMESTATE_SUBSTATE_END) return;

    var currentLevel = g_gameData.level_list[g_gameData.currentLevelIdx];
    var goal = currentLevel.type;
    var result = 0;
    var complete = true;
    var ret = false;

    if (goal & LEVEL_TYPE_CLEAR_ALL) {
        for (var y = 0; y < FIELD_HEIGHT; y++) {
            for (var x = 0; x < FIELD_WIDTH; x++) {
                if (this.bubbleField[y][x] &&
                    this.bubbleField[y][x].bubble != null &&
                    this.bubbleField[y][x].bubble.state != BUBBLE_STATE_DYING) {
                    complete = false;                    
                    break;
                }
            }
        }

        if (complete) {
            result |= LEVEL_TYPE_CLEAR_ALL;
            if (goal & LEVEL_TYPE_TIMER) {
                result |= LEVEL_TYPE_TIMER;
            }
        }
    }

    if (goal & LEVEL_TYPE_TIMER ) {
        var currTime = new Date().getTime();
        var diff = (currTime - this.timeSurvival) / 1000;
        var count = g_gameData.level_list[g_gameData.currentLevelIdx].timerMax - diff;

        if (count <= 0) {
            result |= LEVEL_TYPE_TIMER;

            if (goal & LEVEL_TYPE_SURVIVAL_MODE) {
                result |= LEVEL_TYPE_SURVIVAL_MODE;
            }
        }
    }

    if (goal & LEVEL_TYPE_CLEAR_BANK) {
        var count = 0;
        for (var x = 0; x < FIELD_WIDTH; x++) {
            if (this.bubbleField[0][x].bubble == null)
                count++;
        }

        if (count >= 10) {
            result |= LEVEL_TYPE_CLEAR_BANK;
            if (goal & LEVEL_TYPE_TIMER) {
                result |= LEVEL_TYPE_TIMER;
            }

        }
    }

    if (goal & LEVEL_TYPE_TARGET_SCORE) {
        if (this.targetScore >= currentLevel.scoreTarget) {
            result |= LEVEL_TYPE_TARGET_SCORE;
        }
    }

    var notcare = [LEVEL_TYPE_OBSTACLE,
            LEVEL_TYPE_EMPTYFIELD, 
			LEVEL_TYPE_PREDEFINE_BUBBLES,
            LEVEL_TYPE_NO_SIGHT];

    for (var i = 0; i < notcare.length; i++) {
        if (goal & notcare[i]) {
            result |= notcare[i];
        }
    }

    if (result == goal && result != 0) {

        this.game_status = GAME_STATUS_COMPLETE;

        ret = true;
    } else {
        // check if we run out of bubble for normal game
        if (this.bubble_reserve.length <= 0 && this.currentBubble == null)
        {
            //game over -- we run out of bubble
            this.game_status = GAME_STATUS_FAIL;
            ret = true;

        }else if (goal & LEVEL_TYPE_SURVIVAL_MODE) {
            if (this.survivalDead > 0) {
                this.game_status = GAME_STATUS_FAIL;
                ret = true;
            }
        } else if (result & LEVEL_TYPE_TIMER) {
            this.game_status = GAME_STATUS_FAIL;
            ret = true;
        }

    }

    //check if there are still jumping bubbles
    if (this.jumpList.length > 0)
        ret = false;

    if (ret) {
        this.game_pause_timer = new Date().getTime();
        this.substate = GAMESTATE_SUBSTATE_GAMEDONE_ANIM;
    }


    if (ret) {
        if (this.bg_music) {
            this.bg_music.pause();
            this.bg_music.currentTime = 0;
        }
        if (this.game_status == GAME_STATUS_FAIL) {
            this.meg.Loose();
            
            if (this.levelFailedSfx) {
                this.levelFailedSfx.play();
            }
        } else if (this.game_status == GAME_STATUS_COMPLETE) {
            this.meg.Win();
            this.demon2.Win();
            if (this.levelSuccessSfx) {
                this.levelSuccessSfx.play();

                if (this.bg_music) {
                    this.bg_music.volume = 0;
                }
            }
        }
    }

    return ret;
}

GameState.prototype.OnGameComplete = function ()
{
    // update total score
	var score = this.targetScore;
    if (g_gameData.level_list[g_gameData.currentLevelIdx].friends_list) {
        for (var i = 0; i < g_gameData.level_list[g_gameData.currentLevelIdx].friends_list.length; i++) {
            var fb = g_gameData.level_list[g_gameData.currentLevelIdx].friends_list[i];
            if (fb.fbProfile.id == g_mainUser.id) {
                if (fb.score < this.targetScore) {
                    g_gameData.level_list[g_gameData.currentLevelIdx].friends_list[i].score = this.targetScore;
					score =  fb.score;
                    g_gameData.level_list[g_gameData.currentLevelIdx].friends_list.sort(SortScore);
                }
                break;
            }
        }
    }

    var currentLevel = g_gameData.level_list[g_gameData.currentLevelIdx];
    if (g_gameData.currentLevelIdx + 1 > g_gameData.top_level) {
        if (g_gameData.currentLevelIdx + 1 < g_gameData.level_list.length) {
            g_gameData.top_level = g_gameData.currentLevelIdx + 1;
			
            if (g_mainUser.id != -1) {
                FBAccess_CompleteLevel(g_gameData.currentLevelIdx);
            }
		}
    }
	Ajax_UpdateMaxLevel(g_gameData.top_level);
	
    // load the scores target
  
    //check clear scores objective    
	var reward =(score / this.scores_for_star);
	reward = (reward > 1) ? 1 : reward;
	reward = reward * 3;

    //if (this.scores_for_star != 0)
      //  reward = this.score / this.scores_for_star;

    reward = (reward > 3) ? 3 : reward;
    if (reward > currentLevel.starCount) {
        currentLevel.starCount = Math.floor(reward);
    }
 
    // base star computation 
  /*  var remain = this.bubble_reserve.length - (this.bubbleIdx+1);
    var reward = Math.ceil((remain / currentLevel.max_bubble_count) * 3);

    if (reward > currentLevel.starCount) {
        currentLevel.starCount = reward;
    }*/
    
    g_gameData.totalScore += this.targetScore;
    Ajax_UpdateTotalScore(g_gameData.totalScore);

    if (g_mainUser.id != -1) {
        FBAccess_ScoreAPI(g_gameData.totalScore);
    }

    Ajax_UpdateLevelInfo(g_gameData.currentLevelIdx, 
        score, currentLevel.starCount);
}

GameState.prototype.OnAbout = function () {
    this.substate = GAMESTATE_TIPSCREEN;
    this.tipScreen.strings = g_gameData.level_list[g_gameData.currentLevelIdx].description;
    var context = this;
    this.tipScreen.fnOnClose = function () {
        context.substate = 0;
    };
    this.tipScreen.Show();
}

GameState.prototype.ShiftBubble = function ()
{
    for (var y = FIELD_HEIGHT - 1; y >= 0; y--) {        
        for (var x = 0; x < FIELD_WIDTH; x++) {
            
            if ( (y % 2 && x >= FIELD_WIDTH - 1) || (y-1) % 2 && x >= FIELD_WIDTH - 1) continue;
            if ((y == FIELD_HEIGHT - 1) && this.bubbleField[y][x].bubble !=null) {
                //there is a bubble at the end already
                ++this.survivalDead;
                continue;
            }
            if (y - 1 >= 0) {
                
                if (this.bubbleField[y-1][x].bubble) {
                    this.bubbleField[y-1][x].bubble._X = this.bubbleField[y][x]._X;
                    this.bubbleField[y - 1][x].bubble._Y = this.bubbleField[y][x]._Y;
                }
                this.bubbleField[y][x].bubble = this.bubbleField[y - 1][x].bubble;
            }
        }
    }

    var tempArray = new Array();
    InitFieldTemplate(tempArray);

    var param = new GenerateParam();
    param.blankpct = Math.floor(Math.random() * 5);
    GenerateRect(FIELD_WIDTH, 1, tempArray, param);

    for (var x = 0; x < FIELD_WIDTH; x++) {
        var type = tempArray[0][x] - 1;
        if (type < 0) {
            this.bubbleField[0][x].bubble = null;
            continue;
        }

        var bubble = new Bubble();
        bubble._X = this.bubbleField[0][x]._X;
        bubble._Y = this.bubbleField[0][x]._Y;
        bubble._width = RADIUS * 2;
        bubble._height = RADIUS * 2;
        bubble.Load(type);
        bubble.state = BUBBLE_STATE_DEPLOYED;
        bubble.currSpriteIdx = 3;
        this.bubbleField[0][x].bubble = bubble;
    }

    this.dropList = new Array();
    this.RemoveNotConnected();
}

GameState.prototype.Update = function (elapsed) {

    // Update UIs
    this._uimanager.Update(elapsed);
    this.currentBackground.Update(elapsed);

    //update the demons
    this.demon1.Update(elapsed);
    this.demon2.Update(elapsed);
    this.meg.Update(elapsed);

    if (this.substate == GAMESTATE_SUBSTATE_READYANIM ||
        this.substate == GAMESTATE_SUBSTATE_GOANIM ||
        this.substate == GAMESTATE_SUBSTATE_GAMEDONE_ANIM ||
		this.substate == GAMESTATE_RUSHLEVEL_TEXT) {
        this.ReadyAnimState_Update(elapsed);
       // return;
    }

    if (this.substate == GAMESTATE_SUBSTATE_GAMEDONE) {
        var currTime = new Date().getTime();
        var rome = (currTime - this.game_pause_timer) / 1000.0;

        if (rome >= 5) {
            this.substate = GAMESTATE_SUBSTATE_LEVELINFOSCRN;
            this.level_complete_screen.type = this.game_status - 1;
            this.level_complete_screen.score = this.targetScore;
            this.level_complete_screen.Show(g_gameData.currentLevelIdx);

            // update level infor data
            if (this.game_status == GAME_STATUS_COMPLETE) {
                this.OnGameComplete();
            } else {
                g_gameData.UpdateLife(-1);
            }

            return;
        }
    }

    if (this.substate == GAMESTATE_SUBSTATE_LEVELINFOSCRN) {
        this.level_complete_screen.top_bar_score = this.game_score;
        this.level_complete_screen.Update(elapsed);
        return;
    }

    if (this.substate == GAMESTATE_TIPSCREEN) {
        this.tipScreen.Update(elapsed);
        return;
    }

    var paused = true;
    if (this.substate == TOPBAR_MULT_PURCHASE_STATE) {
        this.purchaseScreenMultiple.Update(elapsed);
    } else if (this.substate == TOBAR_SNGL_PURCHASE_STATE) {
        this.purchaseScreenSingle.Update(elapsed);
    } else if (this.substate == TOPBAR_GAMESCRN_QUITSCREEN) {
        this.quitScreen.Update(elapsed);
    } else if (this.substate == GAMESTATE_SUBSTATE_REWARD) {
        this.rewardWnd.Update(elapsed);
    } else if (this.substate == GAMESTATE_SWITCHAROO) {

        if (this.gun.bubble._Y > this.gunLocY) {
            this.gun.bubble._Y -= (400 * elapsed);
        } else {
            this.gun.bubble._Y = this.gunLocY;
            this.substate = 0;
            this.Switch();
        }

    } else {
        paused = false;
    }

    if (g_gameData.level_list[g_gameData.currentLevelIdx].type
        & LEVEL_TYPE_SURVIVAL_MODE)
    {
        var currTime = new Date().getTime();
        var diff = (currTime - this.timerMove) / 1000;
        if (diff >= 5) {
            this.timerMove = currTime;
            this.ShiftBubble();
            return;
        }
    }

	 if (g_gameData.level_list[g_gameData.currentLevelIdx].type
        & LEVEL_TYPE_OBSTACLE)
    {
		if( g_gameData.level_list[g_gameData.currentLevelIdx].isBarMoving) {
			var BAR_MOVE_SPEED = g_gameData.level_list[g_gameData.currentLevelIdx].barMovingSpeed;
			if( this.bar_move_dir == 0 ){
				// moving right
				if( this.bar_Xloc + this.bar_width >= this.fieldLimitX){
					this.bar_move_dir = 1;
				} else {
					this.bar_Xloc += (BAR_MOVE_SPEED * elapsed);
				}
			}else if( this.bar_move_dir == 1 ){
				if( this.bar_Xloc <= this.fieldX ) { 
					this.bar_move_dir = 0;
				}
				else {
					this.bar_Xloc -= (BAR_MOVE_SPEED * elapsed);
				}
			}
		}
    }

    //...
    if (paused) {
        this.shotTimer = new Date().getTime();
        return;
    }

    this.CheckGameStatus();
    if (this.currentBubble) {

        //automatic fire bubble after 5 seconds
        if (this.shotTimer != 0
            && this.substate == GAMESTATE_SUBSTATE_GAME
            && this.currentBubble.state == BUBBLE_STATE_LOADED)
        {
            var currTime = new Date().getTime();
            this.elapsed = (currTime - this.shotTimer) / 1000.0;
            if (this.elapsed >= 5) {
               //this.Shoot();
            }
        }

        this.currentBubble.Update(elapsed);

        if (this.currentBubble.state == BUBBLE_STATE_FIRED) {

            //its something bounce
            if (this.currentBubble._X <= this.fieldX ||
                (this.currentBubble._X + RADIUS * 2) >= this.fieldLimitX) {
                this.currentBubble.deltaX *= -1;

                bounced = true;

                //this.ComputeTarget();

                if (this.bounceSfx) {
                    this.bounceSfx.play();
                }
            }

            if (g_gameData.level_list[g_gameData.currentLevelIdx].type
                & LEVEL_TYPE_OBSTACLE) {

                    var yi = g_gameData.level_list[g_gameData.currentLevelIdx].barY;
                    var total_width = this.bar_width;//this.ballBank._image.width * g_gameData.level_list[g_gameData.currentLevelIdx].barCount;
					
                    var xi = this.bar_Xloc;//(DEFAULT_WINDOW_WIDTH / 2) - (total_width / 2);
                   
                    var cx = this.currentBubble._X + RADIUS;
                    var cy = this.currentBubble._Y + RADIUS;
                    
                    var rect1 = new Rect(this.currentBubble._X, this.currentBubble._Y,
                        RADIUS * 2, RADIUS * 2);

                    var rect2 = new Rect(xi, yi, total_width, this.ballBank._image.height);

                    if (Collision_RectCollide(rect1, rect2)) {
                           this.JumpBubble(this.currentBubble, true);
                           this.currentBubble = null;

                           if (this.bounceSfx) {
                               this.bounceSfx.play();
                           }
                           return;
                    }
            }
        }
		
        //
        //this.ParkBubble();
        //..

        if (this.currentBubble._Y <= this.fieldY) {
            this.ParkBubbleEx();
        } else {
            for (var y = 0; y < FIELD_HEIGHT; y++) {
                for (var x = 0; x < FIELD_WIDTH; x++) {

                    if (this.bubbleField[y][x] == null) continue;
                    if (this.bubbleField[y][x].bubble == null) continue;

                    if (this.IsCollide(this.bubbleField[y][x], this.currentBubble)) {
                        this.ParkBubbleEx();
                        break;

                    }
                }
            }
        }

    } else {
       this.ReloadBubble();
    }

    for (var i = 0; i < this.jumpList.length; i++) {
        this.jumpList[i].Update(elapsed);
    }

    for (var y = 0; y < FIELD_HEIGHT; y++) {
        for (var x = 0; x < FIELD_WIDTH; x++) {

            if (this.bubbleField[y][x] == null) continue;
            this.bubbleField[y][x].Update(elapsed);

        }
    }

    // set top bar score
    if (this.game_score < this.targetScore) {
        this.game_score += this.scoreStep;
    } else {
        this.game_score = this.targetScore;
    }

    if (g_gameData.coins < this.gold_target) {
        g_gameData.coins += 1;
    } else {
        g_gameData.coins = this.gold_target;
    }
			
    this.top_bar_score = this.game_score;
    this.top_bar_gold = g_gameData.coins;
    g_gameData.coins = this.top_bar_gold;	
	
    if (this.hitDisplay) {
        this.ballLauncherHint.Update(elapsed);
    }

    // coins coins coins!
    for (var i = 0; i < this.coin_list.length; i++) {

        if (this.coin_list[i]._Y > 0) {
            this.coin_list[i]._Y -= (425 * elapsed);

            this.coin_list[i].Update(elapsed);
        } else {
            this.coin_list.splice(i, 1);
            this.gold_target++;
			Ajax_UpdateCoins(this.gold_target);
			
            if (this.coin) {
                this.coin.currentTime = 0.25;
                this.coin.play();
            }
			
			//////////////////////////////////////////////////////////////////
			if( this.gold_target % REWARD_COINS == 0 && this.gold_target > 0){
				this.substate = GAMESTATE_SUBSTATE_REWARD;
				this.rewardWnd.Show();
				
				var reward = RandomizeReward();		
				this.rewardWnd.SetType(reward);        
				
				if (this.rewardSfx) {
					this.rewardSfx.play();
				}
			}
			//////////////////////////////////////////////////////////////////
        }
    }

    if (this.show_lightning) {
        this.lightning.Update(elapsed);
    }
}

GameState.prototype.IsCollide = function (bubble, currentBubble) {
    if (this.currentBubble == null) return;
    
    var cx = (currentBubble._X + RADIUS) - this.fieldX;
    var cy = (currentBubble._Y + RADIUS) - this.fieldY;
    var bx = (bubble._X + RADIUS) - this.fieldX;
    var by = (bubble._Y + RADIUS) - this.fieldY;
    var dist_x = bx - cx;
    var dist_y = by - cy;
    var value = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
    var value2 = 2 * (RADIUS_EZ);

    var result = (value <= value2);
    if (!result) {
        if (value > value2) {
            var diff = value - value2;
            if (diff <= (RADIUS_ERROR*2)+1)
                result = true;
        }
    }

    return result;
}

GameState.prototype.DrawForMode = function (gfx)
{
    //////////////////////////////////////////////////////////////////////////
    // Level Game modes

    if (g_gameData.level_list[g_gameData.currentLevelIdx].type
       & LEVEL_TYPE_TIMER) {
        var currTime = new Date().getTime();
        var diff = (currTime - this.timeSurvival) / 1000;
        var count = g_gameData.level_list[g_gameData.currentLevelIdx].timerMax - diff;

        if (count >= 0) {
            gfx.DrawText(FormatTimeStr(count),
               DEFAULT_WINDOW_WIDTH - 200, 120, "rgb(255,255,255)",
               "Bold 32pt jonny_quest_classicregular");
        }
    }
    if (g_gameData.level_list[g_gameData.currentLevelIdx].type
       & LEVEL_TYPE_OBSTACLE) {

        var y = g_gameData.level_list[g_gameData.currentLevelIdx].barY;
        var total_width = this.bar_width;//this.ballBank._image.width * g_gameData.level_list[g_gameData.currentLevelIdx].barCount;
        var x = this.bar_Xloc;//(DEFAULT_WINDOW_WIDTH / 2) - (total_width / 2);
        //for (var i = 0; i <  g_gameData.level_list[g_gameData.currentLevelIdx].barCount; i++) {
            this.ballBank.Draw(gfx, x, y);
           // x += this.ballBank._image.width;
       // }
    }
    ///////////////////////////////////////////////////////////////////////////////////
}

GameState.prototype.Draw = function (gfx) {
    //...

    //////////////////////////////////////////////////
	// TODO: how to handle other background? maybe another class	
	this.currentBackground.Draw(gfx);	
    /////////////////////////////////////////////////

    //-------------------------------------------
    //Draw something about lines now
    this.DrawLineOfSight(gfx);


    // Field will not be drawn in actual! drawField is only used for Debugging
    this.DrawField(gfx);

    if (this.show_lightning) {
        this.lightning._X = this.fieldX;
        this.lightning._Y = this.lightning_Y;
        this.lightning.Draw(gfx);
    }

    // Draw two borders
    this.borderImg.Draw(gfx, this.fieldLimitX, this.fieldY);
    this.borderImg.Draw(gfx, this.fieldX - this.borderImg._image.width, this.fieldY);
    //-------------------------------------------

    this.DrawForMode(gfx);

    // Draw the detached bubble
    for (var i = 0; i < this.jumpList.length; i++) {
        this.jumpList[i].Draw(gfx);
    }

    for (var i = 0; i < this.coin_list.length; i++) {
        this.coin_list[i].Draw(gfx);
    }

    //update the demons
    this.demon1.Draw(gfx);
    this.demon2.Draw(gfx);
    this.meg.Draw(gfx);

    /*if (this.currentBubble) {
        this.currentBubble.Draw(gfx);
    }*/

    if (this.hitDisplay) {
        this.ballLauncherHint.Draw(gfx, this.gun._X - 34, this.gun._Y - 45);
    }

    this.gun.currentBubble = this.currentBubble;
    this.gun.angle = this.angle;
    this.gun.Draw(gfx);
    this.DrawHUD(gfx);
    
    if (g_gameData.level_list[this.level_id].bg_type == 2) {
        this.currentBackground.DrawBoat(gfx);
    }

    if (this.substate == GAMESTATE_SUBSTATE_READYANIM) {

        gfx.DrawImage(this.readySprite._image,
            0, 0,
            this.readySprite._image.width,
            this.readySprite._image.height,
            (DEFAULT_WINDOW_WIDTH / 2) - (this.ready_width / 2),
            (DEFAULT_WINDOW_HEIGHT / 2) - (this.ready_height / 2),
            this.ready_width,
            this.ready_height);
    } else if (this.substate == GAMESTATE_SUBSTATE_GOANIM) {
        gfx.DrawImage(this.goSprite._image,
            0, 0,
            this.goSprite._image.width,
            this.goSprite._image.height,
            (DEFAULT_WINDOW_WIDTH / 2) - (this.ready_width / 2),
            (DEFAULT_WINDOW_HEIGHT / 2) - (this.ready_height / 2),
            this.ready_width,
            this.ready_height);
			
    } else if (this.substate == GAMESTATE_RUSHLEVEL_TEXT){
		
		gfx.DrawImage(this.rushLevelSprite._image,
            0, 0,
            this.rushLevelSprite._image.width,
            this.rushLevelSprite._image.height,
            (DEFAULT_WINDOW_WIDTH / 2) - (this.ready_width / 2),
            (DEFAULT_WINDOW_HEIGHT / 2) - (this.ready_height / 2),
            this.ready_width,
            this.ready_height);
		
	} else if (this.substate == GAMESTATE_SUBSTATE_GAMEDONE ||
        this.substate ==  GAMESTATE_SUBSTATE_GAMEDONE_ANIM) {
        var sprite = this.goodJobSprite;

        if (this.game_status == GAME_STATUS_FAIL) {
            if (g_gameData.level_list[g_gameData.currentLevelIdx].type & LEVEL_TYPE_SURVIVAL_MODE || 
                g_gameData.level_list[g_gameData.currentLevelIdx].type & LEVEL_TYPE_TIMER) {
                sprite = this.gameOverSprite;
            } else {
                sprite = this.noMoreBubblesSprite;
            }
        }

        if (this.substate == GAMESTATE_SUBSTATE_GAMEDONE) {
            sprite.Draw(gfx,
                (DEFAULT_WINDOW_WIDTH / 2) - (sprite._image.width / 2),
                (DEFAULT_WINDOW_HEIGHT / 2) - (sprite._image.height / 2));

        } else {
            gfx.DrawImage(sprite._image,
                0, 0,
                sprite._image.width,
                sprite._image.height,
                (DEFAULT_WINDOW_WIDTH / 2) - (this.ready_width / 2),
                (DEFAULT_WINDOW_HEIGHT / 2) - (this.ready_height / 2),
                this.ready_width,
                this.ready_height);
        }
    } else if (this.substate == TOPBAR_MULT_PURCHASE_STATE) {
        this.purchaseScreenMultiple.Draw(gfx);
    } else if (this.substate == TOBAR_SNGL_PURCHASE_STATE) {
        this.purchaseScreenSingle.Draw(gfx);

    } else if (this.substate == TOPBAR_GAMESCRN_QUITSCREEN) {
        this.quitScreen.Draw(gfx);

    } else if (this.substate == GAMESTATE_TIPSCREEN) {
        this.tipScreen.Draw(gfx);
    } else if (this.substate == GAMESTATE_SUBSTATE_REWARD) {
        this.rewardWnd.Draw(gfx);
    }

    // draw bubble count text
    if (!(g_gameData.level_list[g_gameData.currentLevelIdx].type
    & LEVEL_TYPE_SURVIVAL_MODE)) {
        var ctx = gfx._canvasBufferContext;
        var style = "Bold 31pt jonny_quest_classicregular";
        ctx.font = style;
        var text = this.bubble_reserve.length;//this.bubbleCount;

        var textWidth = ctx.measureText(text);
        var x = (DEFAULT_WINDOW_WIDTH / 2) - textWidth.width / 2;
        var y = 640;

        color = "rgb(138, 244, 227)";
        if (this.currentBubble != null) {
            if (this.currentBubble.type == 1) {
                color = "rgb(238, 3, 115)";
            } else if (this.currentBubble.type == 2) {
                color = "rgb(5, 196, 23)";

            } else if (this.currentBubble.type == 3) {
                color = "rgb(230, 200, 60)";
            }

            gfx.DrawText(text,
                x, y, "rgb(0,0,0)",
                "Bold 32pt jonny_quest_classicregular");

            gfx.DrawText(text,
                x, y, color, style);
        }
    }

    if (this.substate == GAMESTATE_SUBSTATE_LEVELINFOSCRN) {
        this.level_complete_screen.Draw(gfx);        
    }
   
    this.DrawMenuBar(gfx);
    var x = DEFAULT_WINDOW_WIDTH - (this.progressBar._image.width + 8);
    var y = DEFAULT_WINDOW_HEIGHT - (this.progressBar._image.height + 50);
    this.progressBar.Draw(gfx, x, y);

    // Progress bar computation   
    var percentage = this.targetScore / this.scores_for_star;
    percentage = (percentage < 0) ? 0 : percentage;
    percentage = (percentage > 1) ? 1 : percentage;

    if (percentage != 0) {
        var part = this.progressBarPlay._image.height -
            (percentage * this.progressBarPlay._image.height);
        var canvasY = (y + part);
        var height = this.progressBarPlay._image.height - part;

        gfx.DrawImage(this.progressBarPlay._image, 0, part,
               this.progressBarPlay._image.width, height,
               x, canvasY,
               this.progressBarPlay._image.width, height,
               1.0);
    }
}

GameState.prototype.DrawHUD = function (gfx) {
   
    this.sideBar.Draw(gfx, 0, this.topBarUI._image.height); 
    this.boosterPanel.Draw(gfx, 4, this.topBarUI._image.height + 20);
    this._uimanager.Draw(gfx);

    // Draw the text for bubble
    var x = 35+30;
    var y = 130;

    for (var i = 0; i < this.boosterIncludeList.length; i++) {
        var text = g_boosterInfo[includeList[i]].count;

        gfx.DrawText(text,
           x, y, "rgb(255,255,255)", "10pt ERASDEMI");

        y += 60;
    }


    for (var i = 0; i < this.staticBubble.length; i++) {
        this.staticBubble[i].Draw(gfx);
    }   
}

GameState.prototype.DrawLineOfSight = function (gfx) {

    if (this.currentBubble == null) return;
    if (this.currentBubble.state != BUBBLE_STATE_LOADED) return;
    
    if (g_gameData.level_list[g_gameData.currentLevelIdx].type
               & LEVEL_TYPE_NO_SIGHT) {
        return;
    }

    var tolerant = 20;
    var num_points = 30;

    var angle = mouse_x - this.gunLocX;
    var angleRadians = angle * Math.PI / 180.0;

    var point = new Point(this.gunLocX, this.gunLocY);
    var diffx = point._X - mouse_x;
    var diffy = point._Y - mouse_y;

    var y = point._Y;
    var x = point._X;
    var stepx = diffx / num_points;
    var stepy = diffy / num_points;
    var count = 0;

    var type = this.currentBubble.type;
    if (this.currentBubble.isBooster)
        type = 0;

    var image = this.LOSImgList[type];

    do {
        //...
        var renderedX = x;

        if (x - RADIUS <= this.fieldX || x + RADIUS >= this.fieldLimitX) {
            stepx *= -1;
        }

        image.Draw(gfx, x - 5, y);

        x -= stepx;
        y -= stepy;

    } while (++count < num_points);

}

GameState.prototype.DrawField = function (gfx) {
    for (var y = 0; y < FIELD_HEIGHT; y++) {
        for (var x = 0; x < FIELD_WIDTH; x++) {
            if (this.bubbleField[y][x] /*&& this.bubbleField[y][x].bubble*/)
                this.bubbleField[y][x].Draw(gfx);
        }
    }
}

GameState.prototype.AddBooster = function (id)
{
    if (this.substate != 0) return;
    if (this.currentBubble.state != BUBBLE_STATE_LOADED) return;

    this.currentBubble = new Bubble();
    this.currentBubble._X = this.gunLocX - RADIUS;
    this.currentBubble._Y = this.gunLocY;
    this.currentBubble._width = RADIUS * 2;
    this.currentBubble._height = RADIUS * 2;

    this.currentBubble.BoosterLoad(id);
    this.currentBubble.state = BUBBLE_STATE_LOADED;

    // cache current time
    this.shotTimer = new Date().getTime();

    this.hitDisplay = true;
}

//-------------------------------------------------------------------------------
// Game related classes
//-------------------------------------------------------------------------------

GameState.prototype.ReloadBubble = function () {
    
    if (this.bubble_reserve.length <= 0 || this.bubbleIdx < 0) {
        this.bubbleIdx = -1;
        return;
    } else {
        if (this.bubble_reserve.length <= 10) {
            this.demon2.worried = true;
        }
    }

    this.currentBubble = new Bubble();
    this.currentBubble._X = this.gunLocX - RADIUS;
    this.currentBubble._Y = this.gunLocY;
    this.currentBubble._width = RADIUS * 2;
    this.currentBubble._height = RADIUS * 2;

    // cache current time
    this.shotTimer = new Date().getTime();

    if (g_gameData.level_list[g_gameData.currentLevelIdx].type
       & LEVEL_TYPE_SURVIVAL_MODE) {

        var type = Math.floor(Math.random() * BUBBLE_TYPE_COUNT);
        this.currentBubble.Load(type);
        this.currentBubble.state = BUBBLE_STATE_LOADED;

        var nextIdx = Math.floor(Math.random() * BUBBLE_TYPE_COUNT);
    }
    else {
        var type = this.bubble_reserve[this.bubbleIdx];
        this.currentBubble.Load(type);
        this.currentBubble.state = BUBBLE_STATE_LOADED;
        
        //var nextIdx = (this.bubbleIdx + 1) %
          //  this.bubble_reserve.length;
        var nextIdx = this.bubbleIdx-1;
        if (nextIdx < 0)
            nextIdx = this.bubble_reserve.length - 1;

        if (nextIdx < 0 || nextIdx == this.bubbleIdx)
            nextIdx = -1;
        else {
            nextIdx = this.bubble_reserve[nextIdx];
        }
		
        this.gun.LoadNextBubble(nextIdx);
    }
    
    bounced = false;
}

GameState.prototype.IsNewChain = function (col, row, match) {

    if (row == -1 || col == -1) return false;
    if (row >= FIELD_HEIGHT || col >= FIELD_WIDTH) return false;

    if (this.bubbleField[row][col] == null) return false;
    if (this.bubbleField[row][col].bubble == null) return false;

    if (this.bubbleField[row][col].bubble.type != match)
    {
        if (this.bubbleField[row][col].bubble.type != BUBBLE_TYPE_RAINBOW_BOOSTER)
        {
            return false;
        }
        
    }

    for (var i = 0; i < this.chainList.length; i++) {
        var pt = this.chainList[i];
        if (pt._X == col && pt._Y == row) return false;
    }

    return true;
}

GameState.prototype.GetChain = function (col, row, type) {
    var pt = new Point(col, row);
    this.chainList.push(pt);

    var odd = row % 2;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                if (i == 0 || j == 0 || (j == -1 && odd == 0) ||
                    (j == 1 && odd == 1)) {
                    if (this.IsNewChain(col + j, row + i, type)) {
                        this.GetChain(col + j, row + i, type);
                    }
                }
            }
        } // end of for
    } //end of for
}

GameState.prototype.JumpBubble = function (bubble,end) {
    var bubble = bubble;
    bubble.Jump();

    if(!end)
        bubble.currSpriteIdx = BUBBLE_VANISHANIM_IDX;

    var context = this;
    bubble.fnJumpDone = (function () {
       // context.targetScore += BUBBLE_POINTS;
        // remove bubble from the list
        for (var i = 0; i < context.jumpList.length; i++) {
            if (this == context.jumpList[i]) {
                context.jumpList.splice(i, 1);
                break;
            }
        }
    });

    this.jumpList.push(bubble);
}

//-------------------------------------------------------------------------------
// Booster Bubble handling
//-------------------------------------------------------------------------------

GameState.prototype.HandleRainbowBooster = function (col,row)
{
    //...
   // var pt = new Point(col, row);
    //this.chainList.push(pt);

    var typeList = new Array();
    var odd = row % 2;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                if (i == 0 || j == 0 || (j == -1 && odd == 0) ||
                    (j == 1 && odd == 1)) {
                    
                    var ccol = col + j;
                    var crow = row + i;

                    if (crow == -1 || ccol == -1) continue;
                    if (crow >= FIELD_HEIGHT || ccol >= FIELD_WIDTH) continue;

                    if (this.bubbleField[crow][ccol] == null) continue;
                    if (this.bubbleField[crow][ccol].bubble == null) continue;

                    var item = new Array();
                    item[0] = ccol;
                    item[1] = crow;
                    item[2] = this.bubbleField[crow][ccol].bubble.type;
                    typeList.push(item);                    

                }
            }
        } // end of for
    } //end of for

    for (var mp = 0; mp < typeList.length; mp++) {
        var item = typeList[mp];
        col = item[0];
        row = item[1];
        var type = item[2];
        var odd = row % 2;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i != 0 || j != 0) {
                    if (i == 0 || j == 0 || (j == -1 && odd == 0) ||
                        (j == 1 && odd == 1)) {
                        if (this.IsNewChain(col + j, row + i, type)) {
                            this.GetChain(col + j, row + i, type);
                        }
                    }
                }
            } // end of for
        } //end of for
    }
}

GameState.prototype.HandleBombBooster = function (col, row, layer)
{
    var pt = new Point(col, row);
    this.chainList.push(pt);

    // two layer explosion
    if (layer > 1) return;

    var odd = row % 2;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                if (i == 0 || j == 0 || (j == -1 && odd == 0) ||
                    (j == 1 && odd == 1)) {

                    var ccol = col + j;
                    var crow = row + i;

                    if (crow == -1 || ccol == -1)
                        continue;
                    if (crow >= FIELD_HEIGHT || ccol >= FIELD_WIDTH)
                        continue;

                    if (this.bubbleField[crow][ccol] == null)
                        continue;
                    if (this.bubbleField[crow][ccol].bubble == null)
                        continue;

                    var pt = new Point(ccol, crow);
                    this.chainList.push(pt);

                    this.HandleBombBooster(ccol, crow, layer+1);

                }
            }
        } // end of for
    } //end of for

}

GameState.prototype.HandlePaintBooster = function (col, row) {
    //...
    // check the type first
    var type = this.currentBubble.type - BUBBLE_TYPE_PAINT_A;
    var odd = row % 2;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                if (i == 0 || j == 0 || (j == -1 && odd == 0) ||
                    (j == 1 && odd == 1)) {

                    var ccol = col + j;
                    var crow = row + i;

                    if (crow == -1 || ccol == -1) continue;
                    if (crow >= FIELD_HEIGHT || ccol >= FIELD_WIDTH) continue;

                    if (this.bubbleField[crow][ccol] == null) continue;
                    if (this.bubbleField[crow][ccol].bubble == null) continue;
                    
                    this.bubbleField[crow][ccol].bubble.Load(type);
                }
            }
        } // end of for
    } //end of for

    this.currentBubble.Load(type);
    //this.GetChain(col, row, this.currentBubble.type);

}

GameState.prototype.HandleHorizontalBooster = function (col, row)
{
    for (var x = 0; x < FIELD_WIDTH; x++) {
        if (this.bubbleField[row][x] == null) continue;
        if (this.bubbleField[row][x].bubble == null) continue;

        var pt = new Point(x, row);
        this.chainList.push(pt);
    }
}

GameState.prototype.HandleVerticalBooster = function (col, row)
{
    var odd = row % 2;
    var start = col;
    if (!odd) {
        start = col - 1;
    }

    for (var y = 0; y < FIELD_HEIGHT; y++) {

        for (var x = start; x < start + 2; x++) {
            
            if (x == -1 || (x > FIELD_WIDTH - 2 && (y % 2)) ||
                x > FIELD_WIDTH - 1 && !(y % 2)) continue;

            if (this.bubbleField[y][x] == null) continue;
            if (this.bubbleField[y][x].bubble == null) continue;

            var pt = new Point(x, y);
            this.chainList.push(pt);

        }
    } 
}

//-------------------------------------------------------------------------------

GameState.prototype.CorrectColumn = function (col, row)
{
    if (col < 0) {
        DEBUG_LOG("CLIP for column -1 occured");
        col = 0;
    }

    if ((row % 2 != 0 /*odd*/) && col > FIELD_WIDTH - 2) {
        DEBUG_LOG("CLIP for column beyond field has occured on ODD row");
        col = FIELD_WIDTH - 2;
    } else if (col > FIELD_WIDTH-1) {
        DEBUG_LOG("CLIP for column beyond field has occured");
        col = FIELD_WIDTH - 1;
    }
    return col;
}

GameState.prototype.ParkBubbleEx = function (c, r) {
    
	if(!this.currentBubble.doneFying) return;
	if(this.currentBubble.targetCol == -1 || 
		this.currentBubble.targetRow == -1) {
		return;
	}
	
	//...
   // var col = c;
    //var row = r;
    
    //if (!col && !row) {
        /*var cx = (this.currentBubble._X + RADIUS) - this.fieldX;
        var cy = (this.currentBubble._Y + RADIUS) - this.fieldY;

        row = Math.floor(cy / D);

        col = 0;
        if (row % 2 == 0) {
            col = Math.floor(cx / (RADIUS * 2));
        } else {
            col = Math.floor((cx - RADIUS) / (RADIUS * 2));
        }*/
        col = this.currentBubble.targetCol;
        row = this.currentBubble.targetRow;
		DEBUG_LOG("ParkBubbleEx: Park at from TARGET " + this.currentBubble.targetCol + " row " + this.currentBubble.targetRow);
        
  //  }
   
    col = this.CorrectColumn(col, row);

    if (row < FIELD_HEIGHT &&
        this.bubbleField[row][col] &&
        this.bubbleField[row][col].bubble != null) {

        DEBUG_LOG("CORRECTION 2 occurred!");
        /*DEBUG_LOG("col " + col + " row " + row);
        DEBUG_LOG("delta " + this.currentBubble.deltaX);
        DEBUG_LOG("bounced " + bounced);

        if (bounced) {
            if (this.currentBubble.deltaX > 0) {
                // bounced going right
                if (col - 1 >= 0) {
                    col--;
                }
            } else {
                //bounce going left 
                var odd = row % 2;
                if (odd && (col + 1) <= FIELD_WIDTH - 2) {
                    col++;					
                } else if ((col + 1) <= FIELD_WIDTH - 1) {
                    col++;		                
                }else{
					DEBUG_LOG("No SPace for column, unhandled!");					
				}
            }
	
        } else {
			DEBUG_LOG("Correcting Row...");
			var y = row++;
			while( y < FIELD_HEIGHT && 
			this.bubbleField[row][col] && 
				this.bubbleField[row][col].bubble != null ){
				row++;
			}
        }

        col = this.CorrectColumn(col, row);
        DEBUG_LOG("Corrected col " + col + " row " + row);*/
    }

	//--------------------------------------------------
    if (row >= FIELD_HEIGHT) {
        //Its actually is game over but temporary handling for now.
        this.JumpBubble(this.currentBubble, true);
        this.currentBubble = null;
        return;
    }
    //--------------------------------------------------	
	

    DEBUG_LOG("Parking row:" + row + " col:" + col);
    this.currentBubble._X = this.bubbleField[row][col]._X;
    this.currentBubble._Y = this.bubbleField[row][col]._Y;
    this.currentBubble._width = this.bubbleField[row][col]._width;
    this.currentBubble._width = this.bubbleField[row][col]._height;

    this.currentBubble.state = BUBBLE_STATE_DEPLOYED;
    this.bubbleField[row][col].bubble = this.currentBubble;
    this.bubbleField[row][col].bubble.Deployed();

    // COmpute Chains
    this.chainList = new Array();

    // Handling of boosters
    if (this.currentBubble.isBooster) {

        var bubbleTypeToResource = [
            -1, -1, -1, -1,
             2, 3, 4, 5,
             0, 1, -1, 6, 7];
        
        var resourceIdx = bubbleTypeToResource[this.currentBubble.type];
       /* g_boosterInfo[resourceIdx].count--;
		Ajax_UpdateBooster(g_boosterInfo[resourceIdx].boosterID, g_boosterInfo[resourceIdx].count);
		*/
        UpdateBooster(g_boosterInfo[resourceIdx].boosterID, -1);

        switch (this.currentBubble.type) {
            case BUBBLE_TYPE_RAINBOW_BOOSTER:
                this.HandleRainbowBooster(col, row);
                this.currentBubble.currSpriteIdx = 3;
                break;
            case BUBBLE_TYPE_BOMB_BOOSTER:
                this.HandleBombBooster(col, row, 0);

                for (var i = 0; i < this.chainList.length; i++) {
                    var pt = this.chainList[i];
                    if (!this.bubbleField[pt._Y][pt._X].bubble.isBooster){
                        this.bubbleField[pt._Y][pt._X].bubble.death_mode = BUBBLE_DEATH_EXPLOSION;
                    }
                }
                break;
            case BUBBLE_TYPE_PAINT_A:
            case BUBBLE_TYPE_PAINT_B:
            case BUBBLE_TYPE_PAINT_C:
            case BUBBLE_TYPE_PAINT_D:
                this.HandlePaintBooster(col, row);
                break;
            case BUBBLE_TYPE_HORI_BOOSTER:
                this.HandleHorizontalBooster(col, row);
                this.show_lightning = true;
                this.lightning_Y = this.currentBubble._Y - RADIUS;

                if (this.lightningSfx) {
                    this.lightningSfx.play();
                }

                break;
            case BUBBLE_TYPE_VERT_BOOSTER:
                this.HandleVerticalBooster(col, row);
                break;
        }

    } else {
        this.GetChain(col, row, this.currentBubble.type);
    }

    if (this.chainList.length >= 3 || 
        ((this.currentBubble.type == BUBBLE_TYPE_HORI_BOOSTER ||
        this.currentBubble.type == BUBBLE_TYPE_VERT_BOOSTER)
        && this.chainList.length > 1))
    {
        this.RemoveChain();
        this.dropList = new Array();
        this.RemoveNotConnected();

        if (this.currentBubble.isBooster &&
            this.currentBubble.type == BUBBLE_TYPE_BOMB_BOOSTER) {
            if (this.explosionSfx) {
                this.explosionSfx.play();
            }
        } else {
            if (this.matchSfx) {
                this.matchSfx.play();
            }
        }

        if (this.chainList.length > 5) {
            //this.gold_target++;


            // spawn the coins ez-ra-mi
            var context = this;
            var ez = new AnimatedObject();
            ez.Load("images/game_screen/coin spin.png");
            ez.Set(16, 18.0, true);
            ez._frameWidth = 30;
            ez._fnCallback = (function () {
                //...
              /*  for (var i = 0; i < context.coin_list.length; i++) {
                    if (context.coin_list[i] == this) {
                        context.coin_list.splice(i, 1);
                        break;
                    }
                }*/

            });

            // Compute for X
            var minX = 0;
            var minY = 0;
            var maxX = 0;
            var maxY = 0;
            for (var i = 0; i < this.chainList.length; i++) {
                var pt = this.chainList[i];
                var field = this.bubbleField[pt._Y][pt._X];

                if (i == 0) {
                    minX = maxX = field._X;
                    minY = maxY = field._Y;
                }

                if (minX > field._X)
                    minX = field._X;
                if (minY > field._Y)
                    minY = field._Y;
                if (maxX < field._X)
                    maxX = field._X;
                if (maxY < field._Y)
                    maxY = field._Y;
            }

            ez._X = minX + ((maxX - minX) / 2);
            ez._Y = minY + ((maxY - minY) / 2);
            this.coin_list.push(ez);
            
        }

    } else {
        if (this.deployedSfx) {
            this.deployedSfx.play();
        }

        this.targetScore -= 30;
        if (this.targetScore < 0)
            this.targetScore = 0;
    }

    if (this.currentBubble.isBooster) {
        if(this.currentBubble.type != BUBBLE_TYPE_BOMB_BOOSTER
         && this.currentBubble.type != BUBBLE_TYPE_RAINBOW_BOOSTER){
             this.currentBubble.currSpriteIdx = 3;
         }
    }

    this.currentBubble = null;
}

GameState.prototype.RemoveChain = function () {
    var context = this;
    for (var i = 0; i < this.chainList.length; i++) {
        var pt = this.chainList[i];
        if (this.bubbleField[pt._Y][pt._X].bubble == null) continue;
        this.bubbleField[pt._Y][pt._X].bubble.fnAnimDone = (function () {
            context.targetScore += BUBBLE_POINTS;
            for (var y = 0; y < FIELD_HEIGHT; y++) {
                for (var x = 0; x < FIELD_WIDTH; x++) {
                    if (context.bubbleField[y][x] != null &&
                        context.bubbleField[y][x].bubble == this) {
                        context.bubbleField[y][x].bubble = null;
                        return;
                    }

                }
            }
        });

        this.bubbleField[pt._Y][pt._X].bubble.Die();
    }

}

GameState.prototype.RemoveFromList = function (list) {
    for (var i = 0; i < list.length; i++) {
        var pt = list[i];

        //...
        // CALL JUMP and fall bubble animation in here
        //...
        this.JumpBubble(this.bubbleField[pt._Y][pt._X].bubble);        
        this.bubbleField[pt._Y][pt._X].bubble = null;
    }

    this.targetScore += (BUBBLE_POINTS * list.length);
}

GameState.prototype.IsDisconnected = function (x, y) {

    if (this.bubbleField[y][x].bubble == null) return true;
    if (this.bubbleField[y][x].bubble.state == BUBBLE_STATE_DYING) return true;

    for (var i = 0; i < this.dropList.length; i++) {
        var pt = this.dropList[i];
        if (pt._X == x && pt._Y == y) return true;

    }

    return false;
}

var connArray = null;
GameState.prototype.IsNewConnection = function (row, col) {
    if (row >= FIELD_HEIGHT) return;
    if (this.bubbleField[row][col] == null) return false;
    if (this.bubbleField[row][col].bubble == null) return false;
    if (this.bubbleField[row][col].bubble.state == BUBBLE_STATE_DYING) return false;

    for (var i = 0; i < connArray.length; i++) {
        if (connArray[i]._X == col && connArray[i]._Y == row) 
            return false;
    }
    return true;
}

GameState.prototype.GetConnections = function (row, col) {
    var point = new Point(col, row);
    connArray.push(point);
    var odd=row%2;

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                if (i == 0 || j == 0 || (j == -1 && odd == 0) || (j == 1 && odd == 1)) {
                    if (this.IsNewConnection(row + i, col + j)) {
                        if (row + i == 0) {
                            connArray[0] = "connected";
                        } else {
                            this.GetConnections(row + i, col + j);
                        }
                    }
                }
            }

        }
    }
}

GameState.prototype.RemoveNotConnected = function () {
    for (var i = 1; i < FIELD_HEIGHT; i++) {
        var odd = i % 2;
        for (var j = 0; j < FIELD_WIDTH; j++) {

            // getValue(i,j)>0
            if (this.bubbleField[i][j] == null) continue;
            if (this.bubbleField[i][j].bubble == null) continue;
            if (this.bubbleField[i][j].bubble.state == BUBBLE_STATE_DYING) continue;
            connArray = new Array();
            this.GetConnections(i, j);
            if (connArray[0] != "connected") {
                var pt = new Point(j, i);
                this.dropList.push(pt);
            }
        }
    }

    if (this.dropList.length > 0) {
        this.RemoveFromList(this.dropList);
    }
}

GameState.prototype.ParkBubbleEz = function (x, y)
{

    var cx = (x+ RADIUS) - this.fieldX;
    var cy = (y+ RADIUS) - this.fieldY;

    row = Math.floor(cy / D);

    col = 0;
    if (row % 2 == 0) {
       col = Math.floor(cx / (RADIUS * 2));
    } else {
       col = Math.floor((cx - RADIUS) / (RADIUS * 2));
    }
   
    //var bounced = true;
    /*if (((row % 2 != 0 ) && col > FIELD_WIDTH - 2) ||
        (col > FIELD_WIDTH - 1)){
        //DEBUG_LOG("Bounce Right");
        //this.currentBubble.targetX = this.fieldLimitX - RADIUS;
		var target = new BubbleTarget();
		target.X = this.fieldLimitX - RADIUS;
		target.Y = y;
		this.currentBubble.targetArray.push(target);
			
    } else if (col < 0) {
       // DEBUG_LOG("Bounce Left");
       // this.currentBubble.targetX = this.fieldX;
		var target = new BubbleTarget();
		target.X = this.fieldX;
		target.Y = y;
		this.currentBubble.targetArray.push(target);
    } else {
        bounced = false;
    }*/
	col = this.CorrectColumn(col, row);

    if(/*!bounced*/true) {
        DEBUG_LOG("ParkBubbleEz: Park at " + col + " row " + row);
        this.currentBubble.targetCol = col;
        this.currentBubble.targetRow = row;
			
			
        if (row >= FIELD_HEIGHT) {
     		var target = new BubbleTarget();
			target.X = this.bubbleField[FIELD_HEIGHT - 1][col]._X;
			target.Y = this.bubbleField[FIELD_HEIGHT - 1][col]._Y;
			this.currentBubble.targetArray.push(target);
		} else {
     	
			var target = new BubbleTarget();
			target.X = this.bubbleField[row][col]._X;
			target.Y = this.bubbleField[row][col]._Y;
			this.currentBubble.targetArray.push(target);
        }
    }    
 }

GameState.prototype.ComputeTarget = function ()
{
    // added Aug 13, 2014
    // determine the bubble to hit in advance
    var found = false;
    var currentBubble_X = this.currentBubble._X;
    var currentBubble_Y = this.currentBubble._Y;
	var deltaX = this.currentBubble.deltaX;
	
    while (!found) {
        currentBubble_X += deltaX;
        currentBubble_Y += this.currentBubble.deltaY;
        
        if (currentBubble_X + (RADIUS * 2) >= this.fieldLimitX) {
			DEBUG_LOG("Bounce Right");	
			var target = new BubbleTarget();
			target.X = this.fieldLimitX - (RADIUS * 2);
			target.Y = currentBubble_Y;
			this.currentBubble.targetArray.push(target);
			deltaX *= -1;
	
			
        } else if (currentBubble_X <= this.fieldX) {
			DEBUG_LOG("Bounce Left");
			var target = new BubbleTarget();
			target.X = this.fieldX;
			target.Y = currentBubble_Y;
			this.currentBubble.targetArray.push(target);
            deltaX *= -1;
			
        } else if (currentBubble_Y <= this.fieldY) {
            found = true;
            this.ParkBubbleEz(currentBubble_X, currentBubble_Y);
			break;
		} else {
            for (var y = 0; y < FIELD_HEIGHT; y++) {
                for (var x = 0; x < FIELD_WIDTH; x++) {

                    if (this.bubbleField[y][x] == null) continue;
                    if (this.bubbleField[y][x].bubble == null) continue;
                    var currentBubble = new BaseObject;
                    currentBubble._X = currentBubble_X;
                    currentBubble._Y = currentBubble_Y;

                    if (this.IsCollide(this.bubbleField[y][x], currentBubble)) {
                        DEBUG_LOG("Hit x " + x + " y " + y);
                        
                        this.ParkBubbleEz(currentBubble_X, currentBubble_Y);
						found = true;
						break;
                        //return;
                    }
                }
            }
        }
    }
	
	if(this.currentBubble.targetArray.length > 0 ) {
		this.currentBubble.doneFying = false;
		DEBUG_LOG("flying...");
	}
}

GameState.prototype.Shoot = function () {

    if (this.substate != GAMESTATE_SUBSTATE_GAME) return;
    if (this.currentBubble==null ||
        this.currentBubble.state == BUBBLE_STATE_FIRED) 
        return;
 
    var dir = new Vector2D(mouse_x - this.gunLocX, mouse_y - this.gunLocY);
    dir.Normalize();

    // use mouse point as nozzle point
    var point = new Point(mouse_x, mouse_y);
    var deltaX = dir._X; 
    var deltaY = dir._Y; 

    var v1 = new Vector2D(0, 1);
    var dot = DotProductNormalize(v1, dir);

    if (deltaY > 0 || Math.abs(dot) < 0.1) {
        this.shotTimer = new Date().getTime();
        return;
    }
  
    // Remove bubble from list
    if (!(g_gameData.level_list[g_gameData.currentLevelIdx].type
      & LEVEL_TYPE_SURVIVAL_MODE)) {
        //this.bubble_reserve.splice(this.bubbleIdx, 1);
        this.bubble_reserve.splice(this.bubbleIdx, 1);
        //this.bubbleIdx = this.bubble_reserve.length-1;
        this.bubbleIdx--;
        if (this.bubbleIdx < 0) {
            this.bubbleIdx = this.bubble_reserve.length-1;
        }
		//this.bubbleCount--;
    }

    this.currentBubble.fieldXLimitCopy = this.fieldLimitX;
    this.currentBubble.fieldXCopy = this.fieldX;

    this.currentBubble.fieldYCopy = this.fieldY;
    this.currentBubble.deltaX = deltaX;

    this.currentBubble.deltaY = deltaY;
    this.currentBubble.state = BUBBLE_STATE_FIRED;

    if (this.launchSfx)
        this.launchSfx.play();
        
    this.ComputeTarget();
}

GameState.prototype.Switch = function ()
{
    if (this.currentBubble == null ||
        this.currentBubble.state == BUBBLE_STATE_FIRED)
        return;

    //this.bubbleIdx = (this.bubbleIdx + 1) %
    //   this.bubble_reserve.length;
	this.bubbleIdx--;
	if(this.bubbleIdx<0)
		this.bubbleIdx = this.bubble_reserve.length-1;
		
	this.ReloadBubble();

	if (this.switchSfx) {
	    this.switchSfx.play();
	}
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
GameState.prototype.Unload = function () {

    if (this.bg_music) {
        //  this.bg_music.Stop();
        this.bg_music.pause();
        this.bg_music.currentTime = 0;
    }


    if (this.launchSfx) {
        this.launchSfx.pause();
        this.launchSfx.currentTime = 0;
    }

    if (this.matchSfx) {
        this.matchSfx.pause();
        this.matchSfx.currentTime = 0;
    }

    if (this.deployedSfx) {
        this.deployedSfx.pause();
        this.deployedSfx.currentTime = 0;
    }
 
    this.CleanupUIManager();
}

GameState.prototype.EventHandler = function (e) {

   // if (this.substate != GAMESTATE_SUBSTATE_GAME)
    //    return;

    if (this.substate == GAMESTATE_SUBSTATE_LEVELINFOSCRN) {
        this.level_complete_screen.EventHandler(e);
        return;
    } else if(this.substate == TOBAR_SNGL_PURCHASE_STATE) {
        this.purchaseScreenSingle.EventHandler(e);    
        return;
    } else if (this.substate == TOPBAR_MULT_PURCHASE_STATE) {
        this.purchaseScreenMultiple.EventHandler(e);    
        return;
    } else if (this.substate == TOPBAR_GAMESCRN_QUITSCREEN) {
        this.quitScreen.EventHandler(e);
        return;
    } else if (this.substate == GAMESTATE_TIPSCREEN) {
        this.tipScreen.EventHandler(e);
        return;
    } else if (this.substate == GAMESTATE_SUBSTATE_REWARD) {
        this.rewardWnd.EventHandler(e);
    }

    if (this.substate != 0) return;

    if (e.type == "keydown") {
        var keycode = e.keyCode;
        if (keycode == RIGHT_KEY) {
            // this.RotateGun(ROTATE_FRICTION);
        } else if (keycode == LEFT_KEY) {
            // this.RotateGun(-ROTATE_FRICTION);
        } else if (keycode == SPACE_BAR_KEY) {
            //this.Shoot();
            // do switch
            //this.Switch();
            if (this.currentBubble.state != BUBBLE_STATE_FIRED &&
                this.gun.typeNext != -1) {

                if (this.switch_used < 5) {
                    this.substate = GAMESTATE_SWITCHAROO;
                    this.switch_used++;
                }
            }
        }

    } else if (e.type == "mousemove" ||
                e.type == "touchmove") {

        var mouse = getNormalizedMouse(e);
        var prevmx = mouse_x;

        mouse_x = mouse.x;
        mouse_y = mouse.y;

        this.angle = mouse_x - this.gunLocX;

        var diff = mouse_x - prevmx;

        if (diff < 0) {
            this.demon1.TurnCW();
            this.demon2.TurnCW();
        } else {
            this.demon1.TurnCCW();
            this.demon2.TurnCCW();
        }
        if (this.rotateSfx) {
            this.rotateSfx.play();
        }
    } else if (e.type == "mousedown" ||
                e.type == "touchstart") {

        var mouse = getNormalizedMouse(e);
        if (mouse.y > this.fieldY) {
            if (mouse.x >= this.sideBar._image.width && 
                mouse.x <= DEFAULT_WINDOW_WIDTH - this.rightBarSprite._image.width) {
                this.Shoot();
            }
        }
    }

    // Pass to base class
    this.EventHandlerBase(e);
    this.EventHandlerBase(e, this.uiManagerLocal);
}



