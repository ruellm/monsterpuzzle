/**
    Helper for calling Ajax
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 23, 2012
    
	Ported to Spirit Bubble June 28, 2014
	
*/

//
// Transaction ID
//
var REQ_LOGIN_USER = 100;
var REQ_UPDATE_LIFE = 200;
var REQ_UPDATE_TOTAL_SCORE = 300;
var REQ_UPDATE_MAX_LEVEL = 400;
var REQ_UPDATE_LEVEL = 500;
var REQ_GET_USER_LEVEL_DATA = 600;
var REQ_ASK_LIFE = 700;
var REQ_LIFE_BEGGARS = 800;
var REQ_GRANT_LIFE_SINGLE= 900;
var REQ_SET_EPOCH = 1000;
var REQ_GET_BOOSTERS_INFO = 1100;
var REQ_PURCHASE_INAPP	= 1200;
var REQ_UPDATE_BOOSTER = 1300;
var REQ_UPDATE_REWARD_FLAG = 1400;
var REQ_UPDATE_GOLD = 1500;
var REQ_ADD_TRANSACTION = 1600;
var REQ_UPDATE_COINS = 1700;

////////////////////////////////////////////////////////////////////////////////
// Base 64 Encryption
var rc4_key = "spiritbubble";

var M = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        e: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

				////////////////////////////////////////////////////
				// Perform RC4 decryption first
				DEBUG_LOG(input);
				//input = rc4(rc4_key,input);
				///////////////////////////////////////////////////							
				
                input = M.ute(input);

                while (i < input.length) {

                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                                enc4 = 64;
                        }

                        output = output +
                        M._keyStr.charAt(enc1) + M._keyStr.charAt(enc2) +
                        M._keyStr.charAt(enc3) + M._keyStr.charAt(enc4);

                }

                return output;
        },

        // public method for decoding
        d: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                        enc1 = M._keyStr.indexOf(input.charAt(i++));
                        enc2 = M._keyStr.indexOf(input.charAt(i++));
                        enc3 = M._keyStr.indexOf(input.charAt(i++));
                        enc4 = M._keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                        }

                }

                output = M.utd(output);

                return output;

        },

        // private method for UTF-8 encoding
        ute: function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }

                }

                return utftext;
        },

        // private method for UTF-8 decoding
        utd: function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while (i < utftext.length) {

                        c = utftext.charCodeAt(i);

                        if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                        }
                        else if ((c > 191) && (c < 224)) {
                                c2 = utftext.charCodeAt(i + 1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                        }
                        else {
                                c2 = utftext.charCodeAt(i + 1);
                                c3 = utftext.charCodeAt(i + 2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
                        }

                }
                return string;
        }
}
////////////////////////////////////////////////////////////////////////////////

function Ajax_Init()
{
        //
        // Get Ajax object
        //
		var xmlhttp = null;
        if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
        }
        else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
		xmlhttp.onreadystatechange = null;
		
        return xmlhttp;
}

///////////////////////////////////////////////////////////////////////
// This function request for data from server side and returns with
// following string format
//
// feedback format feedback format REQID|max_level|gold|life|coins|total_score	
///////////////////////////////////////////////////////////////////////

