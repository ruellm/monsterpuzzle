/**
    gameData.js
    Global Game Data
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 12, 2014
*/
var DEFAULT_LIFE = 10;

// The target timer for life counter when life is 0
// wait time in minutes
var DEFAULT_WAIT_MINUTES = 15 * 60;
var g_targetTimer = 0;

function GameData()
{

    // Player's game life
    this.life = DEFAULT_LIFE;

    // Player's max/top level reached 
    this.top_level = 7;//88 last level

    // THe level data list
    this.level_list = null;

    // Player's Gold, gold can be used to purchase coins
    // coins in turn can be used to purchase in-app items
    this.gold = 0;
    this.coins = 300;

    // the total score the player's achieved, this is for
    // advancement reward feature
    this.totalScore = 0;
    
    // the current level loaded
    this.currentLevelIdx = 0;
	
	// Flag if were ready to start
    this.isDataLoadDone = false;

    // reward flag bit
    this.reward_flag_bit = 0;

    // is new today
    this.isFirstLogin = true;
}



function BeggarData()
{
	this.fbProfile = null;
	this.recordID = null;
}

var g_beggarsList = new Array();

GameData.prototype.Init = function ()
{
    //..
    this.PrepareLevels();

}

GameData.prototype.PrepareLevels = function ()
{
    this.level_list = new Array();
    LoadLevels_1();
}

GameData.prototype.UpdateLife = function (val)
{
    g_gameData.life += val;
    if (g_gameData.life <= 0 ) {
        g_gameData.life = 0;

        // compute the target minutes
        g_targetTimer = new Date().getTime() +
            (DEFAULT_WAIT_MINUTES * 1000.0);
    }

    Ajax_UpdateLife(g_gameData.life);
}

function SortScore(a, b)
{
    if (a.score > b.score)
        return -1;
    else if (a.score < b.score)
        return 1;
    else
        return 0;
}

function UpdateBooster(type, value)
{
    var idx = resourceID_To_globalInfo[type];
    if (idx != -1) {
        g_boosterInfo[idx].count += value;
		if( g_boosterInfo[idx].count < 0 )
			g_boosterInfo[idx].count = 0;
			
        Ajax_UpdateBooster(type, g_boosterInfo[idx].count);
    }
}