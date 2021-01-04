/**
    bubble.js
    one bubble item
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 10, 2014
*/

var BUBBLE_TYPE_INVALID = -1;
var BUBBLE_TYPE_A = 0;
var BUBBLE_TYPE_B = 1;
var BUBBLE_TYPE_C = 2;
var BUBBLE_TYPE_D = 3;

// booster type
var BUBBLE_TYPE_PAINT_A = 4;
var BUBBLE_TYPE_PAINT_B = 5;
var BUBBLE_TYPE_PAINT_C = 6;
var BUBBLE_TYPE_PAINT_D = 7;

var BUBBLE_TYPE_RAINBOW_BOOSTER = 8;
var BUBBLE_TYPE_BOMB_BOOSTER = 9;
var BUBBLE_TYPE_GRAY_STATIC = 10;
var BUBBLE_TYPE_HORI_BOOSTER = 11;
var BUBBLE_TYPE_VERT_BOOSTER = 12;

var BUBBLE_TYPE_COUNT = 4;

var BUBBLE_STATE_NONE = -1;   // Default
var BUBBLE_STATE_STATIC = 0;   // just... static.. doing nothing.
var BUBBLE_STATE_LOADED = 1;   // Gun Loaded
var BUBBLE_STATE_FIRED = 2;    // BUbble fired to the field
var BUBBLE_STATE_DEPLOYED = 3; // Bubble is in the field
var BUBBLE_STATE_DETACHED = 4; // Bubble unlink from chains
var BUBBLE_STATE_DYING = 5;

var JUMP_HEIGHT = 100;

var BUBBLE_STATIC_IDX = 0;
var BUBBLE_VANISHANIM_IDX = 1;
var BUBBLE_BOMBEXPLODE_IDX = 4;
var BUBBLE_POINTS = 30;

var BUBBLE_DEATH_NORMAL = 0;
var BUBBLE_DEATH_EXPLOSION = 1;

function BubbleTarget()
{
	this.X = 0;
	this.Y = 0;
}

function Bubble()
{
    //...
    this.state = BUBBLE_STATE_STATIC;
    this.type = BUBBLE_TYPE_A; 
    this.deltaX = 0;
    this.deltaY = 0;
    this.currSpriteIdx = 0;
    
    //
    // From Canvas Demo
    // credited to: Matthew Casperson<matthewcasperson@gmail.com>
    //

    this.jumpHeight = JUMP_HEIGHT;
    /** The constant or half PI
    @type Number
    */
    this.halfPI = Math.PI / 2;
    /** The amount of time to spend in the air when jumping
    @type Number
    */
    this.jumpHangTime = 0.25;  //0.5;
    /** The speed to progress alone the sine wave that defines
    the jumping arc
    @type Number
    */
    this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;

    /** The current position on the sine wave that defines the jump arc
    @type Number
    */
    this.jumpSinWavePos = 0;
    /** The rate to fall at
    @type Number
    */
    this.fallMultiplyer = 1.5;

    this.grounded = true;

    this.fnJumpDone = null;

    // Image List or contain Image animation list
    this.image = null;
    this.ballLauncherSparkle = null;
    this.ballIdleSparkle = null;
    this.fnAnimDone = null;

    // Copy of Field Y location for boundary checking--Hack!(facepalm)
    this.fieldYCopy = 0;
    this.fieldXCopy = 0;
    this.fieldXLimitCopy = 0;

    // is this bubble a booster
    this.isBooster = false;

    this.death_mode = BUBBLE_DEATH_NORMAL;
	
    this.X_move = 0;

    this.targetX = 0;
    this.targetY = 0;
    this.targetCol = -1;
    this.targetRow = -1;
	
	this.targetArray = new Array();
	this.doneFying = true;
	this.currentTargetIndex = 0;
}

Bubble.prototype = new BaseObject;

