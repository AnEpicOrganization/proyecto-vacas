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

app.controller('FichaController', ['$scope', 'logged', 'ficha', '$routeParams', '$timeout', function($scope, logged, ficha, $routeParams, $timeout) {
	$scope.fichas = [];
	$scope.ficha = null;
	$scope.razas = [];

	waitingDialog.show('Cargando...');
	logged.success(function(isLogged){
		waitingDialog.hide();
		if(!isLogged) {
			location.hash = "/";
		}

		if('id' in $routeParams && $routeParams.id) {
			ficha.get($routeParams.id).success(function(data){
				waitingDialog.hide();
				$scope.ficha = data;
			});
		} else {
			ficha.getAll().success(function(data){
				waitingDialog.hide();
				$scope.fichas = data;
			});
		}
		
	});

	$scope.addSubmit = function() {
		waitingDialog.show('Cargando...');
		ficha.add().success(function(data){
			waitingDialog.hide();
			if('error' in data) {
				alert('Error: ' + data.error);
				return;
			}

			$scope.fichas.push(data);
			$('#agregar').modal('hide');
		});
	};
	$scope.delete = function(id) {
		if(!confirm('Confirme eliminar ficha')) {
			return;
		}

		waitingDialog.show('Cargando...');
		ficha.delete(id).success(function(data) {
			waitingDialog.hide();
			if('error' in data) {
				alert('Error: ' + data.error);
				return;
			}

			if(!'success' in data) {
				alert('Error desconocido.');
				return;
			}

			for(var i = 0; i < $scope.fichas.length; i++) {
				if($scope.fichas[i].id_ficha == id) {
					$scope.fichas.splice(i, 1);
					break;
				}
			}

			alert(data.message);
		});
	};

	
	ficha.getRazas().success(function(d) {
		$scope.razas = d;
		
		$timeout(function(){
			$('#raza').chosen({
				width: '100%',
				no_results_text: "¡No se encontró nada!",
				placeholder_text_single: "Por favor seleccione una..."
			});
		}, 0);
		
	});
}]);

app.controller('FichaEditController', ['$scope', 'logged', 'ficha', '$routeParams', '$timeout', function($scope, logged, ficha, $routeParams, $timeout) {
	$scope.ficha = null;
	$scope.razas = [];

	waitingDialog.show('Cargando...');
	logged.success(function(isLogged){
		if(!isLogged) {
			waitingDialog.hide();
			location.hash = "/";
		}

		ficha.get($routeParams.id).success(function(data){
			waitingDialog.hide();
			$scope.ficha = data;
		});
	});

	$scope.editSubmit = function() {
		waitingDialog.show('Cargando...');

		ficha.edit($routeParams.id).success(function(data){
			waitingDialog.hide();
			if('error' in data) {
				alert('Error: ' + data.error);
				return;
			}

			if(!('message' in data)) {
				alert('Error desconocido.');
				return;
			}

			alert(data.message);
		});
	};

	ficha.getRazas().success(function(d) {
		$scope.razas = d;
		
		$timeout(function(){
			$('#raza').chosen({
				width: '100%',
				no_results_text: "¡No se encontró nada!",
				placeholder_text_single: "Por favor seleccione una..."
			});
		}, 0);
		
	});
}]);