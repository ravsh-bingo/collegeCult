<?php
include '../database.php';
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{	
	$res = $mysqli->query("SELECT count(*) FROM wishlist where email='$_GET[email]'");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_row();
				$arr[0]=$row;
			}
echo json_encode($arr);
}

else{ echo "please log in"; //later change it to 0
 }
?>