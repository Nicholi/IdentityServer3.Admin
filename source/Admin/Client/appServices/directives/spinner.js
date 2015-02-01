(function ($, jQuery) {
    "use strict";

    app.module.directive('spinner', function () {
        return {
            restrict: 'E',
            scope: {
                key: '@'
            },
            templateUrl: 'appServices/directives/spinner.html'
        }
    });
})();
