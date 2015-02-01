(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $scope
     * @param $state
     * @param $translate
     * @param $modal
     * @param {ClientsWebApi} clientsWebApi
     * @param {CellTemplate} cellTemplate
     * @param {UiHelper} uiHelper
     * @param {SpinnerService} spinnerService
     */
    function ClientOverviewController($scope, $state, $translate, $modal, clientsWebApi, cellTemplate, uiHelper, spinnerService) {
        $scope.columns = [
            {field: 'clientId', cellTemplate: cellTemplate.templates.client},
            {field: 'clientName'},
            {field: 'clientUri'},
            {field: 'enabled', cellTemplate: cellTemplate.templates.bool}
        ];

        var refresh = function (pagingInformation) {
            spinnerService.startGlobalSpinner();

            return clientsWebApi.list((pagingInformation.currentPage - 1) * pagingInformation.itemsPerPage, pagingInformation.itemsPerPage, null, pagingInformation.sortColumns)
                .then(function (data) {
                    return data;
                }, function (err) {
                    uiHelper.showErrorMessage(err, $translate.instant('CLIENTS.ERRORS.COULD_NOT_LOAD_OVERVIEW'))
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.newClient = function () {
            var modal = $modal.open({
                templateUrl: 'app/clients/newClient.html',
                controller: 'newClientController',
                backdrop: 'static'
            });

            modal.result
                .then(function (newId) {
                    uiHelper.success($translate.instant('CLIENTS.NEW.SUCCESS'));

                    $state.go('clients.details', { clientId: newId });
                }, function (err) {
                    if (err && err !== 'escape key press') {
                        uiHelper.showErrorMessage(err, $translate.instant('CLIENTS.ERRORS.COULD_NOT_CREATE_NEW_CLIENT'))
                    }
                });
        };

        $scope.refresh = refresh;
    }

    app.module.controller('clientOverviewController', ClientOverviewController);
})();
