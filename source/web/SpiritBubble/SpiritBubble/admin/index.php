<?php 
	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';								

	//////////////////////////////////////////////////
	//flag if we allow access
	$allowed = false;
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
		/*$permissions = $facebook->api("/me/permissions");
		$permarr = array("user_friends","publish_actions");
		
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
	
	/* Add checking for users */
	if($fbuid == 10152488121633604 /*Ruell Magpayo*/|| 
		$fbuid == 548068885299002 /*Ash DBird*/ ||
		$fbuid ==10204419018535922 /*Ash Mitch*/) {
		$allowed = true;		
	}
		
	$user_array = array();
	
	// Get all users for this game
	$db = PDOMySQL_Init();
	$query = "SELECT * from user";
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];

			$userInfo = new UserInfo();		
			$userInfo->id = $row['fbid'];		
			$userInfo->max_level = $row['max_level'] + 1;				
			$userInfo->gold = $row['gold'];
			$userInfo->life = $row['life'];
			$userInfo->coins = $row['coins'];
			$userInfo->total_score = $row['total_score'];
			$userInfo->last_login = $row['last_login'];
			$userInfo->epoch = $row['epoch'];
			$userInfo->reward_flag = $row['reward_flag'];
			array_push($user_array,$userInfo);			
		}
	}
	
?>	

<?php
if($allowed) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head>
        <title> Spirit Bubble Admin </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<link rel="stylesheet" type="text/css" href="jquery.dataTables.css">
		<script type="text/javascript" language="javascript" src="jquery-1.11.1.min.js"></script>
		<script type="text/javascript" language="javascript" src="jquery.dataTables.min.js"></script>
		<script type="text/javascript" class="init">

		$(document).ready(function() {
			$('#example').dataTable( {
				"pagingType": "full_numbers"
			} );
		} );
		
		
		function openWindow(url)
		{
			window.open(url, '_blank');
			window.focus();
		}

		</script>
		
    </head>

	<body>
		<h1 class="page_title">Spirit Bubble Users </h1>
		<table id="example" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>FBID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Max Level</th>
					<th>Gold</th>
					<th>Life</th>
					<th>Coins</th>
					<th>Total Score</th>
					<th>Last Login</th>
					<th> Transaction </th>
				</tr>
			</thead>
					
			<tbody>
					<?php 
						foreach($user_array as $userInfo){
							$profile = $facebook->api("/". $userInfo->id );	
							$name = "";
							$email = "not specified";
							if( $profile ) {
								$name = $profile["name"];
								if (array_key_exists('email', $profile)) {
									$email = $profile["email"];
								}
							}
												
							echo "<tr>";
								echo "<td>" . $userInfo->id . "</td>";
								
								echo "<td>" . $name . "</td>";
								if( $email != "not specified" ) {
									echo "<td> <a href='mailto:" . $email . "' />" . $email . "</a></td>";
								}else {
									echo "<td>" . $email . "</td>";
								}
								echo "<td>". $userInfo->max_level . "</td>";
								echo "<td>". $userInfo->gold . "</td>";
								echo "<td>". $userInfo->life . "</td>";
								echo "<td>". $userInfo->coins . "</td>";
								echo "<td>". $userInfo->total_score . "</td>";
								echo "<td>". $userInfo->last_login . "</td>";	
								echo "<td> <a href='#' onclick=openWindow('https://apps.facebook.com/spiritbubble/admin/transaction.php?fbid=". 
									$userInfo->id ."')> Link </a> </td>";									
							echo "</tr>";
						}
					?>
					
			</tbody>
		</table>
	</body>
</html>

<?php } 
else{
	echo "Access Denied " . $fbuid;
}
?>