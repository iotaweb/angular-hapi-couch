(function() {

  var module = angular.module('cores.services');

  //
  // wraps link functions for generic stuff
  //
  module.factory('crFieldLink', function(crCommon, crOptions) {

    return function(linkFn) {

      return function(scope, elem, attrs) {
        var defaults = {
          showLabel: true
        };
        scope.options = crCommon.merge(defaults, crOptions.parse(attrs.options));

        linkFn(scope, elem, attrs);
      };
    };
  });

})();