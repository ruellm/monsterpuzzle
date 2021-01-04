<?php

	//////////////////////////////////////////////////
	// Defitions for SpiritBuble
	// Ported: June 28, 2014
	//////////////////////////////////////////////////

	//////////////////////////////////////////////
	// Functions for PDO SQLite
	/////////////////////////////////////////////
	function PDOMySQL_Init()
	{	
		$flappy_server = false;
			
		$url=parse_url(getenv("CLEARDB_DATABASE_URL"));
			
		if ($flappy_server){
			//localhost testing
			$username="flappy";
			$password="7rdoHO4l_leg";
			$dbname = "spiritbubbledb";
			$server = "localhost";
		} else {
			if(isset($url["host"])){
				//using live DB - ClearDB MySQL - Heroku
				$server = $url["host"];
				$username = $url["user"];
				$password = $url["pass"];
				$dbname = substr($url["path"],1);				
			} else {
				$username="root";
				$password="";
				$dbname = "spiritbubbledb";
				$server = "localhost";
			}
		}
		
		try{
		
			// COnnect to Database using PDN
			$db = new PDO("mysql:host=". $server .";dbname=" . $dbname . ";",
						$username, $password);
						
		} catch(PDOException $ex) {
			echo($ex->getMessage());
		}
		return $db;
	}	
	
		
	function PDODB_GetExtraLife($fbid, $db)
	{
		$query = "SELECT * from life_request where recieved = 0 and granted = 1 and fbid_from=" . $fbid . ";";
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		$value = 0;
		if( count($rowarray) > 0 ){
			$row = $rowarray[0];
			$value++;
			
			$query = "Update life_request set recieved=1 where id=" . $row['id'];		
			$db->exec($query);	
		}
		
		return $value;
	}
		
	function PDODB_CheckUser($fbid, $db)
	{
		$userInfo = null;
		
		$query = "SELECT * from user where fbid=" . $fbid . ";";
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		if( count($rowarray) > 0 ){
				
				$row = $rowarray[0];		
				$userInfo = new UserInfo();		
				$userInfo->id = $row['id'];		
				$userInfo->max_level = $row['max_level'];				
				$userInfo->gold = $row['gold'];
				$userInfo->life = $row['life'];
				$userInfo->coins = $row['coins'];
				$userInfo->total_score = $row['total_score'];
				$userInfo->last_login = $row['last_login'];
				$userInfo->epoch = $row['epoch'];
				$userInfo->reward_flag = $row['reward_flag'];
				
		}
		return $userInfo;
	}		
		
	function PDODB_LoginUser($fbid)
	{
		$db = PDOMySQL_Init();

		// This should be in definitions, but what the heck?
		$DEFAULT_LIFE_COUNT = 10;
	
		//status are 0: OK, 1: Problem
		$total_score = 0;
		$gold = 0;
		$coins = 0;
		$date = "";
		$current_date = date('m/d/Y', time());
		$uid = 0;
		$max_level = 0;
		$life = $DEFAULT_LIFE_COUNT;
		$epoch = 0;
		$reward_flag = 0;		
		$is_new_today = 1; 
		
		$userInfo = PDODB_CheckUser($fbid,$db);

		if($userInfo){		
			
			$max_level 		= $userInfo->max_level;
			$gold 			= $userInfo->gold;
			$life 			= $userInfo->life;
			$coins 			= $userInfo->coins;
			$total_score 	= $userInfo->total_score;
			$epoch			= $userInfo->epoch;
			$reward_flag	= $userInfo->reward_flag;
			$date 			= $userInfo->last_login;
					
			if($current_date == $date) {
				$is_new_today = 0;
			}else{
				$query = "Update user SET last_login='" . $current_date ."' " .
					"where fbid=".$fbid;
				$db->exec($query);			
			}
		}else{
			$query = "INSERT into user(fbid, max_level, gold, life, coins, total_score, last_login, epoch) " .
				"values (" . $fbid .",0,0," . $life . ",0,0,'" . $current_date ."', 0);";
			$db->exec($query);
			
			//recheck user if successfully inserted to get the unique ID
			$userInfo = PDODB_CheckUser($fbid,$db);
			if($userInfo != null){
				$uid = $userInfo->uid;
			}					
		}			
		
		// Get Extra life
		$extra_life = PDODB_GetExtraLife($fbid, $db);	
		if($extra_life > 0 ) {
			$life += $extra_life;
			$query = "Update user SET life=". 
				$life . " where fbid=" . $fbid;		
			
			$db->exec($query);	
		}
		
		// build feedback string
		// feedback format REQ_ID|max_level|gold|$life|$coins|total_score|epoch|reward_flag|is_new_today		
		$feedback =  "100|". $max_level . "|" .  $gold . "|" . $life . 
			"|" . $coins . "|" . $total_score . "|" . $epoch . "|" . $reward_flag . "|" . $is_new_today;
		
		$feedback = base64_encode($feedback);		
		echo $feedback;
		
		$db = null;	
	}
	
	function PDODB_UpdateLife($fbid, $life){
		$db = PDOMySQL_Init();
		
		$query = "Update user SET life=". 
			$life . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateTotalScore($fbid, $score)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET total_score=". 
			$score . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateMaxLevel($fbid, $level)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET max_level=". 
			$level . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateLevel($fbid, $level, $score, $star)
	{
		$db = PDOMySQL_Init();
		$query = "SELECT * from level_info where fbid=" . $fbid . 
			" and level_id=". $level.";";
			
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		if( count($rowarray) > 0 ){
			$query = "Update level_info SET score=". 
				$score . ", star=". $star ." where fbid=" . $fbid . " and level_id=".$level;
		} else {
			$query = "INSERT into level_info(fbid, level_id, score, star) values (" .
				$fbid ."," . $level . ",". $score. ",".$star.");";
		}		
		
		$db->exec($query);	
		
		$db = null;	
	}

	
	// Feedback string
	// REQID|fbid|count|level_id,score,star/level_id,score,star/...	
	function PDODB_GetUserLevelData($fbid)
	{
		$db = PDOMySQL_Init();
		$query = "SELECT * from level_info where fbid=" . $fbid;
		$feedback = "";		
		$result = $db->query($query); 	
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);	
		
		$count = count($rowarray);
	
		$feedback = "600|" . $fbid . "|" . $count . "|";
		
		if( $count > 0 ){			
			$data = "";
			for($i = 0; $i < $count; $i++) {
				$row = $rowarray[$i];
				$data = $data . $row['level_id'] . "," . $row['score'] . 
					"," . $row['star'];
				
				if( $i + 1 < $count ){
					$data = $data . "/";
				}
			}
			$feedback = $feedback . $data;
		}	

		$feedback = base64_encode($feedback);		
		echo $feedback;
		
		$db = null;		
	}
	
	function PDODB_AskLife($fbid, $param)
	{
		$db = PDOMySQL_Init();
		$users = explode("|", $param);
		$current_date = date('m/d/Y', time());
		
		for($i = 0; $i < count($users); $i++){
		
			$query = "INSERT into life_request(fbid_from, fbid_to) values (" . $fbid . 
					"," . $users[$i] . ");";
			$db->exec($query);	
			
		}
	}
	
	function PDODB_AskBeggars($fbid)
	{
		$db = PDOMySQL_Init();
		$query = "SELECT * from life_request where granted=0 and fbid_to=" . $fbid;
		
		$result = $db->query($query); 	
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		$count = count($rowarray);
		$data = "";
		if( $count > 0 ){
			$temp = array();	
			for($i = 0; $i < $count; $i++) {
				$row = $rowarray[$i];
				$from = $row['fbid_from'];
				
				if(in_array($from, $temp)){
					continue;
				}
				
				array_push($temp,$from);	
				$from = $from . "/" . $row['id'];				
				$data = $data . $from;
				if( $i + 1 < $count){
					$data = $data . ",";
				}
			}			
		}
		
		// Feedback packet is
		// REQ_LIFE_BEGGARS(800)|id/recid,id/recid,id/recid
		if(strlen($data) > 0 )
			$feedback = "800|" . $data ;	
		else
			$feedback = "800";
			
		$feedback = base64_encode($feedback);		
		echo $feedback;
		
		$db = null;	
	}
	
	function PDODB_GiveLife($recID)
	{
		$db = PDOMySQL_Init();
		$query = "Update life_request set granted=1 where id=" . $recID;		
		$db->exec($query);			
		$db = null;	
	}
	
	function PDODB_SetEpoch($fbid, $epoch)
	{
		$db = PDOMySQL_Init();
		$query = "Update user set epoch=".$epoch." where fbid=" . $fbid;		
		$db->exec($query);			
		$db = null;	
	}
	
	function PDODB_GetBoosters($fbid)
	{
		$db = PDOMySQL_Init();
		$query = "SELECT * from booster_info where fbid=" . $fbid;
		
		$result = $db->query($query); 	
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		$count = count($rowarray);
		
		$data = "";
		$i = 0;
		while($i < $count){
			$row = $rowarray[$i];
			
			$data = $data . $row['boosterID'] . "/" . $row['count'];
			
			if( $i + 1 < $count){
				$data = $data . ",";
			}
			$i++;
		}
		
		if(strlen($data) > 0 )
			$feedback = "1100|" . $data ;	
		else
			$feedback = "1100";
			
		// Feedback is 1100|boosterID/count,boosterID/count,...
		$feedback = base64_encode($feedback);		
		echo $feedback;
		
		$db = null;
	}
	
	function PDODB_PurchaseInapp($fbid, $item, $price)
	{
		$db = PDOMySQL_Init();
		$query = "SELECT gold from user where fbid=" . $fbid;
		
		$result = $db->query($query); 	
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		$count = count($rowarray);
		$respond = "NG";
		$row = $rowarray[0];
		$gold = $row['gold'];
		
		if ( $gold > 0 && $gold >= $price){
			$respond = "OK";
			$gold -= $price;
			
			$query = "Update user set gold=".$gold." where fbid=" . $fbid;		
			$db->exec($query);				
		}		

		$feedback = "1200|" . $respond . "|" . $gold . "|" . $item;
		
		$feedback = base64_encode($feedback);		
		echo $feedback;
		
		$db = null;
	}
	
	function PDODB_UpdateBooster($fbid, $boosterID, $c)
	{
		$db = PDOMySQL_Init();
		$query = "SELECT * from booster_info where fbid=" . $fbid . " and boosterID=" . $boosterID;
		$result = $db->query($query); 	
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);

		if( count($rowarray) <= 0 ){
			$query = "INSERT into booster_info(fbid, boosterID, count) values(" . $fbid . "," . 
				$boosterID . "," . $c . ")";		
			$db->exec($query);	
		} else{
			$query = "Update booster_info set count=".$c." where fbid=" . $fbid . " and boosterID=".$boosterID;		
			$db->exec($query);		
		}
				
		$db = null;
	}
	
	function PDODB_UpdateRewardFlag($fbid, $reward)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET reward_flag=". 
			$reward . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateGold($fbid, $gold)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET gold=". 
			$gold . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateCoins($fbid, $coins)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET coins=". 
			$coins . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_AddTransactionRecord($fbid, $amount, $currency, $payment_id, $quantity)
	{
		$db = PDOMySQL_Init();
		
		$query = "INSERT into transaction(fbid, amount, currency, payment_id, quantity) values (" .
			$fbid . "," . $amount . ",'" . $currency . "'," . $payment_id . "," . $quantity . ")";
	
		$db->exec($query);		
		
		$db = null;	
	}
?>