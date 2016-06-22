<?php

include "../database.php";

$namePattern="/^[a-zA-Z ]*$/";
$passwordPattern="/^[a-zA-Z0-9]*$/";
$mobilePattern="/^[0-9]{10}/";

$insert=true;

    if(isset($_GET['registerName']) and isset($_GET['registerEmail']) and isset($_GET['registerPassword']) and isset($_GET['registerMobile']) and isset($_GET['registerCollege']))
    {
       
        preg_match($passwordPattern,$_GET['registerPassword'],$matchedPassword);
        preg_match($mobilePattern,$_GET['registerMobile'],$matchedMobile);
        preg_match($namePattern,$_GET['registerName'],$matchedName);
        
        if(!filter_var($_GET['registerEmail'],FILTER_VALIDATE_EMAIL))
        {
             $insert=false;
            $message['status']="fail";
            $message['email']="Please enter correct email";
        }
        if($_GET['registerName']!=$matchedName[0])
        {
            $insert=false;
            $message['status']="fail";
            $message['name']="Your name should be Alphanumeric";
       
        }
       if($_GET['registerMobile']!=$matchedMobile[0])
        {
               $insert=false;
            $message['status']="fail";
            $message['mobile']="The Mobile number you entered seems to be incorrect";
        }
      
        if($_GET['registerPassword']!=$matchedPassword[0])
        {
            $insert=false;
            $message['status']="fail";
            $message['password']="Your passwords seems to be containing unwanted characters";
       
        }
       
        if($insert!=false)
        {
            $date=getdate();
            $initDate=$date['mday']."-".$date['mon']."-".$date['year'];
         
            $res=$mysqli->query("INSERT INTO customers VALUES ('$_GET[registerName]','00-00-0000','$_GET[registerEmail]','$_GET[registerMobile]','$_GET[registerPassword]','$initDate')");
           
            if($res==1)
            {
                $message['status']='success';
                echo json_encode($message);
                
            }
         
        }
        else
        {
            echo json_encode($message);
        }
       
    }
    else
    {
        // one of the array element is not set 
        $message['status']='fail';
        $message['description']="Some unexpected error occured";
        echo json_encode($message);
    }
