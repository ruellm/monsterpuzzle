/**
 *   purchaseWindow.js
 *   Classes for purchasing gold, coins and in-app items
 *   Author: Ruell Magpayo <ruellm@yahoo.com>
 *   Created: June 19, 2014
*/

/* 
 * Purchase multiple window screen 
 * use mainly for purchasing gold and coins
*/


/**/
var PURCHASE_MULTIPLE_TYPE_GOLD = 0;
var PURCHASE_MULTIPLE_TYPE_COINS = 1;

var PURCHASE_INTERNAL_STATE_NORMAL = 0;
var PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK = 1;
var PURCHASE_INTERNAL_STATE_WAITING_DONE = 2;

function PurchaseWindowMultiple()
{
    this.buyBtn = null;
    this.buyNowSprite = null;
    this.goldSprite = null;
    this.gridSprite = null;
    this.listSprite = null;
    this.checkSprite = null;
    this.type = -1;
    this.selectedIdx = 0;
    this.uimanagerLocal = null;
	
	this.internalState = PURCHASE_INTERNAL_STATE_NORMAL;
	this.timeout = 0;
}

PurchaseWindowMultiple.prototype = new WindowBig;

PurchaseWindowMultiple.prototype.LoadInternal = function () {
    this.LoadInternalBase();

    this.uimanagerLocal = new UIManager();

    var context = this;
    this.buyBtn = new Button;
    this.buyBtn.LoadImages(
	    "images/generics/button blank XL.png",
        "images/generics/button blank XL hover.png",
	    "images/generics/button blank XL.png");

    this.buyBtn._width = 281;
    this.buyBtn._height = 44;
    this.buyBtn._X = 0;
    this.buyBtn._Y = 0;
    this.buyBtn._fnMouseDownEvnt = (function () {
		if (context.type == PURCHASE_MULTIPLE_TYPE_GOLD) {
			g_fbTransact = null;
			if (g_mainUser.id != -1) {
				FBAccess_PaymentAPI(g_goldPriceList[context.selectedIdx][0]);
			}
	   }else if (context.type == PURCHASE_MULTIPLE_TYPE_COINS) {
			g_purchase_info = null;	
			context.internalState = PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK;
						
			if (g_mainUser.id != -1) {
				var type = ITEM_COINS_BULK_0 + context.selectedIdx;
				var price = g_coinPrices[context.selectedIdx][1];
				Ajax_PurchaseInapp( type,  price);
			}
			context.timeout = new Date().getTime();
	   }
    });

    this._uimanager.Add(this.buyBtn);

    this.buyBtn._X = (this.bg._image.width / 2) - (this.buyBtn._width / 2);
    this.buyBtn._Y = 430;

    this.buyNowSprite = new ImageObject();
    this.buyNowSprite.Load("images/purchase_window/buy now.png");

    this.goldSprite = new ImageObject();
    this.goldSprite.Load("images/purchase_window/gold S.png");

    this.gridSprite = new ImageObject();
    this.gridSprite.Load("images/purchase_window/list bg2.png");

    this.checkSprite = new ImageObject();
    this.checkSprite.Load("images/purchase_window/check.png");
    
    this.listSprite = new ImageObject();
    var y = 126;
    for (var i = 0; i < 5; i++) {
        var checkBtn = new Button;
        checkBtn.LoadImages(
            "images/purchase_window/list diamond.png",
            "images/purchase_window/list diamond HOVER.png",
            "images/purchase_window/list diamond.png");

        checkBtn._width = 57;
        checkBtn._height = 57;
        checkBtn._X = (this.bg._image.width / 2) - (this.gridSprite._image.width / 2) + 1;
        checkBtn._Y = y;
        checkBtn.id = i;
        checkBtn._fnMouseDownEvnt = (function () {
            context.selectedIdx = this.id;
        });
        this.uimanagerLocal.Add(checkBtn);
        y += 59;
    }
}


PurchaseWindowMultiple.prototype.OnTransactionComplete = function()
{
	
	var item = g_purchase_info.item - ITEM_COINS_BULK_0;
	g_gameData.coins += g_coinPrices[item][0];
	
	Ajax_UpdateCoins(g_gameData.coins);
	g_gameData.gold = g_purchase_info.gold;
	g_purchase_info = null;	
}

