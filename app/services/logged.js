app.factory('logged', ['$http', function($http) { 
  return $http.get('app/api/session.php?action=logged') 
    .success(function(data) { 
      return data.logged; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
}]);