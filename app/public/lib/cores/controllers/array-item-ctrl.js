(function() {

  var module = angular.module('cores.controllers');


  module.controller('crArrayItemCtrl', function($scope) {

    $scope.moveUp = function() {
      $scope.$emit('cr:moveUp:item', $scope.$parent.$index);
    };

    $scope.moveDown = function() {
      $scope.$emit('cr:moveDown:item', $scope.$parent.$index);
    };

    $scope.remove = function() {
      $scope.$emit('cr:remove:item', $scope.$parent.$index);
    };

    $scope.addItem = function(schema) {
      schema = schema || $scope.schema;
      $scope.$emit('cr:add:item', schema, $scope.$parent.$index);
    };
  });
})();