Bubble.prototype.LoadCommon = function ()
{
    // Load Sparkle
    // load sparkle
    this.ballLauncherSparkle = new AnimatedObject();
    this.ballLauncherSparkle.Load("images/game_screen/balls/ball launcher sparkle.png");
    this.ballLauncherSparkle.Set(3, 10.0, true);
    this.ballLauncherSparkle._frameWidth = 83;
    this.ballLauncherSparkle._fnCallback = (function () {
        //...
    });

    this.ballIdleSparkle = new AnimatedObject();
    this.ballIdleSparkle.Load("images/game_screen/balls/ball deployed sparkle.png");
    this.ballIdleSparkle.Set(5, 10.0, false);
    this.ballIdleSparkle._frameWidth = 57;
    this.ballIdleSparkle._fnCallback = (function () {
        //...
    });

}

Bubble.prototype.Load = function (type) {
    //...
    var context = this;
    this.type = type;
    this.isBooster = false;
    this.LoadCommon();
    this.targetArray = new Array();
	
    this.image = new Array();

    if (type == BUBBLE_TYPE_GRAY_STATIC) {
        this.GrayBubbleLoad();
        return;
    }

    var staticList = ["images/game_screen/balls/static/ball static A.png",
            "images/game_screen/balls/static/ball static B.png",
            "images/game_screen/balls/static/ball static C.png",
            "images/game_screen/balls/static/ball static D.png"];

    var staticImage = new ImageObject();
    staticImage.Load(staticList[type]);


    var vanishList = ["images/game_screen/balls/vanish/ball vanish A.png",
            "images/game_screen/balls/vanish/ball vanish B.png",
            "images/game_screen/balls/vanish/ball vanish C.png",
            "images/game_screen/balls/vanish/ball vanish D.png"];


    var vanish = new AnimatedObject();
    vanish.Load(vanishList[type]);
    vanish.Set(5, 60.0, false);
    vanish._frameWidth = 40;
    vanish._fnCallback = (function () {
        if (context.fnAnimDone != null) {
            context.fnAnimDone();
        }
    });


    var deployedList = ["images/game_screen/balls/deployed/ball deployed A.png",
        "images/game_screen/balls/deployed/ball deployed B.png",
        "images/game_screen/balls/deployed/ball deployed C.png",
        "images/game_screen/balls/deployed/ball deployed D.png"];

    var deployed = new AnimatedObject();
    deployed.Load(deployedList[type]);
    deployed.Set(6, 30.0, false);
    deployed._frameWidth = 40;
    deployed._fnCallback = (function () {
        //...
        context.currSpriteIdx = 3;   // use IDLE animation later?
    });

    var idleList = ["images/game_screen/balls/idle/ball idle A.png",
    "images/game_screen/balls/idle/ball idle B.png",
    "images/game_screen/balls/idle/ball idle C.png",
    "images/game_screen/balls/idle/ball idle D.png" ];

    var idle = new AnimatedObject();
    idle.Load(idleList[type]);
    idle.Set(6, 12.0, true);
    idle._frameWidth = 40;
    idle._fnCallback = (function () {
        //...
        //context.currSpriteIdx = BUBBLE_STATIC_IDX;
    });


    var bomb = new AnimatedObject();
    bomb.Load("images/game_screen/boosters/bomb explode.png");
    bomb.Set(7, 36.0, false);
    bomb._frameWidth = 40;
    bomb._fnCallback = (function () {
        if (context.fnAnimDone != null) {
            context.fnAnimDone();
        }
    });

    this.image.push(staticImage);
    this.image.push(vanish);
    this.image.push(deployed);
    this.image.push(idle);
    this.image.push(bomb);
}

Bubble.prototype.GrayBubbleLoad = function ()
{
    this.type = BUBBLE_TYPE_GRAY_STATIC;
    var staticImage = new ImageObject();
    staticImage.Load("images/game_screen/balls/static/ball idle gray.png");

    this.image.push(staticImage);
    this.image.push(staticImage);
    this.image.push(staticImage);
    this.image.push(staticImage);
    this.image.push(staticImage);
}

