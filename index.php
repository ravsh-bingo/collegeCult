<!DOCTYPE html>
<html lang="en">
<head>
<title>CollegeCult- T-Shirts, Shoes, Skirts, Heels, Posters, Gifts and so much more you love. </title>
<meta charset="UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    

</head>
<body ng-app="angularApp" ng-controller="index">
<div class="navbar-fixed">
<nav class="purple darken-2 " ><!-- side navbar starts here-->
         
     <ul id="slide-out" class="side-nav">
            <li class="purple darken-3" style="width:100% text-align:center">
               <ul > 
                   <li ><strong style="font-family:cordia new; color:white;font-size:35px;">Full Store </strong> 
                       <span class=""></span>   </li>
            

               </ul>
                
            </li>
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header" ><img src="img/ICONS/menu/businesswomanred_24px.png"> <span style="font-family:cordia new;  font-size:25px;">HER</span><i class="mdi-navigation-arrow-drop-down"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="gstore.html?gender=F&type=skirts"><img src="img/ICONS/menu/skirt_25px.png">
                                    <span style="font-family:cordia new;  font-size:25px;"> Skirts</span></a></li>
                                <li><a href="gstore.html?gender=F&type=shorts">
                                    <img src="img/ICONS/menu/shorts_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Shorts</span></a></li>
                                <li><a href="gstore.html?gender=F&type=tops"><img src="img/ICONS/menu/clothes_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Tops</span></a></li>
                                <li><a href="gstore.html?gender=F&type=shoes"><img src="img/icons/menu/womens_shoe_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Shoes</span></a></li>
                               
                                <li><a href="gstore.html?gender=F&type=lingerie"><img src="img/icons/menu/bra_25px.png">  <span style="font-family:cordia new;  font-size:25px;"> Undergarments</span></a></li>
                                <li><a href="gstore.html?gender=F&type=Jwellery"><img src="img/ICONS/menu/jewelry_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Jwellery</span></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header"><img src="img/ICONS/menu/businessman_2%2024px.png"><span style="font-family:cordia new;  font-size:25px;"> HIS</span><i class="mdi-navigation-arrow-drop-down"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="gstore.html?gender=M&type=T-Shirts"><img src="img/ICONS/menu/clothes_green_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> T-Shirts</span></a></li>
                                <li><a href="gstore.html?gender=M&type=Shoes"><img src="img/icons/menu/trainers_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Shoes</span></a></li>
                                <li><a href="gstore.html?gender=M&type=Undergarments"><img src="img/ICONS/menu/shorts_green_25px.png">  <span style="font-family:cordia new;  font-size:25px;"> Shorts</span></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header"><img src="img/icons/menu/gift_24px.png"> <span style="font-family:cordia new;  font-size:25px;"> GIFTS</span><i class="mdi-navigation-arrow-drop-down"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="gstore.html?gender=U&type=Posters" ><img src="img/ICONS/sheet_of_paper_26px.png"> <span style="font-family:cordia new;  font-size:25px;"> Posters</span></a></li>
                                <li><a href="gstore.html?gender=U&type=Mugs" ><img src="img/ICONS/beer_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Mugs</span></a></li>
                                
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header"><img src="img/ICONS/menu/add_tag_25px.png"> <span style="font-family:cordia new;  font-size:25px;">CUSTOM</span><i class="mdi-navigation-arrow-drop-down"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#"> <img src="img/ICONS/library_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Your College</span></a></li>
                                <li><a href="Cities.html"><img src="img/icons/eiffel_tower_filled_25px.png"> <span style="font-family:cordia new;  font-size:25px;"> Your City</span></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
        
        </ul><!-- slider menu ends here -->
        <ul class="right hide-on-med-and-down">



