var app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  $routeProvider 
	.when('/', { 
	  controller: 'LoginController', 
	  templateUrl: 'app/views/login.html' 
	})
	.when('/panel', { 
	  redirectTo: '/panel/usuarios' 
	})
	.when('/panel/usuarios', { 
	  controller: 'PanelController', 
	  templateUrl: 'app/views/panel.html' 
	})
	.when('/panel/fichas', { 
	  controller: 'FichaController', 
	  templateUrl: 'app/views/fichas.html' 
	})
	.when('/panel/fichas/:id', { 
	  controller: 'FichaController', 
	  templateUrl: 'app/views/ver_ficha.html' 
	})
	.when('/panel/fichas/:id/editar', { 
	  controller: 'FichaEditController', 
	  templateUrl: 'app/views/mod_ficha.html' 
	})
	.otherwise({ 
	  redirectTo: '/' 
	}); 
});