PurchaseWindowMultiple.prototype.UpdateInternal = function (elapsed) {

	if (this.type == PURCHASE_MULTIPLE_TYPE_GOLD) {
		if(this.substate == 0 && g_fbTransact != null){
			return;
		}
	} else if (this.type == PURCHASE_MULTIPLE_TYPE_COINS && 
		this.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK) {
		if( g_purchase_info != null ){
			// feedback occur from server
			if(g_purchase_info.feedback){
				this.message = "Transaction Complete!";
				this.OnTransactionComplete();
				
			}else{
				this.message = "Not enough Gold.";
			}
				
			this.internalState = PURCHASE_INTERNAL_STATE_WAITING_DONE;
				
		}else{
				
			var currTime = new Date().getTime();
			var diff = (currTime - this.timeout) /1000;
				
			if( diff >= 10 ){
				this.message = "Unable to contact server";
				this.internalState = PURCHASE_INTERNAL_STATE_WAITING_DONE;
			}
		}
		
			return;
	}
    this.uimanagerLocal.Update(elapsed);
}

PurchaseWindowMultiple.prototype.DrawInternal = function (gfx) {

	if(this.type == PURCHASE_MULTIPLE_TYPE_GOLD && g_fbTransact != null){
        var ctx = gfx._canvasBufferContext;
        var style = "25pt ERASDEMI";
        ctx.font = style;
		var y = 220;
		for(var i = 0; i < g_fbTransact.length; i++) {
			text = g_fbTransact[i];
			var textWidth = ctx.measureText(text);
			var x = (this.bg._image.width / 2) - (textWidth.width / 2);
			
			gfx.DrawText(text,
				x, y, "rgb(41,14,3)", style);
		
			y += 35;
			
		}		        
		this.buyBtn._visible = false;
		this.buyBtn.enable = false;
		return;
		
	}else if(this.type == PURCHASE_MULTIPLE_TYPE_COINS ){
		if( this.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK) {
		
			var ctx = gfx._canvasBufferContext;
			var style = "20pt ERASDEMI";
			ctx.font = style;
			var text = "Contacting Server...";

			var textWidth = ctx.measureText(text);
			var x = (this.bg._image.width / 2) - (textWidth.width / 2);
			var y = (this.bg._image.height / 2)-40;

			gfx.DrawText(text,
				x , y, "rgb(41,14,3)", style);
				
			this.buyBtn._visible = false;
			this.buyBtn.enable = false;
			return;
				
		} else if (this.internalState == PURCHASE_INTERNAL_STATE_WAITING_DONE) {
			
			var ctx = gfx._canvasBufferContext;
			var style = "20pt ERASDEMI";
			ctx.font = style;
			var text = this.message;

			var textWidth = ctx.measureText(text);
			var x = (this.bg._image.width / 2) - (textWidth.width / 2);
			var y = (this.bg._image.height / 2)-40;

			gfx.DrawText(text,
				x , y, "rgb(41,14,3)", style);
				
		
			this.buyBtn._visible = false;
			this.buyBtn.enable = false;
			return;
		}	
	}
	
	this.buyBtn._visible = true;
	this.buyBtn.enable = true;
		
    this.buyNowSprite.Draw(gfx, this.buyBtn._X + 25, this.buyBtn._Y + 7);
    this.goldSprite.Draw(gfx, this.buyBtn._X + 200, this.buyBtn._Y + 7);

    var gridX = (this.bg._image.width / 2) - (this.gridSprite._image.width / 2);
    this.gridSprite.Draw(gfx,
        gridX, 125);

    this.listSprite.Draw(gfx, gridX + 60, 125);
    
    var startX = gridX + this.gridSprite._image.width - 5;
    if (this.type != -1) {
        var y = 165;
        for (var i = 0; i < 5; i++) {
            // Draw the text price
            var content = "";
            var price = 0;
            if (this.type == PURCHASE_MULTIPLE_TYPE_GOLD) {
                content = g_goldPriceList[i][0];
                price = g_goldPriceList[i][1] + " " + g_currency;
            } else {
                // for gold coins 
                content = g_coinPrices[i][0];
                price = g_coinPrices[i][1] + " Gold";
            }

            gfx.DrawText(content,
                   gridX + 158, y,
                   "rgb(253, 235, 185)",
                   "25pt ERASDEMI");

            var ctx = gfx._canvasBufferContext;
            var style = "25pt ERASDEMI";
            ctx.font = style;
            
            var textWidth = ctx.measureText(price);
            gfx.DrawText(price,
                   startX - textWidth.width, y,
                   "rgb(253, 235, 185)",
                   style);

            y += 59;
        }

        var header = [
            "Buy Gold Bars",
            "Buy coins"
        ];

        var ctx = gfx._canvasBufferContext;
        var style = "30pt ERASDEMI";
        ctx.font = style;
        text = header[this.type];

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
        var y = 97;

        gfx.DrawText(text,
            x, y, "rgb(41,14,3)", style);
    }
    
    this.uimanagerLocal.Draw(gfx);
    this.checkSprite.Draw(gfx, gridX + (this.checkSprite._image.width/2),
        126 + (59 * this.selectedIdx));  

    var total = g_goldPriceList[this.selectedIdx][1];
	if( this.type == PURCHASE_MULTIPLE_TYPE_COINS){
		total = g_coinPrices[this.selectedIdx][1];
	}
	
    gfx.DrawText(total,
               this.buyBtn._X + 231, this.buyBtn._Y + 32,
               "rgb(251,255,109)", "10pt ERASDEMI");
}

