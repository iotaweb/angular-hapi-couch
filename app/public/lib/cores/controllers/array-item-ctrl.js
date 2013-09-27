(function() {

  var module = angular.module('cores.controllers');


  module.controller('crArrayItemCtrl', function($scope) {

    $scope.moveUp = function() {
      $scope.$emit('moveUp:item', $scope.$parent.$index);
    };

    $scope.moveDown = function() {
      $scope.$emit('moveDown:item', $scope.$parent.$index);
    };

    $scope.remove = function() {
      $scope.$emit('remove:item', $scope.$parent.$index);
    };
  });
})();