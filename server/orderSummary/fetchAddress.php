<?php

include '../database.php';

$res = $mysqli->query("SELECT address,city,landmark,pincode FROM address where email='$_GET[email]'");

if($res->num_rows>0)
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
    $message['status']='fail';
    $message['message']="Unfortunately no address is present";
    echo json_encode($message);
}