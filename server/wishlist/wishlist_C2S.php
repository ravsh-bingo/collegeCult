<?php
include '../database.php';
//check if user is logged in 
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{
	//check if the item is already present in the wishlist by the same user
	$res = $mysqli->query("select * from wishlist where productId='$_GET[productId]' and email='$_GET[email]'");

	 
	if( $res->num_rows> 0)
	{
		echo "$_GET[productId] is already in your wishlist";
	}
	else
	{
		//insert item in the wishlist of the user
		$res = $mysqli->query("INSERT INTO wishlist values('$_GET[productId]','$_GET[email]')");
	}
	//return count of items in the wishlist of the user	
	$res = $mysqli->query("SELECT count(productId) as numberOfItems FROM wishlist where email='$_GET[email]'");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
	{
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
		$arr[$row_no]=$row;
	}
echo json_encode($arr);
}
else
{
echo "Please Sign in for this feature to work";
}
?>