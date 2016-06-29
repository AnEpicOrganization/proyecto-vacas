app.controller('LoginController', ['$scope', function($scope) {
	$.getJSON('app/api/session.php?action=logged', function(data){
		if(data.logged) {
			location.hash = "/panel";
		}
	});
}]);

app.controller('PanelController', ['$scope', function($scope) {
	$.getJSON('app/api/session.php?action=logged', function(data){
		if(!data.logged) {
			location.hash = "/";
		}
	});
}]);