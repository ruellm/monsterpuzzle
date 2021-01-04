/**
	inapp_items.s
    In-app items definitions including boosters animations
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created 
*/

var ITEM_BUBBLE_EXTRA_A = 0;
var ITEM_BUBBLE_EXTRA_B = 1;
var ITEM_BUBBLE_EXTRA_C = 2;
var ITEM_BUBBLE_EXTRA_D = 3;

var ITEM_BUBBLE_PAINT_A = 4;
var ITEM_BUBBLE_PAINT_B = 5;
var ITEM_BUBBLE_PAINT_C = 6;
var ITEM_BUBBLE_PAINT_D = 7;

var ITEM_RAINBOW_BOOSTER    = 8;
var ITEM_HEART_LIFE         = 9;
var ITEM_BOMB_BOOSTER       = 10;

var ITEM_GOLD_SINGLE = 11;

var ITEM_HORIZONTAL_BOOSTER = 12;
var ITEM_VERTICAL_BOOSTER = 13;

var ITEM_COINS_BULK_0 = 100;
var ITEM_COINS_BULK_1 = 101;
var ITEM_COINS_BULK_2 = 102;
var ITEM_COINS_BULK_3 = 103;
var ITEM_COINS_BULK_4 = 104;

// Global Currency, to be dynamically modified with Facebook integration
var USD_PER_BAR = 0.05;     // price of one goldbar
var COINS_PER_BAR = 4;     // 50 coins
var g_currency = "USD";

// Gold price list
// 0: quantity, 1: price
// TODO: modify this when there are sale, etc.
var g_goldPriceList = [
    [100, 100 * USD_PER_BAR],
    [70, 70 * USD_PER_BAR],
    [50, 50 * USD_PER_BAR],
    [20, 20 * USD_PER_BAR],
    [10, 10 * USD_PER_BAR]
];

var g_coinPrices = [
    [100, Math.floor(100/COINS_PER_BAR)],
    [20, Math.floor(20/COINS_PER_BAR)],
    [15, Math.floor(15/COINS_PER_BAR)],
    [10, Math.floor(10/COINS_PER_BAR)],
    [5, Math.floor(5/COINS_PER_BAR)]
];

// Text appears on purchase single screen 
// or in tooltip?
var g_purchaseSingleText = [
        "Extra Bubble",
        "Extra Bubble",
        "Extra Bubble",
        "Extra Bubble",

        "Paint Booster",
        "Paint Booster",
        "Paint Booster",
        "Paint Booster",

        "Rainbow Booster",
        "5 Extra Lives",
        "Bomb Booster",
        "Gold bar",
        "Horizontal Booster",
        "Vertical Booster"
];

var g_inAppDescription = [
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable

        "Re-paints the bubble in the field",
		"Re-paints the bubble in the field",
		"Re-paints the bubble in the field",
		"Re-paints the bubble in the field",

         "Booster that can be paired with any bubble on the field,"+
			" Serves as the 'wild card' booster",
         "In-game Life",
         "Destroys two layers of the bubble field",
		 "The in-game currency for purchasing in-app items.",
         "Destroys entire row of bubbles in the field",
         "Destroys two columns of bubbles in the field"
]; 

var g_itemPrices = [
    // extra bubble prices
    2,
    2,
    2,
    2,

    // Paint bubble prices
    4,
    4,
    4,
    4,

    // booster price
    8,
    10,
    8,

    0,  // Gold no price since this is not Booster
    7,
    5

];

// definition for purchase window small/single
var g_purchaseSingle = [
            "images/purchase_window/ball L A.png",            
            "images/purchase_window/ball L B.png",
            "images/purchase_window/ball L C.png",
            "images/purchase_window/ball L D.png",

            "images/purchase_window/boost paint A L.png",
            "images/purchase_window/boost paint B L.png",
            "images/purchase_window/boost paint C L.png",
            "images/purchase_window/boost paint D L.png",

            //boosters purchase bubbles
             "images/purchase_window/boost rainbow L.png",
            "images/purchase_window/heart L.png",
            "images/purchase_window/boost bomb L.png",
            "images/purchase_window/gold M.png",

            "images/purchase_window/boost hori L.png",
            "images/purchase_window/boost vert L.png"
];

