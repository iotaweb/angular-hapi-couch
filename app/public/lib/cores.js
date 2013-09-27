(function() {

  //
  // module definitions
  //

  angular.module('cores',
                 ['ng',
                  'cores.services',
                  'cores.filters',
                  'cores.templates',
                  'cores.controllers',
                  'cores.directives']);

  angular.module('cores.services',
                 ['ng']);

  angular.module('cores.templates',
                 ['ng']);

  angular.module('cores.filters',
                 ['ng']);

  angular.module('cores.controllers',
                 ['ng']);

  angular.module('cores.directives',
                 ['ng',
                  'cores.services',
                  'cores.templates']);

})();
angular.module("cores.templates").run(["$templateCache", function($templateCache) {

  $templateCache.put("cr-anyof-array.html",
    "\n" +
    "<div>\n" +
    "  <label><strong>{{name}}</strong></label>\n" +
    "  <div class=\"indent\">\n" +
    "    <div class=\"btn-group\"><a data-toggle=\"dropdown\" href=\"#\" class=\"btn dropdown-toggle\">Add&nbsp;<span class=\"caret\"></span></a>\n" +
    "      <ul role=\"menu\" class=\"dropdown-menu\">\n" +
    "        <li ng-repeat=\"schema in schema.items.anyOf\"><a ng-click=\"addItem(schema)\">{{schema.name}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <ul class=\"unstyled\">\n" +
    "    <li ng-repeat=\"model in model\">\n" +
    "      <div cr-anyof-item model=\"model\" path=\"{{path}}[ {{$index}} ]\"></div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>"
  );

  $templateCache.put("cr-array-item.html",
    "\n" +
    "<div>\n" +
    "  <hr>\n" +
    "  <div class=\"item-controls\">\n" +
    "    <div class=\"btn-group\">\n" +
    "      <button ng-click=\"moveUp()\" class=\"btn btn-small\">Up</button>\n" +
    "      <button ng-click=\"moveDown()\" class=\"btn btn-small\">Down</button>\n" +
    "    </div>\n" +
    "    <button ng-click=\"remove()\" class=\"btn btn-small btn-danger\">Remove</button>\n" +
    "  </div>\n" +
    "</div>"
  );

  $templateCache.put("cr-array.html",
    "\n" +
    "<div>\n" +
    "  <label><strong>{{name}}</strong></label>\n" +
    "  <div class=\"indent\">\n" +
    "    <button ng-click=\"addItem(schema.items)\" class=\"btn\">Add</button>\n" +
    "    <ul class=\"unstyled\">\n" +
    "      <li ng-repeat=\"model in model\">\n" +
    "        <div cr-array-item schema=\"schema.items\" model=\"model\" path=\"{{path}}/{{$index}}\"></div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>"
  );

  $templateCache.put("cr-boolean.html",
    "\n" +
    "<div class=\"checkbox\">\n" +
    "  <label>{{name}}</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"model\">\n" +
    "</div>"
  );

  $templateCache.put("cr-datetime.html",
    "<span>\n" +
    "  <label>{{name}}</label>\n" +
    "  <div id=\"dp3\" data-date-format=\"dd.mm.yyyy\" class=\"input-append date\">\n" +
    "    <input type=\"text\" class=\"input-small\"><span class=\"add-on\"><i class=\"icon-th\"></i></span>\n" +
    "  </div>\n" +
    "  <div class=\"input-append bootstrap-timepicker\">\n" +
    "    <input type=\"text\" class=\"time input-small\"><span class=\"add-on\"><i class=\"icon-time\"></i></span>\n" +
    "  </div></span>"
  );

  $templateCache.put("cr-enum.html",
    "<span>\n" +
    "  <label>{{name}}:</label>\n" +
    "  <select ng-model=\"model\" ng-options=\"e for e in schema.enum\"></select></span>"
  );

  $templateCache.put("cr-image.html",
    "<span>\n" +
    "  <label>{{name}}</label>\n" +
    "  <input type=\"file\"><img height=\"140\" class=\"img-rounded\"></span>"
  );

  $templateCache.put("cr-model-form.html",
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-6\">\n" +
    "    <form name=\"modelForm\" role=\"form\"></form>\n" +
    "    <div ng-show=\"!valid\" class=\"alert alert-warning\">The form has errors</div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-6\">\n" +
    "    <div ng-show=\"debug\" class=\"well\">\n" +
    "      <h4>Debug</h4>\n" +
    "      <h5>Model</h5>\n" +
    "      <pre>{{ model | json }}</pre>\n" +
    "      <h5>Errors</h5>\n" +
    "      <ul>\n" +
    "        <li ng-repeat=\"(name, active) in errors\">{{name}}: {{active}}        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );

  $templateCache.put("cr-model-list-filter.html",
    "\n" +
    "<form role=\"form\" class=\"form-inline\">\n" +
    "  <div class=\"form-group pull-right\">\n" +
    "    <label for=\"formFilter\">Filter:&nbsp; </label>\n" +
    "    <select id=\"formFilter\" ng-model=\"selectedView\" ng-options=\"v.title for v in views\" class=\"form-control input-sm\">\n" +
    "      <option value=\"\">Default</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</form>"
  );

  $templateCache.put("cr-model-list-modal.html",
    "\n" +
    "<div id=\"{{modalId}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal hide fade\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button data-dismiss=\"modal\" class=\"close\">x</button>\n" +
    "    <h3>{{type}}</h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div cr-model-list type=\"{{type}}\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer btn-toolbar\">\n" +
    "    <button ng-click=\"cancel\" data-dismiss=\"modal\" class=\"btn pull-right\">Cancel</button>\n" +
    "  </div>\n" +
    "</div>"
  );

  $templateCache.put("cr-model-list.html",
    "\n" +
    "<div>\n" +
    "  <p>{{view}}</p>\n" +
    "  <table class=\"table table-hover\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"text-center\">No.</th>\n" +
    "        <th ng-repeat=\"title in titles\" class=\"capitalize\">{{title}}</th>\n" +
    "        <th class=\"text-center\">View</th>\n" +
    "        <th class=\"text-center\">Edit</th>\n" +
    "        <th class=\"text-center\">Delete</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"row in rows\">\n" +
    "        <td class=\"text-center\">{{$index + (pageNo - 1) * limit + 1}}</td>\n" +
    "        <td ng-repeat=\"item in row.items\">{{item.value}}</td>\n" +
    "        <td class=\"text-center\"><a ng-href=\"/user/view/{{row.id}}\" class=\"glyphicon glyphicon-eye-open green\"></a></td>\n" +
    "        <td class=\"text-center\"><a ng-href=\"/user/edit/{{row.id}}\" class=\"glyphicon glyphicon-pencil blue\"></a></td>\n" +
    "        <td class=\"text-center\"><a href=\"\" ng-click=\"destroy(row.id)\" class=\"glyphicon glyphicon-remove red\"></a></td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table><a ng-href=\"/user/create\" class=\"btn btn-default btn-primary margin-top-20\"><span class=\"glyphicon glyphicon-plus\"></span>&nbsp;Create                    </a>\n" +
    "  <ul ng-show=\"totalPages &gt; 1\" class=\"pagination pull-right\">\n" +
    "    <li ng-class=\"!isLoading &amp;&amp; prevKeys.length ? '' : 'disabled'\"><a href=\"\" ng-click=\"prev()\">Prev &laquo;</a></li>\n" +
    "    <li ng-repeat=\"page in range(totalPages) track by $index\" ng-class=\"pageNo == $index + 1 ? 'active' : ''\"><a href=\"\" ng-click=\"goto($index + 1)\">{{ $index + 1 }}</a></li>\n" +
    "    <li ng-class=\"!isLoading &amp;&amp; nextKey ? '' : 'disabled'\"><a href=\"\" ng-click=\"next()\">Next &raquo;</a></li>\n" +
    "  </ul>\n" +
    "</div>"
  );

  $templateCache.put("cr-model-modal.html",
    "\n" +
    "<div id=\"{{modalId}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal hide fade\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button data-dismiss=\"modal\" class=\"close\">x</button>\n" +
    "    <h3>{{type}}</h3>\n" +
    "  </div>\n" +
    "  <div ng-switch on=\"data.state\" class=\"modal-body\">\n" +
    "    <div ng-switch-when=\"loading\" class=\"alert alert-info\">Loading&hellip;</div>\n" +
    "    <div ng-switch-when=\"saving\" class=\"alert alert-info\">Saving&hellip;</div>\n" +
    "    <div ng-switch-default cr-model-form schema=\"schema\" model=\"model\" valid=\"data.valid\" path=\"{{path}}\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <div class=\"btn-toolbar\">\n" +
    "      <button ng-click=\"save()\" ng-class=\"{ disabled: !data.valid }\" class=\"btn btn-primary pull-left\">Save</button>\n" +
    "      <button ng-click=\"cancel()\" data-dismiss=\"modal\" class=\"btn pull-right\">Cancel</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );

  $templateCache.put("cr-model.html",
    "\n" +
    "<div>\n" +
    "  <div cr-model-form schema=\"schema\" model=\"model\" valid=\"data.valid\" debug=\"data.debug\" path=\"{{ path }}\"></div>\n" +
    "  <div ng-switch on=\"data.state\" class=\"row\">\n" +
    "    <div ng-switch-when=\"loading\" class=\"alert alert-info\">Loading&hellip;</div>\n" +
    "    <div ng-switch-when=\"saving\" class=\"alert alert-info\">Saving&hellip;</div>\n" +
    "    <div ng-switch-when=\"error\" class=\"alert alert-error\">\n" +
    "      <h4>ERROR</h4>\n" +
    "      <pre>{{ data.error|json }}</pre>\n" +
    "      <pre>{{ data.error.stack }}</pre>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"editing\" class=\"col-md-6\">\n" +
    "      <button ng-click=\"save()\" ng-class=\"{ disabled: !data.valid }\" class=\"btn btn-primary margin-right-10\">Save</button>\n" +
    "      <button ng-click=\"destroy()\" ng-show=\"!isNew()\" class=\"btn btn-danger pull-right\">Delete</button>\n" +
    "      <button ng-click=\"toggleDebug()\" class=\"btn pull-right pull-right margin-right-10\">Debug             </button>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">      \n" +
    "      <button ng-click=\"goBack()\" class=\"btn btn-default pull-right\"><span class=\"glyphicon glyphicon-arrow-left\"></span>&nbsp;Back                </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );

  $templateCache.put("cr-number.html",
    "\n" +
    "<div ng-class=\"{ 'has-error': hasErrors() }\" class=\"form-group\">\n" +
    "  <label for=\"{{name}}\" class=\"control-label\">{{name}}:</label>\n" +
    "  <input type=\"number\" ng-model=\"model\" id=\"{{name}}\" class=\"form-control\"><span ng-switch on=\"getFirstError()\">\n" +
    "    <p ng-switch-when=\"required\" class=\"help-block\">Required</p>\n" +
    "    <p ng-switch-when=\"integer\" class=\"help-block\">Value is not an integer</p>\n" +
    "    <p ng-switch-when=\"multipleOf\" class=\"help-block\">Value is not a multiple of {{schema.multipleOf}}</p>        </p>\n" +
    "    <p ng-switch-when=\"minimum\" class=\"help-block\">Value is less than {{schema.minimum}}</p>\n" +
    "    <p ng-switch-when=\"maximum\" class=\"help-block\">Value is greater than {{schema.maximum}}</p>\n" +
    "    <p ng-switch-when=\"pattern\" class=\"help-block\">Value does not match the pattern</p>\n" +
    "    <p ng-switch-when=\"format\" class=\"help-block\">Value is no valid {{schema.format}}</p></span>\n" +
    "</div>"
  );

  $templateCache.put("cr-object-minimal.html",
    "\n" +
    "<fieldset>\n" +
    "  <div class=\"properties\"></div>\n" +
    "</fieldset>"
  );

  $templateCache.put("cr-object.html",
    "\n" +
    "<fieldset>\n" +
    "  <label><strong>{{name}}:</strong></label>\n" +
    "  <div class=\"indent properties\"></div>\n" +
    "</fieldset>"
  );

  $templateCache.put("cr-password.html",
    "\n" +
    "<div ng-class=\"{ 'has-error': hasErrors() }\" class=\"control-group\">\n" +
    "  <label class=\"control-label\">{{name}}:</label>\n" +
    "  <input type=\"password\" ng-model=\"pass1\" style=\"margin-right: 4px\">\n" +
    "  <input type=\"password\" ng-model=\"pass2\"><span ng-switch on=\"getFirstError()\">\n" +
    "    <p ng-switch-when=\"required\" class=\"help-inline\">Required</p>\n" +
    "    <p ng-switch-when=\"match\" class=\"help-inline\">Passwords do not match</p>\n" +
    "    <p ng-switch-when=\"maxLength\" class=\"help-inline\">Value is longer than {{schema.maxLength}}</p>\n" +
    "    <p ng-switch-when=\"minLength\" class=\"help-inline\">Value is shorter than {{schema.minLength}}</p></span>\n" +
    "</div>"
  );

  $templateCache.put("cr-ref-preview.html",
    "\n" +
    "<p>{{ model[options] }}</p>"
  );

  $templateCache.put("cr-ref.html",
    "\n" +
    "<div>\n" +
    "  <label><strong>{{name}}:</strong></label>\n" +
    "  <div ng-class=\"{ 'has-error': hasErrors() }\" class=\"indent control-group\">\n" +
    "    <div cr-ref-preview type=\"{{schema.$ref}}\" options=\"{{schema.preview}}\"></div><span ng-switch on=\"getFirstError()\">\n" +
    "      <p ng-switch-when=\"required\" class=\"help-block\">Required</p></span>\n" +
    "    <div class=\"btn-group\">\n" +
    "      <button ng-click=\"newModel()\" class=\"btn\">New</button>\n" +
    "      <button ng-show=\"hasModel()\" ng-click=\"updateModel()\" class=\"btn\">Edit</button>\n" +
    "      <button ng-click=\"selectModel()\" class=\"btn\">Select</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div cr-model-modal modal-id=\"{{editModalId}}\" type=\"{{schema.$ref}}\" path=\"{{path}}\"></div>\n" +
    "  <div cr-model-list-modal modal-id=\"{{selectModalId}}\" type=\"{{schema.$ref}}\"></div>\n" +
    "</div>"
  );

  $templateCache.put("cr-slug.html",
    "\n" +
    "<div ng-class=\"{ 'has-error': hasErrors() }\" class=\"form-group\">\n" +
    "  <label for=\"{{name}}\" class=\"control-label\">{{name}}:</label>\n" +
    "  <div class=\"input-append\">\n" +
    "    <input type=\"text\" ng-model=\"model\" id=\"{{name}}\" class=\"form-control input-xlarge\"><a ng-click=\"generate()\" class=\"btn btn-default\">Generate</a>\n" +
    "  </div><span ng-switch on=\"getFirstError()\">\n" +
    "    <p ng-switch-when=\"required\" class=\"help-block\">Required</p>\n" +
    "    <p ng-switch-when=\"maxLength\" class=\"help-block\">Value is longer than {{schema.maxLength}}</p>\n" +
    "    <p ng-switch-when=\"minLength\" class=\"help-block\">Value is shorter than {{schema.minLength}}</p>\n" +
    "    <p ng-switch-when=\"pattern\" class=\"help-block\">Value does not match the pattern</p></span>\n" +
    "</div>"
  );

  $templateCache.put("cr-string.html",
    "\n" +
    "<div ng-class=\"{ 'has-error': hasErrors() }\" class=\"form-group\">\n" +
    "  <label for=\"{{name}}\" class=\"control-label\">{{name}}:</label>\n" +
    "  <input type=\"text\" ng-model=\"model\" id=\"{{name}}\" placeholder=\"{{name}}\" class=\"form-control\"><span ng-switch on=\"getFirstError()\">\n" +
    "    <p ng-switch-when=\"required\" class=\"help-block\">Required    </p>\n" +
    "    <p ng-switch-when=\"maxLength\" class=\"help-block\">Value is longer than {{schema.maxLength}}</p>\n" +
    "    <p ng-switch-when=\"minLength\" class=\"help-block\">Value is shorter than {{schema.minLength}}</p>\n" +
    "    <p ng-switch-when=\"pattern\" class=\"help-block\">Value does not match the pattern</p>\n" +
    "    <p ng-switch-when=\"format\" class=\"help-block\">Value is not a valid {{schema.format}}</p></span>\n" +
    "</div>"
  );

  $templateCache.put("cr-text.html",
    "\n" +
    "<div ng-class=\"{ 'has-error': hasErrors() }\" class=\"form-group\">\n" +
    "  <label for=\"{{name}}\" class=\"control-label\">{{name}}:</label>\n" +
    "  <textarea ng-model=\"model\" class=\"form-control\"></textarea><span ng-switch on=\"getFirstError()\">\n" +
    "    <p ng-switch-when=\"required\" class=\"help-block\">Required </p>\n" +
    "    <p ng-switch-when=\"maxLength\" class=\"help-block\">Value is longer than {{schema.maxLength}}</p>\n" +
    "    <p ng-switch-when=\"minLength\" class=\"help-block\">Value is shorter than {{schema.minLength}}</p></span>\n" +
    "</div>"
  );

}]);

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
(function() {

  var module = angular.module('cores.controllers');


  module.controller('crArrayCtrl', function($scope, crSchema) {

    $scope.addItem = function(schema) {
      var obj = crSchema.createValue(schema, schema.name);
      $scope.model.push(obj);
    };

    $scope.$on('remove:item', function(e, index) {
      e.stopPropagation();
      $scope.model.splice(index, 1);
    });

    $scope.$on('moveUp:item', function(e, index) {
      e.stopPropagation();
      if (index === 0) return;
      $scope.model.splice(index - 1, 0, $scope.model.splice(index, 1)[0]);
    });

    $scope.$on('moveDown:item', function(e, index) {
      e.stopPropagation();
      if (index >= $scope.model.length) return;
      $scope.model.splice(index + 1, 0, $scope.model.splice(index, 1)[0]);
    });

    // wait for ready event of items on initialization

    var numItems = $scope.model.length;

    if (numItems === 0) {
      $scope.$emit('ready');
    }
    else {
      var off = $scope.$on('ready', function(e) {
        e.stopPropagation();
        if (--numItems === 0) {
          off();
          $scope.$emit('ready');
        }
      });
    }
  });
})();
(function() {

  var module = angular.module('cores.controllers');


  module.controller('crArrayItemCtrl', function($scope) {

    $scope.moveUp = function() {
      $scope.$emit('moveUp:item', $scope.$parent.$index);
    };

    $scope.moveDown = function() {
      $scope.$emit('moveDown:item', $scope.$parent.$index);
    };

    $scope.remove = function() {
      $scope.$emit('remove:item', $scope.$parent.$index);
    };
  });
})();
(function() {

  var module = angular.module('cores.controllers');


  module.controller('crModelCtrl', function($scope, $location, $q, $window, crResources, crSchema, crCommon) {

    var STATE_EDITING = 'editing';
    var STATE_LOADING = 'loading';
    var STATE_SAVING = 'saving';
    var STATE_ERROR = 'error';

    var self = this;
    var data = $scope.data = {
      valid: true,
      state: STATE_EDITING,
      debug: false,
      files: {}
    };

    // add/update/remove files from the model

    $scope.$on('file:set', function(e, id, file) {
      e.stopPropagation();
      data.files[id] = file;
    });

    $scope.$on('file:remove', function(e, id) {
      e.stopPropagation();
      delete data.files[id];
    });

    // button methods

    $scope.save = function() {
      $scope.$emit('model:save');
      return self.save();
    };

    $scope.cancel = function() {
      $scope.$emit('model:cancel');
    };

    $scope.destroy = function() {
      $scope.$emit('model:destroy');
      return self.destroy();
    };

    $scope.toggleDebug = function() {
      $scope.data.debug = !$scope.data.debug;
    };

    $scope.isNew = function() {
      if (!$scope.model) return true;
      return !$scope.model._rev;
    };
    
    $scope.goBack = function() {
        $window.history.back();
    };    

    //
    // methods
    //

    this.load = function(id) {

      data.state = STATE_LOADING;
      return this._resource.load(id).then(function(doc) {
        self.setModel(doc);
        data.state = STATE_EDITING;

      }, function(err) {
        data.state = STATE_ERROR;
        data.error = err;
      });
    };


    this.save = function() {

      var def = $q.defer();

      if (!$scope.data.valid) {
        def.reject(new Error('Model is not valid'));
        return def.promise;
      }
      data.state = STATE_SAVING;

      var fs = Object.keys(data.files).map(function(k) { return data.files[k]; });

      this._resource.save($scope.model, fs).then(function(doc) {

        self.setModel(doc);
        $scope.modelId = doc._id;
        data.state = STATE_EDITING;
        $scope.$emit('model:saved', $scope.model);
        def.resolve(doc);
        // redirect to model list page
        $location.path(crCommon.getPathFromType($scope.model.type_));

      }, function(err) {

        if (err.message === 'Validation failed') {
          data.state = STATE_EDITING;

          err.errors.forEach(function(v) {
            console.log('broadcast', v);
            $scope.$broadcast('set:customError', v.path, v.code, v.message);
          });
        }
        def.reject(err);
      });

      return def.promise;
    };


    this.destroy = function() {
    
      var type = $scope.model.type_;

      return this._resource.destroy($scope.model).then(
        function() {
          self.setModel(crSchema.createValue($scope.schema));
          $scope.$emit('model:destroyed');
          // redirect to model list page
          $location.path(crCommon.getPathFromType(type));       
        }
      );
    };


    this.setModel = function(model) {
      // reset files dict when model changes
      data.files = {};
      $scope.model = model;
    };


    //
    // init
    //
    data.state = STATE_LOADING;
    self._resource = crResources.get($scope.type);

    // load schema
    self._resource.schema().then(function(schema) {

      // load or create default model
      $scope.schema = schema;
      var id = $scope.modelId;

      if (!id) {
        self.setModel(crSchema.createValue(schema));
        data.state = STATE_EDITING;
      }
      else {
        return self.load(id);
      }
    }).then(function() {

      // watch for modelId changes to load/clear the model
      $scope.$watch('modelId', function(newId, oldId) {

        if (newId !== oldId) {
          if (newId) {
            // load model with new id
            self.load(newId);
          }
          else if (oldId) {
            // newId was set to null, create default value
            self.setModel(crSchema.createValue($scope.schema));
          }
        }
      });

      $scope.$emit('model:ready');
    });
  });

})();
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
(function() {

  var module = angular.module('cores.services');

  // Get a new file id
  var getFileId = (function(id) {
    return function() { return 'file' + ++id; };
  })(0);


  // Get a new modal id
  var getModalId = (function(id) {
    return function() { return 'modal-' + ++id; };
  })(0);


  var createSlug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    var slug = '';
    var map = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
                '/': '-', '_': '-', ',': '-', ':': '-', ';': '-', '.': '-' };

    for (var i = 0; i < str.length; ++i) {
      var c = str.charAt(i);
      slug += map[c] || c;
    }

    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
      .replace(/^-|-$/g, ''); // trim dashes

    return slug;
  };


  var capitalize = function(str) {
    if (!str || str.length === 0) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.substr(1);
  };


  var jsonPointer = function(obj, path) {
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
  };
  
  var getPathFromType = function(type) {
    var path = '/' + type.toLowerCase() + 's';
    return path;  
  }; 


  var merge = function(a, b) {
    for (var x in b) {
      a[x] = b[x];
    }
    return a;
  };


  module.service('crCommon', function($q) {

    return {
      getFileId: getFileId,
      getModalId: getModalId,

      createSlug: createSlug,
      capitalize: capitalize,

      jsonPointer: jsonPointer,

      merge: merge,

	  getPathFromType: getPathFromType
    };
  });

})();
(function() {

  var module = angular.module('cores.services');

  //
  // Create an error object from a response
  //

  function makeError(response) {

    var msg = response.msg || '';
    if (!msg && response.data) {
      msg = response.data.message || response.data.error;
    }

    var err = new Error(msg);
    err.code = response.code || response.status;

    if (response.config) {
      err.config = response.config;
    }

    if (response.data && response.data.errors) {
      err.errors = response.data.errors;
    }
    return err;
  };


  //
  // crResource
  //

  module.factory('crResource', function($http, $q, $rootScope) {

    var Resource = function(type, config, host) {

      this.type = type;

      // add config to this
      angular.extend(
        this,
        { path: '', schemaPath: '', viewPaths: {} },
        config
      );

      if (host) {
        this.path = host + this.path;
        this.schemaPath = host + this.schemaPath;

        var self = this;
        angular.forEach(this.viewPaths, function(path, name) {
          self.viewPaths[name] = host + path;
        });
      }
    };


    //
    // Get a resource schema
    //

    Resource.prototype.schema = function() {

      return $http.get(this.schemaPath).then(
        function(res) { return res.data; },
        function(res) { return $q.reject(makeError(res)); }
      );
    };


    //
    // Load a resource from the server
    //

    Resource.prototype.load = function(id, params) {

      var path = this.path;

      if (id) {
        if (typeof id === 'string') {
          path += '/' + id;
        }
        else if (typeof id === 'object' && !params) {
          // params passed as first arg
          params = id;
        }
      }
      var config = { params: params || {} };

      return $http.get(path, config).then(
        function(res) { return res.data; },
        function(res) { return $q.reject(makeError(res)); }
      );
    };


    //
    // Save/update a resource on the server
    //

    Resource.prototype.save = function(doc, files) {

      doc = JSON.parse(JSON.stringify(doc));

      if (files && !angular.isArray(files)) {
        files = [files];
      }
      var isMultipart = false;

      // create multipart formdata when saving files

      if (files && files.length) {
        var fd = new FormData();
        fd.append('type_', this.type);
        fd.append('doc', JSON.stringify(doc));
        // fd.append('file', file);

        files.forEach(function(file, i) {
          fd.append('file' + i, file);
        });
        fd.append('numFiles', files.length);

        // when updating, add the id and rev
        if (doc._id)  fd.append('_id', doc._id);
        if (doc._rev) fd.append('_rev', doc._rev);

        doc = fd;
        isMultipart = true;
      }

      var req  = {
        url: this.path,
        method: 'POST',
        data: doc
      };

      if (doc._id && doc._rev) {
        // update
        req.method = 'PUT';
        req.url += '/' + doc._id + '/' + doc._rev;
      }
      else if (doc._id) {
        // new with id
        req.method = 'PUT';
        req.url += '/' + doc._id;
      }

      if (isMultipart) {
        return this._sendMultipart(req);
      }
      else {
        return $http(req).then(
          function(res) { return res.data; },
          function(res) { return $q.reject(makeError(res)); }
        );
      }
    };


    Resource.prototype._sendMultipart = function(req) {

      var def = $q.defer();

      // send multipart manually with xhr for now, $http seems to have problems with it
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function() {

        var data = typeof xhr.response === 'string' ? JSON.parse(xhr.response) : xhr.response;

        if (xhr.status === 200) {
          def.resolve(data);
        }
        else {
          def.reject(makeError(data));
        }
        // call apply, because we are outside the angular life-cycle
        $rootScope.$apply();
      });

      xhr.open(req.method, req.url);
      xhr.send(req.data);

      return def.promise;
    };


    //
    // Delete a resource on the server
    //

    Resource.prototype.destroy = function(doc) {

      if (!doc._id || !doc._rev) {
        throw new Error('Cannot delete doc without id or rev');
      }
      return $http.delete(this.path + '/' + doc._id + '/' + doc._rev).then(
        function(res) {},
        function(res) { return $q.reject(makeError(res)); }
      );
    };


    //
    // Call a couchdb view
    //

    Resource.prototype.view = function(name, params) {

      var path = this.viewPaths[name];
      if (!path) {
        throw new Error('No view with name found: ' + name);
      }

      var config = {
        params: {}
      };
      // stringify non string params as json, to preserve them
      // angularjs http will otherwise do funky stuff with array params
      for (var x in params) {
        if (typeof params[x] !== 'string') {
          config.params[x] = JSON.stringify(params[x]);
        }
        else {
          config.params[x] = params[x];
        }
      }
      return $http.get(path, config).then(
        function(res) { return res.data; },
        function(res) { return $q.reject(makeError(res)); }
      );
    };
    return Resource;
  });


  //
  // crResource
  //

  module.service('crResources', function($http, $q, $rootScope, crResource) {


    var Resources = function() {

      this._resources = {};
      this._path = '';
    };


    Resources.prototype.init = function(options) {

      options = options || {};
      this._host = options.host || '';
      this._path = this._host + (options.path || '');

      var self = this;

      return $http.get(this._path + '/_index').then(

        function(res) {
          angular.forEach(res.data, function(config, key) {
            self._resources[key] = new crResource(key, config, self._host);
          });
          return self._resources;
        },
        function(res) {
          return $q.reject(makeError(res));
        }
      );
    };


    Resources.prototype.getIds = function(count) {

      count = count || 1;

      return $http.get(this._path + '/_uuids?count=' + count).then(
        function(res) {
          return res.data.uuids;
        },
        function(res) {
          return $q.reject(makeError(res));
        }
      );
    };


    Resources.prototype.resources = function() {
      return this._resources;
    };


    Resources.prototype.get = function(type) {

      var r = this._resources[type];
      if (!r) {
        throw new Error('Resource with type not found: ' + type);
      }
      return r;
    };


    return new Resources();
  });

})();
(function() {

  var module = angular.module('cores.services');

  
  function isObjectSchema(schema) {
    return schema.type === 'object' || schema.properties;
  }
  
  function isArraySchema(schema) {
    return schema.type === 'array' || schema.items;
  }

  function isRefSchema(schema) {
    return typeof schema.$ref === 'string';
  }
  

  function isPrivateProperty(key) {
    return key === '_id' || key === '_rev' || key === 'type_';
  }

  
  //
  // create a object with default values from schema
  //
  
  function createValue(schema, typeName) {

    var hasDefaultValue = schema.hasOwnProperty('default');
    var type = schema.type;
    
    if (schema.enum) {
      return hasDefaultValue ? schema.default : schema.enum[0];
    }
    if (schema.$ref) {
      return hasDefaultValue ? schema.default : {};
    }
    if (!type) {
      // infer object and array
      if (schema.properties) type = 'object';
      if (schema.items) type = 'array';
    }
    
    if (!type) throw new Error('Cannot create default value for schema without type');

    switch(type) {
    case 'boolean': return hasDefaultValue ? schema.default : true;
    case 'integer': return hasDefaultValue ? schema.default : 0;
    case 'number': return hasDefaultValue ? schema.default : 0;
    case 'string': return hasDefaultValue ? schema.default : '';
    case 'object':
      if (hasDefaultValue) return schema.default;
      
      var obj = {};
      angular.forEach(schema.properties, function(propSchema, name) {
        // ignore some vals
        if (isPrivateProperty(name)) return;
        obj[name] = createValue(propSchema);
      });
      if (typeName) {
        obj.type_ = typeName;
      }
      return obj;
    case 'array': return hasDefaultValue ? schema.default : [];
    default: throw new Error('Cannot create default value for unknown type: ' + type);
    }
  }

  //
  // schema utility methods
  //
  
  module.service('crSchema', function() {

    return {
      createValue: createValue,
      
      isObjectSchema: isObjectSchema,
      isArraySchema: isArraySchema,
      isRefSchema: isRefSchema,

      isPrivateProperty: isPrivateProperty
    };
  });

})();
(function() {

  var module = angular.module('cores.services');


  module.factory('crValidation', function() {

    return function(scope, watchExpr) {

      watchExpr = watchExpr || 'model';

      // client side errors
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


      scope.getFirstError = function(name) {
        for (var x in errors) {
          if (errors[x]) return x;
        }
        for (var y in customErrors) {
          if (customErrors[y]) return y;
        }
      };


      var setError = function(name) {
        errors[name] = true;
        scope.$emit('set:error', scope.path + ':' + name);
      };


      var removeError = function(name) {
        if (errors.hasOwnProperty(name)) {
          delete errors[name];
          scope.$emit('remove:error', scope.path + ':' + name);
        }
      };


      var setCustomError = function(name) {
        customErrors[name] = true;
        scope.$emit('set:error', scope.path + ':' + name);
      };


      var removeCustomError = function(name) {
        if (customErrors.hasOwnProperty(name)) {
          delete customErrors[name];
          scope.$emit('remove:error', scope.path + ':' + name);
        };
      };


      var clearCustomErrors = function() {
        angular.forEach(customErrors, function(error, name) {
          removeCustomError(name);
        });
      };


      var addConstraint = function(name, condition, isCustomConstraint) {
        // only check constraints that are defined in the schema
        if (!isCustomConstraint &&
            !scope.schema.hasOwnProperty(name)) return;

        constraints.push(function(value) {
          condition(value) ? removeError(name) : setError(name);
        });
      };


      scope.$on('set:customError', function(e, path, code, message) {
        if (path === scope.path) {
          setCustomError(code);
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
(function() {

  var module = angular.module('cores.directives');


  module.directive('crAnyofItem', function($compile, crBuild) {
    return {
      require: '^crAnyofArray',
      scope: {
        model: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-array-item.html',

      controller: 'crArrayItemCtrl',

      link: function(scope, elem, attrs, anyof) {
        // get the schema from the anyof-array
        scope.schema = anyof.getSchema(scope.model.type_);
        scope.array = anyof;

        var tmpl = crBuild(scope.schema, scope.model, 'schema', 'model', scope.path,
                           { 'mode': 'minimal' });
        var link = $compile(tmpl);
        var e = link(scope);
        elem.append(e);
      }
    };
  });


  module.directive('crAnyofArray', function($compile) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-anyof-array.html',

      controller: 'crAnyofArrayCtrl',

      link: function(scope, elem, attrs) {
        elem.find('.dropdown-toggle').dropdown();
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crArrayItem', function($compile, crBuild) {
    return {
      scope: {
        model: '=',
        schema: '=',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-array-item.html',

      controller: 'crArrayItemCtrl',

      link: function(scope, elem, attrs) {

        var tmpl = crBuild(scope.schema, scope.model, 'schema', 'model', scope.path,
                           { mode: 'minimal' });

        var link = $compile(tmpl);
        var e = link(scope);
        elem.append(e);
      }
    };
  });


  module.directive('crArray', function(crSchema) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-array.html',

      controller: 'crArrayCtrl',

      link: function(scope, elem, attrs) {
        // ngrepeat can only bind to references when it comes to form fields
        // thats why we can only work with items of type object not primitives
        // this may change in a feature release
        if (!crSchema.isObjectSchema(scope.schema.items) &&
            !crSchema.isRefSchema(scope.schema.items)) {
          throw new Error('Array items schema is not of type object: ' + JSON.stringify(scope.schema.items));
        }
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crBoolean', function() {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-boolean.html',

      link: function(scope) {

        scope.$emit('ready');
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');

  
  module.directive('crDatetime', function() {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-datetime.html',

      link: function(scope, elem, attrs) {

        var date = new Date();
        
        if (scope.model && scope.model !== '') {
          // get date from model
          date = new Date(scope.model);
        }
        else {
          // set today as start date
          scope.model = date.toISOString();
        }

        var datepicker = elem.find('.date').datepicker({
          todayHighlight: true
        });
        datepicker.datepicker('update', date);
        
        var timepicker = elem.find('.time').timepicker({
          minuteStep: 15,
          defaultTime: date.getHours() + ':' + date.getMinutes(),
          showMeridian: false,
          showSeconds: false
        });
        
        datepicker.on('changeDate', function(e) {
          e.stopPropagation();

          date.setFullYear(e.date.getFullYear());
          date.setMonth(e.date.getMonth());
          date.setDate(e.date.getDate());

          scope.model = date.toISOString();
          scope.$apply();
        });

        timepicker.on('changeTime.timepicker', function(e) {
          e.stopPropagation();

          date.setHours(e.time.hours);
          date.setMinutes(e.time.minutes);

          scope.model = date.toISOString();
          scope.$apply();
        });
        
        scope.$emit('ready');
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crEnum', function() {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-enum.html',

      link: function(scope) {
        scope.$emit('ready');
      }
    };
  });

})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crImage', function($compile, crCommon, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@'
      },

      replace: true,
      templateUrl: 'cr-image.html',


      link: function(scope, elem, attrs) {

        var validation = crValidation(scope, 'model.name');

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!scope.model.name && scope.model.name !== '';
          }, true);
        }

        var fileId = crCommon.getFileId();

        var input = elem.find('input[type="file"]');
        var preview = elem.find('img');

        // preview when already saved
        scope.$watch('model.url', function(url) {
          preview.attr('src', url);
        });

        input.on('change', function(e) {

          var files = input[0].files;
          if (files.length === 0) {
            // no file selected
            return;
          }

          var file = files[0];

          // preview selected image
          var fr = new FileReader();
          fr.onload = function(e) {
            preview.attr('src', e.target.result);
          };
          fr.readAsDataURL(file);

          scope.model.name = file.name;

          // notify model about file
          scope.$emit('file:set', fileId, file);
          scope.$apply();
        });

        scope.$emit('ready');
      }
    };
  });


  // module.directive('crImageRefPreview', function() {
  //   return {
  //     scope: {
  //       model: '=',
  //       file: '='
  //     },

  //     replace: true,
  //     templateUrl: 'cr-image-preview.html',

  //     link: function(scope, elem, attr) {
  //       scope.$watch('file', function(file) {
  //         if (file) {
  //           var fr = new FileReader();
  //           fr.onload = function(e) {
  //             elem.find('img').attr('src', e.target.result);
  //           };
  //           fr.readAsDataURL(file);
  //         }
  //       });
  //     }
  //   };
  // });

})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crModelForm', function($compile, crBuild, crSchema, crCommon) {
    return {
      scope: {
        model: '=',
        schema: '=',
        valid: '=',
        debug: '=',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-model-form.html',

      controller: function($scope) {

        $scope.valid = true;
        $scope.errors = {};

        $scope.$on('set:error', function(e, id) {
          e.stopPropagation();
          $scope.errors[id] = true;
          $scope.valid = false;
        });

        $scope.$on('remove:error', function(e, id) {
          e.stopPropagation();
          delete $scope.errors[id];
          $scope.valid = Object.keys($scope.errors).length === 0;
        });
      },

      link: function(scope, elem) {

        var childScope;

        scope.$watch('model', function() {
          if (!scope.schema) return;
          scope.valid = true;
          scope.errors = {};

          if (!crSchema.isObjectSchema(scope.schema)) {
            throw new Error('Top level schema has to be an object');
          }

          // cleanup dom and scope
          if (childScope) {
            elem.find('form').empty();
            childScope.$destroy();
          }
          // create markup
          var tmpl = crBuild(scope.schema, scope.model, 'schema', 'model',
                             scope.path || '', { mode: 'minimal'});

          // compile and link with new scope
          childScope = scope.$new();
          var link = $compile(tmpl);
          var content = link(childScope);
          elem.find('form').html(content);
        });
      }
    };
  });
})();
'use strict';

var module = angular.module('cores.directives');


module.directive('crModelListFilter', function() {
    return {
      scope: {
        views: '=',
        view: '='
      },
    
      replace: true,
      templateUrl: 'cr-model-list-filter.html',
    
      link: function(scope, elem, attrs) {
    
        var firstSelect = true;
        var defaultConfig = '';
    
        scope.$watch('selectedView', function(newConfig, oldConfig) {
          if (firstSelect && newConfig) {
            // remember default view config
            defaultConfig = scope.view;
            firstSelect = false;
          }
          if (!firstSelect) {
            scope.view = newConfig || defaultConfig;
          }
        });
      }
    };
});


module.directive('crModelList', function(crCommon, crResources, crSchema) {
    return {
      scope: {
        type: '@',
        view: '=?',
        limit: '=?',
        headers: '=?'
      },
    
      replace: true,
      templateUrl: 'cr-model-list.html',
    
      link: function(scope, elem, attrs) {
    
        var resource;
        var schema;
    
        function initScope() {
          scope.isLoading = false;
          scope.prevKeys = [];
          scope.curKey = null;
          scope.nextKey = null;
          scope.rows = [];
          scope.pageNo = 1;
          scope.totalPages = 1;
        }
        initScope();
    
        function load(startkey) {
    
          scope.isLoading = true;
    
          var limit = scope.limit || 10;
          var params = {
            include_docs: true,
            include_refs: true,
            // fetch one more and use the id as the startkey for the next page
            limit: limit + 1,
            startkey: startkey
          };
    
          var view = 'all';
          if (scope.view) {
            view = scope.view.name;
            for (var x in scope.view.params) {
              // only overwrite startkey on first load
              if (x === 'startkey' && params.startkey) {
                continue;
              }
              params[x] = scope.view.params[x];
            }
          }
    
          resource.view(view, params).then(function success(result) {
            if (result.total_rows === 0) {
                params.limit = limit - 1;
            }
    
            // table rows values according to header
            scope.rows = result.rows.map(function(row) {
              return {
                id: row.id,
                items: scope.headers.map(function(path, i) {
                  return { value: crCommon.jsonPointer(row.doc, path) };
                })
              };
            });
    
            if (result.rows.length > 0) {
              scope.curKey = result.rows[0].key;
              scope.nextKey = null;
               
              scope.pageNo = scope.prevKeys.length + 1;
              scope.totalPages = Math.ceil(result.total_rows / limit);                             
    
              if (result.rows.length > limit) {
                // there a more pages left, remember the last row's key and do not display it
                scope.nextKey = result.rows[limit].key;
                scope.rows.pop();
              }             
            } else {
                // if all rows deleted and not on last page, load previous page
                if (scope.totalPages > 1) {
                    load(scope.prevKeys.pop());
                }
            }
            
            scope.isLoading = false;
    
          }, function(err) {
            console.log('ERROR', err);
            throw err;
          });
        }
    
        scope.select = function(id) {
          scope.$emit('list:select', id);
        };
    
        scope.next = function() {
          if (scope.nextKey) {
            scope.prevKeys.push(scope.curKey);
            load(scope.nextKey);
          }
        };
    
        scope.prev = function() {
          if (scope.prevKeys.length > 0) {
            load(scope.prevKeys.pop());
          }
        };
    
        scope.range = function(n) {
            return new Array(n);
        };
        
        scope.goto = function(page) {
            //var offset = (page - 1) * scope.limit;            
            //load(offset);
        };        
        
        scope.destroy = function(id) {                  
          scope.$emit('model:destroy');
          resource.load(id)
            .then(
              function (doc) {          
                return resource.destroy(doc);
              }
            )
            .then(
              function () {
                load(scope.curKey);                   
              }
            );                                  
        };        
    
        scope.$on('reload:list', function(e) {
          e.preventDefault();
          load();
        });
    
        var unwatch = scope.$watch('type', function() {
          unwatch();
          resource = crResources.get(scope.type);
          resource.schema().then(function(s) {
            schema = s;
    
            // auto generate headers when not set
            if (!scope.headers || scope.headers.length === 0) {
              scope.headers = Object.keys(schema.properties).filter(function(key) {
                return !crSchema.isPrivateProperty(key);
              });
            }
            // table column titles
            scope.titles = scope.headers.map(function(header) {
              return header.split('.')[0];
            });
    
            load();
          });
        });
    
        scope.$watch('view', function(newValue, oldValue) {
          if (newValue === oldValue) return;
          if (!resource) return;
          // reload list on view change
          initScope();
          load();
        });
      }
    };
});



module.directive('crModelListModal', function() {
    return {
      scope: {
        type: '@',
        modalId: '@'
      },
    
      replace: true,
      templateUrl: 'cr-model-list-modal.html',
    
      link: function(scope, elem, attrs) {
    
        scope.$on('list:select', function(e, id) {
          elem.modal('hide');
        });
    
        scope.$on('showModal:list', function(e, modalId, reload) {
    
          if (modalId === scope.modalId) {
            e.preventDefault();
            elem.modal('show');
    
            if (reload) {
              scope.$broadcast('reload:list');
            }
          }
        });
      }
    };
});
(function() {

  var module = angular.module('cores.directives');

  module.directive('crModelModal', function() {
    return {
      scope: {
        type: '@',
        path: '@',
        modalId: '@'
      },

      replace: true,
      templateUrl: 'cr-model-modal.html',

      controller: 'crModelCtrl',

      link: function(scope, elem) {

        scope.$on('model:saved', function() {
          // close on save
          elem.modal('hide');
        });

        scope.$on('showModal:model', function(e, modalId, modelId) {
          if (modalId === scope.modalId) {
            e.preventDefault();
            scope.modelId = modelId;
            elem.modal('show');
          }
        });
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crModel', function() {
    return {
      scope: {
        type: '@',
        path: '@',
        modelId: '='
      },

      replace: true,
      templateUrl: 'cr-model.html',

      controller: 'crModelCtrl'
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crNumber', function(crValidation) {
    return {

      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-number.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        if (attrs.hasOwnProperty('isInteger')) {
          validation.addConstraint('integer', function(value) {
            return Math.floor(value) === value;
          }, true);
        }
        else {
          elem.find('input[type="number"]').attr('step', 'any');
        }

        validation.addConstraint('multipleOf', function(value) {
          return (value % scope.schema.multipleOf) === 0;
        });

        validation.addConstraint('minimum', function(value) {
          return value >= scope.schema.minimum;
        });

        validation.addConstraint('maximum', function(value) {
          return value <= scope.schema.maximum;
        });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return angular.isNumber(value);
          }, true);
        }

        scope.$emit('ready');
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crObject', function($compile, $templateCache, crSchema, crBuild, crCommon) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        template: '@'
      },

      compile: function(tElem, tAttrs) {

        var templates = {
          'default': 'cr-object.html',
          'minimal': 'cr-object-minimal.html'
        };

        var mode = tAttrs.mode || 'default';
        var template = $templateCache.get(templates[mode]);
        tElem.append(template);

        // Linking function
        return function(scope, elem, attrs) {

          var numProperties = 0;

          var isRequired = function (name) {
            var req = scope.schema.required || [];
            return req.indexOf(name) !== -1;
          };

          // listen for childs ready event and ready up when all fired
          var offready = scope.$on('ready', function(e) {

            e.stopPropagation();
            if (--numProperties === 0) {
              offready();
              scope.$emit('ready');
            }
          });

          // create templates for properties
          var tmpl = '';
          angular.forEach(scope.schema.properties, function(subSchema, key) {

            // ignore some keys
            if (crSchema.isPrivateProperty(key)) return;

            if (!scope.model.hasOwnProperty(key)) {
              scope.model[key] = crSchema.createValue(subSchema);
            }

            numProperties += 1;

            tmpl += crBuild(subSchema, scope.model[key],
                            'schema.properties.' + key, 'model.' + key,
                            (scope.path ? scope.path : '')  + '/' + key,
                            { 'is-required': isRequired(key) });
          });
          // compile and link template
          var link = $compile(tmpl);
          var content = link(scope);
          elem.find('.properties').append(content);
        };
      }
    };
  });

})();
(function() {

  var module = angular.module('cores.directives');

  module.directive('crPassword', function(crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-password.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint('maxLength', function(value) {
          return value.length <= scope.schema.maxLength;
        });

        validation.addConstraint('minLength', function(value) {
          return value.length >= scope.schema.minLength;
        });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return value && value !== '';
          }, true);
        }

        scope.pass1 = '';
        scope.pass2 = '';
        var oldPass = scope.model;

        var compareValue = function(v1, v2) {
          // only set model when passwords are equal and not empty
          if (v1 === v2) {
            if (v1 !== '') {
              scope.model = v1;
            }
            else {
              scope.model = oldPass;
            }
            validation.removeError('match');
          }
          else {
            scope.model = oldPass;
            validation.setError('match');
          }
        };

        scope.$watch('pass1', function(newValue) {
          compareValue(newValue, scope.pass2);
        });

        scope.$watch('pass2', function(newValue) {
          compareValue(newValue, scope.pass1);
        });

        scope.$emit('ready');
      }
    };
  });

})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crSingleSelectRef', function(crValidation, crResources, crCommon) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        previewPath: '@'
      },

      replace: true,
      templateUrl: 'cr-single-select-ref.html',

      link: function(scope, elem, attrs) {

        scope.rows = [];

        // validation
        var validation = crValidation(scope, 'model.id_');
        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!scope.model.id_;
          }, true);
        }

        // load docs
        var unwatch = scope.$watch('schema.$ref', function() {
          if (!scope.schema.$ref) return;
          unwatch();

          crResources.get(scope.schema.$ref).view('all', { include_docs: true }).then(function(result) {

            scope.rows = result.rows.map(function(row) {
              var r = {
                id: row.id,
                name: crCommon.jsonPointer(row.doc, scope.previewPath)
              };
              if (scope.model.id_ && r.id === scope.model.id_) {
                scope.selectedRow = r;
              }
              return r;
            });
          });
        });

        // watch for selection changes
        scope.$watch('selectedRow', function(newValue, oldValue) {
          if (newValue === oldValue) return;
          if (!newValue) {
            delete scope.model.id_;
          }
          else {
            scope.model.id_ = newValue.id;
          }
        });
      }
    };
  });


  module.directive('crMultiSelectRef', function(crResources, crCommon) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        previewPath: '@'
      },

      replace: true,
      templateUrl: 'cr-multi-select-ref.html',

      link: function(scope, elem, attrs) {

        scope.rows = [];

        // load docs
        var unwatch = scope.$watch('schema.items.$ref', function(newValue) {
          if (!scope.schema.items.$ref) return;
          unwatch();

          crResources.get(scope.schema.items.$ref).view('all', { include_docs: true }).then(function(result) {
            // create rows
            scope.rows = result.rows.map(function(row) {
              var r = {
                id: row.id,
                selected: false,
                name: crCommon.jsonPointer(row.doc, scope.previewPath)
              };
              return r;
            });
            // select rows when id is in model
            scope.model.forEach(function(ref) {
              scope.rows.forEach(function(row) {
                if (row.id == ref.id_) { row.selected = true; }
              });
            });
          });
        });

        // watch for selection changes
        scope.$watch('rows', function(newValue, oldValue) {
          if (!newValue || (newValue && newValue.length === 0)) return;
          // sync selected rows with model
          scope.model = scope.rows.filter(function(row) {
            return row.selected;
          }).map(function(row) {
            return { id_: row.id };
          });
        }, true);
      }
    };
  });


  module.directive('crRef', function($timeout, crCommon, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        previewPath: '@'
      },

      replace: true,
      templateUrl: 'cr-ref.html',

      controller: function($scope) {

        $scope.$on('model:saved', function(e, model) {
          e.stopPropagation();
          $scope.model.id_ = model._id;
          $scope.$broadcast('update:preview', model._id);
        });

        $scope.$on('list:select', function(e, id) {
          e.stopPropagation();
          $scope.model.id_ = id;
          $scope.$broadcast('update:preview', id);
        });
      },


      link: function(scope, elem, attrs) {

        scope.editModalId = crCommon.getModalId();
        scope.selectModalId = crCommon.getModalId();

        // scope methods
        scope.newModel = function() {
          scope.$broadcast('showModal:model', scope.editModalId, null);
        };

        scope.updateModel = function() {
          scope.$broadcast('showModal:model', scope.editModalId, scope.model.id_);
        };

        scope.selectModel = function() {
          scope.$broadcast('showModal:list', scope.selectModalId, true);
        };

        scope.hasModel = function() {
          return !!scope.model.id_;
        };

        // validation
        var validation = crValidation(scope, 'model.id_');
        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!scope.model.id_;
          }, true);
        }

        // delay to give the preview time to initialize
        $timeout(function() {
          scope.$broadcast('update:preview', scope.model.id_);
          scope.$emit('ready');
        });
      }
    };
  });


  module.directive('crRefPreview', function(crResources) {
    return {
      scope: {
        type: '@',
        previewPath: '@'
      },

      replace: true,
      templateUrl: 'cr-ref-preview.html',

      link: function(scope, elem, attrs) {

        scope.$on('update:preview', function(e, id) {
          e.preventDefault();
          if (id) {
            crResources.get(scope.type).load(id).then(function(doc) {
              scope.model = doc;
            });
          }
        });
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crSlug', function(crCommon, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        source: '@'
      },

      replace: true,
      templateUrl: 'cr-slug.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint('maxLength', function(value) {
          return value.length <= scope.schema.maxLength;
        });

        validation.addConstraint('minLength', function(value) {
          return value.length >= scope.schema.minLength;
        });

        validation.addConstraint('pattern', function(value) {
          return new RegExp(scope.schema.pattern).test(value);
        });

        // validation.addConstraint('format', function(value) {
        //   throw new Error('not implemented');
        //   return false;
        // });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!value && value !== '';
          }, true);
        }


        scope.generate = function() {

          var sources = scope.source ? scope.source.split(',') : "";
          var val = '';

          angular.forEach(sources, function(src) {
            val += (val !== '' ? '-' : '') + scope.$parent.model[src];
          });
          scope.model = crCommon.createSlug(val);
        };

        scope.$emit('ready');
      }
    };
  });

})();

(function() {

  var module = angular.module('cores.directives');


  module.directive('crString', function(crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },
      replace: true,
      templateUrl: 'cr-string.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint('maxLength', function(value) {
          return value.length <= scope.schema.maxLength;
        });

        validation.addConstraint('minLength', function(value) {
          return value.length >= scope.schema.minLength;
        });

        validation.addConstraint('pattern', function(value) {
          return new RegExp(scope.schema.pattern).test(value);
        });

        validation.addConstraint('format', function(value) {
           //throw new Error('not implemented');
           //return false;
           // temporary hack for testing only - there are more formats than email to consider
           var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
           return new RegExp(emailRegExp).test(value);
        });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!value && value !== '';
          }, true);
        }

        scope.$emit('ready');
      }
    };
  });
})();
(function() {

  var module = angular.module('cores.directives');


  module.directive('crText', function(crCommon, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-text.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint('maxLength', function(value) {
          return value.length <= scope.schema.maxLength;
        });

        validation.addConstraint('minLength', function(value) {
          return value.length >= scope.schema.minLength;
        });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!value && value !== '';
          }, true);
        }

        scope.$emit('ready');
      }
    };
  });

})();