(function() {

  var module = angular.module('cores.services');

  // TODO: very incomplete implmentation


  function jsonPointerGet(obj, path) {
    // TODO: array paths
    if (!path) return obj;
    var parts = path.split('/');
    if (parts.length && parts[0] === '') parts.shift();
    if (parts.length && parts[parts.length - 1] === '') parts.pop();
    if (parts.length === 0) return obj;

    var value = obj[parts[0]];
    for (var i = 1; i < parts.length; ++i) {
      if (!value) break;
      value = value[parts[i]];
    }
    return value;
  }


  function jsonPointerSet(obj, path, value) {
    // TODO: array paths
    var parts = path.split('/');
    if (parts.length && parts[0] === '') parts.shift();
    if (parts.length && parts[parts.length - 1] === '') parts.pop();
    if (parts.length === 0) return;

    var o = obj;
    var p = parts[0];

    while(true) {
      parts.shift();
      if (parts.length === 0) {
        o[p] = value;
        return;
      }
      o = o[p];
      p = parts[0];
    }
  }


  //
  // json pointer get/set service
  //
  module.service('crJSONPointer', function() {

    return {
      get: jsonPointerGet,
      set: jsonPointerSet
    };
  });

})();