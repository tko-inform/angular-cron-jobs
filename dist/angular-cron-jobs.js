/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v1.4.2 - 2016-06-16 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "    <span>Every: </span>\n" +
    "    <div class=\"cron-select-wrap\">\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "    </div>\n" +
    "\n" +
    "	<div class=\"select-options\">\n" +
    "		<span ng-show=\"myFrequency.base == 4\">on </span>\n" +
    "        <div ng-show=\"myFrequency.base == 4\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-options=\"(value | cronDayName) for value in dayValue\"></select>\n" +
    "        </div>\n" +
    "		<span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 5\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | cronNumeral) for value in dayOfMonthValue\"></select>\n" +
    "        </div>\n" +
    "		<span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "        <div ng-show=\"myFrequency.base == 6\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | cronMonthName) for value in monthValue\"></select>\n" +
    "        </div>\n" +
    "		<span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 3\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "        </div>\n" +
    "		<span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 2\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n" +
    "        </div>\n" +
    "		<span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

'use strict';

angular.module('angular-cron-jobs').directive('cronSelection', ['$translate', 'cronService', function($translate, cronService) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            config : '=',
            output : '=?',
            init   : '=?'
        },
        templateUrl: function(element, attributes) {
          return attributes.template || 'cronselection.html';
        },
        link: function($scope) {
            $scope.i18n = {};
            
            var msg = $translate.instant(['cron.frequency.minute','cron.frequency.hour', 'cron.frequency.day',
                                'cron.frequency.week', 'cron.frequency.month', 'cron.frequency.year']);
            
            $scope.i18n.minute = msg['cron.frequency.minute'];
            $scope.i18n.hour = msg['cron.frequency.hour'];
            $scope.i18n.day = msg['cron.frequency.day'];
            $scope.i18n.week = msg['cron.frequency.week'];
            $scope.i18n.month = msg['cron.frequency.month'];
            $scope.i18n.year = msg['cron.frequency.year'];
            
            var originalInit = undefined;
            var initChanged = false;

            $scope.frequency = [
                {
                  value : 1,
                  label : $scope.i18n.minute  
                },
                {
                  value : 2,
                  label : $scope.i18n.hour  
                },
                {
                  value : 3,
                  label : $scope.i18n.day  
                },
                {
                  value : 4,
                  label : $scope.i18n.week  
                },
                {
                  value : 5,
                  label : $scope.i18n.month  
                },
                {
                  value : 6,
                  label : $scope.i18n.year  
                }
            ];

            if (angular.isDefined($scope.init)) {
                //console.log('init value found: ', $scope.init);
                originalInit = angular.copy($scope.init);
                $scope.myFrequency = cronService.fromCron($scope.init);
            }

            $scope.$watch('init', function(newValue){
                //console.log('watch on init fired!', newValue, originalInit);
                if(angular.isDefined(newValue) && newValue && (newValue !== originalInit)){
                    initChanged = true;
                    $scope.myFrequency = cronService.fromCron(newValue);
                }
            });

            if(typeof $scope.config === 'object' && !$scope.config.length){
                var optionsKeyArray = Object.keys($scope.config.options);
                for (var i in optionsKeyArray) {
                    var currentKey = optionsKeyArray[i].replace(/^allow/, '');
                    var originalKey = optionsKeyArray[i];
                    if(!$scope.config.options[originalKey]){
                        for(var b in $scope.frequency){
                            if($scope.frequency[b].label === currentKey){
                                $scope.frequency.splice(b, 1);
                            }
                        }
                    }
                }
            }

            $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            $scope.dayOfMonthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            $scope.dayValue = [0, 1, 2, 3, 4, 5, 6];
            $scope.monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            $scope.$watch('myFrequency', function(n, o){
                //console.log('myFrequency changed: ', n, initChanged);
                if(n && (!o || n.base !== o.base) && !initChanged){
                    //console.log('base changed!', n, o);
                    if(n && n.base){
                        n.base = parseInt(n.base);
                    }
                    if(n && n.base && n.base >= 2) {
                        n.minuteValue = $scope.minuteValue[0];
                    }

                    if(n && n.base && n.base >= 3) {
                        n.hourValue = $scope.hourValue[0];
                    }

                    if(n && n.base && n.base === 4) {
                        n.dayValue = $scope.dayValue[0];
                    }

                    if(n && n.base && n.base >= 5) {
                        n.dayOfMonthValue = $scope.dayOfMonthValue[0];
                    }

                    if(n && n.base && n.base === 6) {
                        n.monthValue = $scope.monthValue[0];
                    }
                } else if(n && n.base && o && o.base){
                    initChanged = false;
                }
                $scope.output = cronService.setCron(n);
            }, true);

        
        }
    };
}]).filter('cronNumeral', function() {
    return function(input) {
        switch (input) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            case 21:
                return '21st';
            case 22:
                return '22nd';
            case 23:
                return '23rd';
            case 31:
                return '31st';
            case null:
                return null;
            default:
                return input + 'th';
        }
    };
}).filter('cronMonthName', function($translate) {
    return function(input) {
        var i18n = {};
        
        var msg = $translate.instant(['cron.month.january','cron.month.february', 'cron.month.march', 'cron.month.april',
                    'cron.month.may', 'cron.month.june', 'cron.month.july', 'cron.month.august', 'cron.month.september',
                    'cron.month.october', 'cron.month.november', 'cron.month.december']);
        i18n.january = msg['cron.month.january'];
        i18n.february = msg['cron.month.february'];
        i18n.march = msg['cron.month.march'];
        i18n.april = msg['cron.month.april'];
        i18n.may = msg['cron.month.may'];
        i18n.june = msg['cron.month.june'];
        i18n.july = msg['cron.month.july'];
        i18n.august = msg['cron.month.august'];
        i18n.september = msg['cron.month.september'];
        i18n.october = msg['cron.month.october'];
        i18n.november = msg['cron.month.november'];
        i18n.december = msg['cron.month.december'];
        var months = {
            1: i18n.january,
            2: i18n.february,
            3: i18n.march,
            4: i18n.april,
            5: i18n.may,
            6: i18n.june,
            7: i18n.july,
            8: i18n.august,
            9: i18n.september,
            10: i18n.october,
            11: i18n.november,
            12: i18n.december
        };

        if (input !== null && angular.isDefined(months[input])) {
            return months[input];
        } else {
            return null;
        }
    };
}).filter('cronDayName', function($translate) {
    return function(input) {
        var i18n = {};
        
        var msg = $translate.instant(['cron.day.sunday','cron.day.monday', 'cron.day.tuesday', 'cron.day.wednesday',
                    'cron.day.thursday', 'cron.day.friday', 'cron.day.saturday']);
        i18n.sunday = msg['cron.day.sunday'];
        i18n.monday = msg['cron.day.monday'];
        i18n.tuesday = msg['cron.day.tuesday'];
        i18n.wednesday = msg['cron.day.wednesday'];
        i18n.thursday = msg['cron.day.thursday'];
        i18n.friday = msg['cron.day.friday'];
        i18n.saturday = msg['cron.day.saturday'];
        var days = {
            0: i18n.sunday,
            1: i18n.monday,
            2: i18n.tuesday,
            3: i18n.wednesday,
            4: i18n.thursday,
            5: i18n.friday,
            6: i18n.saturday,
        };

        if (input !== null && angular.isDefined(days[input])) {
            return days[input];
        } else {
            return null;
        }
    };
});

