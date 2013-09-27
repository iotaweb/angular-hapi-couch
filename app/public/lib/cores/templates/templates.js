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