Bubble.prototype.BoosterLoad = function (type)
{
    //..
    this.isBooster = true;
    this.LoadCommon();
    this.image = new Array();

    var staticImage = new ImageObject();
    staticImage.Load(g_gaameBoosters_sideBar[type]);
    var context = this;

    var resourceToBubbleType = [
        BUBBLE_TYPE_INVALID,
        BUBBLE_TYPE_INVALID,
        BUBBLE_TYPE_INVALID,
        BUBBLE_TYPE_INVALID,

        BUBBLE_TYPE_PAINT_A,
        BUBBLE_TYPE_PAINT_B,
        BUBBLE_TYPE_PAINT_C,
        BUBBLE_TYPE_PAINT_D,
        BUBBLE_TYPE_RAINBOW_BOOSTER,
        BUBBLE_TYPE_INVALID,
        BUBBLE_TYPE_BOMB_BOOSTER,
        BUBBLE_TYPE_INVALID,
        BUBBLE_TYPE_HORI_BOOSTER,
        BUBBLE_TYPE_VERT_BOOSTER
    ];

    this.type = resourceToBubbleType[type];

    this.image.push(staticImage);

    if (this.type == BUBBLE_TYPE_BOMB_BOOSTER) {
        var sprite = new AnimatedObject();
        sprite.Load("images/game_screen/boosters/bomb explode.png");
        sprite.Set(7, 36.0, false);
        sprite._frameWidth = 40;
        sprite._fnCallback = (function () {
            if (context.fnAnimDone != null) {
                context.fnAnimDone();
            }
        });
        this.image.push(sprite);
    } else if (this.type == BUBBLE_TYPE_RAINBOW_BOOSTER) {
        var sprite = new AnimatedObject();
        sprite.Load("images/game_screen/boosters/rainbow vanish.png");
        sprite.Set(7, 24.0, false);
        sprite._frameWidth = 80;
        sprite._fnCallback = (function () {
            if (context.fnAnimDone != null) {
                context.fnAnimDone();
            }
        });
        this.image.push(sprite);
    } else {
        this.image.push(staticImage);
    }

    
    this.image.push(staticImage);
    this.image.push(staticImage);
}

Bubble.prototype.Update = function (elapsed) {
    //...
    if (this.state == BUBBLE_STATE_FIRED) {
		if(!this.doneFying && 
			this.currentTargetIndex < this.targetArray.length){

			var error = 1;
			var ctr = 0;
		
			var targetX = this.targetArray[this.currentTargetIndex].X;			
			var targetY = this.targetArray[this.currentTargetIndex].Y;

			var dir = new Vector2D(targetX - this._X,
                targetY - this._Y);

			dir.Normalize();
            			
			/*if (length <= 10) {
			    DEBUG_LOG("Slowing Down...");
			    var diffX = targetX - this._X;
			    var diffY = targetY - this._Y;

			    var tempX = this._X + (diffX) * elapsed;
			    var tempY = this._Y + (diffY) * elapsed;

			} else {*/
			    var tempX = this._X + (dir._X * BUBBLE_SPEED) * elapsed;
			    var tempY = this._Y + (dir._Y * BUBBLE_SPEED) * elapsed;
			//}

			if (dir._X > 0) {

				/*if (tempX + (RADIUS * 2) >= this.fieldXLimitCopy) {
				    this._X = this.fieldXLimitCopy - (RADIUS * 2);
				    ctr++;
				} else */if (tempX < (targetX-error)) {
					this._X = tempX;					
				} else {				   
				    this._X = targetX;
					ctr++;
				}
			} else {
				/*if (tempX <= this.fieldXCopy) {
				    this._X = this.fieldXCopy;
				    ctr++;
				} else*/ if (tempX > (targetX + error)) {
					this._X = tempX;
				} else {
				    this._X = targetX;
					ctr++;
				}            
			}

			if (tempY > (targetY + error)) {
                this._Y = tempY;
			} else {
			    this._Y = targetY;
				ctr++;				
            }
			
			if(ctr >= 2 ){
				this.currentTargetIndex++;
			}
		} else {
			this.doneFying  = true;
		}
		
    } else if (this.state == BUBBLE_STATE_DETACHED) {
        this.JumpUpdate(elapsed);
    } else if (this.state == BUBBLE_STATE_LOADED) {
        this.ballLauncherSparkle.Update(elapsed);
    }

    this.image[this.currSpriteIdx].Update(elapsed);
    if (this.currSpriteIdx == 2) {
        this.ballIdleSparkle.Update(elapsed);
    }

}

