(function () {
    "use strict";

    /**
     * @param $scope
     * @param {DashboardWebApi} dashboardWebApi
     * @param {SpinnerService} spinnerService
     * @constructor
     */
    function StartController($scope, dashboardWebApi, spinnerService) {
        spinnerService.startGlobalSpinner();

        dashboardWebApi.totalCounts()
            .then(function (totalCounts) {
                $scope.totalCounts = totalCounts;
            })
            .finally(function () {
                spinnerService.stopGlobalSpinner();
            });
    }

    app.module.controller('startController', StartController);
})();
