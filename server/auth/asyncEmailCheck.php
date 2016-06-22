<?php
include "../database.php";

$res = $mysqli->query("SELECT email FROM customers where email='$_GET[email]'");
	
	if($res->num_rows!=0)
	{
	
		$row_no = $res->num_rows-1;
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
	
		$message['status']='success';
        $message['email']=$row['email'];
        echo json_encode($message);
    }
else
{
    $message['status']='fail';
    $message['email']="null";
    echo json_encode($message);
}