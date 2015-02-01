(function ($, jQuery) {
    "use strict";

    // TODO: Merge with onOffToggle
    app.module.directive('yesNoToggle', function () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                toggle: '&'
            },
            templateUrl: 'appServices/directives/yesNoToggle.html'
        }
    });
})();
