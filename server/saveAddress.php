<?php

include 'database.php';
//email password set check




$res=$mysqli->query("select * from address where email='$_GET[email]' and address='$_GET[address]'");

if($res->num_rows>0)
{
    echo "sd";
    $message['status']='success';
    $message['address']=$_GET['address']; 
    $message['city']=$_GET['city'];
    $message['pincode']=$_GET['pincode'];
    $message['landmark']=$_GET['landmark'];   
    echo json_encode($message);
}
else if($res->num_rows==0)
{
    
    $res = $mysqli->query("insert into address values('$_GET[email]','$_GET[address]','$_GET[landmark]','$_GET[city]',$_GET[pincode])");

if($res==true)
{
    $message['status']='success';
    $message['address']=$_GET['address']; 
    $message['city']=$_GET['city'];
    $message['pincode']=$_GET['pincode'];
    $message['landmark']=$_GET['landmark'];
    echo json_encode($message);
}
else
{
    $message['status']='fail';
    $message['reason']='Unexpected error';
    echo json_encode($message);
}
}

