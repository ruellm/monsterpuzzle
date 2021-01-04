<!-- 
    index.psp
    
    Date Started: June 27, 2014
    Author: Ruell Magpayo<ruellm@yahoo.com>

    Spirit Bubble Production team

    Game and engine developer: Ruell Magpayo <ruellm@yahoo.com>
    Art :   Meg Modequillo 
            Andre Anog
    
    Music and Sound effects: Jupiter Isidro
-->

<?php 
	require 'php-fb-sdk/facebook.php';
	include_once 'php/definitions.php';
	include 'php/pdomysql_ex.php';								

	//////////////////////////////////////////////////
	// FOR DEBUGGING flag
	$DEBUG_MODE = 1;	
	//////////////////////////////////////////////////
	
	function reAuth($facebook)
	{
		// Authorize application in Facebook
		$params = array(
				'scope' => 'user_friends, publish_actions, email',
				'redirect_uri' => 'https://apps.facebook.com/spiritbubble/'
		);
	
		// retrieve AUTH URL and redirect to the page
		$login_url = $facebook->getLoginUrl($params);
		echo ("<script> top.location.href='".$login_url."'</script>");
	}
	
	// Get these from http://developers.facebook.com 
	$facebook = new Facebook(array(
		'appId'  => $APP_KEY,
		'secret' => $SECRET_KEY,
		'cookie' => true
	));

	// Get Facebook User ID
	$fbuid = $facebook->getUser();
	$access_token = $facebook->getAccessToken();	
	//echo $access_token;
	
	if (!$fbuid) {
		reAuth($facebook);		
	}else{
		//check if the permissions exists
		/*
		$permissions = $facebook->api("/me/permissions");
		$permarr = array("user_friends","publish_actions", "email");
		
		$count = count($permissions['data']);
		$passed = 0;
		for($i = 0; $i < $count; $i++){		
			$var = in_array($permissions['data'][$i]['permission'], $permarr);
			if( $var ){
				if( $permissions['data'][$i]['status'] == 'granted'	){
					$passed++;
				}
			}
		}
		
		if( $passed < count($permarr))
		{
			reAuth($facebook);
		} 
		*/
	}
