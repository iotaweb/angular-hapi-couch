(function() {

  var module = angular.module('cores.controllers');


  module.controller('crArrayCtrl', function($scope, crSchema) {

    $scope.addItem = function(schema) {
      var obj = crSchema.createValue(schema, schema.name);
      $scope.model.push(obj);
    };

    $scope.$on('remove:item', function(e, index) {
      e.stopPropagation();
      $scope.model.splice(index, 1);
    });

    $scope.$on('moveUp:item', function(e, index) {
      e.stopPropagation();
      if (index === 0) return;
      $scope.model.splice(index - 1, 0, $scope.model.splice(index, 1)[0]);
    });

    $scope.$on('moveDown:item', function(e, index) {
      e.stopPropagation();
      if (index >= $scope.model.length) return;
      $scope.model.splice(index + 1, 0, $scope.model.splice(index, 1)[0]);
    });

    // wait for ready event of items on initialization

    var numItems = $scope.model.length;

    if (numItems === 0) {
      $scope.$emit('ready');
    }
    else {
      var off = $scope.$on('ready', function(e) {
        e.stopPropagation();
        if (--numItems === 0) {
          off();
          $scope.$emit('ready');
        }
      });
    }
  });
})();