(function() {

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

        scope.defaultTitle = scope.view ? (scope.view.title || 'Default') : 'Default';

        scope.$watch('selectedView', function(newConfig, oldConfig) {
          if (firstSelect && newConfig) {
            // remeber default view config
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


  module.directive('crModelList', function(
    $sce,
    crCommon,
    crResources,
    crSchema,
    crJSONPointer
  ) {
    return {
      scope: {
        type: '@',
        view: '=?',
        limit: '=?',
        headers: '=?',
        options: '=?'
      },

      replace: true,
      templateUrl: 'cr-model-list.html',

      controller: function($scope) {
        $scope.buttonClick = function(e, eventName, id) {
          e.stopPropagation();
          $scope.$emit(eventName, id);
        };
      },

      link: function(scope, elem, attrs) {

        scope.options = scope.options || {};

        var resource;
        var schema;

        function initScope() {
          scope.isLoading = false;
          scope.prevKeys = [];
          scope.curKey = null;
          scope.nextKey = null;
          scope.rows = [];
          scope.showPagination = false;
          scope.pageNo = 1;
          scope.totalPages = 1;
        }
        initScope();

        function load(startkey) {

          scope.isLoading = true;

          var limit = scope.limit || 20;
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
                items: scope.headers.map(function(header, i) {
                  var val = '';
                  if (header.path) {
                    val = crJSONPointer.get(row.doc, header.path);
                  }
                  else if (header.map) {
                    val = header.map(row.doc);
                  }
                  return { value: $sce.trustAsHtml(String(val)) };
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
                scope.showPagination = true;
              }             
            } else {
                // if all rows deleted and not on last page
                // hide pagination and load previous page
                if (scope.totalPages > 1) {
                    scope.showPagination = false;
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
          scope.$emit('cr:list:select', id);
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
          scope.$emit('cr:model:destroy');
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
    
        scope.$on('cr:reload:list', function(e) {
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
              }).map(function(key) {
                return { title: crCommon.capitalize(key).split('/')[0], path: key };
              });
            }
            // table column titles
            scope.titles = scope.headers.map(function(header) {
              return header.title ||
                (header.path ? crCommon.capitalize(header.path).split('/')[0] : '');
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
        modalId: '@',
        view: '=?'
      },

      replace: true,
      templateUrl: 'cr-model-list-modal.html',

      link: function(scope, elem, attrs) {

        if (!scope.view) {
          scope.view = {
            name: 'all'
          };
        }

        scope.$on('cr:list:select', function(e, id) {
          elem.modal('hide');
        });

        scope.$on('cr:showModal:list', function(e, modalId, reload) {

          if (modalId === scope.modalId) {
            e.preventDefault();
            elem.modal('show');
            if (reload) {
              scope.$broadcast('cr:reload:list');
            }
          }
        });
      }
    };
  });


})();