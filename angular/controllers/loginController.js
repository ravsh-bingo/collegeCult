var app=angular.module('angularApp',['webStorageModule']);
app.controller('loginController',function($scope,$http,$window,webStorage)
{
    //Check if the user is logged in redirect him to the page from where he came
    if(sessionStorage.getItem("email")!=undefined)
        {
            $window.location.href="index.html";
        }
    
    else{
    
    $scope.registerationView=false;
    $scope.forgotView=false;
    $scope.loginView=false;
        $scope.loginEmail="";
    
    //FETCHING THE LIST OF COLLEGES FOR REGISTRATION PAGE
    $http.get("server/auth/fetchColleges.php").then(function(response)
    {$scope.colleges=response.data;});
    

    //This if else block will work when user lands on this page from other pages
    if(getQueryVariable("id")=='registeration')
    {
     
         //   alert(getQueryVariable("id"));
        $scope.loginView=false;
            $scope.registerationView=true;
            $scope.forgotView=false;
            
    }
    else if(getQueryVariable("id")=='forgot')
    {
       // alert(getQueryVariable("id"));
        $scope.registerationView=false;
        $scope.forgotView=true;
        $scope.loginView=false;
    }
    else if(getQueryVariable("id")=='login')
    {
      //  alert(getQueryVariable("id"));
        $scope.loginView=true;    
        $scope.registerationView=false;
        $scope.forgotView=false;
    }
    
    $scope.registerView=function()
    {
        $scope.loginView=false;    
        $scope.registerationView=true;
        $scope.forgotView=false;
    };
    
    $scope.recoverView=function()
    {
        $scope.loginView=false;    
        $scope.registerationView=false;
        $scope.forgotView=true;
    };
    
    $scope.signInView=function()
    {
        $scope.loginView=true;    
        $scope.registerationView=false;
        $scope.forgotView=false;
    };
    
//function to async check presence of email in the database for registeration        
$scope.asyncRegisterEmailCheck=function()
{
    if($scope.registerEmail) //checking if the email is set in the scope
    {
        $http.get("server/auth/asyncEmailCheck.php",{params:{email:$scope.registerEmail}}).then(function(response)
        {
          if(response.data.status=="success" && response.data.email==$scope.registerEmail)
          {
             $scope.registererr="OOPS! This email is already in our system try logging in or recover your password."
             $scope.registerErrorView=true; 
          }
         
        });
    }
  
};
        
//function for async email check for login
$scope.asyncLoginEmailCheck=function()
{
    if($scope.loginEmail) //checking if the email is set in the scope
    {
        $http.get("server/auth/asyncEmailCheck.php",{params:{email:$scope.loginEmail}}).then(function(response)
        {
          if(response.data.status!="success" && response.data.email!=$scope.loginEmail)
          {
             $scope.loginerr="OOPS! We can not find this email in our system."
             $scope.errorView=true; 
          }
         
        });
    }
  
};
        
        
$scope.asyncForgotEmailCheck=function()
{
    if($scope.forgotEmail) //checking if the email is set in the scope
    {
        $http.get("server/auth/asyncEmailCheck.php",{params:{email:$scope.forgotEmail}}).then(function(response)
        {
          if(response.data.status!="success" && response.data.email!=$scope.forgotEmail)
          {
             $scope.forgoterr="OOPS! We can not find this email in our system."
             $scope.forgotErrorView=true; 
          }
         
        });
    }
  
};        
        
//FUNCTION TO PERFORM LOGIN        
$scope.login=function()
{
  	 $scope.cartValue = sessionStorage.getItem( "cart" );

     if($scope.cartValue!=null)
     {
        $scope.cartObj = JSON.parse( $scope.cartValue );
        $scope.localStoreItemCount=$scope.cartObj.items.length;

        if($scope.localStoreItemCount>0)
        { 
            //login and insert items in the cart
            var cartObj=JSON.stringify($scope.cartObj);
            $http.get("server/auth/checkLogin.php",{params :{email:$scope.loginEmail, password:$scope.loginPassword, products:cartObj}}).then(function(response)
            {
                $scope.user=response.data;
                if($scope.user.status==="success" )
                {     
                    webStorage.session.set("email",$scope.user.email);
                    webStorage.session.set("password",$scope.user.password);
		            webStorage.session.set("name",$scope.user.name);
                    $scope.name=webStorage.session.get("name");
				    $scope.loggedIn=true;
                    //remove the local cart objects here
                    	webStorage.session.remove("cart" );
                    if(getQueryVariable("from")=='cart')
                        {
                            $window.location.href = 'orderSummary.html';        
                        }
                    else if(getQueryVariable("from")=='index')
                        {
                              $window.location.href = 'index.html'; 
                        }
                    
                }
                else
                {
                    //when authentication fails
                    $scope.loginerr=$scope.user.cause;
                    $scope.loggedIn=false;
                    $scope.errorView=true;
                }
            });
        }
        else
        {
           $http.get("server/auth/checkLogin.php",{params:{email:$scope.loginEmail, password:$scope.loginPassword}}).then(function(response)
            {
	           $scope.user=response.data;
               if($scope.user.status==="success" )
               {     
                    webStorage.session.set("email",$scope.user.email);
				    webStorage.session.set("password",$scope.user.password);
				    webStorage.session.set("name",$scope.user.name);
                    $scope.name=webStorage.session.get("name");
				    $scope.loggedIn=true;
                   $window.location.href = 'index.html';
               }
               else
               {
                    //when authentication fails
                    $scope.loginerr=$scope.user.cause;
                    $scope.loggedIn=false;
                    $scope.errorView=true;
               }      
             });
        }
     }
    else
    {
       $http.get("server/auth/checkLogin.php",{params:{email:$scope.loginEmail, password:$scope.loginPassword}}).then(function(response)
	   {
	        $scope.user=response.data;
            if($scope.user.status==="success" )
               {     
                    webStorage.session.set("email",$scope.user.email);
				    webStorage.session.set("password",$scope.user.password);
				    webStorage.session.set("name",$scope.user.name);
                    $scope.name=webStorage.session.get("name");
				    $scope.loggedIn=true;
                   $window.location.href = 'index.html';
                }
           else
           {
               //when authentication fails
                $scope.loginerr=$scope.user.cause;
                $scope.loggedIn=false;
                $scope.errorView=true;
           }
        });
     }
             
    };
    
    $scope.register=function()
    {alert($scope.registerMobile);
        $http.get("server/auth/registeration.php",
        {
            params:{
                registerName:$scope.registerName,
                    registerEmail:$scope.registerEmail,
                    registerPassword:$scope.registerPassword, 
                    registerMobile:$scope.registerMobile,
                    registerCollege:$scope.registerCollege
                   }
        }).then(function(response)
        {
            $scope.result=response.data;
            if( $scope.result.status=="success")
            {
                //REGISTRATION IS SUCCESSFULE
                $window.location.href="registrationSuccess.html";    
            }
            else if($scope.result.status="fail")
            {
                
                //REGISTRATION FAILS HERE    
                
            }
            else
            {
                //SOME UNKNOWN PROBLEM OCCURED
            }
        });    
    };
    
    
    $scope.forgotPassword=function()
    {
        $http.get("server/passwordRecovery.php",{params:{email:$scope.forgotEmail}}).then(function(response){
            
            $scope.result=response.data; 
            if($scope.result.status="success")
            {
                //PASSWORD EXISTS IN DB
            }
            else if($scope.result.status=="fail")
            {
                //PASSWORD DOESNT EXIST IN DB
            }
            else
            {
                //EXTREMELY REMOTE BUT THIS SHIT HAS HAPPENED
                
            }
            
        });
    };
    }
});