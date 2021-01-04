/**
    level.js
    Level info and data class
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 12, 2014
*/

/*
empty field: bubble template should be NULL
not allowed
    EMPTY FIELD and CLEARALL                If empty field, then scoretarget must be set
                and CLEARBANK

possible combination                        how to compute stars and score
    OBSTACLE with ALL
    CLEARALL and TARGETSCORE                autocomputed if scoretarget is 0
    CLEARBANK and TARGETSCORE               autocomputed if scoretarget is 0
    TARGETSCORE and empty field             score target must not be 0
*/
var LEVEL_TYPE_CLEAR_ALL        = 1;
var LEVEL_TYPE_CLEAR_BANK       = 2;
var LEVEL_TYPE_TARGET_SCORE     = 4;
var LEVEL_TYPE_OBSTACLE         = 8;
var LEVEL_TYPE_EMPTYFIELD       = 16;
var LEVEL_TYPE_SURVIVAL_MODE    = 32;
var LEVEL_TYPE_NOSIGHT 			= 64;
var LEVEL_TYPE_PREDEFINE_BUBBLES = 128;
var LEVEL_TYPE_NO_SIGHT = 256;
var LEVEL_TYPE_TIMER = 512;

// level status types
var LEVEL_STATUS_ONPLAY     = 0;
var LEVEL_STATUS_SUCCESS    = 1;
var LEVEL_STATUS_FAILED     = 2;

function LevelBase()
{
    // level objective type, bitmasked
    this.type = 0;

    // The player's achieved star for this level
    this.starCount = 0;

    // Friends list for the level, the profile will refer to the global data
    // for actual facebook profile data
    this.friends_list = null;

    // level description string list;
    this.description = null;

    // The player's old score for this level
    this.bestScore = 0;

    // Max bubble count for this level
    this.max_bubble_count = 30;

    // bubble Map template
    this.bubbleMap = null;

    // scoreTarget for the level
    // if this is 0, it will be auto computed in gamestate
    // scoretarget must not be 0 if bubbleMap is null or 
    // EMPTY Field flag is on
    this.scoreTarget = 0;

    // FOR obstacle/bar level
    this.barY = 0;
    this.barCount = 5;
	this.isBarMoving = false;
	this.barMovingSpeed = 100;		// Normal is 300
	
    this.tip = new Array();
	this.pre_define_bubble = null;
	
    // background type
	this.bg_type = 0;

    //for timer level
	this.timerMax = 60;

    //if this level has gold requirements
	this.coins_requirement = 0;

}
