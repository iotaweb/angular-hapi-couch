(function() {

  var module = angular.module('cores.services');


  module.factory('crValidation', function() {

    return function(scope, watchExpr) {

      watchExpr = watchExpr || 'model';

      // clientside errors
      var errors = {};
      // serverside errors
      var customErrors = {};

      var constraints = [];


      scope.hasErrors = function() {
        return Object.keys(errors).length > 0 || Object.keys(customErrors).length > 0;
      };


      scope.hasError = function(name) {
        return !!(errors[name] || customErrors[name]);
      };


      scope.getFirstError = function() {
        for (var x in errors) {
          if (errors[x]) return errors[x];
        }
        for (var y in customErrors) {
          if (customErrors[y]) return customErrors[y];
        }
      };


      var setError = function(name, message) {
        errors[name] = message;
        scope.$emit('cr:set:error', scope.path + ':' + name);
      };


      var removeError = function(name) {
        if (errors.hasOwnProperty(name)) {
          delete errors[name];
          scope.$emit('cr:remove:error', scope.path + ':' + name);
        }
      };


      var setCustomError = function(name, message) {
        customErrors[name] = message;
        scope.$emit('cr:set:error', scope.path + ':' + name);
      };


      var removeCustomError = function(name) {
        if (customErrors.hasOwnProperty(name)) {
          delete customErrors[name];
          scope.$emit('cr:remove:error', scope.path + ':' + name);
        };
      };


      var clearCustomErrors = function() {
        angular.forEach(customErrors, function(error, name) {
          removeCustomError(name);
        });
      };


      var addConstraint = function(name, message, condition, isCustomConstraint) {
        // only check constraints that are defined in the schema
        if (!isCustomConstraint &&
            !scope.schema.hasOwnProperty(name)) return;

        constraints.push(function(value) {
          condition(value) ? removeError(name) : setError(name, message);
        });
      };


      scope.$on('cr:set:customError', function(e, path, code, message) {
        if (path === scope.path) {
          setCustomError(code, message);
          return true;
        }
      });


      scope.$watch(watchExpr, function(newValue, oldValue, scope) {
        constraints.forEach(function(c) {
          c(newValue);
        });
        clearCustomErrors();
      });


      return {
        setError: setError,
        removeError: removeError,
        addConstraint: addConstraint
      };
    };
  });
})();