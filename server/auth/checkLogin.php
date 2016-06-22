<?php
if(isset($_GET['email']) and isset($_GET['password']))
{
	include '../database.php';
   // $_GET['email']=htmlentities($_GET['email'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
  //  $_GET['password']=htmlentities($_GET['password'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    if(strlen($_GET['email'])<=7 or strlen($_GET['email'])>=50)
    {
        $message['status']="Fail";
		$message['cause']="Your email or password is not correct";
		echo json_encode($message);
    }
    else
    {
 
    
    //check if email is in proper format
	$res = $mysqli->query("SELECT name,email,password FROM customers where email='$_GET[email]' and password='$_GET[password]'");
	
	if($res->num_rows!=0)
	{
	
		$row_no = $res->num_rows-1;
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
	
		$message['status']='success';
        $message['name']=$row['name'];
        $message['email']=$row['email'];
        $message['password']=$row['password'];
        if(isset($_GET['products']))
        {
            $cartItems=json_decode($_GET['products']);  
            foreach($cartItems->items as $c)
            {
                $res=$mysqli->query("select quantity from cart where productId=$c->productId and email='$_GET[email]'");
                if($res->num_rows==0)
                { 
                    $res = $mysqli->query("insert into cart values($c->productId,'$_GET[email]',$c->quantity)");
                }
                else
                {
                    $row_no = $res->num_rows - 1;
		            $res->data_seek($row_no);
		            $row = $res->fetch_assoc();
		            $row['quantity']=$row['quantity'];
		            $f_quantity=$row['quantity']+$c->quantity;
                    $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId=$c->productId  and email='$_GET[email]'");
                }
            }
        }
        echo json_encode($message);
	}
	else
	{	
        $message['status']="Fail";
		$message['cause']="Your email or password is not correct";
		echo json_encode($message);
	}
}}
else
{  
	$message['status']="Fail";
	$message['cause']="Please enter your email and password";
	echo json_encode($message);
}
?>