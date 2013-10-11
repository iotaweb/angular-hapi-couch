(function() {

  var module = angular.module('cores.services');

  //
  // attr options service
  //
  module.service('crOptions', function() {

    return {

      stringify: function(options) {
        options = options || {};
        return escape(JSON.stringify(options));
      },

      parse: function(options) {
        if (!options) return {};
        return JSON.parse(unescape(options));
      }
    };
  });

})();