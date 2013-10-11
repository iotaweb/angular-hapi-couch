(function() {

  var module = angular.module('cores.services');


  module.factory('crBuild', function($compile, crCommon, crOptions, crSchema) {

    //
    // get the title from the schema or alternativly from the path
    //
    function getModelName(schema, modelPath) {

      if (schema.title) {
        return schema.title;
      }
      if (schema.name) {
        return crCommon.capitalize(schema.name);
      }
      var items = modelPath.split('.');
      return crCommon.capitalize(items[items.length - 1]);
    }


    //
    // Create a template for a schema with optional view configuration
    //
    function buildTemplate(schema, model, schemaPath, modelPath, absPath, options) {

      schemaPath = schemaPath || 'schema';
      modelPath = modelPath || 'model';
      absPath = absPath || '';
      options = options || {};

      var viewType = schema.type;
      var viewName = getModelName(schema, modelPath);

      // infer some types
      if (!schema.type) {
        if (schema.properties) viewType = 'object';
        if (schema.items) viewType = 'array';
      }

      // handle extended types
      if (schema.hasOwnProperty('enum')) {
        viewType = 'enum';
      }
      else if (schema.hasOwnProperty('$ref')) {
        viewType = 'ref';
      }
      else if (viewType === 'array' &&
               schema.hasOwnProperty('items') &&
               schema.items.anyOf) {
        viewType = 'anyof-array';
      }

      // use number directive for integers
      if (viewType === 'integer') {
        viewType = 'number';
        options.isInteger = true;
      }

      // add namespace prefix for default views
      viewType = 'cr-' + viewType;

      if (schema.hasOwnProperty('view')) {
        // custom view type and options
        if (angular.isObject(schema.view)) {
          viewType = schema.view.type || viewType;
          viewName = schema.view.name || viewName;

          // add specific view properties as options
          angular.forEach(schema.view, function(value, key) {
            if (key !== 'type' && key !== 'name') {
              options[key] = value;
            }
          });
        }
        else if (angular.isString(schema.view)) {
          viewType = schema.view;
        }
        else throw new Error('View has to be of type object or string');
      }

      return  '<div ' + viewType +
        ' name="' + viewName + '"' +
        ' schema="' + schemaPath + '"' +
        ' model="' + modelPath + '"' +
        ' path="' + absPath + '"' +
        ' options="' + crOptions.stringify(options) + '"' +
        '/>';
    }


    return {
      buildTemplate: buildTemplate,
      getModelTitle: getModelName
    };
  });

})();