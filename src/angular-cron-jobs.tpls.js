angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "<span>Every: </span>\n" +
    "	<select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"value as text for (value,text) in frequency\"></select>\n" +
    "\n" +
    "	<div class=\"select-options\">\n" +
    "		<span ng-show=\"myFrequency.base == 4\">on </span>\n" +
    "		<select ng-show=\"myFrequency.base == 4\" class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-options=\"(value | dayName) for value in dayValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 5\" class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | numeral) for value in dayOfMonthValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "		<select ng-show=\"myFrequency.base == 6\" class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | monthName) for value in monthValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 3\" class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 2\" class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
