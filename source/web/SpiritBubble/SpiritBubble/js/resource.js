//
// All Resource handling will be handled in here
// file created: March 16, 2013 in Los Angeles
// Author: Ruell Magpayo <ruellm@yahoo.com>
//
// Ported to Spirt Bubble May 23, 2014
//
/////////////////////////////////////////////////////////////////////////////////////
// Image Resource filenames
//

// Image Resource global lists
g_imageResourceList = new Array();

// Image filename list
g_imageFileList = [

    // world 1 map sprite
    "images/map/1/map.png",
    "images/map/1/emblem.png",
    "images/map/1/emblem HOVER.png",
    "images/map/1/emblem circle.png",
    "images/map/1/emblem DISABLED.png",
    "images/map/1/map star.png",
    "images/map/1/arrow right.png",
    "images/map/1/arrow left.png",
    "images/map/1/arrow right HOVER.png",
    "images/map/1/arrow left HOVER.png",
    "images/map/1/progress bar map base.png",
    "images/map/1/progress bar map.png",
    "images/map/1/progress bar map marker.png",
    "images/map/1/picture handle S.png",
    "images/map/1/coin XS.png",
    "images/map/1/lock 2.png",
	"images/map/1/cloud1.png",
    "images/map/1/cloud2.png",
	"images/map/1/cloud3.png",
	
    // Level Info/complete/failed screens
    "images/level_info_complete/level marker base.png",
    "images/level_info_complete/top scores base.png",
    "images/level_info_complete/x.png",
    "images/level_info_complete/x HOVER.png",
    "images/level_info_complete/top score bg.png",
    "images/level_info_complete/user score bg.png",
    "images/level_info_complete/top score.png",
    "images/level_info_complete/picture handle.png",
    "images/level_info_complete/button send to all.png",
    "images/level_info_complete/button send to all HOVER.png",
    "images/level_info_complete/send heart.png",
    "images/level_info_complete/send plus.png",
    "images/level_info_complete/goals panel.png",
    "images/level_info_complete/select boosters panel.png",
    
    "images/level_info_complete/PLAY.png",
    "images/level_info_complete/star empty.png",
    "images/level_info_complete/star glow.png",
    "images/level_info_complete/completed.png",
    "images/level_info_complete/failed.png",
    "images/level_info_complete/next.png",
    "images/level_info_complete/share.png",
    "images/level_info_complete/score pane.png",
    "images/level_info_complete/retry.png",

   // "images/level_info_complete/star shine.png",

    // for booster!
    "images/level_info_complete/booster/boost bomb M.png",
    "images/level_info_complete/booster/boost rainbow M.png",
    "images/level_info_complete/booster/boost paint A M.png",    
    "images/level_info_complete/booster/boost paint B M.png",      
    "images/level_info_complete/booster/boost paint C M.png",      
    "images/level_info_complete/booster/boost paint D M.png",      
    "images/level_info_complete/booster/boost hori M.png",
    "images/level_info_complete/booster/boost vert M.png",

    // game screen Top Bar UI
    "images/game_screen/topbar/top bar.png",
    "images/game_screen/topbar/wood plank.png",
    "images/game_screen/topbar/wood plank2.png",
    "images/game_screen/topbar/Dollar coin.png",
    "images/game_screen/topbar/gold bar icon.png",
    "images/game_screen/topbar/heart.png",
    "images/game_screen/topbar/Plus sign mouse hover.png",
    "images/game_screen/topbar/Plus sign no click.png",

    //purchase window arts
    "images/purchase_window/window big.png",
    "images/purchase_window/window small.png",
    "images/purchase_window/X window.png",
    "images/purchase_window/X HOVER window.png",
    "images/purchase_window/buy now.png",
    "images/purchase_window/gold S.png",
    "images/purchase_window/splash.png",
    "images/purchase_window/splash sparkle.png",
    "images/purchase_window/list bg2.png",
    "images/purchase_window/list gold.png",
    "images/purchase_window/list coins.png",
    "images/purchase_window/list diamond.png",
    "images/purchase_window/list diamond HOVER.png",
    "images/purchase_window/check.png",
    "images/purchase_window/ask friends.png",

    //purchase bubbles
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
    "images/purchase_window/boost vert L.png",

    //generics images
    "images/generics/button blank XL.png",
    "images/generics/button blank XL hover.png",
    "images/generics/button blank S hover.png",
    "images/generics/button blank S.png",
    "images/generics/button blank M.png",
    "images/generics/button blank M hover.png",
    "images/generics/button blank L.png",
    "images/generics/button blank L hover.png",
    "images/generics/button circle_S_HOVER.png",
    "images/generics/button circle_S.png",
    "images/generics/button blank orange XL.png",
    "images/generics/button blank orange XL hover.png",
    "images/generics/window extra small.png",
    "images/generics/OK.png",

    // right bar
    "images/game_screen/right_bar/right bar.png",
    "images/game_screen/right_bar/home.png",
    "images/game_screen/right_bar/home HOVER.png",
    "images/game_screen/right_bar/music.png",
    "images/game_screen/right_bar/music HOVER.png",
    "images/game_screen/right_bar/sound.png",
    "images/game_screen/right_bar/sound HOVER.png",
    "images/game_screen/right_bar/progress bar play frame.png",
    "images/game_screen/right_bar/progress bar play.png",
    "images/game_screen/right_bar/off.png",
    "images/game_screen/right_bar/about.png",
    "images/game_screen/right_bar/about HOVER.png",

    // give life screens
    "images/give_life/list friends bg.png",
    "images/give_life/Send Lives.png",
    "images/give_life/list diamond S.png",
    "images/give_life/list diamond S hover.png",
    "images/give_life/check S.png",
    "images/give_life/picture handle XS.png",

    "images/game_screen/load.png",

    // booster art
    "images/game_screen/boosters/boost bomb S HOVER.png",
    "images/game_screen/boosters/boost bomb S.png",
    "images/game_screen/boosters/boost paint A S HOVER.png",
    "images/game_screen/boosters/boost paint A S.png",
    "images/game_screen/boosters/boost paint B S HOVER.png",
    "images/game_screen/boosters/boost paint B S.png",
    "images/game_screen/boosters/boost paint C S HOVER.png",
    "images/game_screen/boosters/boost paint C S.png",
    "images/game_screen/boosters/boost paint D S HOVER.png",
    "images/game_screen/boosters/boost paint D S.png",
    "images/game_screen/boosters/boost rainbow S HOVER.png",
    "images/game_screen/boosters/boost rainbow S.png",
    "images/game_screen/boosters/bomb explode.png",
    "images/game_screen/boosters/rainbow vanish.png",

    "images/game_screen/boosters/boost hori S.png",
    "images/game_screen/boosters/boost hori S HOVER.png",

    "images/game_screen/boosters/boost vert S.png",
    "images/game_screen/boosters/boost vert S HOVER.png",

    "images/daily_spinner/Daily Spin.png",
    "images/daily_spinner/inner with nails.png",
    "images/daily_spinner/logo.png",
    "images/daily_spinner/outer.png",
    "images/daily_spinner/pointer.png",
    "images/daily_spinner/SPIN.png"

  ];


