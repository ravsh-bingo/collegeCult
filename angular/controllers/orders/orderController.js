var app=angular.module('angularApp',['webStorageModule']);
app.controller('orders',function($scope,$window,$http,webStorage)
{
    // PRESCRIPTION:USE SINGLE FILE FOR HTTP CALL
    
    //check if the user us logged in if not redirect him to login page else continue
    //table to be used for this page is orders and orderItems
    //fetch all th orders which are active 
    //fetch all the orders which are cancelled
    //fetch all the orders which are fulfilled success fully
    
    //1 FUNCTION TO SET UP LOGGED IN STATUS
    if(webStorage.session.get("email")==undefined)
	{
       $scope.loggedIn=false;
      
    }
    else
	{  
		$scope.email =webStorage.session.get("email");
		$scope.password =webStorage.session.get("password");
		$scope.name =webStorage.session.get("name");
		$scope.loggedIn=true;
    
	}
    
    //redirecting user according to his loggedin status
    if($scope.loggedIn)
    {
        $http.get("server/order/myOrders.php",{params:{email:$scope.email,password:$scope.password}}).then(function(response)
        {
            $scope.activeOrders=response.data[0].active;
            $scope.cancelledOrders=response.data[1].cancelled;
            
            //alert(response.data[1].cancelled);
        });
        
        //FUNCTION TO CANCEL ORDER
        $scope.cancelOrder=function(orderId)
        {
            
        }
        
        //FUNCTION TO REPEAT ORDER
        $scope.repeatOrder=function(orderId)
        {
            
        }
        
        //
    }
    else
    {
        $window.location.href="login.html?id=login";
    }
});




