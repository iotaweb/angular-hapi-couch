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