'use strict';

angular.module('angular-cron-jobs').factory('cronService', function() {
    var service = {};

    service.setCron = function(n) {
        //  console.log('set cron called: ', n);
        var cron = ['*', '*', '*',  '*',  '*'];

        if(n && n.base && n.base >= 2) {
            cron[0] = typeof n.minuteValue !== undefined ? n.minuteValue : '*';
        }

        if(n && n.base && n.base >= 3) {
            cron[1] = typeof n.hourValue !== undefined ? n.hourValue  : '*';
        }

        if(n && n.base && n.base === 4) {
            cron[4] = n.dayValue;
        }

        if(n && n.base && n.base >= 5) {
            cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '*';
        }

        if(n && n.base && n.base === 6) {
            cron[3] = typeof n.monthValue !== undefined ? n.monthValue : '*';
        }
        //  console.log('cron after setCron ', cron.join(' '));
        return cron.join(' ');
    };

    service.fromCron = function(value) { 
        //  console.log('set cron fired!');
       var cron = value.replace(/\s+/g, ' ').split(' ');
       var frequency = {base: '1'}; // default: every minute

       if(cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 1; // every minute
       } else if(cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 2; // every hour
       } else if(cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 3; // every day
       } else if(cron[2] === '*' && cron[3] === '*') {
           frequency.base = 4; // every week
       } else if(cron[3] === '*' && cron[4] === '*') {
           frequency.base = 5; // every month
       } else if(cron[4] === '*') {
           frequency.base = 6; // every year
       }

       // console.log('frequency should be 5: ', frequency, cron);

       if (cron[0] !== '*') {
           frequency.minuteValue = parseInt(cron[0]);
       }
       if (cron[1] !== '*') {
           frequency.hourValue = parseInt(cron[1]);
       }
       if (cron[2] !== '*') {
           frequency.dayOfMonthValue = parseInt(cron[2]);
       }
       if (cron[3] !== '*') {
           frequency.monthValue = parseInt(cron[3]);
       }
       if (cron[4] !== '*') {
           frequency.dayValue = parseInt(cron[4]);
       }

       //frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

       // console.log('freq ', frequency);
       return frequency;
   };
   
   return service;
});
