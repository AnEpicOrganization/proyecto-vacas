app.controller('LoginController', ['$scope', function($scope) {
	$.getJSON('app/api/session.php?action=logged', function(data){
		if(data.logged) {
			location.hash = "/panel";
		}
	});
}]);

app.controller('PanelController', ['$scope', 'logged', 'usuarios', function($scope, logged, usuarios) {
	$scope.usuarios = [];

	waitingDialog.show('Cargando...');
	logged.success(function(isLogged){
		waitingDialog.hide();
		if(!isLogged) {
			location.hash = "/";
		}

		usuarios.success(function(data){
			$scope.usuarios = data;
		});
	});
}]);

app.controller('FichaController', ['$scope', 'logged', 'ficha', function($scope, logged, ficha) {
	$scope.fichas = [];

	waitingDialog.show('Cargando...');
	logged.success(function(isLogged){
		waitingDialog.hide();
		if(!isLogged) {
			location.hash = "/";
		}

		ficha.getAll().success(function(data){
			$scope.fichas = data;
		});
	});
}]);