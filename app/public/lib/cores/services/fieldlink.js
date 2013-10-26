(function() {

  var module = angular.module('cores.services');

  //
  // wraps link functions for generic stuff
  //
  module.factory('crFieldLink', function(crCommon, crOptions) {

    return function(/*[defaults], linkFn*/) {

      var defaults = arguments.length === 2 ? arguments[0] : {
          showLabel: true
      };
      var linkFn = arguments[arguments.length - 1];

      return function(scope, elem, attrs) {
        scope.options = crCommon.merge(angular.copy(defaults),
                                       crOptions.parse(attrs.options));
        linkFn(scope, elem, attrs);
      };
    };
  });

})();