app.controller('LoginController', ['$scope', function($scope) {
	$.getJSON('app/api/session.php?action=logged', function(data){
		if(data.logged) {
			location.hash = "/panel";
		}
	});
}]);

app.controller('PanelController', ['$scope', function($scope) {
	waitingDialog.show('Cargando...');
	$.getJSON('app/api/session.php?action=logged', function(data){
		waitingDialog.hide();
		if(!data.logged) {
			location.hash = "/";
		}
	});
}]);

app.controller('FichaController', ['$scope', 'ficha', function($scope, ficha) {
	waitingDialog.show('Cargando...');
	$.getJSON('app/api/session.php?action=logged', function(data){
		waitingDialog.hide();
		if(!data.logged) {
			location.hash = "/";
		}


	});
}]);