function Ajax_HandleReply()
{
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				
        var response = M.d(xmlhttp.responseText);
        var dataArray = response.split("|");
		
		DEBUG_LOG(response);
		
		var req_id = parseInt(dataArray[0]);
		switch(req_id){
			case REQ_LOGIN_USER:
				g_gameData.top_level = parseInt(dataArray[1]);
				g_gameData.gold = parseInt(dataArray[2]);
				g_gameData.life = parseInt(dataArray[3]);;
				g_gameData.coins = parseInt(dataArray[4]);;
				g_gameData.totalScore = parseInt(dataArray[5]);
				g_targetTimer = parseInt(dataArray[6]);
				g_gameData.reward_flag_bit = parseInt(dataArray[7]);
				g_gameData.isFirstLogin = (parseInt(dataArray[8]) == 1);
                g_gameData.isDataLoadDone = true;
				
				Ajax_GetBeggars()				
				
			break;
			case REQ_GET_USER_LEVEL_DATA:
				 var fbid = dataArray[1];
				 var count = parseInt(dataArray[2]);
				 var level_data = dataArray[3];
				 var profile = FB_GetProfile(fbid);
				 
				 if( count > 0){
					level_data = level_data.split("/");
				 }
				 
				for(var i = 0; i < count; i++){
					var angelGraf = level_data[i].split(",");
					
					var level_id = angelGraf[0];
					var score	= angelGraf[1];
					var star 	= angelGraf[2];
					
					if( g_gameData.level_list[level_id].friends_list == null ){
							g_gameData.level_list[level_id].friends_list = new Array();
					}
					
					var dangeli = new FB_Profile_Level();

					if( fbid == g_mainUser.id ){					
						g_gameData.level_list[level_id].bestScore = score;
						g_gameData.level_list[level_id].starCount = star;
						
						dangeli.fbProfile = g_mainUser;
						dangeli.score = score;											
					} else{												
					    dangeli.fbProfile = profile;
					    dangeli.score = score;					
					}

					g_gameData.level_list[level_id].friends_list.push(dangeli);
					g_gameData.level_list[level_id].friends_list.sort(SortScore);
                      
				}
				
				//  move to next friend list
				if( g_FBProfileCtr < g_FBPlayerList.length || 
					(fbid == g_mainUser.id && g_FBProfileCtr==0)) {
					Ajax_GetUserLevelData(g_FBPlayerList[g_FBProfileCtr++].id);
				}
				
			break;
			case REQ_LIFE_BEGGARS:	
			
				if( dataArray.length > 1 ) {
					var ids = dataArray[1].split(",");
					for(var i=0; i < ids.length; i++){
						
						var internal = ids[i].split("/");
						var fb_id = internal[0];
						var rec_id = internal[1];
						
					    var profile = FB_GetProfile(fb_id);
                        if( profile != null ) {
					        var beggar = new BeggarData();
							beggar.fbProfile = profile;
							beggar.recordID = rec_id;
							g_beggarsList.push(beggar);
						}
					}
				}
			
				Ajax_GetBoosters();
			break;
			
			case REQ_GET_BOOSTERS_INFO:
				if( dataArray.length > 1 ) {
					var boosters = dataArray[1].split(",");
					for(var i=0; i < boosters.length; i++){
						
						var internal = boosters[i].split("/");
						var boosterID = parseInt(internal[0]);
						var count = parseInt(internal[1]);
						
						for(var b=0; b < g_boosterInfo.length; b++){
							if(g_boosterInfo[b].boosterID == boosterID){
							    g_boosterInfo[b].count = count;
							}
						}
					}
				}
				
				FB_LoadLevelData();
			break;
			
			case REQ_PURCHASE_INAPP:
				var feedback = dataArray[1];
				var gold = parseInt(dataArray[2]);
				var item = parseInt(dataArray[3]);
				
				g_purchase_info = new INAPP_Purchase_Info;
				g_purchase_info.feedback = (feedback=="OK");
				g_purchase_info.item = item;
				g_purchase_info.gold = gold;
				
			break;
		}
	}
}

