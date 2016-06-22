/*DISCLAIMER:This is little different from her and his store controllers
**PURPOSE:To load store items for females and provide all the functionality for the page
**FUNCTION COUNT:6
**DATA FETCHING BLOCK:2
**OTHER CODE BLOCKS:2
**WRITTEN BY: Gaurav Singh
**DATE:14-03-2016
*/

var app=angular.module('angularApp',['webStorageModule','ngOrderObjectBy']);
app.controller('storeMaker',function($scope,$http,webStorage)
{
    $scope.priceRange=2000;
	$scope.orderBy='incart';//setting initial value for product sorting
    $scope.showAll=true;//setting initial value for product filtering
    $scope.localStoreItemCount=0;
    
    //logic to add loggedin or logged out status
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
        
    
    
    //LIST OF FILTERS
    $scope.filterArray = [
      {name:"S",type:"Size", on: false},
      { name: "M",type:"Size", on: false}, 
      {name:"L",type:"Size", on: false},
      {name:"XL",type:"Size", on: false},
        
      {name:"ComicCult",type:"Store", on: false},
      {name:"SportsCult",type:"Store", on: false},
      {name:"GamingCult",type:"Store", on: false},
      {name:"CollegeCult",type:"Store", on: false},
      {name:"PoliticalCult",type:"Store", on: false},
      {name:"TvCult",type:"Store", on: false},
     ];
    //LOAD ITEMS AS PER THE STORE SELECTED
    if(getQueryVariable("storeType")=='discount')
    {
		$http.get("server/stores/discountStore_S2C.php",{cache: true, params:{storeType:getQueryVariable("storeType"),value:getQueryVariable("value") }}).then(function(response)
        {$scope.items=response.data;});
    }
    else if(getQueryVariable("storeType")=='dedicated')
	{	
		//call the server file tos select items from the products table by productCategory
		$http.get("server/stores/dedicatedStore_S2C.php",{cache: true, params:{storeType:getQueryVariable("storeType"),value:getQueryVariable("value") }}).then(function(response)
		{$scope.items=response.data;});
	}
	else if(getQueryVariable("storeType")=='gift')
	{
		//call the server file to 
		$http.get("server/stores/giftStore_S2C.php",{cache: true, params:{storeType:getQueryVariable("storeType"),value:getQueryVariable("value") }}).then(function(response)
		{	
	       if(response.data.status=="Fail")
           {
				$scope.storeFail=true;
				$scope.errMessage=response.data.message;
           }
           else
           {
               $scope.items=response.data;
           }
        });
    }
    else if(getQueryVariable("storeType")=='flagship')
	{
		$http.get("server/stores/flagshipStore_S2C.php",{cache: true, params:{storeType:getQueryVariable("storeType"),value:getQueryVariable("value") }}).then(function(response)
		{$scope.items=response.data;});
	}
		
    
    //1 function to get the number of items in the store of the user
	$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
    {$scope.storeCount=response.data[0];});
		
	//2 function to count the number of items in the wishlist of the user
	$http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.wishlistCount=response.data[0];});
    
    
        //7 FUNCTION TO SORT ITEMS
        $scope.orderItems=function(field){ $scope.orderBy=field;};
    
    
    //1 FUNCTION TO SORT STORE
    //FUNCTION TO CHECK THE CHANGES IN THE ON VALUE OF FILTERS
    $scope.checkChange=function()
    {
      for(f in $scope.filterArray)
          {
              if($scope.filterArray[f].on)
                  {
                      $scope.showAll=false;
                      return;
                  }
          }
        $scope.showAll=true;
    };
    
    //FUNCTION TO FILTER OUT ELEMENTS
	$scope.filterFunc=function(p)
    {
        if($scope.showAll){return true;}
        
        var sel=false;
        for(fil in $scope.filterArray)
            {
                var f=$scope.filterArray[fil];
              
                if(f.on)
                    {
                        if(f.type=='Size')//checking for filter type size
                            {
                                if(f.name==p.size)
                                    {return true;}
                            }
                        else if(f.type=='Store')//checking for fitler type cult
                            {
                               if(f.name==p.cult)
                                   {return true;}
                            }
                      
                    }
            }
    };
    //2 
    //2 FUNCTION TO ADD ITEM TO THE CART
    $scope.addtoStore=function(productId)
    { 
		if($scope.loggedIn)
            {
                $http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then();
		        $scope.storeCount[0]++;//=$scope.storeCount[0]+1;        
            }
        else
        {
                  // $scope.cartValue = sessionStorage.getItem( "cart" ); 
               // console.log()
                //    $scope.cartObj = JSON.parse( $scope.cartValue );
                //use apply to update the content
                //$scope.localStoreItemCount=$scope.cartObj.items.length;
            
            
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
                    if(!already){
                    $scope.cartObj.items.push({"productId":productId,"quantity":1});}
                
                    $scope.cartItemCount=$scope.cartObj.items.length;
                  
                 
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    
                }
            else if($scope.localStoreItemCount==0) //if there are no items in the store
            {
                alert("cart is empty");
                var cart={"items":[{"productId":productId,"quantity":1}]};
                var jsonStr=JSON.stringify(cart);
                sessionStorage.setItem("cart",jsonStr);
                
                $scope.cartValue = sessionStorage.getItem( "cart" ); 
            
                    $scope.cartObj = JSON.parse( $scope.cartValue );
        
                $scope.localStoreItemCount=$scope.cartObj.items.length;
                alert( $scope.localStoreItemCount);
            }
        }
    };
		
    //3 FUNCTION TO ADD ITEMS IN THE WISHLIST
	$scope.addToWishlist=function(productId)
	{
		$http.get("server/wishlist_C2S.php",{params:{email:$scope.email, productId: productId}}).then()
	};
		
	//4 FUNCTION TO LOGIN			
	$scope.login=function()
	{
		$http.get("server/auth/checkLogin.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
		{
            $scope.user=response.data;
			alert($scope.user.cause);
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
	
/*1 function to load data in quickbuy modal
    $scope.selectedProduct=function(item)
	{
	   $scope.selectedItem=item.productId;
       $scope.price=item.price;
       $scope.discount=item.discount;
       $scope.quantity=1;
    };
    
    	//2 this function should work only if the user is already logged in	
	$scope.placeQuickOrder=function(productId)
	{
		$http.get("server/order/placeQuickOrder_C2S.php",{params:{email:$scope.email, productId: productId}}).then()
	};
	*/