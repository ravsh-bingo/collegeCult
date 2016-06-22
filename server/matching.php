<?php
include 'database.php';
$res =$mysqli->query("select matchPId from matching where productId=$_GET[productId]");
if($res->num_rows>0)
{    
for ($row_no=$res->num_rows-1;$row_no>=0;$row_no--)
{
    $res->data_seek($row_no);
    $row=$res->fetch_assoc();
    $arrs[$row_no]=$row;
}

echo json_encode($arrs);
}
else
{
    
}