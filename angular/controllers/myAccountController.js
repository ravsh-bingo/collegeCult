var app=angular.module('angularApp',['webStorageModule']);



app.controller('storeMaker',function($scope,$http,webStorage)
	{
		//variables to define type of sorting
		$scope.popularity=true;
		$scope.price=false;
		$scope.discount=false;
		var gender="F";
		
		$http.get("server/stores/genderStore_C2S.php",{params:{gender}}).then(function(response){$scope.items=response.data;});
		
		//function to display selected product in quickbuy modal
		//this function will work even if the user is not logged in
		$scope.selectedProduct=function(item)
		{
			
			$scope.selectedItem=item.productId;
			$scope.price=item.price;
			$scope.discount=item.discount;
			$scope.quantity=1;
		};
			
		
			
		//funtion to add items to store
		//this function should have other version to add items to store if the user is not logged in		
		$scope.addtoStore=function(productId)
		{
			$http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then()
		};	
				
		//function to add item to wishlist
		//this feature will only work if the user is logged in 
		$scope.addToWishlist=function(productId)
		{
			$http.get("server/wishlist/wishlist_C2S.php",{params:{email:$scope.email, productId: productId}}).then()
		};	
		
		//logic to add loggedin or logged out status
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
		
		//function to perform log in 
		$scope.submit1=function()
		{
			$http.get("server/checkLogin.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
			{
				$scope.user=response.data;
				
				if($scope.user[0].email==$scope.email && $scope.user[0].password==$scope.password)
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
				}
				else
				{
				
					$scope.loginError=true;
					$scope.loggedIn=false;
				}
			});
		};
			
		//function to count number of items in the store
		//this function will work even if the user is not logged in		
		//this function should have other verion to enable user to count the number of items in his store when he is not logged in
		$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
		{
			$scope.storeCount=response.data[0];
		});
		
		
		$scope.selectedAddress=function(address){
		$scope.address=address;
		};
		
		$http.get("server/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
		{
		
			$scope.wishlistCount=response.data[0];
		});

});

	