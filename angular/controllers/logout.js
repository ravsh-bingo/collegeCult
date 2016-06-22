var app=angular.module('angularApp',['webStorageModule']);
app.controller('logout',function($scope,$http,webStorage)
	{
	
	
	webStorage.session.remove("email");
	webStorage.session.remove("password");
	webStorage.session.remove("daddress1");
	webStorage.session.remove("daddress2");
	webStorage.session.remove("name");
    	webStorage.session.remove("cart" );
	});