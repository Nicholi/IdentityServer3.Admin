(function ($, jQuery) {
    "use strict";

    app.module.directive('clientDetailsTable', function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl: 'appServices/directives/clientDetailsTable.html',
            link: function (scope, element, attrs) {
                scope.propertyExpression = 'item';
                scope.noDataTranslationKey = 'COMMON.NO_DATA';

                if (angular.isDefined(attrs.property)) {
                    scope.propertyExpression = 'item.' + attrs.property;
                }

                if (angular.isDefined(attrs.noDataTranslationKey)) {
                    scope.noDataTranslationKey = attrs.noDataTranslationKey;
                }
            }
        }
    });
})();
