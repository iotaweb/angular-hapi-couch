(function() {

  var module = angular.module('cores.directives');


  module.directive('crDatetime', function(crFieldLink, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-datetime.html',

      link: crFieldLink(function(scope, elem, attrs) {

        var validation = crValidation(scope);
        if (scope.options.isRequired) {
          validation.addConstraint('required', 'Required', function(value) {
            return !!value && value !== '';
          }, true);
        }

        var date = new Date();
        if (!scope.model) {
          scope.model = date.toISOString();
        }

        // datepicker
        elem.find('.date').datetimepicker({
          maskInput: true,
          pickDate: true,
          pickTime: false
        })
          .datetimepicker('setValue', date)
          .on('changeDate', function(e) {
            e.stopPropagation();

            date.setFullYear(e.date.getFullYear());
            date.setMonth(e.date.getMonth());
            date.setDate(e.date.getDate());

            scope.model = date.toISOString();
            scope.$apply();
          });

        // timepicker
        elem.find('.time').datetimepicker({
          maskInput: true,
          pickDate: false,
          pickTime: true,
          pickSeconds: false
        })
          .datetimepicker('setValue', date)
          .on('changeDate', function(e) {
            e.stopPropagation();

            date.setHours(e.date.getHours());
            date.setMinutes(e.date.getMinutes());

            scope.model = date.toISOString();
            scope.$apply();
          });

      })
    };
  });
})();