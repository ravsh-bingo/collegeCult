<?php
// this will fetch the major categories of the discount
include '../database.php';

	$res = $mysqli->query("SELECT * FROM stores where storeType='discount'");
	for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
			}
echo json_encode($arr);

?>