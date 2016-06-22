<?php
include '../database.php';
	
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{	
	$res = $mysqli->query("DELETE FROM cart WHERE email='$_GET[email]' and productId='$_GET[productId]'");
}
else
{
echo "please log in";
}	


?>