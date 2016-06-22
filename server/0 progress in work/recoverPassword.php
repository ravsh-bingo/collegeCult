<?php

$commitTryCount=0;
$commitSuccessful=false
    
$mysqli->autocommit(false);

if($_SERVER['SERVER_NAME']=="localhost")
{
    if(isset($_GET['recoverBtn']))
    {
       
        $_GET['recoverEmail']=htmlentities($_GET['registerEmail'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $_GET['registerMobile']=htmlentities($_GET['registerMobile'],ENT_QUOTES | ENT_HTML5, 'UTF-8');
       
        
      
        include 'database.php';
        $res = $mysqli->query("SELECT email from customers where userEmail='$_GET[recoverEmail]'");
        $row_no = $res->num_rows
        if($row_no==0)
        {
            $errorMessage['noUser']="OOPS!!! We are unable to find $_GET['recoverEmail'] in our system. Are you sure we have aready registered? If not Continue";
            echo json_encode($errorMessage);        
        }
        else if($row_no==1)
        {
            $otp=generateOTP(); 
            $mysqli->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
                     
            
            $mysqli->query("UPDATE CUSTOMERS SET STATUS='Inactive' WHERE EMAIL='$_GET[recoverEmail]'");
            $mysqli->query("INSERT INTO ACTIVATION VALUES($_GET['recoverEmail'],$otp)");

               
            while(!$commitSuccessful) 
            {
               $commitSuccessful=mysqli_commit($link)
               if($commitSuccessful)
               {
                          
                       recoverMail($_GET['recoverEmail'],$otp);
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
        else
        {
            $errorMessage['unexpected']="OOPS!! Some unexpected error occured(more than one user found)";
            echo json_encode( $errorMessage);
        }
        
            
    }
}

//Definition of functions start here

//FUNCTION: TO SEND EMAIL AFTER SUCCESSFUL REGISTERATION
function registerationSuccess($userEmail, $otp_token)
{   
    include 'partials/recoverEmail.php';
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
        if(strlen($_GET['recoverEmail'])<50 and )//validate length and content to be email only
        {
            
            return true;
            
        }
        else
        {
            $errorMessage['registerEmail']="This doesnt look like proper email id or maybe it is too long!";
            echo json_encode($errorMessage);
            return false;
        }
       return true;
    }