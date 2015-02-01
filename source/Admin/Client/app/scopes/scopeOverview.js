(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $scope
     * @param $state
     * @param $modal
     * @param $translate
     * @param {ScopesWebApi} scopesWebApi
     * @param {CellTemplate} cellTemplate
     * @param {UiHelper} uiHelper
     * @param {SpinnerService} spinnerService
     */
    function ScopeOverviewController($scope, $state, $modal, $translate, scopesWebApi, cellTemplate, uiHelper, spinnerService) {
        $scope.columns = [
            {field: 'displayName', cellTemplate: cellTemplate.templates.scope},
            {field: 'description'},
            {field: 'required', cellTemplate: cellTemplate.templates.bool},
            {field: 'enabled', cellTemplate: cellTemplate.templates.bool}
        ];

        var refresh = function (pagingInformation) {
            spinnerService.startGlobalSpinner();

            return scopesWebApi.list((pagingInformation.currentPage - 1) * pagingInformation.itemsPerPage, pagingInformation.itemsPerPage, null, pagingInformation.sortColumns)
                .then(function (data) {
                    return data;
                }, function (err) {
                    uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_LOAD_OVERVIEW'))
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        function newScope (options) {
            var modal = $modal.open(options);

            modal.result
                .then(function (newId) {
                    uiHelper.success($translate.instant('SCOPES.NEW.SUCCESS'));

                    $state.go('scopes.details', {scopeId: newId});
                }, function (err) {
                    if (err && err !== 'escape key press') {
                        uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_CREATE_NEW_SCOPE'))
                    }
                });
        }

        $scope.newIdentityScope = function () {
            newScope({
                templateUrl: 'app/scopes/newIdentityScope.html',
                controller: 'newIdentityScopeController',
                backdrop: 'static'
            });
        };

        $scope.newResourceScope = function () {
            newScope({
                templateUrl: 'app/scopes/newResourceScope.html',
                controller: 'newResourceScopeController',
                backdrop: 'static'
            });
        };

        $scope.refresh = refresh;
    }

    app.module.controller('scopeOverviewController', ScopeOverviewController);
})
();
