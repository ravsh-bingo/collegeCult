<?php
include '../database.php';
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{	
	$res = $mysqli->query("DELETE FROM cart WHERE email='$_GET[email]' and productId='$_GET[productId]'");
	
	$res = $mysqli->query("SELECT * FROM cart s, products q  where s.email='$_GET[email]' and s.productId=q.productId");
	if($res->num_rows>0)
		{
    for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
	{
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
		$arr[$row_no]=$row;
	}
echo json_encode($arr);
}}
else{	
echo "please log in";
}
?>