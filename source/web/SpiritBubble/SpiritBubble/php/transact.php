
<?php

	//////////////////////////////////////////////////
	// Ported for SpiritBuble
	// Ported: June 28, 2014
	//////////////////////////////////////////////////
	
	include_once "definitions.php";	
	include "pdomysql_ex.php";
	include "rc4.php";
	
	$param	= $_GET["param"];	
			
	if (!isset($_GET['admin'])) {		
		$param = base64_decode($param);
		
		//$key = "spiritbubble";
		//$param = rc4($key, $param);	
	}
		
	$command = explode("/", $param);
	
	$id	= $command[0];
	switch($id) {
		case $REQ_LOGIN_USER:
			$fbid		=	$command[1];						
			PDODB_LoginUser($fbid);
		break;
		
		case $REQ_UPDATE_LIFE:
			$fbid		=	$command[1];
			$life 		=   $command[2];		
			PDODB_UpdateLife($fbid, $life);			
		break;
		
		case $REQ_UPDATE_TOTAL_SCORE:
			$fbid		=	$command[1];	
			$score 		=   $command[2];
			PDODB_UpdateTotalScore($fbid, $score);
		break;
		
		case $REQ_UPDATE_MAX_LEVEL:
			$fbid		=	$command[1];	
			$level		=	$command[2];
			PDODB_UpdateMaxLevel($fbid, $level);
		break;
		
		case $REQ_UPDATE_LEVEL:
			$fbid		=	$command[1];	
			$level		=	$command[2];
			$score		=	$command[3];
			$star		=	$command[4];
			PDODB_UpdateLevel($fbid, $level, $score, $star);
		break;
		
		case $REQ_GET_USER_LEVEL_DATA:
			$fbid		=	$command[1];
			PDODB_GetUserLevelData($fbid);
		break;
		
		case $REQ_ASK_LIFE:
			$fbid		=	$command[1];
			$param		=	$command[2];
			PDODB_AskLife($fbid, $param);
		break;
		
		case $REQ_LIFE_BEGGARS:
			$fbid		=	$command[1];
			PDODB_AskBeggars($fbid);
		break;
		
		case $REQ_GRANT_LIFE_SINGLE:
			$recordID	=	$command[1];
			PDODB_GiveLife($recordID);
		break;
		
		case $REQ_SET_EPOCH:
			$fbid		=	$command[1];
			$param		=	$command[2];
			PDODB_SetEpoch($fbid, $param);
		break;
		
		case $REQ_GET_BOOSTERS_INFO:
			$fbid		=	$command[1];
			PDODB_GetBoosters($fbid);
		break;
		
		case $REQ_PURCHASE_INAPP:
			$fbid		=	$command[1];
			$item		=	$command[2];
			$price		=	$command[3];
			PDODB_PurchaseInapp($fbid, $item, $price);
		break;
		
		case $REQ_UPDATE_BOOSTER:
			$fbid		=	$command[1];
			$boosterID	=	$command[2];
			$count		=	$command[3];
			PDODB_UpdateBooster($fbid, $boosterID, $count);
		break;
		
		case $REQ_UPDATE_REWARD_FLAG:
			$fbid		=	$command[1];
			$reward		=	$command[2];
			PDODB_UpdateRewardFlag($fbid, $reward);
		break;
		
		case $REQ_UPDATE_GOLD:
			$fbid		=	$command[1];
			$gold		=	$command[2];
			PDODB_UpdateGold($fbid, $gold);
		break;
		
		case $REQ_ADD_TRANSACTION:
			$fbid		=	$command[1];
			$amount		=	$command[2];
			$currency	=	$command[3];
			$payment_id =	$command[4];
			$quantity 	=	$command[5];
			PDODB_AddTransactionRecord($fbid, $amount, 
				$currency, $payment_id, $quantity);
		break;
		
		case $REQ_UPDATE_COINS:
			$fbid		=	$command[1];
			$coins		=	$command[2];
			PDODB_UpdateCoins($fbid, $coins);
		break;
	}
	
?>