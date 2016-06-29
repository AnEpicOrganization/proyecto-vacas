app.filter('sexo', function() {
  return function(input) {
    return input == 'H' ? 'Hembra' : 'Macho';
  }
});