<?php
if(isset($_GET['email']) and isset($_GET['password']))
{
	$_GET['loginEmail']=htmlentities($_GET['loginEmail'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $_GET['loginPassword']=htmlentities($_GET['loginPassword'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    include '../database.php';
	$res = $mysqli->query("SELECT * FROM customers where email='$_GET[email]' and password='$_GET[password]'");
	
	if($res->num_rows==1)
	{
        $row_no = $res->num_rows - 1;
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
		$arr[$row_no]=$row;
		echo json_encode($arr);	
	}
	else
	{	$message['status']="Fail";
		$message['cause']="Your email or password is not correct";
		echo json_encode($message);
	}
}
else
{  
	$message['status']="Fail";
	$message['cause']="Please enter username and password";
	echo json_encode($message);
}
?>