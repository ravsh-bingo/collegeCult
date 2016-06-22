/*DISCLAIMER:This is little different from her and his store controllers
**PURPOSE:To load store items for females and provide all the functionality for the page
**FUNCTION COUNT:6
**DATA FETCHING BLOCK:3
**OTHER CODE BLOCKS:1
**WRITTEN BY: Gaurav Singh
**DATE:15-03-2016
*/
var app=angular.module('angularApp',['webStorageModule']);
app.controller('cartContent',function($scope,$http,webStorage)
{
    var email=webStorage.session.get("email");
    $scope.localStoreItemCount=0;
    //$scope.cartValue = sessionStorage.getItem( "cart" ); 
    //$scope.cartObj = JSON.parse( $scope.cartValue );
    //$scope.localStoreItemCount=$scope.cartObj.items.length;
    
    
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
		$scope.daddress1=webStorage.session.get("daddress1");
		$scope.daddress2=webStorage.session.get("daddress2");
		$scope.loggedIn=true;
	}
        
    //1 TO FETCH ITEMS IN THE CART
    if($scope.loggedIn)
    {
        $http.get("server/cart/cartContent_S2C.php",{params:{email}}).then(function(response)
	   {$scope.items=response.data;
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
	    
    }
    else
    {
      var cartValue = sessionStorage.getItem( "cart" ); 
        if(cartValue==null)
        {
                
        }
        else
        {
            $scope.cartObj = JSON.parse( cartValue ); 
            $scope.items=$scope.cartObj.items;
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
      
        }

      
      //console.log(cartObj.items);
        
    }
	
    //2 TO FETCH THE NUMBER OF ITEMS IN THE CART
    if($scope.loggedIn)
        {
	$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.localStoreItemCount=response.data[0];});
        }
    else
        {
                if(cartValue==null)
                    {
                         $scope.localStoreItemCount=0;
                    }
            else
            {
                 $scope.cartValue = sessionStorage.getItem( "cart" ); 
                 $scope.cartObj = JSON.parse( $scope.cartValue );
                 $scope.localStoreItemCount=$scope.cartObj.items.length;
            }
     
       
            
        }
    
    
    //3 TO FETCH THE NUMBER OF ITEMS IN THE WISHLIST
	$http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
	{$scope.wishlistCount=response.data[0];});

    //1 FUNCTION TO REMOVE ITEM FROM THE CART
    $scope.remove=function(productId, email) //why are we passing email?????
	{
		if($scope.loggedIn)
        {
            $http.get("server/cart/remove_C2S.php",{params:{productId:productId, email:email}}).then(function(response)
		      {
                $scope.items=response.data;
              
              });
	           
        }
        else
        {
             $scope.cartValue = sessionStorage.getItem("cart"); 
             $scope.cartObj = JSON.parse($scope.cartValue);
            
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
	$scope.increase=function(productId, email, quantity) //why are we passing email?????
    {
	    if($scope.loggedIn)
        {
            $http.get("server/cart/quantityChange_C2S.php",{params:{productId:productId, email:email,quantity:quantity,action:"increase"}}).then(function(response)
            {
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
    
});
