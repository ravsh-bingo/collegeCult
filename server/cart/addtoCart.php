 <?php
include '../database.php'; 

//chack if the user is logged in ask her for credentials
if(isset($_GET['email']) )//and isset($_GET['password']) and isset($_GET['sessionKey']))
{
	//check if the productid is set
	if(isset($_GET['productId']))
	{	
		$res=$mysqli->query("update products set incart=incart+1 where productId=$_GET[productId]");
        
		$res = $mysqli->query("select quantity from cart where productId='$_GET[productId]'and email='$_GET[email]'");
		if($res->num_rows>0)
		{
            $row_no = $res->num_rows - 1;
		    $res->data_seek($row_no);
		    $row = $res->fetch_assoc();
		    $f_quantity=$row['quantity']+1;
		    $res = $mysqli->query("UPDATE cart set quantity=$f_quantity where productId='$_GET[productId]' and email='$_GET[email]'");
		}
		else
		{
		      $res = $mysqli->query("INSERT INTO cart values('$_GET[productId]','$_GET[email]',1)");
		      //alert the user that item is added to his cart
		      //echo "Item is inserted in your shopping cart";
		}
        
        $res=$mysqli->query("Select sum(quantity) from cart where email='$_GET[email]'");
        $row_no = $res->num_rows - 1;
        $res->data_seek($row_no);
		$row = $res->fetch_assoc();
        $arr['count']=$row['sum(quantity)'];
        echo json_encode($arr);
	}
	else
	{
	   echo "Some unexpected error occured";
	}
}
else
{
	echo "Please Sign in for this feature to work";
}

?>