/**
 *   utilityWindows.js
 *   Utility pop-up window class, all derived from WindowSmall class
 *   Author: Ruell Magpayo <ruellm@yahoo.com>
 *   Created: June 19, 2014
 *   
 *    List of classes on this file
 *    QuitScreen 
 *    AwardScreen
*/

/*Quit window*/
function QuitWindow()
{
    //..
    this.yes = null;
    this.noway = null;
    this.restart = null;
}

QuitWindow.prototype = new WindowSmall;

QuitWindow.prototype.LoadInternal = function () {
    var context = this;
    this.LoadInternalBase();
    
    var x = (this.bg._image.width / 2) - (217 / 2)
    var noway = new Button;
    noway.LoadImages(
	    "images/generics/button blank L.png",
        "images/generics/button blank L hover.png",
	    "images/generics/button blank L.png");

    noway._width = 217;
    noway._height = 43;
    noway._X = x;
    noway._Y = 210;
    noway._fnMouseDownEvnt = (function () {
        context.substate = ANIMWINDOW_STATE_GOOUT;
    });

    var quit = new Button;
    quit.LoadImages(
	    "images/generics/button blank L.png",
        "images/generics/button blank L hover.png",
	    "images/generics/button blank L.png");

    quit._width = 217;
    quit._height = 43;
    quit._X = x;
    quit._Y = noway._Y + noway._height + 20;
    quit._fnMouseDownEvnt = (function () {
        g_gameData.UpdateLife(-1);
        g_Engine.SetState(MAP_STATE);
    });

    var restart = new Button;
    restart.LoadImages(
	    "images/generics/button blank L.png",
        "images/generics/button blank L hover.png",
	    "images/generics/button blank L.png");

    restart._width = 217;
    restart._height = 43;
    restart._X = x;
    restart._Y = quit._Y + quit._height + 20;
    restart._fnMouseDownEvnt = (function () {
        g_gameData.UpdateLife(-1);
        g_Engine.SetState(GAME_STATE);
    });

    this._uimanager.Add(noway);
    this._uimanager.Add(quit);
    this._uimanager.Add(restart);
    
    this.yes = new ImageObject();
    this.yes.Load("images/game_screen/text/yes.png");

    this.noway = new ImageObject();
    this.noway.Load("images/game_screen/text/no way.png");

    this.restart = new ImageObject();
    this.restart.Load("images/game_screen/text/restart.png");
}

QuitWindow.prototype.UpdateInternal = function (elapsed) {
    //.. Inherited
}

QuitWindow.prototype.DrawInternal = function (gfx) {
    var ctx = gfx._canvasBufferContext;
    var style = "25pt ERASDEMI";
    ctx.font = style;
    var text = "Surrender game";

    var textWidth = ctx.measureText(text);
    var x = (this.bg._image.width / 2) - (textWidth.width / 2);
    var y = 118;

    gfx.DrawText(text,
        x, y, "rgb(41,14,3)", style);

    text = "and return to the map?";

    var textWidth = ctx.measureText(text);
    var x = (this.bg._image.width / 2) - (textWidth.width / 2);
    var y = 118;

    gfx.DrawText(text,
        x, y + 35, "rgb(41,14,3)", style);

    //******************************************************************/
    // Temporary until text sprite is available
   /* var textArray = ["NO WAY", "YES", "RESTART"];
    var y = 243;
    for (var i = 0; i < textArray.length; i++) {

        var style = "25pt ERASDEMI";
        ctx.font = style;
        var text = textArray[i];

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
      
        gfx.DrawText(text,
            x, y, "rgb(253,235,160)", style);

        y += 63;
      }*/
    //******************************************************************/
    y = 217;
    this.noway.Draw(gfx,
        (this.bg._image.width / 2) - (this.noway._image.width / 2), y);

    this.yes.Draw(gfx,
        (this.bg._image.width / 2) - (this.yes._image.width / 2), y + 63);

    this.restart.Draw(gfx,
        (this.bg._image.width / 2) - (this.restart._image.width / 2), y + 126);


}

/***/

function TipWindow()
{
    this.uimanagerLocal = null;
    this.strings = null;
}

TipWindow.prototype = new WindowMini;

TipWindow.prototype.LoadInternal = function () {
    this.LoadInternalBase();
    this.uimanagerLocal = new UIManager();
    var context = this;

  /*  var okbtn = new Button;
    okbtn.LoadImages(
        "images/generics/button blank M.png",
        "images/generics/button blank M hover.png",
         "images/generics/button blank M.png");

    okbtn._width = 133;
    okbtn._height = 58;
    okbtn._X = (this.bg._image.width / 2) - (okbtn._width / 2);
    okbtn._Y = 240;
    okbtn._fnMouseDownEvnt = (function () {
        context.substate = ANIMWINDOW_STATE_GOOUT;
    });
    */

    //this.uimanagerLocal.Add(okbtn);

    //this.ok = new ImageObject();
    //this.ok.Load("images/generics/OK.png");
}

TipWindow.prototype.UpdateInternal = function (elapsed) {
    this.uimanagerLocal.Update(elapsed);
}

TipWindow.prototype.DrawInternal = function (gfx) {
    this.uimanagerLocal.Draw(gfx);

    var basey = (this.bg._image.height / 2) - (10*this.strings.length);
    for (var i = 0; i < this.strings.length; i++) {
        var ctx = gfx._canvasBufferContext;
        var style = "20pt ERASDEMI";
        ctx.font = style;
        var text = this.strings[i];

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
        var y = basey + (i * 30);

        gfx.DrawText(text,
            x, y,
            "rgb(41,14,3)", style);

    }
}

