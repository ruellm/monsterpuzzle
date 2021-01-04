<?php
	//////////////////////////////////////////////////
	// Defitions for SpiritBuble
	// Ported: June 28, 2014
	//////////////////////////////////////////////////
	// Transaction Commands
	/////////////////////////////////////////////////
	$REQ_LOGIN_USER 		= 100;
	$REQ_UPDATE_LIFE 		= 200;
	$REQ_UPDATE_TOTAL_SCORE = 300;
	$REQ_UPDATE_MAX_LEVEL 	= 400;
	$REQ_UPDATE_LEVEL 		= 500;
	$REQ_GET_USER_LEVEL_DATA = 600;
	$REQ_ASK_LIFE			= 700;
	$REQ_LIFE_BEGGARS		= 800;
	$REQ_GRANT_LIFE_SINGLE	= 900;
	$REQ_SET_EPOCH			= 1000;
	$REQ_GET_BOOSTERS_INFO	= 1100;
	$REQ_PURCHASE_INAPP		= 1200;
	$REQ_UPDATE_BOOSTER		= 1300;
	$REQ_UPDATE_REWARD_FLAG	= 1400;
	$REQ_UPDATE_GOLD 		= 1500;
	$REQ_ADD_TRANSACTION	= 1600;
	$REQ_UPDATE_COINS		= 1700;
	
	// User Data
	$APP_KEY = '822472184448676';
	$SECRET_KEY ='5a8e3b8ad3c33cf78fe718985fa69466';
	
	
class UserInfo {
		public $uid;	
		//public $fbid
		public $max_level;
		public $gold;
		public $life;
		public $coins;
		public $total_score;		
		public $last_login;					
		public $epoch;
		public $reward_flag;
	}
?>