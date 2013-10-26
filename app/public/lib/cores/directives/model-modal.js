(function() {

  var module = angular.module('cores.directives');


  module.directive('crModelModal', function() {
    return {
      scope: {
        type: '@',
        path: '@',
        modalId: '@',
        defaults: '=?',
        options: '=?'
      },

      replace: true,
      templateUrl: 'cr-model-modal.html',

      controller: 'crModelCtrl',


      link: function(scope, elem, attrs) {

        scope.$on('cr:model:saved', function() {
          // close on save
          elem.modal('hide');
        });

        scope.$on('cr:showModal:model', function(e, modalId, modelId) {
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