TipWindow.prototype.EventHandlerInternal = function (e) {
    for (var i = 0; i < this.uimanagerLocal._uiList.length; i++) {
        if (this.uimanagerLocal._uiList[i]._visible) {
            this.uimanagerLocal._uiList[i]._X += this._X;
            this.uimanagerLocal._uiList[i]._Y += this._Y;
        }
    }

    this.EventHandlerBase(e, this.uimanagerLocal);

    //hack solution -- because problem was encountered
    for (var i = 0; i < this.uimanagerLocal._uiList.length; i++) {
        if (this.uimanagerLocal._uiList[i]._visible) {
            this.uimanagerLocal._uiList[i]._X -= this._X;
            this.uimanagerLocal._uiList[i]._Y -= this._Y;
        }
    }
}

/**/

function GuideWindow()
{
    //...
}

GuideWindow.prototype = new WindowBig;

GuideWindow.prototype.LoadInternal = function () {
    this.LoadInternalBase();
}

GuideWindow.prototype.UpdateInternal = function (elapsed) {

   //...
}

GuideWindow.prototype.DrawInternal = function (gfx) {

    var ctx = gfx._canvasBufferContext;
    var style = "25pt ERASDEMI";
    ctx.font = style;
    text = "Game Guide";

    var textWidth = ctx.measureText(text);
    var x = (this.bg._image.width / 2) - (textWidth.width / 2);
    var y = 87;

    gfx.DrawText(text,
        x, y, "rgb(41,14,3)", style);

    //////////////////////////////////////////////////////////

    gfx.DrawText("General",
        150, 115, "rgb(41,14,3)", "16pt ERASDEMI");

    var info = ["- Combine at least 3 bubbles of the same color",
        "- Bank your shots off the walls to access bubbles in more ","  difficult areas",
        "- The number of remaining shots is indicated at the bottom","  of the launcher",
        "- Use the spacebar to switch the bubble colors in launcer,", "  you are only given 5 chance to switch",
        "- A time limit of 5 seconds to launch the bubble is in effect"];
    
    var y = 142;
    for(var i=0; i < info.length;i++){
        gfx.DrawText(info[i],
            175, y, "rgb(41,14,3)", "10pt ERASDEMI");

        y+=15;
    }

    //TODO: 
    //    0. General game info, puzzle, combine2, etc.
    //    1. add bank shot info
    //    2. add level object depends on level types, pay attention to the objective of each level.
    //    3. launcer info
    //    4. 5 seconds rule
    //////////////////////////////////////////////////////////
    y = 280;
    gfx.DrawText("Gold",
       150, y, "rgb(41,14,3)", "16pt ERASDEMI");

    gfx.DrawText("- Use to purchase in-app items such as boosters and/or lives",
      175, y + 27, "rgb(41,14,3)", "10pt ERASDEMI");

    //////////////////////////////////////////////////////////
    y = 350;
    gfx.DrawText("Coins",
       150, y, "rgb(41,14,3)", "16pt ERASDEMI");

    gfx.DrawText("- Earned by removing five or more bubbles in the field",
       175, y+27, "rgb(41,14,3)", "10pt ERASDEMI");

    gfx.DrawText("- Use to unlock levels or earn rewards",
       175, y+27+18, "rgb(41,14,3)", "10pt ERASDEMI");

    // Draw the boosters
    x = (this.bg._image.width / 2) +  30;
    y = 140;
    gfx.DrawText("Booster's Info",
       730, 115,
       "rgb(41,14,3)", "16pt ERASDEMI");

    var booster = [
         "images/game_screen/boosters/boost rainbow S.png",
         "images/game_screen/boosters/boost bomb S.png",
          "images/game_screen/boosters/boost hori S.png",
         "images/game_screen/boosters/boost vert S.png",
         "images/game_screen/boosters/boost paint A S.png",
        "images/game_screen/boosters/boost paint B S.png",
        "images/game_screen/boosters/boost paint C S.png",
        "images/game_screen/boosters/boost paint D S.png"
    ];
                  
    for (var i = 0; i < 4; i++) {
        var image = GetImageResource(booster[i]);

        gfx.DrawImage(image, 0, 0,
           40, 40, x, y, 40, 40, 1.0);

        y += 60;
    }

    gfx.DrawText("Rainbow Booster - The \"Wild card\", can be paired to",
       x + 45, 140 + 25,
       "rgb(41,14,3)", "10pt ERASDEMI");

    gfx.DrawText("any bubble type",
       x + 45, 140 + 25 + 18,
       "rgb(41,14,3)", "10pt ERASDEMI");

    gfx.DrawText("Bomb Booster - Destroys two layers of bubble field",
        x + 45, 200 + 25,
        "rgb(41,14,3)", "10pt ERASDEMI");

    gfx.DrawText("Horizontal Destroy Booster - Destroys Column of bubbles",
        x + 45, 260 + 25,
        "rgb(41,14,3)", "10pt ERASDEMI");

    gfx.DrawText("Horizontal Destroy Booster - Destroys Row of bubbles",
        x + 45, 320 + 25,
        "rgb(41,14,3)", "10pt ERASDEMI");

    var newx = x;
    for (var i = 0; i < 4; i++) {
        var image = GetImageResource(booster[i+4]);

        gfx.DrawImage(image, 0, 0,
           40, 40, newx, y, 40, 40, 1.0);
        
        newx += 45;
    }

    gfx.DrawText("Paint Boosters - Repaint the bubbles",
      newx, y + 25,
      "rgb(41,14,3)", "10pt ERASDEMI");

    gfx.DrawText("to the same color as the booster",
     newx, y + 25 + 18,
     "rgb(41,14,3)", "10pt ERASDEMI");

    x = (this.bg._image.width / 2) + 12;
    y = 110;
    gfx.DrawLine(x, y,
        x, y + 330, 2, "rgb(81,40,40)");
}