////////////////////////////////////////////////////////////////////////////////////////////////////////
// Per level/world type loading
g_commonImageList = [
    // game screen text
    "images/game_screen/text/Ready.png",
    "images/game_screen/text/GO.png",
    "images/game_screen/text/Game Over.png",
    "images/game_screen/text/Good Job.png",
    "images/game_screen/text/No More Bubbles.png",
    "images/game_screen/text/yes.png",
    "images/game_screen/text/no way.png",
    "images/game_screen/text/restart.png",
	"images/game_screen/text/Rush Level.png",

    "images/game_screen/border.png",
    "images/game_screen/ball block.png",
    "images/game_screen/hint_sprite.png",
    "images/game_screen/coin spin.png",

    // game screen side bar UI
    "images/game_screen/sidebar/side bar.png",
    "images/game_screen/sidebar/boosters game screen.png",
    "images/game_screen/sidebar/plus1_click.png",
    "images/game_screen/sidebar/plus1_mouse hover.png",

    // You want some Balls?
    "images/game_screen/balls/ball bank.png",
    "images/game_screen/balls/ball launcher sparkle.png",
    "images/game_screen/balls/ball deployed sparkle.png",
    "images/game_screen/balls/static/ball static A.png",
    "images/game_screen/balls/static/ball static B.png",
    "images/game_screen/balls/static/ball static C.png",
    "images/game_screen/balls/static/ball static D.png",
    "images/game_screen/balls/static/ball idle gray.png",

    "images/game_screen/balls/vanish/ball vanish A.png",
    "images/game_screen/balls/vanish/ball vanish B.png",
    "images/game_screen/balls/vanish/ball vanish C.png",
    "images/game_screen/balls/vanish/ball vanish D.png",

    "images/game_screen/balls/deployed/ball deployed A.png",
    "images/game_screen/balls/deployed/ball deployed B.png",
    "images/game_screen/balls/deployed/ball deployed C.png",
    "images/game_screen/balls/deployed/ball deployed D.png",

    "images/game_screen/balls/idle/ball idle A.png",
    "images/game_screen/balls/idle/ball idle B.png",
    "images/game_screen/balls/idle/ball idle C.png",
    "images/game_screen/balls/idle/ball idle D.png",

    // launcher sprites
    "images/game_screen/launcher/launcher.png",
    "images/game_screen/launcher/gear big.png",
    "images/game_screen/launcher/gear small.png",

    "images/game_screen/cursor/cursor A.png",
    "images/game_screen/cursor/cursor B.png",
    "images/game_screen/cursor/cursor C.png",
    "images/game_screen/cursor/cursor D.png",

    // demon sprite
    "images/game_screen/demons/demon 1 idle.png",
     "images/game_screen/demons/demon 1 turn CCW.png",
     "images/game_screen/demons/demon 1 turn CW.png",
    "images/game_screen/demons/demon 2 idle.png",

    "images/game_screen/demons/demon 2 turn CCW.png",
    "images/game_screen/demons/demon 2 turn CW.png",

    "images/game_screen/demons/demon 2 worried CCW.png",
     "images/game_screen/demons/demon 2 worried CW.png",
     "images/game_screen/demons/demon 2 win.png",

    // China/Meg doll
    "images/game_screen/china/china blink.png",
    "images/game_screen/china/china lose.png",
    "images/game_screen/china/chinaclap.png",

    "images/game_screen/boosters/lightningboosterdestroy.png"

];

