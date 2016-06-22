var app=angular.module('angularApp',['webStorageModule']);
app.controller('loginController',function($scope,$http,$window,webStorage)
{

    $scope.newPassword="";
    $scope.confirmPassword="";
    $scope.otp="";
    
    $scope.forgotPassword=function()
    {
        $http.get("server/passwordRecovery.php",
        {params:
            {email:$scope.forgotEmail,
             confirmEmail:$scope.confirmPassword
            }
        }).then(function(response)
        {
            
            $scope.result=response.data; 
            if($scope.result.status="success")
            {
                //PASSWORD EXISTS IN DB
                $showSuccess=true;
                $showError=false;
                
                //SET USER EMAIL, PASSWORD, NAME FROM IN THE SESSION
                
                sessionStorage("email",$scope.result.email);
                sessionStorage("password",$scope.result.password);
                sessionStorage("name",$scope.result.name);
                
                //SHOW SUCCESS MESSAGE AND MAKE USER WAIT FOR 1.5 SEC
                $scope.successMessage="Your password is changed and you are successfuly logged in";
                wait(1500);
                
                //REDIRECT USER TO HOME PAGE
                $window.location.href="index.html";
            }
            else if($scope.result.status=="fail")
            {
                //PASSWORD DOESNT EXIST IN DB
                $scope.errorMessage="Oops! We are unable to find your email in the system. Check your email id is correct or <a href='login.html?id=registeration'>Continue</a>";
                $showSuccess=false;
                $showError=true;
            }
            else
            {
                //EXTREMELY REMOTE BUT THIS SHIT HAS HAPPENED STOP THIS FROM HITTING THE FAN
                $scope.failMessage="Unfortunate things happen and this is one of those.";
                $showSuccess=false;
                $showError=true;
                
            }
            
        });
    };
    
});