<li><a href="#" style="font-family:cordia new"class="brand-logo center">CollegeCult</a></li>

      
            <!--|| loginTry" -->
          <li class="loginbtn" ng-click="loginBtn()" ng-hide="loggedIn"  >
                <a href="login.html?id=login" >Login</a>
            </li> <li class="loginbtn" ng-click="loginBtn()" ng-hide="loggedIn"  >
                <a href="login.html?id=registeration" >Sign Up</a>
            </li>
            
          
            <li  style="" ng-show="loggedIn">
                <a class="dropdown-button" data-activates="dropdown1" href="#!" ><i class="mdi-navigation-arrow-drop-down left"></i>
                <span ng-bind="name"></span></a>
                
                   
        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="myAccount.html">My Account</a></li>
             <li><a href="cart.html">Cart(<span ng-bind="localStoreItemCount"></span> Items) </a></li>
            <li><a href="wishlist.html">Wishlist(<span ng-bind="wishlistCount"></span> Items) </a></li>
          <li><a href="myorders.html">My Orders</a></li>
          <li><a href="logout.html">Logout</a></li>
        </ul>
            </li>  
         
           
        </ul><!-- horizontal navbar ends here -->
        <a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="mdi-navigation-menu"></i></a>
    </nav> <!-- navbar ends here-->
    </div>



 <div class="row" style="width:100%" >
        <div class="custom1 owl-carousel" >
            <div class="item" style="">
           
			  <img src="images/1.jpg" style="width:100%">
            </div>
            <div class="item">
       
			   <img src="images/2.jpg">
            </div>
            <div class="item">
        
			   <img src="images/3.jpg">
            </div>
            <div class="item">
          
			   <img src="images/4.jpg">
            </div>
            <div class="item">
              
			   <img src="images/5.jpg">
            </div>
            <div class="item">
           
			   <img src="images/6.jpg">
            </div>
            <div class="item">
        
			   <img src="images/7.jpg">
            </div>
           
          </div>
     
          
     
        </div>



    <!-- search bar hoverable starts here-->
    <div class="row">
        <div  class="search" style="float:right">
            <form method="get" action="searchResult.html">
                <div class="input-field col s9" >
                    <input id="first_name" type="text" name="searchQuery" class="validate" required><label for="first_name">Clothes & Gifts</label>
                </div>
                <div class="input-field col s3" style="">
                    <input type="submit" class="waves-effect waves-light btn" style="border:1px solid orange; background-color:white; color:black" value="SEARCH">
                </div>
            </form>
        </div>

    </div> <!-- seacrch bar hoverable ends here-->
