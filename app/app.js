var app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider) { 
  $routeProvider 
	.when('/', { 
	  controller: 'LoginController', 
	  templateUrl: 'app/views/login.html' 
	})
	.otherwise({ 
	  redirectTo: '/' 
	}); 
});