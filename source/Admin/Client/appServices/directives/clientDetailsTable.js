(function ($, jQuery) {
    "use strict";

    app.module.directive('clientDetailsTable', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                columns: '='
            },
            templateUrl: 'html/appServices/directives/clientDetailsTable.html',
            link: function (scope, element, attrs) {
                scope.noDataTranslationKey = 'COMMON.NO_DATA';

                if (angular.isDefined(attrs.noDataTranslationKey)) {
                    scope.noDataTranslationKey = attrs.noDataTranslationKey;
                }
            }
        }
    });
})();