var g_world1_List = [
     "images/game_screen/bg/waterfall bground.png",
    "images/game_screen/bg/waterfall mground.png"
];

var g_world2_List = [
    "images/game_screen/bg/2/forest bg.png",
    "images/game_screen/bg/2/fog1.png",
    "images/game_screen/bg/2/fog2.png",
    "images/game_screen/bg/2/fog3.png"
];

var g_world3_List = [
    "images/game_screen/bg/3/river bg.png",
    "images/game_screen/bg/3/river fg.png"
];

var g_world4_List = [
    "images/game_screen/bg/4/mountain bg.png",
    "images/game_screen/bg/4/mountain fg.png",
    "images/game_screen/bg/4/cloud a.png",
    "images/game_screen/bg/4/cloud b.png",
    "images/game_screen/bg/4/cloud c.png"
];

var g_resource_load_flag= [
    false,          // common flag
    false,          // world1 flag
    false,          // world2 flag
    false,         // river world flag
    false           // mountain world flag
];

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Slides implementation
var g_slides1_images = [
    "images/slides/slide1.png",
    "images/slides/slide2.png",
    "images/slides/slide3.png"
];

var g_slides2_images = [
    "images/slides/slide4.png",
    "images/slides/slide5.png",
    "images/slides/slide6.png"
];

var g_slides3_images = [
    "images/slides/slide7.png",
    "images/slides/slide8.png",
    "images/slides/slide9.png"
];

var g_slides4_images = [
    "images/slides/slide11/final slides0000.png",
    "images/slides/slide11/final slides0001.png",
    "images/slides/slide11/final slides0002.png",
    "images/slides/slide11/final slides0003.png",
    "images/slides/slide11/final slides0004.png",
    "images/slides/slide11/final slides0005.png",
    "images/slides/slide11/final slides0006.png",
    "images/slides/slide11/final slides0007.png",
    "images/slides/slide11/final slides0008.png",
    "images/slides/slide11/final slides0009.png",
    "images/slides/slide11/final slides0010.png",
    "images/slides/slide11/final slides0011.png"
];

