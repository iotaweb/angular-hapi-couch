(function() {

  var module = angular.module('cores.services');

  
  //
  // get the name from the schema or alternativly from the path
  //
  
  function getModelName(schema, modelPath) {
    // use schema name if it exists
    var name = schema.title || '';

    // otherwise use name from model path
    if (!name) {
      var items = modelPath.split('.');
      name = items[items.length - 1];
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    return name;
  }


  //
  // Create a template for a schema with optional view configuration
  // 
  
  function buildTemplate(schema, model, schemaPath, modelPath, absPath, options) {

    var viewType = schema.type;
    var viewName = getModelName(schema, modelPath);

    // infer some types
    if (!schema.type) {
      if (schema.properties) viewType = 'object';
      if (schema.items) viewType = 'array';
    }

    if (viewType && !angular.isString(viewType)) {
      throw new Error('Only single types are supported');
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
      options['is-integer'] = true;
    }
    
    if (schema.hasOwnProperty('view')) {

      // view can be a string or object with additional options
      
      if (angular.isObject(schema.view)) {
        viewType = schema.view.type || viewType;
        viewName = schema.view.name || viewName;

        // add view properties to options
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
    else {
      // add namespace prefix
      viewType = 'cr-' + viewType;
    }

    return buildElement(viewType, schemaPath, modelPath, viewName, absPath, options);
  }

  
  //
  // build the html element for the type
  //
  
  function buildElement(type, schemaPath, modelPath, name, absPath, options) {
    var e = '<div ' + type +
          ' schema="' + schemaPath + '"' +
          ' model="' + modelPath + '"' +
          ' path="' + absPath + '"' +
          ' name="' + name + '"';

    angular.forEach(options, function(value, key) {
      e += ' ' + key + '="' + value + '"';
    });
    
    e += '/>';

    return e;
  }

  
  module.factory('crBuild', function() {

    return function(schema, model, schemaPath, modelPath, absPath, options) {

      schemaPath = schemaPath || 'schema';
      modelPath = modelPath || 'model';
      absPath = absPath || '';
      options = options || {};
      
      return buildTemplate(schema, model, schemaPath, modelPath, absPath, options);
    };
  });

})();