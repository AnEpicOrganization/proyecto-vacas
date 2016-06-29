app.directive('panelMenu', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'app/views/panel_menu.html'
  };
});