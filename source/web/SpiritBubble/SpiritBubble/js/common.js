//
// Global definitions for Inweirders game
// Date created: March 16, 2013 in 6680 West 86th Place, Los Angeles,CA.
// [first code written in US]
// ported to Monster Bubble May 2014

// The game engine object
var g_Engine = null;
var g_gameData = null;

// Game Target Frame per second
var FPS = 60;

// time between frames 
var SECONDS_BETWEEN_FRAMES = 1 / FPS;

// State default invalid ID     
var DEFAULT_ID = -1;

// The name of the canvas object in HTML     
var GAME_CANVAS_ID = "game_canvas";

// default Engine's dimension
var DEFAULT_WINDOW_WIDTH = 1138;
var DEFAULT_WINDOW_HEIGHT = 640;

// State ID definitions
var MAP_STATE = 0;
var LOAD_STATE = 1;
var GAME_STATE = 2;
var SPLASH_SCREEN_STATE_ID = 3;

var SLIDE_STORY_STATE_0 = 4;
var SLIDE_STORY_STATE_1 = 5;
var SLIDE_STORY_STATE_2 = 6;
var SLIDE_STORY_STATE_3 = 7;
var SLIDE_STORY_STATE_4 = 8;
var SLIDE_STORY_STATE_5 = 9;
var FINAL_STORY_STATE = 10;

// Common Key definitions
var UP_KEY = 38;
var DOWN_KEY = 40;
var RIGHT_KEY = 39;
var LEFT_KEY = 37;
var BACKSPACE = 8;
var ESC_KEY = 27;
var ENTER_KEY = 13;
var SPACE_BAR_KEY = 32;

// Game related declarations
var RADIUS = 20;
var RADIUS_ERROR = 8;
var RADIUS_EZ = RADIUS - RADIUS_ERROR;
var ROTATE_FRICTION = 0.05;
var BUBBLE_SPEED = 1000;
var FIELD_WIDTH = 16;
var FIELD_HEIGHT = 12;
var VERTICAL_DISTANCE = 5;
var WINDOW_ANIM_SPEED = 5;
var ALPHA_SPEED = 4;

var CLOUD_TYPES = 3;
var MAX_CLOUD_TYPE = 3;
var CLOUD_BORDER_Y = DEFAULT_WINDOW_HEIGHT- 500;
var CLOUD_SLOW_SPEED = 10;
var CLOUD_FAST_SPEED = 40;

var ENABLE_LOG = 1;
var MAX_SCORE = 500000;

function BrowserVersion() {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

    //normalize browser name
    M[0] = M[0].toLowerCase();
    return M;
}

// Test mobile safari
function isMobileSafari() {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
}

function isChar(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function DEBUG_LOG(str) {
    if( !ENABLE_LOG ) return;
	if (window.console) {
        window.console.log(str);
    }
}

