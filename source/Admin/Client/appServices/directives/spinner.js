(function ($, jQuery) {
    "use strict";

    app.module.directive('spinner', function () {
        return {
            restrict: 'E',
            scope: {
                key: '@'
            },
            templateUrl: 'html/appServices/directives/spinner.html'
        }
    });
})();
