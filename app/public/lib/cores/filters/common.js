(function() {

  var module = angular.module('cores.filters');

  module.filter('crJsonPointer', function(crCommon, crJSONPointer) {

    return function(input, path) {
      if (!input) return null;
      return crJSONPointer.get(input, path);
    };
  });

})();