var g_slides5_images = [
    "images/slides/slide12/touch slides0.png",
    "images/slides/slide12/touch slides1.png",
    "images/slides/slide12/touch slides2.png",
    "images/slides/slide12/touch slides3.png",
    "images/slides/slide12/touch slides4.png",
    "images/slides/slide12/touch slides5.png",
    "images/slides/slide12/touch slides6.png",
    "images/slides/slide12/touch slides7.png",
    "images/slides/slide12/touch slides8.png",
    "images/slides/slide12/touch slides9.png",
    "images/slides/slide12/touch slides10.png",
    "images/slides/slide12/touch slides11.png"
];

var g_slide6_images = [
    "images/slides/slide10/glow slide0.png",
    "images/slides/slide10/glow slide1.png",
    "images/slides/slide10/glow slide2.png",
    "images/slides/slide10/glow slide3.png",
    "images/slides/slide10/glow slide4.png",
    "images/slides/slide10/glow slide5.png",
    "images/slides/slide10/glow slide6.png",
    "images/slides/slide10/glow slide7.png"
];

var g_finalStory = [
    "images/slides/slide13/bg.png",
    "images/slides/slide13/bubbles.png",
    "images/slides/slide13/panda.png"
];

var g_storySlideImage = [
    false,
    false,
    false,
    false,
    false,
    false
];

//////////////////////////////////////////////////////////////////////////////////////////////////////

// count image loaded error
var g_errorImageList = new Array();
var RETRY_MAX = 3;
var g_retryCount = 0;

// deferred loading of resources
var global_resource_index = 0;
var g_currentResource = g_imageFileList;
var g_resourceToLoad = null;
var g_resourceLoadCount = 0;
var g_audioLoadCount = 0;

function ImageResource() {
    this.image = null;
    this.path = null;
    this.load = false;

    this.Load = function (szPath) {
        this.image = new Image();
        this.image.src = szPath;
        this.path = szPath;
        var context = this;
        this.image.onload = (function () {
            context.load = true;			
            g_imageResourceList.push(context);
			
			DEBUG_LOG(context.path + " Loading Done..." 
				+  g_imageResourceList.length);
			
			if(g_currentResource != null){
				if( ++global_resource_index < g_currentResource.length){
					new ImageResource().Load(g_currentResource[global_resource_index]);
				}else{
					g_currentResource = null;
				}
			}
        });
		
        this.image.onerror = (function () {
            g_errorImageList.push(context);
        });
    }

    this.Reload = function () {
        this.image = null;
        this.Load(this.path);
    }
}

//
// helper functions
//
function GetImageResource(szPath) {
    var image = null;
    for (var idx = 0; idx < g_imageResourceList.length; idx++) {
        if (g_imageResourceList[idx].path == szPath) {
            image = g_imageResourceList[idx].image;
            break;
        }
    }
    return image;
}

//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Audio Resource
//
//  Audio resources are divided into two categories
// WAV and MP3
// See audio support http://www.w3schools.com/html/html5_audio.asp
// Test Audio support http://textopia.org/androidsoundformats.html
// HTML5 audio issue 
// http://flowz.com/2011/03/apple-disabled-audiovideo-playback-in-html5/
// http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
//
// online mp3 converter (for OGG support)
// http://media.io/
// mp3 cutter
// http://mp3cut.net/
// Ported from Titays game to Spirit Bubble
// May 25, 2014 

// Image Resource global lists
g_audioResourceList = new Array();

g_audioFileList = [
     {
         fname: "map01",
         sfx: false
     },

     {
        fname: "change_direction_squeak_1click",
        sfx: true
      },

    {
        // button click
        fname: "button_click_converted",
        sfx: true
    },

     {
         // button click
         fname: "alertwin",
         sfx: true
     }
];


// for separate implementation

///////////////////////////////////////////////////////////////////////////////
// For level based audio resource loading
//
g_gameAudioCommonList_1 = [
     {
         fname: "match_colors",
         sfx: true
     },
    {
        fname: "shoot_bubble",
        sfx: true
    },
    {
        fname: "no_match02",
        sfx: true
    },
    {
        fname: "bounce_1",
        sfx: true
    },
    {
        fname: "RMBLE",
        sfx: true
    },
    {
        fname: "wood_knock",
        sfx: true
    },
    {
        fname: "coin01",
        sfx: true
    },
    {
        fname: "level_success",
        sfx: true
    },
    {
        fname: "level_fail",
        sfx: true
    }    
];

