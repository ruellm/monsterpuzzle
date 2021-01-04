/**
    PRe-Splash Load State (load at startup)
    All Resources must be loaded before starting the game
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: March 16, 2013, Los Angeles CA.
*/

function LoadState() {
    // State ID 
    this._stateID = LOAD_STATE;
	this.count = 0;
	this.audio_loaded = 0;
	
	var context = this;
	this.loaded = false;
	this.bg = new Image();
    this.bg.src = "images/splash_load/loading.png";
	this.bg.onload = (function () {
        context.count++;
    });
	
	this.load_outline = new Image();
	this.load_outline.src = "images/splash_load/splash load outline.png";
	this.load_outline.onload = (function () {
        context.count++;
    });
	
	this.bar = new Image();
	this.bar.src = "images/splash_load/splash load bar.png";
	this.bar.onload = (function () {
        context.count++;
    });
	
 }

// set base class to State
LoadState.prototype = new State;

LoadState.prototype.Load = function () {
	var context = this;
	
	
	/*this.bg = new ImageObject();
	this.bg.Load("images/splash_load/loading.png");
	
	this.load_outline = new ImageObject();
	this.load_outline.Load("images/splash_load/splash load outline.png");
	
	this.bar = new ImageObject();
	this.bar.Load("images/splash_load/splash load bar.png");
	*/
	
    // Load Image List
    // loop thru image list
    //for (var idx = 0; idx < g_imageFileList.length; idx++) {
    //    new ImageResource().Load(g_imageFileList[idx]);
   // }
  
	
    if (g_mainUser.id != -1) {
        Ajax_LoginUser(g_mainUser.id);

		var res = g_mainUser.name.split(' ');;
		g_mainUser.name = res[0];
		
		g_mainUser.LoadImage();
		LoadProfileImage(g_FBPlayerList);
		LoadProfileImage(g_FBInvitableList);
	} else {
        g_gameData.isDataLoadDone = true;
    }
}

LoadState.prototype.Update = function (elapsed) {
	if( this.count < 3 ){
		return;
	}else if( !this.loaded ) {
	
		DEBUG_LOG("To be loaded " + g_imageFileList.length);
	
		new ImageResource().Load(g_imageFileList[0]);		
		LoadAudio();
		this.loaded = true;
		return;
	}

    if ( g_imageResourceList.length >= g_imageFileList.length ) {

        //...
		this.audio_loaded = 0;
        for (var aud = 0; aud < g_audioResourceList.length; aud++) {
            if (g_audioResourceList[aud].loaded) {
                this.audio_loaded++;
            }
        }
        
        if (this.audio_loaded >= g_audioFileList.length) {		
			if( g_gameData.isDataLoadDone ){
				g_Engine.SetState(MAP_STATE);
			}
        }
        
        //if (g_audioResourceList.length >= g_audioFileList.length) {
        //g_Engine.SetState(GAME_STATE);
        //}
    }
}

LoadState.prototype.Draw = function (gfx) {
	if(this.count < 3) return;
		
	//this.bg.Draw(gfx, 0, 0 );
	//this.load_outline.Draw(gfx, 851, 92);
		
	gfx.DrawImageFullA(this.bg, 0, 0, 1.0);
	gfx.DrawImageFullA(this.load_outline, 851, 92, 1.0);
	
	var total = g_imageFileList.length + g_audioFileList.length;
	var loaded = (g_imageResourceList.length)+ this.audio_loaded;
	var pct = loaded / total;
	
	var nbarwidth = this.bar.width * pct;
    if (nbarwidth > 0 ) {
        gfx.DrawImage(this.bar, 0, 0, nbarwidth, this.bar.height,
                    851, 92, nbarwidth, this.bar.height, 1.0);
    } 
	
	var ctx = gfx._canvasBufferContext;
    var style = "Bold 15pt ERASDEMI";
    ctx.font = style;
    
	var text = Math.floor(pct * 100) +"%";
    var textWidth = ctx.measureText(text);
    var x = (851 + (this.bar.width/2)) - textWidth.width / 2;
  
    gfx.DrawText(text,
        x, 79+this.bar.height, "rgb(253,235,185)", style);

}


///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
LoadState.prototype.Unload = function () {
    this.CleanupUIManager();
}

LoadState.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}


