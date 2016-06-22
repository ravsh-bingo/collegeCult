<?php

include '../database.php';
$date=date('Y-m-d H:i:s');
$res=$mysqli->query("insert into searchterms values('$_GET[searchQuery]','$date')");
$res = $mysqli->query("SELECT productId, name,price, discount,description, gender, size from products where search like '%$_GET[searchQuery]%'");
	
for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
{
    $res->data_seek($row_no);
	$row = $res->fetch_assoc();
	$arr[$row_no]=$row;
}
echo json_encode($arr);