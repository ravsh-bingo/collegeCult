<?php

include 'database.php';
//email password set check

//$res=$mysqli->query("select * from address a where a.email='$_GET[email]' and a.address='$_GET[address]'");

//select items from the cart join with products table to fetch current cost and discount
$res=$mysqli->query("select productId,quantity from cart where email='$_GET[email]'");
//generate order number
//insert the items from the cart in order and orderproducts table
$res=$mysqli->query("insert into order()");

if($res)
{
    foreach($cartItems->items as $c)
        {
            $res=$mysqli->query("insert into orderItems values($orderId,$c)");
        }
}
//send email for order placement
orderPlacedEmail();

//delete items from the cart table
$res=null;
while($res==null)
{
    $res=$mysqli->query("delete from cart where email='$_GET[email]");
}



function orderPlacedEmail()
{}
?>