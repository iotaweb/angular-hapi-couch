(function() {

  var module = angular.module('cores.controllers');


  module.controller('crAnyofArrayCtrl', function($injector, $controller, $scope, crSchema) {


    // $injector.invoke(ArrayCtrl, this, { $scope: $scope });
    // $injector.invoke('crArrayCtrl', this, { $scope: $scope });

    // inherit from ArrayCtrl
    $controller('crArrayCtrl', { $scope: $scope });

    angular.forEach($scope.schema.items.anyOf, function(anySchema, i) {
      if (!anySchema.name) throw new Error('AnyOf schema has to have a name');
    });

    // called by the anyof-item controller

    this.getSchema = function(type) {
      var schema;
      angular.forEach($scope.schema.items.anyOf, function(anySchema) {
        if (anySchema.name === type) {
          schema = anySchema;
        }
      });
      if (!schema) throw new Error('No schema for type found: ' + type);
      return schema;
    };
  })
})();