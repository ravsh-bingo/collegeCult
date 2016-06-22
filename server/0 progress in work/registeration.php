<?php

$commitTryCount=0;
$commitSuccessful=false
    
$mysqli->autocommit(false);

if($_SERVER['SERVER_NAME']=="localhost")
{
    if(isset($_GET['registerBtn']))
    {
       
        $_GET['registerEmail']=htmlentities($_GET['registerEmail'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $_GET['registerMobile']=htmlentities($_GET['registerMobile'],ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $_GET['registerCollege']=htmlentities($_GET['registerCollege'],ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $_GET['registerPassword']=htmlentities($_GET['registerPassword'],ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        include 'database.php';
        $res = $mysqli->query("SELECT email from customers where userEmail='$_GET[registerEmail]' OR mobile=$_GET[mobile]");
        $row_no = $res->num_rows
        
        if($row_no>0)
        {
            $errorMessage['userAlready']="Your mobile number or email is already registered. Please recover your account."
            echo json_encode($errorMessage);//echo error message here        
        }
        else
        {
            $otp=generateOTP();    
            $mysqli->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
                     
            $mysqli->query("INSERT INTO CUSTOMERS VALUES()");
            $mysqli->query("INSERT INTO ACTIVATION VALUES('$_GET[registerEmail]',$otp)")

               
            while(!$commitSuccessful) 
            {
               $commitSuccessful=mysqli_commit($link)
               if($commitSuccessful)
               {
                     
                    registerationSuccess($_GET['registerEmail'],$otp);
               }
               else
               {
                      $commitTryCount+=1;
                      if($commitTryCount==3)
                      {
                            $mysqli->rollback();
                      }
               }
            }
            
        }
            
    }
}

      
       


//FUNCTION: TO SEND EMAIL AFTER SUCCESSFUL REGISTERATION
function registerationSuccess($userEmail, $otp_token)
{   
    include 'partials/regiserationEmail.php';
    $mail_success=false;
    
    $to  = $_GET['registerEmail'] . ', '; 
    $to .= 'admin@example.com';
    
    while(!$mailSuccess)
    {
        $mail_success=mail($to, $subject, $message, $headers);
    }
    
    if($mail_success)
    {
        header("location:confirm.html");
    }
    else
    {
        header("location:login.html?id=registeration");
    }
}



    //FUNCTION: 1 function to generate otp    
   function generateOTP()
   {
       $otpUnique=false;
       while(!$otpUnique)
       {
           $bytes = openssl_random_pseudo_bytes(6, $cstrong);     
           $otp=bin2hex($bytes); 
           $res = $mysqli->query("SELECT email from Activation where otp='$otp'");
           $row_no = $res->num_rows;
           if($row_no>0)
           {
             continue;
           }
           else
           {
              return $otp;   
           }
       }
    }

   //FUNCTION: 2 Validate input values       
   function validateInput($_GET)
    {
        if(strlen($_GET['registerEmail'])<50 and )//validate length and content to be email only
        {
            
            if(strlen($_GET[registerMobile])==10 and )//VALIDATE length and content to be number only
            {
                
                if($_GET['registerPassword']!="" and strlen($_GET['registerPassword'])>8 and strlen($_GET['registerPassword'])<12)
                {
                    $errorMessage['status']="Fail";
                    $errorMessage['registerPassword']="The password should be 8 to 12 charachters long";
                    echo json_encode($errorMessage);
                    return false;
                }
                else
                {
                    $errorMessage['status']="Fail";
                    $errorMessage['registerPassword']="The length of your password should be 8 to 12 characters, it should not contain special characters";
                    echo json_encode($errorMessage);
                    return false;
                }
            }
            else
            {
                $errorMessage['status']="Fail";
                $errorMessage['registerMobile']="Is your mobile number greater than 10 digits or it contains text? Bothways are not possible";
                echo json_encode($errorMessage);
                return false;
            }
            
            return true;
            
        }
        else
        {
            $errorMessage['status']="Fail";
            $errorMessage['registerEmail']="This doesnt look like proper email id or maybe it is too long!";
            echo json_encode($errorMessage);
            return false;
        }
       return true;
    }