Bubble.prototype.Draw = function (gfx) {

    if (this.type == BUBBLE_TYPE_RAINBOW_BOOSTER && this.currSpriteIdx == 1) {

        //compute diff
        this.image[this.currSpriteIdx]._X = this._X - 20;
        this.image[this.currSpriteIdx]._Y = this._Y - 20;

    } else {
        this.image[this.currSpriteIdx]._X = this._X;
        this.image[this.currSpriteIdx]._Y = this._Y;
    }

    if (this.state == BUBBLE_STATE_DYING) {
        var breakme = 1;
    }

    this.image[this.currSpriteIdx].Draw(gfx);

    if (this.state == BUBBLE_STATE_LOADED) {
        this.ballLauncherSparkle._X = this._X-20;
        this.ballLauncherSparkle._Y = this._Y;
        this.ballLauncherSparkle.Draw(gfx);
    } 
    

   
    if (this.currSpriteIdx == 2) {
        this.ballIdleSparkle._X = this._X-10;
        this.ballIdleSparkle._Y = this._Y;
        this.ballIdleSparkle.Draw(gfx);
    }
}

Bubble.prototype.Die = function () {

    if ((this.isBooster &&
        this.type != BUBBLE_TYPE_BOMB_BOOSTER
        && this.type != BUBBLE_TYPE_RAINBOW_BOOSTER) ||
        this.type == BUBBLE_TYPE_GRAY_STATIC) {
        if (this.fnAnimDone != null) {
            this.fnAnimDone();
        }
    } else {
        this.state = BUBBLE_STATE_DYING;

        if (this.death_mode == BUBBLE_DEATH_EXPLOSION) {
            this.currSpriteIdx = BUBBLE_BOMBEXPLODE_IDX;
        } else {
            this.currSpriteIdx = 1;
        }
    }
}

Bubble.prototype.Deployed = function () {
    this.currSpriteIdx = 2;
}

Bubble.prototype.Jump = function () {
    this.grounded = false;
    this.jumpSinWavePos = 0;
    this.state = BUBBLE_STATE_DETACHED;
	this.X_move = Math.floor(Math.random() * 200) + 200;
	var dir = Math.floor(Math.random() * 10);
	this.jumpHeight = Math.floor(Math.random() * 500) + JUMP_HEIGHT;
	if( dir % 2 ){
		this.X_move *= -1;
	}
}

Bubble.prototype.JumpUpdate = function (elapsed) {

    if (!this.grounded) {
        // the last position on the sine wave
        var lastHeight = this.jumpSinWavePos;

        // the new position on the sine wave
        this.jumpSinWavePos += this.jumpSinWaveSpeed * elapsed;

        // we have fallen off the bottom of the sine wave, so continue falling
        // at a predetermined speed
        if (this.jumpSinWavePos >= Math.PI) {
            this._Y += this.jumpHeight / this.jumpHangTime * this.fallMultiplyer * elapsed;
        }
        else {
            this._Y -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
			this._X += (this.X_move * elapsed);
        }
    }

    // we have hit the ground
    if (this.IsGround()) {
        this.grounded = true;
        this.jumpSinWavePos = 0;
        this._Y = this._baseY;

        if (this.fnJumpDone) {
            this.fnJumpDone();
        }
    }
    // otherwise we are falling
    else if (this.grounded) {
        this.grounded = false;
        // starting falling down the sine wave (i.e. from the top)
        this.jumpSinWavePos = this.halfPI;
    }
}

Bubble.prototype.IsGround = function () {
    if (this._Y >= DEFAULT_WINDOW_HEIGHT) return true;
 
    return false;
}