var g_rewardSprite = [
			"",
			"",
			"",
			"",
			
			"images/feed/A.png",
			"images/feed/B.png",
			"images/feed/C.png",
			"images/feed/D.png",
			
			"images/feed/rainbow.png",
			"images/feed/life.png",
			"images/feed/bomb.png",
			"images/feed/gold.png",
			"images/feed/horizontal.png",
			"images/feed/vertical.png"
];

// level info screen boosters
var g_levelInfoBoosters = [
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable

        "images/level_info_complete/booster/boost paint A M.png",      
        "images/level_info_complete/booster/boost paint B M.png",      
        "images/level_info_complete/booster/boost paint C M.png",      
        "images/level_info_complete/booster/boost paint D M.png",     

        "images/level_info_complete/booster/boost rainbow M.png",
        "",     // Not applicable
        "images/level_info_complete/booster/boost bomb M.png",
        "",     // Not applicable
        "images/level_info_complete/booster/boost hori M.png",
        "images/level_info_complete/booster/boost vert M.png"        
];

var g_gaameBoosters_sideBar = [
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable

        "images/game_screen/boosters/boost paint A S.png",
        "images/game_screen/boosters/boost paint B S.png",
        "images/game_screen/boosters/boost paint C S.png",
        "images/game_screen/boosters/boost paint D S.png",

         "images/game_screen/boosters/boost rainbow S.png",
         "",
         "images/game_screen/boosters/boost bomb S.png",
         "",
         "images/game_screen/boosters/boost hori S.png",
         "images/game_screen/boosters/boost vert S.png"
]; 

var g_gaameBoosters_sideBarHover = [
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable
        "",     // Not applicable

        "images/game_screen/boosters/boost paint A S HOVER.png",
        "images/game_screen/boosters/boost paint B S HOVER.png",
        "images/game_screen/boosters/boost paint C S HOVER.png",
        "images/game_screen/boosters/boost paint D S HOVER.png",

         "images/game_screen/boosters/boost rainbow S HOVER.png",
         "",
         "images/game_screen/boosters/boost bomb S HOVER.png",
         "",
         "images/game_screen/boosters/boost hori S HOVER.png",
         "images/game_screen/boosters/boost vert S HOVER.png"
]; 
   

var resourceID_To_globalInfo = [
	-1, -1, -1, -1,
	2, 3, 4, 5,
	0, -1, 1, -1,
    6, 7
];
   
//
// Global booster information
// boosterID : Booster resource ID
// count: booster current count for player
var g_boosterInfo = [
    {
        boosterID: ITEM_RAINBOW_BOOSTER,
        count: 0
    },

    {
        boosterID: ITEM_BOMB_BOOSTER,
        count: 0
    },

    {
        boosterID: ITEM_BUBBLE_PAINT_A,
        count: 0
    },
    {
        boosterID: ITEM_BUBBLE_PAINT_B,
        count: 0
    },
    {
         boosterID: ITEM_BUBBLE_PAINT_C,
         count: 0
     },
     {
         boosterID: ITEM_BUBBLE_PAINT_D,
         count: 0
     },
     {
         boosterID: ITEM_HORIZONTAL_BOOSTER,
          count: 10
     },
     {
         boosterID: ITEM_VERTICAL_BOOSTER,
          count: 5
     }
];

function INAPP_Purchase_Info()
{
	this.feedback = false;
	this.item = -1;
	this.gold = 0;
}

var g_purchase_info = null;// new INAPP_Purchase_Info();
var g_fbTransact = null;

window['g_fbTransact'] = g_fbTransact; 