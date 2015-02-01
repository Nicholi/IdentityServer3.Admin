(function ($, jQuery) {
    "use strict";

    /**
     * @param $timeout
     * @param usSpinnerService
     * @constructor
     */
    function SpinnerService($timeout, usSpinnerService) {
        var globalSpinnerKey = 'globalSpinner';
        var globalSpinnerTimeout;

        this.startGlobalSpinner = function () {
            if (angular.isDefined(globalSpinnerTimeout)) {
                return;
            }

            globalSpinnerTimeout = $timeout(function () {
                usSpinnerService.spin(globalSpinnerKey);
            }, 500);
        };

        this.stopGlobalSpinner = function () {
            if (angular.isDefined(globalSpinnerTimeout)) {
                $timeout.cancel(globalSpinnerTimeout);
                globalSpinnerTimeout = undefined;
            }
            
            usSpinnerService.stop(globalSpinnerKey);
        }
    }

    app.module.service('spinnerService', SpinnerService);
})();
