/*PURPOSE:To load store items for females and provide all the functionality for the page
**FUNCTION COUNT:5
**DATA FETCHING BLOCK:3
**OTHER CODE BLOCKS:1
**WRITTEN BY: Gaurav Singh
**DATE:15-03-2016
*/

//USER WILL NEVER ADD ITEM TO CART FROM HERE?
var app=angular.module('angularApp',['webStorageModule']);
app.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});
app.controller('index',function($scope,$http,webStorage)
{
		
	//variables to define type of sorting
	$scope.poopularity=true;
	$scope.price=false;
	$scope.discount=false;
$scope.localStoreItemCount=0;
	//1 CHECKING IF THE ISER IS LOGGED IN 				
	if(webStorage.session.get("email")==undefined)
	{
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

	//1 FETCHING HISGEST DISCOUNTED ITEMS
	$http.post("server/index/amazingDiscounts.php").then(function(response){$scope.discounted=response.data;});	
	
    //2 FETCHING EXCLUSIVE STORES
	$http.post("server/index/exclusiveStores.php").then(function(response){$scope.exclusiveStores=response.data;});
	
    //3 fetching flagship stores
	$http.post("server/index/flagships_S2C.php").then(function(response){$scope.flagshipStores=response.data;});
	
    //4 fetching most popular female items
	$http.post("server/index/herItems.php").then(function(response){$scope.herItems=response.data;});
	
    //5 fetching most popular male items
	$http.post("server/index/hisItems.php").then(function(response){$scope.hisItems=response.data;});
	
    //6 fetching gift stores
	$http.post("server/index/gifts_S2C.php").then(function(response){$scope.gifts=response.data;});
	
    //7 fetching discount stores
	$http.post("server/index/discounts_S2C.php").then(function(response){$scope.discounts=response.data;});
	
    //8 dedicated store for a particular product
	$http.post("server/index/dedicated_S2C.php").then(function(response){$scope.dedicated=response.data;});
	
    
       if($scope.loggedIn)
        {
            $http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
            {$scope.wishlistCount=response.data[0];});
        }
    //2 FETCHING COUNT OF ITEMS IN THE CART
    if($scope.loggedIn)
        {
              	$http.get("server/cart/cartItemCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response)
                {$scope.localStoreItemCount=response.data[0];});
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
                    
            }
      
           
         
        }
	
    //returns the number of items in the wishlist of the user
	//call this function only if the user is logged in	
    //FETCHING THE COUNT OF ITEMS IN THE WISHLIST
	$http.get("server/wishlist/wishlistCount.php",{params:{email:$scope.email, password:$scope.password}}).then(function(response){$scope.wishlistCount=response.data[0];});
		
				


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
    
       $scope.initModals = function() 
       {
           $('.modal-trigger').leanModal(); // Initialize the modals
       }

       $scope.quickView=function(productId,name,discount,price,size)
       {
           $scope.name=name;
           $scope.productId=productId;
           $scope.discount=discount;
           $scope.price=price;
           $scope.size=size;
           
       };
 
});

