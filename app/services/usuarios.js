app.factory('usuarios', ['$http', function($http) { 
  return $http.get('app/api/usuarios.php') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
}]);