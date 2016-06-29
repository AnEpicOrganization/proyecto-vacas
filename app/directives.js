app.directive('panelMenu', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'app/views/directives/panel_menu.html'
  };
});