<hr>
    <div class="col m9 s12">
        <SPAN style="margin-left: 20px;font-family:cordia new;font-size:25px"><img src="img/ICONS/menu/add_tag_25px.png"> Amazing discounts on awsome products</SPAN>
        <ul class="row productlist">
            <li class="col l2 m12 s12"  ng-repeat="item in discounted">
                <div class="">
                    <div class="card-content">
                        <span STYLE="background-color:#73AD21;color:white" class="chip"><span ng-bind="item.discount"></span>% OFF</span>
                        <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                            <span  class="thumbnail" style="borderleft:95px;">
                                <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                                <img style="height: 175px;width: 175px;" ng-src="img/products/{{item.productId}}/{{item.productId+'.jpg'}}" ></a>
                            </span><br>{{item.name}}  
                        </div>
                    </div>
                    <div class="card-action row" style="text-align: center">
                        <a class="modal-trigger" href="#modal1" ng-click="quickView(item.productId,item.discount,item.price,item.size)"> QUICK VIEW</a>
                    </div>
                </div>
            </li>
        </ul>
        
      
        
        
          <SPAN style="margin-left: 20px;font-family:cordia new;font-size:25px"><img src="img/ICONS/menu/add_tag_25px.png"> For the love of our Gods</SPAN>
        <ul class="row productlist">
            <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img src="img/icons/super/96/avengers_104px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
            <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/batman_new_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
               <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/dare_devil_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
               <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/iron_man_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
             <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img style="" src="img/icons/super/96/green_lantern_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
              <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/spider-man_new_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
              <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/superman_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
            <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/the_flash_head_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
             <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img  src="img/icons/super/96/the_flash_sign_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
             <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img style="" src="img/icons/super/96/thor_96px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
             <li class="col l1 m12 s12">
                <div class="card-content">
                    <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                        <span  class="thumbnail" style="borderleft:95px;">
                            <a href="productDetail.html?productId={{item.productId}}" title="Click to View">
                            <img style="" src="img/icons/super/96/wonder_woman_104px.png" ></a>
                        </span><br>{{item.name}}  
                    </div>
                </div>
            </li>
        </ul>
        
        
        
        
        
        <SPAN  style="margin-left: 20px; font-family:cordia new;font-size:25px">Exclusive Yes we all need them <span ng-bind="name"></span></SPAN>
        <ul class="row productlist">
            <li class="col l6 m12 s12" ng-repeat="flagship in flagshipStores">
                <div class="card">
                    <div class="card-content">
                        <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                            <span  class="thumbnail" style="borderleft:95px;">
                                <a href="store.html?storeType=flagship&value={{flagship.storeName}}" title="Click to View">
                                <img  src="img/stores/flagship/{{flagship.storeId}}.jpg"></a>
                            </span>   
                        </div>
                    </div>
                    <div class="card-action row" style="text-align: center">
                        
                    </div>
                </div>
            </li>
        </ul>
        <SPAN  style="margin-left: 20px;font-family:cordia new;font-size:25px">Ladies love these <span ng-bind="name"></span></SPAN>
        <ul class="row productlist">
            <li class="col l3 m12 s12" ng-repeat="her in herItems">
                <div class="">
                    <div class="card-content">
                        <span STYLE="background-color:#73AD21;color:white" class="chip" ><span ng-bind="her.discount"></span>% OFF</span>
                        <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                            <span  class="thumbnail" style="borderleft:95px;">
                                <a href="productDetail.html?productId={{her.productId}}" title="Click to View">
                                <img style="height: 175px;width: 175px;" ng-src="img/products/{{her.productId}}/{{her.productId+'.jpg'}}" ></a>
                            </span>   
                        </div>
                    </div>
                    <div class="card-action row" style="text-align: center">
                        <a class="modal-trigger" href="#modal1" ng-click="quickView(her.productId,her.name,her.discount,her.price,her.size)"> QUICK VIEW</a>
                    </div>
                </div>
            </li>
        </ul>
        <SPAN  style="margin-left: 20px;font-family:cordia new;font-size:25px">You know? this is cult for guys <span ng-bind="name"></span></SPAN>
        <ul class="row productlist">
            <li class="col l2 m12 s12" ng-repeat="his in hisItems" repeat-done="initModals()">
                <div class="">
                    <div class="card-content">
                        <span STYLE="background-color:#73AD21;color:white" class="chip">{{his.discount}}% OFF</span>
                        <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                            <span  class="thumbnail" style="borderleft:95px;">
                                <a href="productDetail.html?productId={{his.productId}}" title="Click to View">
                                <img style="height: 175px;width: 175px;" ng-src="img/products/{{his.productId}}/{{his.productId+'.jpg'}}" ></a>
                            </span>   
                        </div>
                    </div>
                    <div class="card-action row" style="text-align: center">
                        <a class="modal-trigger" href="#modal1" ng-click="quickView(his.productId,his.discount,his.price,his.size)">QUICK VIEW</a>
                    </div>
                </div>
            </li>
        </ul>





     







        <SPAN  style="margin-left: 20px;font-family:cordia new;font-size:25px">You always found it hard to choose gifts, right <span ng-bind="name"></span></SPAN>
            <ul class="row productlist">
                <li class="col l3 m12 s12" ng-repeat="gift in gifts">
                    <div class="card">
                        <div class="card-content">
                            <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                                <span  class="thumbnail" style="borderleft:95px;">
                                    <a href="store.html?storeType=gift&value={{gift.storeName}}" title="Click to View">
                                        <img ng-src="img/stores/gifts/{{gift.storeName}}.jpg" ></a>
                                </span>   
                            </div>
                        </div>
                        <div class="card-action row" style="text-align: center">
                            <a href=""> EXPLORE</a>
                        </div>
                    </div>
                </li>
            </ul>
            <SPAN  style="margin-left: 20px">SHOP FROM OUR DEDICATED STORES</SPAN>
            <ul class="row productlist">
                <li class="col l4 m12 s12" ng-repeat="d in dedicated">
                    <div class="">
                        <div class="card-content">
                            <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                                <span  class="thumbnail" style="borderleft:95px;">
                                    <a href="store.html?storeType=dedicated&value={{d.storeName}}" title="Click to View">
                                        <img ng-src="img/stores/dedicated/{{d.storeName}}.png" ></a>
                                </span>   
                            </div>
                        </div>
                        <div class="card-action row" style="text-align: center">
                            <a href=""> EXPLORE</a>
                        </div>
                    </div>
                </li>
            </ul>
            <img style="margin-left:20px"src="img/offers/discountBanner.png">
            <ul class="row productlist">
                <li class="col l3 m12 s12" ng-repeat="discount in discounts">
                    <div class="card">
                        <div class="card-content">
                            <div class="col-sm-3" style="text-align:center" ><!-- order by not working -->
                                <span  class="thumbnail" style="borderleft:95px;">
                                    <a href="store.html?storeType=discount&value={{discount.storeName}}" title="Click to View">
                                        <img ng-src="img/stores/dicount/{{discount.storeName}}.png" ></a>
                                </span>   
                            </div>
                        </div>
                        <div class="card-action row" style="text-align: center">
                            <a href=""> EXPLORE</a>
                        </div>
                    </div>
                </li>
            </ul> <!-- discounts stores -->
        </div><!--Contents end here -->
    
    
    <!-- modal starts here -->
    <div id="modal1" class="modal" style="background-color:white;">
        <div class="modal-content">
            <h4><span ng-bind="name"></span></h4>
           <div class="row">
                <div class="col s12 l6">
                    <img ng-src="img/products/{{productId}}/{{productId+'.jpg'}}">   
                </div>
                <div class="col s12 l6">
                    <div class="col s12 l12 m12">
                        Size: <a href="" >  ({{size}})
                        <img src="img/ICONS/length_25px.png" class="tooltipped"data-position="right" data-delay="50" data-tooltip="Sizing Help" ></a>
                    </div>
                    <div class="col s12 l12 m12">
                       Price: {{price |currency}} <span STYLE="background-color:#73AD21;color:white" class="chip">{{discount}}% OFF</span> 
                    </div>
                                                        
                    <div class="col s12 m12 l12">
                        YOU WILL SAVE:{{discount*price/100 | currency}}
                    </div>
                    
                    <div class="col s12 m12 l12">
                        You pay:{{(price-(discount*price/100))| currency}}
                    </div>
                    <div class="row">
                    <a href="" class="btn" style="background-color:white;border: 1px solid orange;width:75%;color:black">Add to Cart</a><br><br>
                    <a href="" class="btn"  style="background-color:white;border: 1px solid orange;width:75%;color:black">Quick Checkout</a>    
                    <a href=""></a>
                    <a href=""></a>
                    </div>
                    
               </div>
            </div>
            
            
            
        </div>
        <div class="modal-footer">
            <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
    </div>
    <!-- modal ends here -->
    
    
    <div ng-include src="'partials/footer.html'"></div>
    <link rel="stylesheet" href="materialize/css/materialize.min.css">     
    <link href="css/index.css" rel="stylesheet">
    <script type="text/javascript" src="jquery/jquery.js"></script>
    <script src="carousel/jquery.min.js"></script> 

    <!-- vendors -->
    <script src="carousel/highlight.js"></script>
    <link rel="stylesheet" href="carousel/animate.css">
    <!-- Owl Stylesheets -->
    <link rel="stylesheet" href="carousel/owl.carousel.min.css">
    <link rel="stylesheet" href="carousel/owl.theme.default.min.css">
    <script src="carousel/owl.carousel.js"></script>  
          <script>
            jQuery(document).ready(function($) {
             
              $('.custom1').owlCarousel({
                animateOut: 'slideOutDown',
                animateIn: 'flipInX',
                items: 1,
				autoplay:true,
				autoplayTimeout:3000,
				loop:true,
                margin: 30,
                stagePadding: 0,
                smartSpeed: 1450,
				dots:false,
				lazyLoad:true
              });
            });
          </script>

<script type="text/javascript" src="materialize/js/materialize.min.js"></script>
<script type="text/javascript" src="angular/lib/angular.min.js"></script>
<script type="text/javascript" src="angular/lib/angular-webstorage.min.js"></script>
<script type="text/javascript" src="javascript/javascript.js"></script>
<script type="text/javascript" src="angular/controllers/index/indexController.js"></script>


</body>
</html>