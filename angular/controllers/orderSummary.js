/*DISCLAIMER:LOGIN IS MUST BEFORE THIS
**PURPOSE:To load store items for females and provide all the functionality for the page
**VAR DECLARED:1
**$SCOPE.VAR:
**FUNCTION COUNT:5
**DATA FETCHING BLOCK:3
**OTHER CODE BLOCKS:1
**WRITTEN BY: Gaurav Singh
**DATE:15-03-2016
*/
//LOGIN FUNCTION IS NOT REQUIRED HERE
var app=angular.module('angularApp',['webStorageModule']);
app.controller('orderSummary',function($scope,$window,$http,webStorage)
{
	
    //VAR DECLARATION
    $scope.COD=true;
	$scope.other=false;
	var email=webStorage.session.get("email");
    
    $scope.address="";
    $scope.pincode="";
    $scope.landmark="";
    $scope.city="";

    //CHANGE REQUIRED 	
    //1 SETTING UP LOGGED IN STATUS
	if(webStorage.session.get("email")==undefined)
	{
		$scope.loggedIn=false;
        $window.location.href="login.html"
        //REDIRECT USER TO LOGIN/ REGISTER PAGE 
	}
	else
	{
    
		$scope.email=webStorage.session.get("email");
		$scope.password=webStorage.session.get("password");
		$scope.name=webStorage.session.get("name");
		
	
	    $http.get("server/ordersummary/fetchAddress.php",{params:{email:$scope.email,password:$scope.password}}).then(function(response)
        {
           if(response.data.status=="fail")
            {
                //used to diaplay warning
                $scope.addressTrue=false;   
            }
            else
            {
                $scope.deliveryAddress=response.data[0];
                $scope.addressTrue=true;
            }
        });
		$scope.loggedIn=true;
	}
    
    $scope.changeAddress=function()
    {
         $http.get("server/ordersummary/fetchAddress.php",{params:{email:$scope.email,password:$scope.password}}).then(function(response)
        {
            $scope.addresses=response.data;
            
      
        });
        $scope.showChangeAddress=true;
         $scope.showAddAddress=false;
             $scope.addressTrue=true;
    };
    $scope.applyAddress=function(address)
    {
        $scope.deliveryAddress=address;
         $scope.showChangeAddress=false;
          $scope.showAddAddress=false;
             $scope.addressTrue=true;
    };
    
    //FUNCTION:
    //PURPOSE:TO ADD ADDRESS
    $scope.addAddress=function()
    {
        $scope.showAddAddress=true;
             $scope.addressTrue=true;
    }
    
    $scope.saveAddress=function()
    {
        alert($scope.email +$scope.landmark+$scope.address + $scope.pincode + $scope.city);
        $http.get("server/saveAddress.php",{params:{email:$scope.email, password:$scope.password, address:$scope.address,
        pincode:$scope.pincode, city:$scope.city, landmark:$scope.landmark}}).then(function(response)
        {
            var deliveryAddress=response.data;
        
            if(response.data.status="success")
                {
                    $scope.deliveryAddress=deliveryAddress;
                    $scope.addressFound=true;
                    $scope.addressTrue=true;
                    $scope.showAddAddress=false;
                    
                }
            else
            {
                
            }
       });
        
    }
		 $http.get("server/cities.php").then(function(response)
	{$scope.cities=response.data;
   
    });
	 //2 TO COUNT THE NUMBER OF ITEMS IN THE CART
	$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.storeCount=response.data[0];});
		
    //3 TO COUNT THE NUMBER OF ITEMS IN THE WISHLIST
	$http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.wishlistCount=response.data[0];});
    
    

    
    
    
    if(getQueryVariable("orderType")=='single')
    {
        //fetch item from the product table here
        $http.get("server/order/fetchItem.php",{params:{productId:getQueryVariable("productId")}}).then(function(response)
        {
            $scope.items=response.data;
            $scope.items[0].quantity=1;
            
            
            $scope.youSave=parseFloat($scope.items[0].price)*parseFloat($scope.items[0].discount)/100;
            $scope.youPay=parseFloat($scope.items[0].price)-parseFloat($scope.youSave);
            
            $scope.remove=function()
            {
                //redirect to the page from ehere he arrived
            };
            $scope.increase=function()
            {
                $scope.items[0].quantity+=1;
            };
            $scope.decrease=function()
            {
                if($scope.items[0].quantity>1)
                {    
                    $scope.items[0].quantity-=1;
                }
                else
                {
                    //launch a toast here
                }
                
            };
        })
        
        
    }
    else
    {
        
    //1 TO FETCH THE CART CONTENT
    $http.get("server/cart/cartContent_S2C.php",{params:{email}}).then(function(response)
	{
        $scope.items=response.data;
        var i=0;
        $scope.youPay=0;
        $scope.youSave=0;
        while(typeof($scope.items[i])!=='undefined' )
        {
            var saving=parseFloat($scope.items[i].discount)*   parseFloat($scope.items[i].price)/100; 
            
            $scope.youPay=parseFloat($scope.youPay)+parseFloat($scope.items[i].price)-parseFloat(saving);            
            $scope.youSave=parseFloat($scope.youSave)+parseFloat(saving);
           
            i++;
        }
    
    
    });
        
        
        
        	 //1 FUNCTION TO REMOVE ITEM FROM THE CART
    $scope.remove=function(productId, email)
	{
		if($scope.loggedIn)
        {
            $http.get("server/cart/remove_C2S.php",{params:{productId:productId, email:email}}).then(function(response)
		      {$scope.items=response.data;});
	           $scope.storeCount[0]--;
        }
        else
        {
             $scope.cartValue = sessionStorage.getItem( "cart" ); 
             $scope.cartObj = JSON.parse( $scope.cartValue );
             for(var i=$scope.cartObj.items.length-1;i>=0;i--)
             {
                if($scope.cartObj.items[i].productId==productId)
                {
                 
                    //remove item from the array and push again here
                    $scope.cartObj.items.splice(i,1);
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.items=$scope.cartObj.items;
                    $scope.localStoreItemCount=$scope.cartObj.items.length;
                  	break;
                }
                else
                {
                	continue;
                }
             }
           
        }
    };
		
	//2 FUNCTION TO INCREASE THE COUNT OF ITEM IN THE CART
	$scope.increase=function(productId, email, quantity)
    {
	    if($scope.loggedIn)
        {$http.get("server/cart/quantityChange_C2S.php",{params:{productId:productId, email:email, quantity:quantity,action:"increase"}}).then(function(response){
		  $scope.items=null;
		  $scope.items=response.data;
        });
        }
        else
        {
              $scope.cartValue = sessionStorage.getItem( "cart" ); 
             $scope.cartObj = JSON.parse( $scope.cartValue );
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
                    $scope.items=$scope.cartObj.items;
                  	break;
                }
                else
                {
                	continue;
                }
             }                                                                                                                     
        }                                                                                                                     

		};
    
		
	//3 FUNCTION TO DECREASE THE COUNT OF ITEMS IN THE CART
	$scope.decrease=function(productId, email, quantity)
    {
	   if($scope.loggedIn)
           {
        $http.get("server/cart/quantityChange_C2S.php",{params:{productId:productId, email:email,quantity:quantity,action:"decrease"}}).then(function(response){
		  $scope.items=null;
		  $scope.items=response.data;
		});
           }
        else
        {
            $scope.cartValue = sessionStorage.getItem( "cart" ); 
             $scope.cartObj = JSON.parse( $scope.cartValue );
             for(var i=$scope.cartObj.items.length-1;i>=0;i--)
             {
                if($scope.cartObj.items[i].productId==productId)
                {
                 
                    //remove item from the array and push again here
                    $scope.cartObj.items[i].quantity--;
                    var jsonStr=JSON.stringify($scope.cartObj);
                    sessionStorage.setItem("cart",jsonStr);
                    
                    var cartValue = sessionStorage.getItem( "cart" ); 
                    $scope.cartObj = JSON.parse( cartValue ); 
                    $scope.items=$scope.cartObj.items;
                    
                  	break;
                }
                else
                {
                	continue;
                }
             } 
        }
    };
        
    }
    
        
    
   
		
   
    
		
	
    
    $scope.placeOrder=function()
    {
        //call the place order server file
        
        //if return message is successful redirect to order successfull page
        //else show error message
    }
});