?>	

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" manifest="game.manifest">
<head>
    <title>Spirit Bubble</title>  	
	
    <!-- CSS Definitions -->  
    <link href="fonts/erasdemi/stylesheet.css" rel="stylesheet" />
    <link href="fonts/jonny_quest/stylesheet.css" rel="stylesheet" />

	<!-- flag to determine we are in debug mode -->
	<script> var g_DEBUG_MODE = false; </script> 
	
	<!-- We are using JQUERY for firefox coordinates -->
	<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
	
	<!-- maudau code begin -->
    <script id="maudauScript" src="//cdn.maudau.com/AdsBar/js/maudau.promobox.loader.1_0.js"></script>
    <script>MauDau.init(5684, 1);</script>
    <script language="javascript" type="text/javascript"> 
		var _sa = _sa || []; 
		_sa.push(['initialize', '95f6acfd-fca7-49b3-94ea-4c36ed64c718']); 
		_sa.push(['displayAd']); (function () { var sa = document.createElement('script'); sa.type = 'text/javascript'; sa.async = true; 
		sa.src = '//admin.appnext.com/an.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sa, s); })(); 
	</script>
	
    <!-- global script -->
    <script>
        function openWindow(url) {
            window.open(url, '_blank');
            window.focus();
        }
    </script>
	
<?php if( $DEBUG_MODE ) {?>
    <!-- Global definitions -->
    <script src="js/common.js"></script>
    <script src="js/resource.js"></script>

    <!-- Core references -->
    <script src="js/core/baseObject.js"></script>
    <script src="js/core/engine.js"></script>
    <script src="js/core/graphics.js"></script>
    <script src="js/core/state.js"></script>

      <!-- Utility references -->
    <script src="js/utility/timer.js"></script>
    <script src="js/utility/animator.js"></script>
    <script src="js/utility/point.js"></script>
    <script src="js/utility/longAudio.js"></script>
    <script src="js/utility/vector2D.js"></script>
    <script src="js/utility/rectangle.js"></script>
    <script src="js/utility/collisionHandler.js"></script>

    <!-- scene classes reference -->
    <script src="js/scene/imageObject.js"></script>
    <script src="js/scene/animatedObject.js"></script>
    <script src="js/scene/animatedText.js"></script>
    <script src="js/scene/repeatingImage.js"></script>

    <!-- UI class reference -->
    <script src="js/ui/uibase.js"></script>
    <script src="js/ui/uimanager.js"></script>
    <script src="js/ui/button.js"></script>
    <script src="js/ui/listBoxBase.js"></script>
    <script src="js/ui/customListBox.js"></script>
    <script src="js/ui/textBoxBase.js"></script>
    <script src="js/ui/customTextBox.js"></script>

    <!-- Game related references -->
    <script src="js/game/bubble.js"></script>
    <script src="js/game/field.js"></script>
    <script src="js/game/launcher.js"></script>
    <script src="js/game/demons.js"></script>
    <script src="js/game/china.js"></script>
    <script src="js/game/levelHandle.js"></script>
    <script src="js/game/worldMap.js"></script>
    <script src="js/game/level_background.js"></script>
    <script src="js/game/splash.js"></script>
	  
    <!-- Level info -->
    <script src="js/data/level.js"></script>
    <script src="js/data/level_data/pattern_builder.js"></script>
    <script src="js/data/level_data/level_info_1.js"></script>
    <script src="js/data/level_data/predefine_fields.js"></script>
    <script src="js/data/inapp_items.js"></script>

    <!-- Game Data -->    
    <script src="js/data/fb_data.js"></script>    
    <script src="js/data/fbaccess.js"></script>
	<script src="js/data/gameData.js"></script>
	<script src="js/data/rc4.js"></script>
	<script src="js/data/ajaxAdapter.js"></script>
		
    <!-- application states -->    
	<script src="js/states/storyState.js"></script> 
    <script src="js/states/splashState.js"></script>
    <script src="js/states/animScrollWindow.js"></script>
    <script src="js/states/purchaseWindow.js"></script>
	<script src="js/game/reward.js"></script>
	<script src="js/states/giveLifeWindow.js"></script>
    <script src="js/states/utilityWindows.js"></script>
    <script src="js/states/topBarCommon.js"></script>
    <script src="js/states/loadState.js"></script>
    <script src="js/states/gameState.js"></script>
	<script src="js/states/dailySpinWindow.js"></script>
    <script src="js/states/mapState.js"></script>
    <script src="js/states/levelInfoScreen.js"></script>
	
    <!-- system entry point -->
    <script src="js/main.js"></script>
    <script src="js/default.js"></script>
<?php } else { ?>
	<script src="js/spiritBubble_binary.js"></script>
<?php } ?>

	<style type="text/css">body, a:hover {cursor: url(images/Arrow.cur), progress !important;}</style>
</head>

<script>
	
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));	
	
	window.fbAsyncInit = function() {
		
		FB.init({
		  appId      : <?php echo $APP_KEY; ?>,
		  xfbml      : true,
		  version    : 'v2.0'
		});		
	
		window.setTimeout(function () {
			FB.Canvas.setAutoGrow()
		}, 250)
		
		FB.Canvas.setSize(/*{ width: 760, height: 1080 }*/);
		
		var access_token = '<?php echo $access_token; ?>';			 
		FB.api('/me?access_token=' + access_token, function(response) {
			if(response){
				//console.log(response);				
				var myprofile = response;			
				FB_SetCurrentUser(myprofile.id, myprofile.first_name, true, 
					"https://graph.facebook.com/" + myprofile.id + "/picture");
			}else{
				console.log(response);
			}		
		});	
		
		
		FB.api('/me/friends?access_token=' + access_token, function(response) {
			if(response && response.data){
				var friend_data = response.data;
				for (var i = 0; i < friend_data.length; i++) {
					var friend = friend_data[i];
					//console.log(friend);

					FB_AddProfile(friend.id, friend.name, true, 
						"https://graph.facebook.com/" + friend.id + "/picture");
				}
			}else{
				console.log(response);
			}	
		});	
		
		FB.api('/me/invitable_friends?access_token=' + access_token, function(response) {
			if(response && response.data){
				var friend_data = response.data;
				for (var i = 0; i < friend_data.length; i++) {
					var friend = friend_data[i];
					//console.log(friend);
					
					FB_AddProfile(friend.id, friend.name, false, 
						friend.picture.data.url);
				}
			}else{		
				console.log(response);
			}
		});			
	}	
			
	function FBAccess_SendAppRequest(id, message, callback)
	{	
		FB.ui({
            method: 'apprequests',
            message: message,
			to: id
		}, function (response) {
            console.log(response);
			if (response && response.to) {
				if(callback)
					callback(response.to);
			}
		});	
	}

	function FBAccess_ShareScore(title, message)
	{
		var url = "https://apps.facebook.com/spiritbubble/";
		var picturePath = "";
		//var hostURL = "http://www.flappygame.com/spiritbubble/";
		var hostURL = "https://spiritbubble.herokuapp.com/";
		
		//if(path){
		//	picturePath= hostURL + path;
		//} else{
			picturePath= hostURL + "images/AppIcon.png";
		//}
		
		
		//old Graph
		/*FB.ui(
            {
            method: 'feed',
            name: title,
            link: url,
            caption: message,
			picture: picturePath,
            description: '  '
        }, function (response) {
            if (response && response.post_id) {
                // post successfull
            } else {
               // post not success
            }                        
       });*/
	   
	   // New Graph API with story	   	   
	   FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//console.log(response.authResponse.accessToken);
				FB.api(
					'/me/objects/spiritbubble:level',
					'post',
					{
					object: {
						'app_id': <?php echo $APP_KEY; ?>,
						'type': 'spiritbubble:level',
						'title': title,
						'image': picturePath,
						'description': message
						}
					},
					function(response) {
						console.log(response);
						FB.ui({
							method: 'share_open_graph',
							action_type: 'spiritbubble:complete',
							action_properties: JSON.stringify({
								level: response.id
							})
						}, function(r){});
					});
			}
		});
	   
	  	/**/
	}
	
	function FBAccess_PaymentAPI(count)
	{
		FB.ui({
		  method: 'pay',
		  action: 'purchaseitem',
		  //product: 'http://www.flappygame.com/spiritbubble/coin.html',
		  product: 'http://spiritbubble.herokuapp.com/coin.html',
		  quantity: count,                 
		},
		FBAccess_CallBack
		);
	}
	
	function FBAccess_CallBack(data) {
	
		if(data.error_code && data.error_code ==1383010 ) return;
		g_fbTransact = new Array();

		if(!data) {			
			g_fbTransact.push("There was an error processing your payment.");
			g_fbTransact.push("Please try again!");
			return;
		}
			  
		if(data.error_code) {
			if(data.error_code != 1383010) {			  
				g_fbTransact.push("There was an error processing your payment.");
				g_fbTransact.push(data.error_message);
				g_fbTransact.push("Error code:"+data.error_code);
			}
			return;
		}

		if(data.status=="completed") {
			g_fbTransact.push("Payment verification complete");
			g_fbTransact.push("Transaction done!");

			FBAccess_UpdateGameData(data.quantity, data.amount, 
				data.currentcy, data.payment_id);
		}
	}
	
	function FBAccess_ShareReward(title, message, path)
	{
		var url = "https://apps.facebook.com/spiritbubble/";
		var picturePath = "";
		//var hostURL = "http://www.flappygame.com/spiritbubble/";		
		var hostURL = "http://spiritbubble.herokuapp.com/";

		if(path){
			picturePath= hostURL + path;
		} else{
			picturePath= hostURL + "images/AppIcon.png";
		}
		
	   // New Graph API with story	   	   
	   FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//console.log(response.authResponse.accessToken);
				FB.api(
					'/me/objects/spiritbubble:reward',
					'post',
					{
					object: {
						'app_id': <?php echo $APP_KEY; ?>,
						'type': 'spiritbubble:reward',
						'title': title,
						'image': picturePath,
						'description': message
						}
					},
					function(response) {
						FB.ui({
							method: 'share_open_graph',
							action_type: 'spiritbubble:earn',
							action_properties: JSON.stringify({
								reward: response.id
							})
						}, function(r){});
					});
			}
		});
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////
	// Viral Marketting functionality
	// Added July 26
	function FBAccess_CompleteLevel(levelID)
	{
		//var picturePath = 'http://www.flappygame.com/spiritbubble/images/AppIcon.png';
		var picturePath = "http://spiritbubble.herokuapp.com/images/AppIcon.png"		
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				var path = "http://spiritbubble.herokuapp.com/php/object.php";
				//var path = "http://www.flappygame.com/spiritbubble/php/object.php";
				var title = "Level "+(levelID+1);
				var message = "Level "+ (levelID+1) + " in Spirit Bubble";
				
				var  stringURL = '/me/spiritbubble:complete?'+
					'level=' + 
					encodeURIComponent(path + 
						'?type=level' + 
						'&description=' + message +  
						'&title=' + title +
						'&image=' + picturePath);
						
				FB.api(stringURL, 
					'post', 
					function (response) {
						console.log(response);				
				});				
			}
		});	
	}
	
	function FBAccess_RewardToFeed(title, message, path) {
		var url = "https://apps.facebook.com/spiritbubble/";
		var picturePath = "";
		//var hostURL = "http://www.flappygame.com/spiritbubble/";
		var hostURL = "http://spiritbubble.herokuapp.com/";
		
		if(path){
			picturePath= hostURL + path;
		} else{
			picturePath= hostURL + "images/AppIcon.png";
		}
		
	   // New Graph API with story	   	   
	   FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//var path = "http://www.flappygame.com/spiritbubble/php/object.php";
				var path = "http://spiritbubble.herokuapp.com/php/object.php";
				var  stringURL = '/me/spiritbubble:earn?'+
					'reward=' + 
					encodeURIComponent(path + 
						'?type=reward' + 
						'&description=' + message +  
						'&title=' + title +
						'&image=' + picturePath);
						
				FB.api(stringURL, 
					'post', 
					function (response) {
						console.log(response);				
				});
			}
		});
	}
	
	function FBAccess_ScoreAPI(playerScore)
	{
		 FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {				
				FB.api(
					"/me/scores",
					"POST",
					{
						score: playerScore
					},
					function (response) {
						console.log(response);
					}
				);
			}
		});
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////
	_sa.push(["displayAd"]);
	///////////////////////////////////////////////////////////////////////////////////////////
	</script>
