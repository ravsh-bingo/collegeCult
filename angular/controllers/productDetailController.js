var app=angular.module('angularApp',['webStorageModule']);

app.controller('productDetails',function($scope,$http,webStorage)
	{
		$scope.quantity=1;//default quantity is 1
		$scope.productId=getQueryVariable("productId");	
    var email=webStorage.session.get("email");
		//get request to fetch details of the item seleted by the user
				$http.get("server/showItem.php",{cache: true, params:{productId:getQueryVariable("productId")}}).then(function(response){$scope.item=response.data;});
    $http.get("server/matching.php",{cache:true, params:{productId:getQueryVariable("productId")}}).then(function(response)
    {$scope.matches=response.data;});
			
		//checking if the user is already logged in or not	
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
		
			//funtion to add items to store, this will be possible only if the user is logged in
			
		}
    
    
    
        //2 FETCHING COUNT OF ITEMS IN THE CART
    if($scope.loggedIn)
    {
        $http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
        {
            if(response.data[0]==0)
            {
                $scope.localStoreItemCount==0
            }
            else
            {
                $scope.localStoreItemCount=response.data[0];    
            }
        });
    }
    else
    {
        $scope.cartValue = sessionStorage.getItem( "cart" );
        if($scope.cartValue!=null)
        {
            $scope.cartObj = JSON.parse( $scope.cartValue );
            $scope.localStoreItemCount=$scope.cartObj.items.length;
        }
        else
        {
            $scope.localStoreItemCount=0; 
        }
    }
    
//function to add item to wishlist
//this feature will only work if the user is logged in 
		
    //3 FUNCTION TO ADD ITEM TO WISHLIST
    if($scope.loggedIn)
    {
        $scope.addToWishlist=function(productId)
	    {
		  $http.get("server/wishlist/wishlist_C2S.php",{params:{email:$scope.email, productId: productId}}).then(function(response)
		  { 
	           if(response.data[0].numberOfItems>=$scope.wishlistCount) //checking if the items is really added in the table
               {
                    $scope.wishlistCount[0]++;
                   Materialize.toast('Item Added to your Wishlist', 4000)
               }
		  });	
        };	   
    }
    
    

    
    //2 FUNCTION TO ADD ITEM TO THE CART
    $scope.addtoCart=function(productId,discount,price)
    { 
		if($scope.loggedIn)
        {
            $http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then(function(response)
            {
                $scope.localStoreItemCount=response.data.count;   
                 Materialize.toast('Item Added to your Cart', 4000)
            });
		}
        else
        {
            if($scope.localStoreItemCount>0) //checks if there are already items in the store
            {
                var already=false;
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                console.log($scope.cartObj);
                for(var i=$scope.cartObj.items.length-1;i>=0;i--)
                {
                    if($scope.cartObj.items[i].productId==productId)
                    {
                        already=true;
                      	break;
                    }
                    else
                    {
                    	continue;
                    }
                }
                if(!already)
                {
                    $scope.cartObj.items.push({"productId":productId,"quantity":1,"discount":discount,"price":price});
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    $scope.cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( $scope.cartValue );
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                     Materialize.toast('Item Added to your Wishlist', 4000)
                }
                else
                {
                    for(var i=$scope.cartObj.items.length-1;i>=0;i--)
                    {
                        if($scope.cartObj.items[i].productId==productId)
                        {
                            //remove item from the array and push again here
                            $scope.cartObj.items[i].quantity++;
                            var jsonStr=JSON.stringify($scope.cartObj);
                            sessionStorage.setItem("cart",jsonStr);
                            var cartValue = sessionStorage.getItem( "cart" ); 
                            $scope.cartObj = JSON.parse( cartValue ); 
                             Materialize.toast('Item Added to your Wishlist', 4000);
                            //$scope.items=$scope.cartObj.items;
                            break;
                        }
                        else
                        {
                	        continue;
                        }
                    }  
                    $scope.cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( $scope.cartValue );
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                }
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
             }
             else if($scope.localStoreItemCount==0) //if there are no items in the store
             {
                
                var cart={"items":[{"productId":productId,"quantity":1,"discount":discount,"price":price}]};
                var jsonStr=JSON.stringify(cart);
                sessionStorage.setItem("cart",jsonStr);
                 Materialize.toast('Item Added to your Wishlist', 4000);
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
                
            }
        }
    };
			
		
		
		//returns the number of items in the wishlist of the user
		//call this function only if the user is logged in	
		$http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response){$scope.wishlistCount=response.data[0];});
		


		

	
	});