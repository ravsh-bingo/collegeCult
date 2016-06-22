//this controller will load data about colleges in college.html page

var app=angular.module("angularApp",['webStorageModule']);

app.controller('colleges',function($scope,$http,webStorage)
	{
		$http.post("server/collegeStore.php").then(function(response)
		{
			$scope.colleges=response.data;
		});
	
	});
	