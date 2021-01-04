<?php 
	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';								

	class TransactInfo {
		public $id;	
		public $fbid;
		public $amount;
		public $currency;
		public $payment_id;
		public $quantity;
	}
	
	$param	= $_GET["fbid"];	
	$allowed = true;
	$transact_array = array();
	
	// Get all users for this game
	$db = PDOMySQL_Init();
	$query = "SELECT * from transaction where fbid =" . $param;
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			$transact = new TransactInfo();	

			$transact->id = $row['transact_id'];	
			$transact->fbid = $row['fbid'];		
			$transact->amount = $row['amount'];				
			$transact->currency = $row['currency'];
			$transact->payment_id = $row['payment_id'];
			$transact->quantity = $row['quantity'];
		
			array_push($transact_array,$transact);			
		}
	}
	
?>	

<?php
if($allowed) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spiritbubble: http://ogp.me/ns/fb/spiritbubble#">
        <title> Transaction Record </title>
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

		</script>
		
    </head>

	<body>
		<h1 class="page_title">Transaction Record for <?php echo $param; ?>  </h1>
		<table id="example" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>Transact ID</th>
					<th>Amount</th>
					<th>Currency</th>
					<th>FB Payment ID</th>
					<th>Quantity</th>
				</tr>
			</thead>
					
			<tbody>		
					<?php 
						foreach($transact_array as $transact){
																	
							echo "<tr>";
								echo "<td>". $transact->id . "</td>";
								echo "<td>". $transact->amount . "</td>";
								echo "<td>". $transact->currency . "</td>";
								echo "<td>". $transact->payment_id . "</td>";
								echo "<td>". $transact->quantity . "</td>";
																	
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