<?php
//this file fetches all the items added in the cart by the user
//user should be logged in
include '../database.php';

//chack if the user is logged in ask her for credentials
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{	
	
	//fetch cart items
	$res = $mysqli->query("SELECT * FROM cart s, products q  where s.email='$_GET[email]' and s.productId=q.productId");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
	{
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
		$arr[$row_no]=$row;
	}
echo json_encode($arr);

}

else
{echo "Please log in to avail this fascility";}
// 
?>