<body style="overflow:hidden;">	
	<div id="fb-root"></div>
    <table align="center" border=0>
        <tr>
		    <td colspan=3 align="center">	
                <center>
                    <div id="flashContent" style="width: 100%; text-align:center;">
						<embed style="width: 100% !important; height: 100% !important" src="Kayoobi.swf" />
                    </div>
                </center>
            </td>	
	    </tr>
        <tr>
            <td>			
                <div>
                    <canvas id="game_canvas" align="left" style="width: 100%; text-align:center; background:#000000;"> 
                       Oh Snap! <br/>
					   Your Browser does not support HTML5! <br/>
					   Please DOWNLOAD/Upgrade (to) latest version from Browser's vendor. <br/> <br/>
					   Recommended Browsers: <br/> <br/>       
					   <a href="http://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox </a><br>
					   <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome </a><br>   
					   <a href="http://www.opera.com/">Opera Browser</a><br>     	
                    </canvas> 
                </div>
            </td>
        </tr>
		<tr>
		   <td> 
				<iframe id="maudauIframe" scrolling="no" height="72" 
					frameborder="0" width="100%" marginheight="0" marginwidth="0" 
					src="//www.maudau.com/AdsBar/?appid=5684&pid=1"></iframe>    
            </td>
		</tr>
    </table>
</body>
</html>
