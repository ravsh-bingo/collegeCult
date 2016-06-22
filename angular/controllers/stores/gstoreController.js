/*PURPOSE:To load store items for males and provide all the functionality for the page
**FUNCTION COUNT:6
**DATA FETCHING BLOCK:3
**OTHER CODE BLOCKS:1
**WRITTEN BY: Gaurav Singh
**DATE:14-03-2016
*/
var app=angular.module('angularApp',['webStorageModule','ngOrderObjectBy']);
app.controller('storeMaker',function($scope,$http,webStorage)
{
   var gender=getQueryVariable("gender");
   var storeType=getQueryVariable("type");    
	$scope.orderBy='incart';//setting initial value for product sorting
    $scope.showAll=true;//setting initial value for product filtering
    $scope.localStoreItemCount=0;
    
    
    
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
    
    //1 FETCHING STORE ITEMS
    $http.get("server/stores/genderStore_C2S.php",{params:{gender:gender,productCategory:storeType}}).then(function(response){$scope.items=response.data;});

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

		
    //3 FETCHING COUNT OF ITEMS IN THE WISHLIST
    if($scope.loggedIn)
        {
            $http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
            {$scope.wishlistCount=response.data[0];});
        }
    

	
    //2 FUNCTION TO ADD ITEM TO THE CART
    $scope.addtoCart=function(productId)
    { 
		if($scope.loggedIn)
            {
                $http.get("server/cart/addtoCart.php",{params:{email:$scope.email, productId}}).then(function(response)
                {
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
    if($scope.loggedIn)
    {
        $scope.addToWishlist=function(productId)
	    {
		  $http.get("server/wishlist/wishlist_C2S.php",{params:{email:$scope.email, productId: productId}}).then(function(response)
		  { 
	           if(response.data[0].numberOfItems>=$scope.wishlistCount) //checking if the items is really added in the table
               {
                    $scope.wishlistCount[0]++;
               }
		  });	
        };	   
    }
		
		
        //7 FUNCTION TO SORT ITEMS
        $scope.orderItems=function(field){ $scope.orderBy=field;};
     

  
    
    
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
    /*
    $scope.search=function($scope.searchQuery)
    {
        //make a http request to search script here
        
        //remove the variable gender and make it unisex
        
        //if the user then selects gender make it as per his chioice 
        
        //apply gender to the filters
        
        //change the items variable here
    };
    */
});
	
