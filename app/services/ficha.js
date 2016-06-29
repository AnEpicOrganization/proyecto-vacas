app.factory('ficha', ['$http', function($http) {
	return {
		get: function(fichaId, callback) {
			return $http.get('app/api/ficha.php?id='+fichaId)
			.success(function(data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
		},
		getAll: function() {
			return $http.get('app/api/fichas.php')
			.success(function(data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
		}
	}
}]);
