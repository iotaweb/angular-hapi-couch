(function() {

  var module = angular.module('cores.controllers');


  module.controller('crArrayCtrl', function($scope, crSchema) {

    $scope.addItem = function(schema, index) {
      var obj = crSchema.createValue(schema, schema.name);
      if (typeof index === 'undefined' || index >= $scope.model.length) {
        $scope.model.push(obj);
      }
      else {
        $scope.model.splice(index, 0, obj);
      }
    };

    $scope.$on('cr:remove:item', function(e, index) {
      e.stopPropagation();
      $scope.model.splice(index, 1);
    });

    $scope.$on('cr:add:item', function(e, schema, index) {
      e.stopPropagation();
      $scope.addItem(schema, index + 1);
    });

    $scope.$on('cr:moveUp:item', function(e, index) {
      e.stopPropagation();
      if (index === 0) return;
      $scope.model.splice(index - 1, 0, $scope.model.splice(index, 1)[0]);
    });

    $scope.$on('cr:moveDown:item', function(e, index) {
      e.stopPropagation();
      if (index >= $scope.model.length) return;
      $scope.model.splice(index + 1, 0, $scope.model.splice(index, 1)[0]);
    });
  });
})();