<?php
include '../database.php';

$activeOrders=array();
$cancelledOrders=array();
$allOrders=array();

$res=$mysqli->query("select orderId,status from orders where email='$_GET[email]'");

for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
}

//echo json_encode($arr);

//PUSH ORDERIDS INTO RESPECTIVE ORDER TYPE
foreach($arr as $a)
{
   
    if($a['status']=="Cancelled")
    {
        //push new order id into array
        array_push($cancelledOrders,$a['orderId']);
    }
    else
    {
        //push new order id into array
        //
        array_push($activeOrders,$a['orderId']);
    }
 
}

//now we have two arrays one type cancelled and other normal

//echo json_encode($cancelledOrders);
//echo json_encode($activeOrders);


unset($arr);
$arr=array();
//FETCH ALL THE ITEMS FOR ACTIVE ORDER IDS
//select all items from order items for each order id one by one
foreach($activeOrders as $a)
{
    $res=$mysqli->query("select orderId,productId,price from orderItems where orderId=$a");
    for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
    {
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
    }

    
    $active[$a]=$arr;
}

$orders['active']=$active;

//echo json_encode($orders);
array_push($allOrders,$orders);
unset($orders);
//FETCH ALL ITEMS FROM CANCELLED ITEMS
$arra=array();

foreach($cancelledOrders as $b)
{
    $res=$mysqli->query("select orderId,productId,price from orderItems where orderId=$b");
    for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
    {
				$res->data_seek($row_no);
				$row = $res->fetch_assoc() ;
				$arra[$row_no]=$row;
    }
    
    $cancelled[$b]=$arra;
}
$orders['cancelled']=$cancelled;
array_push($allOrders,$orders);
echo json_encode($allOrders);