PurchaseWindowMultiple.prototype.SetType = function (type)
{
    this.type = type;
    var list = ["images/purchase_window/list gold.png",
                "images/purchase_window/list coins.png"];

    this.listSprite.Load(list[type]);
	this.internalState = PURCHASE_INTERNAL_STATE_NORMAL;
}

PurchaseWindowMultiple.prototype.EventHandlerInternal = function (e) {

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

/*
 * Purchase single window screen
 * use mainly for single purchase of boosters and lives
*/

function PurchaseWindowSingle()
{
    //... 
    this.buyBtn = null;
    this.buyNowSprite = null;
    this.goldSprite = null;
    this.splashSprite = null;
    this.type = -1;
    this.contentImage = null;
    this.askFriendBtn = null;
    this.askFriendTxt = null;
    this.uimanagerLocal = null;
	
	this.internalState = PURCHASE_INTERNAL_STATE_NORMAL;
	this.timeout = 0;
	this.message = "";
	this.OnTransactComplete = null;
}

PurchaseWindowSingle.prototype = new WindowSmall;

PurchaseWindowSingle.prototype.HandleBuy = function()
{
	if(this.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK){
		return;
	}
	
	this.internalState = PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK;
	g_purchase_info = null;	
	Ajax_PurchaseInapp(this.type, g_itemPrices[this.type]);
	this.timeout = new Date().getTime();
}

PurchaseWindowSingle.prototype.LoadInternal = function () {
    this.LoadInternalBase();   
	var context = this;
    this.buyBtn = new Button;
    this.buyBtn.LoadImages(
	    "images/generics/button blank XL.png",
        "images/generics/button blank XL hover.png",
	    "images/generics/button blank XL.png");

    this.buyBtn._width = 281;
    this.buyBtn._height = 42;
    this.buyBtn._X = 0;
    this.buyBtn._Y = 0;
    this.buyBtn._fnMouseDownEvnt = (function () {
        context.HandleBuy();
    });

    this._uimanager.Add(this.buyBtn);

    this.buyBtn._X = (this.bg._image.width / 2) - (this.buyBtn._width / 2);
    this.buyBtn._Y = 430;

    this.buyNowSprite = new ImageObject();
    this.buyNowSprite.Load("images/purchase_window/buy now.png");

    this.goldSprite = new ImageObject();
    this.goldSprite.Load("images/purchase_window/gold S.png");
    
    //this.splashSprite = new ImageObject();
    //this.splashSprite.Load("images/purchase_window/splash.png");
    this.splashSprite = new SplashSprite();
    this.splashSprite._X = (this.bg._image.width / 2) - (this.splashSprite.bg._image.width / 2);
    this.splashSprite._Y = 100;
    this.splashSprite.Load();

    this.contentImage = new ImageObject();
	
	this.internalState = PURCHASE_INTERNAL_STATE_NORMAL;
	this.OnTransactComplete = null;
	
	 this.close._fnMouseDownEvnt = (function () {
	 
		if(context.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK ) return;
        context.substate = ANIMWINDOW_STATE_GOOUT;
    });
}

PurchaseWindowSingle.prototype.SetType = function (type)
{
    this.type = type;    
    this.contentImage.Load(g_purchaseSingle[this.type]);
	this.internalState = PURCHASE_INTERNAL_STATE_NORMAL;
	this.OnTransactComplete = null;

    if (type == ITEM_HEART_LIFE) {
        this.uimanagerLocal = new UIManager();
        this.askFriendBtn = new Button;
        this.askFriendBtn.LoadImages(
            "images/generics/button blank orange XL.png",
            "images/generics/button blank orange XL hover.png",
            "images/generics/button blank orange XL.png");

        this.askFriendBtn._width = 281;
        this.askFriendBtn._height = 42;
        this.askFriendBtn._X = (this.bg._image.width / 2) - (this.askFriendBtn._width / 2);
        this.askFriendBtn._Y = 430 - 50;
        this.askFriendBtn._fnMouseDownEvnt = (function () {
            FBAccess_SendToAll();
        });

        this.uimanagerLocal.Add(this.askFriendBtn);

        this.askFriendTxt = new ImageObject();
        this.askFriendTxt.Load("images/purchase_window/ask friends.png");
    } else {
        this.uimanagerLocal = null;
    }
}

PurchaseWindowSingle.prototype.OnCompleteTransaction = function()
{
	if( g_purchase_info.item != this.type ) return;
	
	switch(g_purchase_info.item)
	{
		case ITEM_HEART_LIFE:
			g_gameData.UpdateLife(5);
		break;
		
		case ITEM_RAINBOW_BOOSTER:	
		case ITEM_BOMB_BOOSTER:
		case ITEM_BUBBLE_PAINT_A:
		case ITEM_BUBBLE_PAINT_B:
		case ITEM_BUBBLE_PAINT_C:
		case ITEM_BUBBLE_PAINT_D:
			/*var idx = resourceID_To_globalInfo[g_purchase_info.item];
			g_boosterInfo[idx].count++;
			Ajax_UpdateBooster(g_purchase_info.item, g_boosterInfo[idx].count);*/
		    UpdateBooster(g_purchase_info.item, 1);
		break;
		default:
			if(this.OnTransactComplete){
				this.OnTransactComplete();
			}
		break;
	}
	g_gameData.gold = g_purchase_info.gold;
	g_purchase_info = null;	
}

PurchaseWindowSingle.prototype.UpdateInternal = function (elapsed) {
	if( this.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK) {		
	
		if( g_purchase_info != null ){
			// feedback occur from server
			if(g_purchase_info.feedback){
				this.message = "Transaction Complete!";
				
				this.OnCompleteTransaction();
			}else{
				this.message = "Not enough Gold.";
			}
			
			this.internalState =PURCHASE_INTERNAL_STATE_WAITING_DONE;
			
		}else{
			
			var currTime = new Date().getTime();
			var diff = (currTime - this.timeout) /1000;
			
			if( diff >= 10 ){
				this.message = "Unable to contact server";
				this.internalState =PURCHASE_INTERNAL_STATE_WAITING_DONE;
			}
		}
	
		return;
	}
	
    if( this.uimanagerLocal )
        this.uimanagerLocal.Update(elapsed);

    this.splashSprite.Update(elapsed);
}

PurchaseWindowSingle.prototype.DrawInternal = function (gfx) {
    		
    if( this.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK) {
	
		var ctx = gfx._canvasBufferContext;
        var style = "20pt ERASDEMI";
        ctx.font = style;
        var text = "Contacting Server...";

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
        var y = (this.bg._image.height / 2)-40;

        gfx.DrawText(text,
            x , y, "rgb(41,14,3)", style);
			
		// disable the button
		this.buyBtn._visible = false;
		this.buyBtn.enable = false;
		return;
	} else if (this.internalState == PURCHASE_INTERNAL_STATE_WAITING_DONE) {
		
		var ctx = gfx._canvasBufferContext;
        var style = "20pt ERASDEMI";
        ctx.font = style;
        var text = this.message;

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
        var y = (this.bg._image.height / 2)-40;

        gfx.DrawText(text,
            x , y, "rgb(41,14,3)", style);
			
		// disable the button
		this.buyBtn._visible = false;
		this.buyBtn.enable = false;
		return;
		
	
	} else {
		this.buyBtn._visible = true;
		this.buyBtn.enable = true;
	}
	
	this.buyNowSprite.Draw(gfx, this.buyBtn._X + 25, this.buyBtn._Y + 7);
    this.goldSprite.Draw(gfx, this.buyBtn._X + 200, this.buyBtn._Y + 7);
  
    //this.splashSprite.Draw(gfx,
       // (this.bg._image.width / 2) - (this.splashSprite._image.width / 2),
        //100);
    
    this.splashSprite.Draw(gfx);

    this.contentImage.Draw(gfx,
            (this.bg._image.width / 2) - (this.contentImage._image.width / 2),
            (this.bg._image.height / 2) - (this.contentImage._image.height / 2));

    if (this.uimanagerLocal)
        this.uimanagerLocal.Draw(gfx);
		
    if (this.type != -1) {
        // Draw header
        var ctx = gfx._canvasBufferContext;
        var style = "20pt ERASDEMI";
        ctx.font = style;
        var text = "Buy " + g_purchaseSingleText[this.type];

        var textWidth = ctx.measureText(text);
        var x = (this.bg._image.width / 2) - (textWidth.width / 2);
        var y = 118;

        gfx.DrawText(text,
            x , y,
            "rgb(41,14,3)", style);

        // Draw the text price
        gfx.DrawText(g_itemPrices[this.type],
               this.buyBtn._X + 231, this.buyBtn._Y + 32,
               "rgb(251,255,109)", "25pt ERASDEMI");


        if (this.type == ITEM_HEART_LIFE) {
            this.askFriendTxt.Draw(gfx,
                  (this.bg._image.width / 2) - (this.askFriendTxt._image.width / 2),
                  this.askFriendBtn._Y + 6);
        } else {
            text = g_inAppDescription[this.type];

            var count = 1;
            if (text.length > 45) {
                count = text.length / 45;
            }

            var y = 380;
            var currIdx = 0;
            for (i = 0; i < count; i++) {

                var ctx = gfx._canvasBufferContext;
                var style = "10pt ERASDEMI";
                ctx.font = style;
                var ctext = text.substring(currIdx, currIdx + 45);

                var textWidth = ctx.measureText(ctext);
                var x = (this.bg._image.width / 2) - (textWidth.width / 2);
               
                gfx.DrawText(ctext,
                    x, y,
                    "rgb(41,14,3)", style);

                y += 15;
                currIdx += 45;
            }           
        }
    }
}

PurchaseWindowSingle.prototype.EventHandlerInternal = function (e) {

	if( this.internalState == PURCHASE_INTERNAL_STATE_WAIT_FEEDBACK) {
		return;
	}
	
    if (this.uimanagerLocal) {
        for (var i = 0; i < this.uimanagerLocal._uiList.length; i++) {
            if (this.uimanagerLocal._uiList[i]._visible) {
                this.uimanagerLocal._uiList[i]._X += this._X;
                this.uimanagerLocal._uiList[i]._Y += this._Y;
            }
        }
    }

    this.EventHandlerBase(e, this.uimanagerLocal);

    if (this.uimanagerLocal) {
        //hack solution -- because problem was encountered
        for (var i = 0; i < this.uimanagerLocal._uiList.length; i++) {
            if (this.uimanagerLocal._uiList[i]._visible) {
                this.uimanagerLocal._uiList[i]._X -= this._X;
                this.uimanagerLocal._uiList[i]._Y -= this._Y;
            }
        }
    }
}

