(function() {

  var module = angular.module('cores.filters');

  module.filter('crJsonPointer', function(crCommon) {

    return function(input, path) {
      if (!input) return null;
      return crCommon.jsonPointer(input, path);
    };
  });

})();