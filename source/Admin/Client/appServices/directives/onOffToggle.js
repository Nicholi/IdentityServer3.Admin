(function ($, jQuery) {
    "use strict";

    // TODO: Merge with yesNoToggle
    app.module.directive('onOffToggle', function () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                toggle: '&'
            },
            templateUrl: 'html/appServices/directives/onOffToggle.html'
        }
    });
})();
