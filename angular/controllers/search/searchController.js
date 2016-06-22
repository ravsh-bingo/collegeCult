var app=angular.module("angularApp",['webStorageModule']);
app.controller('searchController',function($scope,$http,webStorage)
{
    
    
        //1 FUNCTION TO SET UP LOGGED IN STATUS
    if(webStorage.session.get("email")==undefined)
	{
       $scope.loggedIn=false;
        $scope.cartItemCount=0;
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
    
    
    
    //extract search query from query string here
    $scope.searchQuery=getQueryVariable("searchQuery");	
    $http.get("server/search/searchResult.php",{params:{ searchQuery: $scope.searchQuery}}).then(function(response)
	{ 
	  $scope.results=response.data;
    });
			
     //3 FETCHING COUNT OF ITEMS IN THE WISHLIST
    if($scope.loggedIn)
        {
            $http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
            {$scope.wishlistCount=response.data[0];});
        }
    
    
     //2 FETCHING COUNT OF ITEMS IN THE CART
     if($scope.loggedIn)
     {
        $http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
        {
            if(response.data[0]==0)
            {
               $scope.localStoreItemCount=0;
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
    
    
    
      //2 FUNCTION TO ADD ITEM TO THE CART
    $scope.addtoCart=function(productId)
    { 
		if($scope.loggedIn)
            {
                $http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then(function(response)
                {
                    console.log(response.data.count);
                    $scope.localStoreItemCount=response.data.count;       
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
                            else{
                            		continue;
                            	}
                        }
                    if(!already)
                    {
                        $scope.cartObj.items.push({"productId":productId,"quantity":1});
                        var jsonStr=JSON.stringify($scope.cartObj);
                        sessionStorage.setItem("cart",jsonStr);
                        $scope.cartValue = sessionStorage.getItem( "cart" ); 
                        $scope.cartObj = JSON.parse( $scope.cartValue );
                        $scope.localStoreItemCount=$scope.cartObj.items.length;
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
              
                var cart={"items":[{"productId":productId,"quantity":1}]};
                var jsonStr=JSON.stringify(cart);
                sessionStorage.setItem("cart",jsonStr);
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
                $scope.cartObj = JSON.parse( $scope.cartValue );
                $scope.localStoreItemCount=$scope.cartObj.items.length;
     
            }
        }
    };
    
    
    //3 FUNCTION TO ADD ITEM TO WISHLIST
    $scope.addToWishlist=function(productId)
	    {
    if($scope.loggedIn)
    {
        
		  $http.get("server/wishlist/wishlist_C2S.php",{params:{email:$scope.email, productId: productId}}).then(function(response)
		  { 
	           if(response.data[0].numberOfItems>=$scope.wishlistCount) //checking if the items is really added in the table
               {
                    $scope.wishlistCount[0]++;
               }
		  });	
        }	   
    };
    
    
  });