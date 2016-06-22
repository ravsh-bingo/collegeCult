<?php
include '../database.php';
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{	
	$res = $mysqli->query("SELECT * FROM wishlist w, products q  where w.email='$_GET[email]' and w.productId=q.productId");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
			}
echo json_encode($arr);
}
else
{echo "please log in";}
?>