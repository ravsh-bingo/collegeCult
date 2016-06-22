<?php
$mysqli = new mysqli("localhost", "root", "", "store");
if ($mysqli->connect_errno) 
{
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

//chack if the user is logged in ask her for credentials
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{
	//get the price of item from the product	
	$res = $mysqli->query("select price, stockCount from products where productId='$_GET[productId]'");
	
	//checking if the item exist in the store
	if($res->num_rows==1) 
	{	
		$row_no = $res->num_rows - 1;
		$res->data_seek($row_no);
		$row = $res->fetch_assoc();
		$price_of_item=$row['price'];
		//print_r($row);
		//check if the stock count is more than 0
		if($row['stockCount']>0)
		{
			//select maximum order id from the order table
			$res = $mysqli->query("select MAX(orderid) as orderId from orders");
			$row_no = $res->num_rows-1;
			$res->data_seek($row_no);
			$row = $res->fetch_assoc();
			$next_order_id=$row['orderId']+1;
			
			//if this is first order
			//this logic can be removed in the future but it seems mandatiry for first time
			if($next_order_id==0)
			{
				$res = $mysqli->query("insert into orders values($next_order_id','12-12-2016',$price_of_item,'$_GET[email]',Order Placed'','COD','Unpaid')");	
				$res = $mysqli->query("insert into orderitems values($next_order_id,'$_GET[productId]')");	
			}
			else
			{
				echo $next_order_id;
				//	print_r($row);
			
				//insert into order and orderitems
				$res = $mysqli->query("insert into orders values($next_order_id,'12-12-2016',$price_of_item,'$_GET[email]','Order Placed','COD','Unpaid')");	
				$res = $mysqli->query("insert into orderitems values($next_order_id,'$_GET[productId]')");	
			}
		}
		//$f_quantity=$row['quantity']+1;
		
	}
	else
	{
		$res = $mysqli->query("INSERT INTO cart values('$_GET[productId]','$_GET[email]',1)");
		//alert the user that item is added to his cart
		echo "Item is inserted in your shopping cart";
	}
}
else
{
	echo "Please Sign in for this feature to work";
}

?>