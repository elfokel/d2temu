(function(){
	"use strict";

	var app = angular.module("d2temu", []);

	app.config(function ($routeProvider) {
		$routeProvider
		.when('/', {
			controller : function ($scope) {},
			templateUrl : 'home.html'
		})
		.when('/roms', {
			controller : function ($scope, $http) {
				var model = {};
				$http.get("getDirectory").success(function (data) {
					model.files = data;
					$scope.model = model;
				});
			},
			templateUrl : 'roms.html'
		})
		.when('/emulators', {
			controller : function ($scope) {},
			templateUrl : 'emulators.html'
		});

	});


}());