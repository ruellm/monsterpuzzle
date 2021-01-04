/**
    Source contains ALL Facebook SDK access operations
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 23, 2012
	
	Ported to SpiritBubble June 29, 2014
*/

//var hostingURL = "https://apps.facebook.com/spiritbubble/images/purchase_window/heart L.png"
function FBAccess_InviteFriend(id)
{
    if (g_mainUser.id == -1) return;
	FBAccess_SendAppRequest(id, "Come Play Spirit Bubble!",null);
}

function FBAccess_AskLife(id)
{
    if (g_mainUser.id == -1) return;
	FBAccess_SendAppRequest(id, "Your friend is asking for a life in Spirit Bubble", 
		function(to){
			Ajax_AskForLife(to);		
		});
}

function FBAccess_SendToAll()
{
    if (g_mainUser.id == -1) return;
        FBAccess_SendAppRequest(0, "Been having a good time playing Spirit Bubble, come check it out",
            function (to) {
                var request = new Array();
                for (var i = 0; i < to.length; i++) {
                    var profile = FB_GetProfile(to[i]);
                    if (profile == null) continue;
                        request.push(profile.id);
                }

                Ajax_AskForLife(request);
    });
}

function FBAccess_UpdateGameData(quantity, amount, currentcy, payment_id)
{
	g_gameData.gold += parseInt(quantity);
	Ajax_UpdateGold();
			
	Ajax_AddTransaction(amount, currency, payment_id, quantity);
}

window['FBAccess_UpdateGameData'] = FBAccess_UpdateGameData; 