g_world1Audio_List = [
      {
          fname: "level-music-01",
          sfx: false
      }    
];

g_world2Audio_List = [
      {
          fname: "level-music-02",
          sfx: false
      }
];

g_world3Audio_List = [
      {
          fname: "level-music-03_shortversion",
          sfx: false
      }
];

g_world4Audio_List = [
      {
          fname: "level-music-04",
          sfx: false
      }
];

g_storyAudio_1 = [
      {
          // credit to: http://www.freesound.org/
          fname: "203706__setuniman__sappy-1d29",
          sfx: false
      }
];

g_storyAudio_2 = [
      {
          // credit to: http://www.freesound.org/
          fname: "234106__setuniman__piano-loop-1e71",
          sfx: false
      }
];

///////////////////////////////////////////////////////////////////////////////


function AudioResource() {
    this.audio = null;
    this.path = null;
    this.loaded = false;
    this.volume = 1.0;
    this.sfx = true;

    this.Load = function (aud) {
        var context = this;
        var audpath = GetAudPath(aud.fname);
        this.audio = buildAudio(audpath);
        if (this.audio == null) return;

        this.audio.addEventListener("canplay", function () {
            context.loaded = true;
           
        });

        this.audio.addEventListener("error", function (e) {
			console.log("error on "+context.path);
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    console.log('You aborted the video playback.');
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    console.log('A network error caused the audio download to fail.');
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    console.log('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    console.log('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
                    break;
                default:
                    console.log('An unknown error occurred.');
                    break;
            }
        });

        g_audioResourceList.push(context);
        this.path = aud.fname;
        this.audio.loop = false;
        this.sfx = aud.sfx;
    }
}

function buildAudio(path) {
    // Disable audio for Apple devices
    if (isMobileSafari()) {
        return null;
    }

    var audio = document.createElement("audio");
    if (audio != null && audio.canPlayType) {
        audio.src = path;
        audio.preload = "auto";
        audio.load();
    }

    return audio;
}

function GetAudioResource(szPath, vol) {
    var audio = null;
    if (!szPath || 0 === szPath.length) return null;
    for (var idx = 0; idx < g_audioResourceList.length; idx++) {
        if (g_audioResourceList[idx].path.indexOf(szPath) != -1) {
            if (g_audioResourceList[idx].loaded) {
                audio = g_audioResourceList[idx].audio;

                if (vol) {
                    g_audioResourceList[idx].volume = vol;
                }

                
                if ((g_audioResourceList[idx].sfx && VOLUME_SFX_FLAG) ||
                    (!g_audioResourceList[idx].sfx && VOLUME_BGMUSIC_FLAG)) {
                    audio.volume = g_audioResourceList[idx].volume;
                } else {
                    audio.volume = 0;
                }
            }
            break;
        }
    }

    return audio;
}

// 
// NOTE: temporarily disabled soundbank feature
//

var SOUND_BANK_COUNT = 2;
var VOLUME_BGMUSIC_FLAG = true;
var VOLUME_SFX_FLAG = true;

function LoadAudio() {
    for (var idx = 0; idx < g_audioFileList.length; idx++) {
        new AudioResource().Load(g_audioFileList[idx]);
    }
}

function GetAudPath(audId) {
    var browser = BrowserVersion();
    var path = "mp3";
    if (browser[0] == "firefox" || browser[0] == "opera") {
        path = "ogg";
    }

    return ("sounds/" + path + "/" + audId + "." + path);
}


function UpdateAudio(flag, sfx) {
    //silent all the audio resource
    for (var idx = 0; idx < g_audioResourceList.length; idx++) {
        if ((sfx == g_audioResourceList[idx].sfx)) {

            if (!flag) {
                g_audioResourceList[idx].audio.volume = 0;
            } else {
                g_audioResourceList[idx].audio.volume = g_audioResourceList[idx].volume;
            }
        }
    }
    
    if (sfx) {
        VOLUME_SFX_FLAG = flag;
    } else {
        VOLUME_BGMUSIC_FLAG = flag;
    }
}

/////////////////////////////////////////////////////////////////////////////////////