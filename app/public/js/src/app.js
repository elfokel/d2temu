(function(){
	"use strict";

	var app = angular.module("d2temu", []);

	app.config(function ($routeProvider) {
		$routeProvider
		.when('/', {
			controller : function ($scope) {},
			templateUrl : 'landing.html'
		})
		.when('/options', {
			controller : function ($scope) {},
			templateUrl : 'options.html'
		})
		.when('/account', {
			controller : function ($scope) {},
			templateUrl : 'accounts.html'
		});

	});


}());