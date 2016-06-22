<?php
include '../database.php';
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{	
//run delete quaery if the quantity in request is 0
    
    

    $res = $mysqli->query("select quantity from cart where productId='$_GET[productId]'and email='$_GET[email]'");
        $row_no = $res->num_rows - 1;
        $res->data_seek($row_no);
	    $row = $res->fetch_assoc();
	   $quantity=$row['quantity'];
    
    if($quantity==1 and $_GET['action']=='decrease')
    {    
        //delete the item if cart has only single item and action is decrease
       $res = $mysqli->query("DELETE FROM cart WHERE email='$_GET[email]' and productId='$_GET[productId]'");
    }
    
    else if($quantity>1 and $_GET['action']=='decrease')
    {   
        //decrease the count of item if there is more than one item and action is decrease
            $row_no = $res->num_rows - 1;
		    $res->data_seek($row_no);
		    $row = $res->fetch_assoc();
		    $f_quantity=$row['quantity']-1;
		    $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId='$_GET[productId]' and email='$_GET[email]'");
    }
    else if($quantity>=1 and $_GET['action']=='increase')
    {
    		//increase the count of item if there are one or more than one count of item and action is increase
            $row_no = $res->num_rows - 1;
		    $res->data_seek($row_no);
		    $row = $res->fetch_assoc();
		    $f_quantity=$row['quantity']+1;
		    $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId='$_GET[productId]' and email='$_GET[email]'");
    }
    
    

//fetch cart items
$res = $mysqli->query("SELECT * FROM cart s, products q  where s.email='$_GET[email]' and s.productId=q.productId");
	if($res->num_rows>0)
		{for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) 
			{
				$res->data_seek($row_no);
				$row = $res->fetch_assoc();
				$arr[$row_no]=$row;
			}
echo json_encode($arr);

}}


else
{
echo "please log in";
}
?>