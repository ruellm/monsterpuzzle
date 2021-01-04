/**
    level_info_1.js
    contains level information for Levels 1 to ___
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 13, 2014
*/

/*
====================================
Each game type is 5 levels
====================================
    clear all
    clear all with iron
    clear all with obstacle
    clear all with obstacle moving
    timer levels - coin locked

    clear bank
    clear bank with iron
    clear bank with obstacle
    clear bank with moving obstacle
    timer levels - coin locked

    reach score with bubbles
    reach score with iron
    reach score with obstacle
    reach score with moving obstacle
    timer levels - coin locked

    reach score - clear field
    clear all - full field
    clear bank - full field
    bank shot - full field
    timer levels - coin locked
*/

function LoadLevels_1() {

    //--------------- level 1 -------------------------------------
    var level_1 = new LevelBase();
    level_1.type = LEVEL_TYPE_CLEAR_ALL;

    level_1.description = new Array();
    level_1.description.push("Clear all bubbles to complete");
    level_1.description.push("the level!");
    level_1.max_bubble_count = 35;
    level_1.bubbleMap = template_0;
    level_1.starCount = 0;      // load star info from db  
    level_1.tip.push("Watch out for your bubble count");
    level_1.tip.push("at the bottom of the screen!");
    g_gameData.level_list.push(level_1);

    //--------------- level 2 -------------------------------------
    var level_2 = new LevelBase();
    level_2.type = LEVEL_TYPE_CLEAR_ALL;

    level_2.description = new Array();
    level_2.description.push("Clear all bubbles to complete");
    level_2.description.push("the level!");
    level_2.max_bubble_count = 15;
    level_2.bubbleMap = template_1;
    level_2.starCount = 0;
    level_2.tip.push("Your bubble will automatically");
    level_2.tip.push("launch after 5 seconds of no action!");
    //level_2.tip.push("You can use the side bars");
    //level_2.tip.push("to create a bank shot!");
    g_gameData.level_list.push(level_2);

    //--------------- level 3 -------------------------------------
    var level_3 = new LevelBase();
    level_3.type = LEVEL_TYPE_CLEAR_ALL;

    level_3.description = new Array();
    level_3.description.push("Clear all bubbles to complete");
    level_3.description.push("the level!");
    level_3.max_bubble_count = 45;
    level_3.bubbleMap = template_2;
    level_3.starCount = 0;
    level_3.tip.push("Use space bar to switch bubbles");
    level_3.tip.push("from your launcher!");
    level_3.tip.push(" ");
    level_3.tip.push("Note: You can only use 5 switches");
    level_3.tip.push("in a game. Use wisely!");
    g_gameData.level_list.push(level_3);

    //--------------- level 4 -------------------------------------
    var level_4 = new LevelBase();
    level_4.type = LEVEL_TYPE_CLEAR_ALL;

    level_4.description = new Array();
    level_4.description.push("Clear all bubbles to complete");
    level_4.description.push("the level!");
    level_4.max_bubble_count = 40;
    //level_4.bubbleMap = template_3;
    level_4.starCount = 0;
    level_4.bubbleMap = new Array();
    InitFieldTemplate(level_4.bubbleMap);
    GenerateRect(7, 3, level_4.bubbleMap);
    g_gameData.level_list.push(level_4);

    //--------------- level 5 -------------------------------------
    var level_5 = new LevelBase();
    level_5.type = LEVEL_TYPE_CLEAR_ALL;

    level_5.description = new Array();
    level_5.description.push("Clear all bubbles to complete");
    level_5.description.push("the level!");
    level_5.max_bubble_count = 20;
    level_5.bubbleMap = template_4;
    level_5.starCount = 0;
    level_5.tip.push("You can use the boosters");
    level_5.tip.push("to Help you out in the game!");
    g_gameData.level_list.push(level_5);

    //--------------- level 6 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level!");
    level.max_bubble_count = 50;
    level.tip.push("The iron bubble cannot be paired");
    level.tip.push("BUT can be disconnected!");

    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateRect(10, 4, level.bubbleMap, param);

    level.starCount = 0;
    g_gameData.level_list.push(level);

    //--------------- level 7 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level!");
    level.max_bubble_count = 50;
    level.bubbleMap = new Array();

    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    InitFieldTemplate(level.bubbleMap);
    GenerateTrianglePattern(4, 10, 4, level.bubbleMap, param);

    level.starCount = 0;
    g_gameData.level_list.push(level);

    //--------------- level 8 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level!");
    level.max_bubble_count = 100;

    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    var loc = 3;
    for (var i = 0; i < 4; i++) {
        GenerateSlantPattern(loc, 1, 6, 0, level.bubbleMap, param);
        loc += 3;
    }

    level.starCount = 0;
    g_gameData.level_list.push(level);

    //--------------- level 9 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level!");
    level.max_bubble_count = 50;
    level.starCount = 0;

    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateRect(4, 4, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 10 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level!");
    level.max_bubble_count = 50;
    level.starCount = 0;

    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateSlantPattern(0, 2, 6, 0, level.bubbleMap);
    GenerateSlantPattern(14, 2, 6, 1, level.bubbleMap);
    GenerateRect(3, 6, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 11 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL | LEVEL_TYPE_PREDEFINE_BUBBLES;

    level.description = new Array();
    level.description.push("Bank shot mode: Use the side to hit ");
    level.description.push("the bubble");

    level.max_bubble_count = 1;
    level.pre_define_bubble = new Array();
    level.pre_define_bubble.push(1);
    level.tip.push("This is a one shot bank only level");
    level.tip.push("You are given one bubble to shoot!");
    level.bubbleMap = template_6;

    level.starCount = 0;
    level.barX = 0;
    level.barY = 350;
    level.barCount = 5;
    g_gameData.level_list.push(level);

    //--------------- level 12 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL | LEVEL_TYPE_PREDEFINE_BUBBLES;

    level.description = new Array();
    level.description.push("Bank shot mode: Use the side to hit ");
    level.description.push("the bubble");

    level.max_bubble_count = 1;
    level.pre_define_bubble = new Array();
    level.pre_define_bubble.push(2);
    level.pre_define_bubble.push(1);

    level.bubbleMap = template_9;

    level.starCount = 0;
    level.barX = 0;
    level.barY = 350;
    level.barCount = 5;
    g_gameData.level_list.push(level);

    //--------------- level 13 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Bank shot mode: Use the side to hit ");
    level.description.push("the bubble");
    level.max_bubble_count = 50;
    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateBranchSingle(4, 2, 5, level.bubbleMap);
    GenerateBranchSingle(6, 1, 5, level.bubbleMap);
    GenerateBranchSingle(8, 2, 5, level.bubbleMap);

    level.starCount = 0;
    level.barX = 0;
    level.barY = 300;
    level.barCount = 5;
    g_gameData.level_list.push(level);

    //--------------- level 14 -------------------------------------

    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level!");
    level.max_bubble_count = 70;
    level.bubbleMap = new Array();
  
    InitFieldTemplate(level.bubbleMap);
    GenerateTrianglePattern(4, 4, 3, level.bubbleMap, param);

    level.starCount = 0;
    level.barY = 300;

    g_gameData.level_list.push(level);

    //--------------- level 15 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Bank shot mode: Use the side to hit ");
    level.description.push("the bubble");
    level.max_bubble_count = 70;
    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateBranchSingle(3, 2, 5, level.bubbleMap);
    GenerateBranchSingle(12, 2, 5, level.bubbleMap);

    level.starCount = 0;
    level.barX = 0;
    level.barY = 300;
    level.barCount = 5;
    g_gameData.level_list.push(level);

    //--------------- level 16 -------------------------------------

    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL;

    level.description = new Array();
    level.description.push("Bank shot mode: Use the side to hit ");
    level.description.push("the bubble");
    level.max_bubble_count = 10;
    level.bubbleMap = template_1;
    level.tip.push("Watch out for the moving obstacle!");

    level.starCount = 0;
    level.barX = 0;
    level.barY = 340;
    level.barCount = 5;
    level.isBarMoving = true;

    g_gameData.level_list.push(level);
    
    //--------------- level 17 -------------------------------------
    //--------------- level 18 -------------------------------------
    //--------------- level 19 -------------------------------------
    //--------------- level 20 -------------------------------------
    for (var i = 0; i < 4; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_ALL ;

        level.description = new Array();
        level.description.push("Clear all bubbles to complete");
        level.description.push("the level!");
        level.max_bubble_count = 70;
        level.starCount = 0;
        level.isBarMoving = true;
        level.barY = 300;

        var param = new GenerateParam();
        param.blankpct = Math.floor(Math.random() * 4);
        param.gray_bubble_pct = 1;

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);
        GenerateRect(FIELD_WIDTH, 4, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 21 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_SURVIVAL_MODE | LEVEL_TYPE_TIMER;

    level.description = new Array();
    level.description.push("Survival mode: How many bubbles ");
    level.description.push("can you eliminate in one minute?");
    level.max_bubble_count = 30;
    level.bubbleMap = new Array();
    level.tip.push("Do not let the bubbles");
    level.tip.push("reach the top of the launcher!");
    level.coins_requirement = 50;

    var param = new GenerateParam();
    param.blankpct = 3;

    InitFieldTemplate(level.bubbleMap);
    GenerateRect(FIELD_WIDTH, 1, level.bubbleMap, param);

    level.starCount = 0;
    g_gameData.level_list.push(level);

    //---------------------------------------------Background 2 -----------------------------------------------------------
    //--------------- level 22 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_BANK;

    level.description = new Array();
    level.description.push("Clear Column: Clear a minimum of 10");
    level.description.push("columns to complete the level");
    level.max_bubble_count = 50;
    level.bubbleMap = new Array();
    level.tip.push("Clear a minimum of 10 columns!");

    var param = new GenerateParam();
    param.blankpct = 2;

    InitFieldTemplate(level.bubbleMap);
    GenerateRect(FIELD_WIDTH, 5, level.bubbleMap, param);

    level.starCount = 0;
    level.bg_type = 1;
    g_gameData.level_list.push(level);

    //--------------- level 23 -------------------------------------
    //--------------- level 24 -------------------------------------
    //--------------- level 25 -------------------------------------
    //--------------- level 26 -------------------------------------
    //--------------- level 27 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_CLEAR_BANK;

        level.description = new Array();
        level.description.push("Clear Column: Clear a minimum of 10");
        level.description.push("columns to complete the level");
        level.max_bubble_count = 50;
        level.starCount = 0;
        level.bg_type = 1;

        var param = new GenerateParam();
        param.blankpct = Math.floor(Math.random() * 5);

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);
        GenerateRect(FIELD_WIDTH, 7, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 28 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_BANK;

    level.description = new Array();
    level.description.push("Clear Column: Clear a minimum of 10");
    level.description.push("columns to complete the level");
    level.max_bubble_count = 50;
    level.starCount = 0;
    level.tip.push("The iron bubble cannot be paired");
    level.tip.push("BUT can be disconnected!");
    level.bg_type = 1;

    var param = new GenerateParam();
    param.blankpct = 2;
    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateRect(FIELD_WIDTH, 7, level.bubbleMap, param);

    param.gray_bubble_pct = 10;
    param.gray_include_top = true;
    GenerateBranchSingle(8, 1, 7, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 29 -------------------------------------
    //--------------- level 30 -------------------------------------
    //--------------- level 31 -------------------------------------
    //--------------- level 32 -------------------------------------
    for (var i = 0; i < 4; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_CLEAR_BANK;

        level.description = new Array();
        level.description.push("Clear Column: Clear a minimum of 10");
        level.description.push("columns to complete the level");
        level.max_bubble_count = 50;
        level.starCount = 0;
        level.bg_type = 1;

        var param = new GenerateParam();
        param.blankpct = Math.floor(Math.random() * 1);
        param.gray_bubble_pct = Math.floor(Math.random() * 2);

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);
        GenerateTrianglePattern(4, 10, 4+i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 33 -------------------------------------
    //--------------- level 34 -------------------------------------
    //--------------- level 35 -------------------------------------
    //--------------- level 36 -------------------------------------
    //--------------- level 37 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_BANK;

        level.description = new Array();
        level.description.push("Clear Column: Clear a minimum of 10");
        level.description.push("columns to complete the level");
        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 1;
        level.barY = 340;

        var param = new GenerateParam();
        param.blankpct = Math.floor(Math.random() * 5);
        param.gray_bubble_pct = Math.floor(Math.random() * 2);

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var height = Math.floor(Math.random() * 2);

        GenerateRect(FIELD_WIDTH, 2 + height, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 38 -------------------------------------
    //--------------- level 39 -------------------------------------
    //--------------- level 40 -------------------------------------
    //--------------- level 41 -------------------------------------
    //--------------- level 42 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_CLEAR_BANK;

        level.description = new Array();
        level.description.push("Clear Column: Clear a minimum of 10");
        level.description.push("columns to complete the level");
        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 1;
        level.barY = 340;
        level.isBarMoving = true;

        var param = new GenerateParam();
        param.blankpct = Math.floor(Math.random() * 5);
        param.gray_bubble_pct = Math.floor(Math.random() * 2);

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        GenerateRect(FIELD_WIDTH, 2 + i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 43 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_SURVIVAL_MODE | LEVEL_TYPE_TIMER;

    level.description = new Array();
    level.description.push("Survival mode: How many bubbles ");
    level.description.push("can you eliminate in one minute?");
    level.max_bubble_count = 30;
    level.bubbleMap = new Array();
    level.coins_requirement = 100;
    level.barY = 340;
    level.isBarMoving = true;
    level.bg_type = 1;

    var param = new GenerateParam();
    param.blankpct = 3;

    InitFieldTemplate(level.bubbleMap);
    GenerateRect(FIELD_WIDTH, 1, level.bubbleMap, param);

    level.starCount = 0;
    g_gameData.level_list.push(level);

    //---------------------------------------------Background 3 -----------------------------------------------------------
    //--------------- level 44 -------------------------------------
    //--------------- level 45 -------------------------------------
    //--------------- level 46 -------------------------------------
    for (var i = 0; i < 3; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_TARGET_SCORE;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 2;
        level.scoreTarget = 500;

        level.description = new Array();
        level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
        level.description.push("score to complete the level");

        if (i == 0) {
            level.tip.push("Complete the level by ");
            level.tip.push("reaching " + level.scoreTarget + " points");
        }
       
        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        GenerateRect(2+i, 2+i, level.bubbleMap);

        g_gameData.level_list.push(level);
    }

    //--------------- level 47 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.scoreTarget = 1500;
    level.bg_type = 2;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");
    
    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    var loc = 3;
    for (var i = 0; i < 3; i++) {
        GenerateBranchSingle(loc, 2, 4, level.bubbleMap, param);
        loc += 4;
    }

    g_gameData.level_list.push(level);

    //--------------- level 48 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.scoreTarget = 1500;
    level.bg_type = 2;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");

    var param = new GenerateParam();
    param.gray_bubble_pct = 1;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    GenerateSlantPattern(6, 1, 8, 0, level.bubbleMap, param);
    GenerateSlantPattern(9, 1, 8, 1, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 49 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 2;
    level.scoreTarget = 1000;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    var param = new GenerateParam();
    param.gray_bubble_pct = 10;
    param.gray_include_top = true;

    GenerateRect(FIELD_WIDTH, 2, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 50 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 2;
    level.scoreTarget = 1000;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    var param = new GenerateParam();
    param.gray_bubble_pct = 10;
    param.gray_include_top = true;

    var loc = 1;
    for (var i = 0; i < 3; i++) {
        GenerateBranchSingle(loc, 1, 7, level.bubbleMap, param);
        loc += 12;
    }

    GenerateRect(5, 5, level.bubbleMap);

    g_gameData.level_list.push(level);
  
    //--------------- level 51 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 2;
    level.scoreTarget = 1000;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    var param = new GenerateParam();
    param.gray_bubble_pct = 5;
    param.gray_include_top = true;

    GenerateTrianglePattern(6, 5, 4, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 52 -------------------------------------
    //--------------- level 53 -------------------------------------
    for (var i = 0; i < 2; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_TARGET_SCORE;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 2;
        level.scoreTarget = 500;

        level.description = new Array();
        level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
        level.description.push("score to complete the level");

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var param = new GenerateParam();
        param.gray_bubble_pct = 5;
        param.gray_include_top = true;

        GenerateRect(5 + i, 3 + i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 54 -------------------------------------
    //--------------- level 55 -------------------------------------
    //--------------- level 56 -------------------------------------
    //--------------- level 57 -------------------------------------
    //--------------- level 58 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_TARGET_SCORE | LEVEL_TYPE_OBSTACLE;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 2;
        level.scoreTarget = 1500;
        level.barY = 340;
        level.isBarMoving = true;

        level.description = new Array();
        level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
        level.description.push("score to complete the level");

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        GenerateRect(2 + i, 2 + i, level.bubbleMap);

        g_gameData.level_list.push(level);
    }

    //--------------- level 59 -------------------------------------
    //---- manual beautiful art - a series of V shape bubbles ------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE | LEVEL_TYPE_OBSTACLE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 2;
    level.scoreTarget = 1500;
    level.barY = 340;
    level.isBarMoving = true;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    GenerateSlantPattern(6, 1, 2, 0, level.bubbleMap);
    GenerateSlantPattern(8, 1, 2, 1, level.bubbleMap);

    GenerateSlantPattern(4, 1, 4, 0, level.bubbleMap);
    GenerateSlantPattern(10, 1, 4, 1, level.bubbleMap);

    GenerateSlantPattern(2, 1, 6, 0, level.bubbleMap);
    GenerateSlantPattern(12, 1, 6, 1, level.bubbleMap);

    g_gameData.level_list.push(level);

    //--------------- level 60 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE | LEVEL_TYPE_OBSTACLE;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 2;
    level.scoreTarget = 1500;
    level.barY = 340;
    level.isBarMoving = true;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    var param = new GenerateParam();
    param.gray_bubble_pct = 10;
    param.gray_include_top = true;
    GenerateRect(4, 1, level.bubbleMap, param);
    GenerateBranchSingle(5, 1, 5, level.bubbleMap, param);
    GenerateBranchSingle(10, 1, 5, level.bubbleMap, param);

    g_gameData.level_list.push(level);

    //--------------- level 61 -------------------------------------
    //--------------- level 62 -------------------------------------
    //--------------- level 63 -------------------------------------
    //--------------- level 64 -------------------------------------
    for (var i = 0; i < 4; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_TARGET_SCORE | LEVEL_TYPE_OBSTACLE;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 2;
        level.scoreTarget = 1500;
        level.barY = 340;
        level.isBarMoving = true;

        level.description = new Array();
        level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
        level.description.push("score to complete the level");

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var param = new GenerateParam();
        param.gray_bubble_pct = 5;

        GenerateTrianglePattern(4, 6, 3 + i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 65 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_SURVIVAL_MODE | LEVEL_TYPE_TIMER;

    level.description = new Array();
    level.description.push("Survival mode: How many bubbles ");
    level.description.push("can you eliminate in one minute?");
    level.max_bubble_count = 30;
    level.bubbleMap = new Array();
    level.coins_requirement = 200;
    level.barY = 340;
    level.isBarMoving = true;
    level.bg_type = 2;

    InitFieldTemplate(level.bubbleMap);
    GenerateRect(FIELD_WIDTH, 1, level.bubbleMap, param);

    level.starCount = 0;
    g_gameData.level_list.push(level);


    //---------------------------------------------Background 4 -----------------------------------------------------------
    //--------------- level 66 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_CLEAR_ALL | LEVEL_TYPE_TIMER;

    level.description = new Array();
    level.description.push("Clear all bubbles to complete");
    level.description.push("the level in 2 minutes!");

    level.tip.push("Watch out for the timer!");
    level.tip.push("Complete the level in 2 minutes! ");

    level.max_bubble_count = 40;
    level.bg_type = 3;
    level.timerMax = 60 * 2;

    var param = new GenerateParam();
    param.gray_bubble_pct = 0;
    param.blankpct = 0;

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);
    GenerateRect(8, 4, level.bubbleMap, param);
    
    level_1.starCount = 0;      // load star info from db  
    g_gameData.level_list.push(level);

    //--------------- level 67 -------------------------------------
    //--------------- level 68 -------------------------------------
    //--------------- level 69 -------------------------------------
    //--------------- level 70 -------------------------------------
    //--------------- level 71 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_CLEAR_ALL | LEVEL_TYPE_TIMER;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 3;

        level.description = new Array();
        level.description.push("Clear all bubbles to complete");
        level.description.push("the level in 2 minutes!");

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var param = new GenerateParam();
        param.gray_bubble_pct = 1;
        param.blankpct = 1;
        level.timerMax = 60 * 2;

        GenerateTrianglePattern(4, 10, 3 + i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 72 -------------------------------------
    //--------------- level 73 -------------------------------------
    //--------------- level 74 -------------------------------------
    //--------------- level 75 -------------------------------------
    //--------------- level 76 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_CLEAR_ALL | LEVEL_TYPE_TIMER | LEVEL_TYPE_OBSTACLE;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 3;

        level.description = new Array();
        level.description.push("Clear all bubbles to complete");
        level.description.push("the level in 2 minutes!");

        level.barY = 340;
        level.isBarMoving = true;
        level.timerMax = 60 * 2;

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var param = new GenerateParam();
        param.gray_bubble_pct = Math.floor(Math.random() * 2);
        param.blankpct = Math.floor(Math.random() * 6);

        GenerateRect(FIELD_WIDTH, 2+i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 77 -------------------------------------
    //--------------- level 78 -------------------------------------
    //--------------- level 79 -------------------------------------
    //--------------- level 80 -------------------------------------
    //--------------- level 81 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_CLEAR_BANK | LEVEL_TYPE_TIMER;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 3;
        level.timerMax = 60 * 2;

        level.description = new Array();
        level.description.push("Clear Column: Clear a minimum of 10");
        level.description.push("columns to complete the level");

        if (i == 0) {
            level.tip.push("Clear 10 columns in two minutes");
        }

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var param = new GenerateParam();
        param.gray_bubble_pct = Math.floor(Math.random() * 1);
        param.blankpct = Math.floor(Math.random() * 6);

        GenerateRect(FIELD_WIDTH, 2 + i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 82 -------------------------------------
    //--------------- level 83 -------------------------------------
    //--------------- level 84 -------------------------------------
    //--------------- level 85 -------------------------------------
    //--------------- level 86 -------------------------------------
    for (var i = 0; i < 5; i++) {
        var level = new LevelBase();
        level.type = LEVEL_TYPE_CLEAR_BANK | LEVEL_TYPE_TIMER | LEVEL_TYPE_OBSTACLE;

        level.max_bubble_count = 70;
        level.starCount = 0;
        level.bg_type = 3;
        level.timerMax = 60 * 3;

        level.description = new Array();
        level.description.push("Clear all bubbles to complete");
        level.description.push("the level in 3 minute!");

        level.bubbleMap = new Array();
        InitFieldTemplate(level.bubbleMap);

        var param = new GenerateParam();
        param.gray_bubble_pct = Math.floor(Math.random() * 1);
        param.blankpct = Math.floor(Math.random() * 6);

        param.blankpct = 2;
        level.barY = 340;
        level.isBarMoving = true;

        GenerateTrianglePattern(4-i, 10+i, 2 + i, level.bubbleMap, param);

        g_gameData.level_list.push(level);
    }

    //--------------- level 87 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE | LEVEL_TYPE_TIMER;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 3;
    level.scoreTarget = 500;
    level.timerMax = 120;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level.");
    level.description.push("Achieved this in 2 minute!");

    level.tip.push("The level will start with a blank field,");
    level.tip.push("Complete the level by ");
    level.tip.push("reaching " + level.scoreTarget + " points");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    g_gameData.level_list.push(level);

    //--------------- level 88 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_TARGET_SCORE | LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_TIMER;

    level.max_bubble_count = 70;
    level.starCount = 0;
    level.bg_type = 3;
    level.scoreTarget = 500;
    level.barY = 340;
    level.isBarMoving = true;

    level.timerMax = 120;

    level.description = new Array();
    level.description.push("Target Score: Get a minimum of " + level.scoreTarget);
    level.description.push("score to complete the level");
    level.description.push("Achieved this in 2 minute!");

    level.tip.push("Complete the level by ");
    level.tip.push("reaching " + level.scoreTarget + " points");

    level.bubbleMap = new Array();
    InitFieldTemplate(level.bubbleMap);

    g_gameData.level_list.push(level);

    //--------------- level 89 -------------------------------------
    var level = new LevelBase();
    level.type = LEVEL_TYPE_OBSTACLE | LEVEL_TYPE_SURVIVAL_MODE | LEVEL_TYPE_TIMER;

    level.description = new Array();
    level.description.push("Survival mode: How many bubbles ");
    level.description.push("can you eliminate in one minute?");
    level.max_bubble_count = 30;
    level.bubbleMap = new Array();
    level.coins_requirement = 300;
    level.barY = 340;
    level.isBarMoving = true;
    level.bg_type = 3;

    InitFieldTemplate(level.bubbleMap);
    GenerateRect(FIELD_WIDTH, 1, level.bubbleMap, param);

    level.starCount = 0;
    g_gameData.level_list.push(level);

}