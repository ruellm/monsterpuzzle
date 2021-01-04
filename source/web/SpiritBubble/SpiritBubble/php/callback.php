<?php

	$hub_mode		= $_GET["hub_mode"];
	$hub_challenge 	= $_GET["hub_challenge"];
	$hub_verify_token = $_GET["hub_verify_token"];
	
	// read here: https://developers.facebook.com/docs/graph-api/real-time-updates/
	//https://developers.facebook.com/docs/payments/realtimeupdates/
	if( $hub_mode == 'subscribe' && $hub_verify_token=='iamdrulz316') {	
		echo $hub_challenge;
	}

	
	// tutorials
	// https://developers.facebook.com/blog/post/489/
	// http://www.sitepoint.com/using-facebooks-realtime-updates-and-subscription-api/
	//
?>