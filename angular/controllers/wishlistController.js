/*DISCLAIMER:This is little different from her and his store controllers
**PURPOSE:To load store items for females and provide all the functionality for the page
**FUNCTION COUNT:5
**DATA FETCHING BLOCK:3
**OTHER CODE BLOCKS:1
**WRITTEN BY: Gaurav Singh
**DATE:15-03-2016
*/
var app=angular.module('angularApp',['webStorageModule']);
app.controller('wishlist',function($scope,$http,webStorage)
{
	//
    var email=webStorage.session.get("email");

   
    //1 logic to add loggedin or logged out status
	if(webStorage.session.get("email")==undefined)
	{
		$scope.email;
		$scope.password;
		$scope.name;
		$scope.loggedIn=false;
	}
	else
	{
		$scope.email=webStorage.session.get("email");
		$scope.password=webStorage.session.get("password");
		$scope.name=webStorage.session.get("name");
		$scope.daddress1=webStorage.session.get("daddress1");
		$scope.daddress2=webStorage.session.get("daddress2");
			$scope.loggedIn=true;
    }
		
    //1 TO FETCH THE ITEMS IN THE WISHLIST
	$http.get("server/wishlist/wishlist_S2C.php",{params:{email:email}}).then(function(response){$scope.items=response.data;});
    
    //2 TO FETCH THE COUNT OF ITEMS IN THE CART
	$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.storeCount=response.data[0];});
		
    //3 TO FETH THE COUNT OF ITEMS IN THE WISHLIST
    $http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.wishlistCount=response.data[0];});

    //1 FUNCTION TO ADD ITEM TO CART
    $scope.addtoCart=function(productId)
	{
		$http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then();
		$scope.storeCount[0]++;//=$scope.storeCount[0]+1;
	};
    
    //2 FUNCTION TO REMOVE ITEM FROM THE CART
    $scope.remove=function(productId, email)
	{
		$http.get("server/cart/remove_C2S.php",{params:{productId:productId, email:email}}).then(function(response)
		{$scope.items=response.data;});
	     $scope.storeCount[0]--;
    };
		
    

	//3 FUNCTION TO PERFORM LOGIN 
    $scope.login=function()
	{
	   $http.get("server/auth/checkLogin.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
       {
	       $scope.user=response.data;
           if($scope.user.status!="Fail" && $scope.user[0].email==$scope.email && $scope.user[0].password==$scope.password)
           {
				webStorage.session.set("email",$scope.email);
				webStorage.session.set("password",$scope.password);
				webStorage.session.set("name",$scope.user[0].name);
				webStorage.session.set("daddress1",$scope.user[0].daddress1);
				webStorage.session.set("daddress2",$scope.user[0].daddress2);
				$scope.name=webStorage.session.get("name");
				$scope.daddress1=webStorage.session.get("daddress1");
				$scope.daddress2=webStorage.session.get("daddress2");
				$scope.loggedIn=true;
				$scope.loginTry=false;
				//returns fresh item count from the wishlist after the user logs in 
				$http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response){$scope.wishlistCount=response.data[0];});
				//returns fresh item count from the cart after the user logs in 
				$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response){$scope.storeCount=response.data[0];});
           }
           else
		   {
				$scope.loginerr=$scope.user.cause;
				$scope.loginTry=true;
				$scope.loginFail=true;
				$scope.loggedIn=false;
			}
        });
    };
    
    //4 FUNCTION TO ENABLE LOGIN VIEW AND DISABLE SEARCH VIEW	
	$scope.loginBtn=function(){$scope.loginTry=true;};
	
    //5 FUNCTION TO ENABLE SEARCH VIEW AND DISABLE LOGIN VIEW
    $scope.searchBtn=function(){$scope.loginTry=false;};
   
});

/*
PREREQUISITE: USER SHOULD BE LOGGED IN WISHLIST CAN NOT BE ACCESSED WITHOUT LOGGING IN 

WHAT IS REQUIRED
FUNCTION: remove, add to cart, checkout with this, 


WHAT IS NOT REQUIRED
FUNCTION: increase, decrease, login, 


/*   //function to add data as selected product for quickbuy modal
	$scope.selectedProduct=function(item)
	{
			$scope.selectedItem=item.productId;
			$scope.price=item.price;
			$scope.discount=item.discount;
			$scope.quantity=1;
			//$scope.address=user.address;
	};*/