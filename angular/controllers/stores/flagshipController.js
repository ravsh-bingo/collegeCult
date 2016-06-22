/*DISCLAIMER:This is little different from her and his store controllers
**PURPOSE:To load store items for females and provide all the functionality for the page
**FUNCTION COUNT:6
**DATA FETCHING BLOCK:2
**OTHER CODE BLOCKS:2
**WRITTEN BY: Gaurav Singh
**DATE:15-03-2016
*/

var app=angular.module('angularApp',['webStorageModule']);
app.controller('index',function($scope,$http,webStorage)
	{
        //1 DECIDE THE YPE OF STORE
		if(getQueryVariable("storeType")=='collegecult')
		{
			//call the server file to select items from the products table by discount 
			$http.get("server/stores/discountStore_S2C.php",{cache: true, params:{storeType:getQueryVariable("storeType"),value:getQueryVariable("value") }}).then(function(response)
			{$scope.items=response.data;});
		}
		else
		{
			//call the server file to 
			$http.get("server/stores/flagships_S2C.php",{cache: true}).then(function(response)
			{$scope.items=response.data;});
		}
		
		
		
    //2 FUNCTION TO SET UP LOGGED IN STATUS
    if(webStorage.session.get("email")==undefined)
	{
       $scope.loggedIn=false;
    }
    else
	{
		$scope.email =webStorage.session.get("email");
		$scope.password =webStorage.session.get("password");
		$scope.name =webStorage.session.get("name");
		$scope.daddress1=webStorage.session.get("daddress1");
		$scope.daddress2=webStorage.session.get("daddress2");
		$scope.loggedIn=true;
	}
    
    //1 FETCHING COUNT OF ITEMS IN THE CART
  	$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
    {$scope.storeCount=response.data[0];});
		
    //2 FETCHING COUNT OF ITEMS IN THE WISHLIST
    $http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
    {$scope.wishlistCount=response.data[0];});

	//1 FUNCTION TO SORT STORE
    $scope.mySortFunction = function(item) 
     {
        if(isNaN(item[$scope.sortExpression]))
		{
		  return item[$scope.sortExpression];
		}
        return parseInt(item[$scope.sortExpression]);
     };

    //2 FUNCTION TO ADD ITEM TO THE CART
    $scope.addtoStore=function(productId)
    {
		$http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then();
		$scope.storeCount[0]++;//=$scope.storeCount[0]+1;
	};	
		
    //3 FUNCTION TO ADD ITEM TO WISHLIST
	$scope.addToWishlist=function(productId)
	{
		$http.get("server/wishlist/wishlist_C2S.php",{params:{email:$scope.email, productId: productId}}).then(function(response)
		{ 
	       if(response.data[0].numberOfItems>=$scope.wishlistCount) //checking if the items is really added in the table
			{$scope.wishlistCount[0]++;}
				
        });	
    };	
		
		
	//4 FUNCTION TO PERFORM LOGIN 
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
		
        //5 FUNCTION TO ENABLE LOGIN VIEW AND DISABLE SEARCH VIEW
		$scope.loginBtn=function(){$scope.loginTry=true;}; 
    
        //6 FUNCTION TO ENABLE SEARCH VIEW AND DISABLE LOGIN VIEW
		$scope.searchBtn=function(){$scope.loginTry=false;}; 
		
    
    
	});