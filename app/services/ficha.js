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
		},

		delete: function(id) {
			return $http.get('app/api/fichas.php?action=borrar&id='+id)
			.success(function(data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
		},

		add: function() {
			var postdata = $('#agregar-ficha').serialize();
			console.log(postdata);
			return $http.post('app/api/fichas.php?action=agregar', postdata)
			.success(function(data) {
				return data;
			})
			.error(function(data) {
				return data;
			});
		}
	}
}]);
