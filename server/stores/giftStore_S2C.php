<?php
include '../database.php';

	$res = $mysqli->query("SELECT * FROM products p, stores s, gifts g where s.storeName='$_GET[value]' and g.storeId=s.storeId and p.productId=g.productId");
	if($res->num_rows - 1>0)
	{
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
		$err['status']='Fail';
		$err['message']='OOPS!! this store seems to be out of stock at this moment, visit back after some time till we give it his life and purpose back to serve you';
		echo json_encode($err);
	}

?>