function Ajax_doRequest(id, value, callback)
{
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();
	
	var fbid = g_mainUser.id;
	var param = id + "/" + fbid + "/" + value;     
	 
	if(callback){
		xmlhttp.onreadystatechange = Ajax_HandleReply;
	}
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_doRequestID(id, fbid, callback)
{
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();
	
	var param = id + "/" + fbid;     	 
	if(callback){
		xmlhttp.onreadystatechange = Ajax_HandleReply;
	}
		 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_doRequestMe(id, callback)
{
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();
	
	var fbid = g_mainUser.id;
	var param = id + "/" + fbid;     	 
	if(callback){
		xmlhttp.onreadystatechange = Ajax_HandleReply;
	}
		 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_LoginUser(fbid)
{
	Ajax_doRequestID(REQ_LOGIN_USER, fbid, true);
}

function Ajax_UpdateLife(life)
{
   Ajax_doRequest(REQ_UPDATE_LIFE, life);
}

function Ajax_UpdateTotalScore(score)
{
    Ajax_doRequest(REQ_UPDATE_TOTAL_SCORE, score);
}

function Ajax_UpdateMaxLevel(level)
{
    Ajax_doRequest(REQ_UPDATE_MAX_LEVEL, level);
}

function Ajax_GetBeggars()
{	
	Ajax_doRequestMe(REQ_LIFE_BEGGARS, true);
}

function Ajax_UpdateLevelInfo(level, score, star)
{
    if (g_mainUser.id == -1) return;

	xmlhttp = Ajax_Init();	
	var fbid = g_mainUser.id;
	var param = REQ_UPDATE_LEVEL + "/" + fbid + "/" + level + "/" +
			score + "/" + star;     
	 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_GetUserLevelData(fbid)
{	
	Ajax_doRequestID(REQ_GET_USER_LEVEL_DATA, fbid, true);
}

function Ajax_AskForLife(user)
{
	var delim = "|";
    var inv = "";
	
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();	
	var fbid = g_mainUser.id;
	
	for (var i = 0; i < user.length; i++) {
		inv += (user[i]);
		if(i+1 < user.length){
			inv += delim;
		}
    }
	
	// Request is
	// REQ_ASK_LIFE/fbid/id|id|id...
	var param = REQ_ASK_LIFE + "/" + fbid + "/" + inv;
	 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_GrantLife(list)
{
	if (g_mainUser.id == -1) return;

	for (var i = 0; i < list.length; i++) {	
		xmlhttp = Ajax_Init();	
		var param = REQ_GRANT_LIFE_SINGLE + "/" + list[i];
	 
		param = M.e(param);
		xmlhttp.open("GET", "php/transact.php?param="+param, true);
		xmlhttp.send();
	}
}

function Ajax_GetBoosters()
{
	Ajax_doRequestMe(REQ_GET_BOOSTERS_INFO, true);
}

function Ajax_PurchaseInapp(itemID, price)
{
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();	
	xmlhttp.onreadystatechange = Ajax_HandleReply;
	
	var param = REQ_PURCHASE_INAPP + "/" + g_mainUser.id + "/" + 
		itemID + "/" + price;
	 
	param = M.e(param);
	xmlhttp.open("GET", "php/transact.php?param="+param, true);
	xmlhttp.send();
}

function Ajax_UpdateBooster(boosterID, count)
{
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();	
	
	var param = REQ_UPDATE_BOOSTER + "/" + g_mainUser.id + "/" + 
		boosterID + "/" + count;

	param = M.e(param);
	xmlhttp.open("GET", "php/transact.php?param="+param, true);
	xmlhttp.send();
}

function Ajax_UpdateRewardFlag()
{
	Ajax_doRequest(REQ_UPDATE_REWARD_FLAG, g_gameData.reward_flag_bit);
}

function Ajax_UpdateGold()
{
	Ajax_doRequest(REQ_UPDATE_GOLD, g_gameData.gold);
}

function Ajax_UpdateCoins(count)
{
	Ajax_doRequest(REQ_UPDATE_COINS, count);
}

function Ajax_AddTransaction(amount, currency, payment_id, quantity)
{
	if (g_mainUser.id == -1) return;
	xmlhttp = Ajax_Init();	
	
	var param = REQ_ADD_TRANSACTION + "/" + g_mainUser.id + "/" +
		amount + "/" + currency + "/" + payment_id +"/" + quantity;

	param = M.e(param);
	xmlhttp.open("GET", "php/transact.php?param="+param, true);
	xmlhttp.send();
}