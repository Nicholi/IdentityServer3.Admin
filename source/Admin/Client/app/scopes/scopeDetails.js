(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $scope
     * @param $translate
     * @param $state
     * @param $stateParams
     * @param $modal
     * @param {ScopesWebApi} scopesWebApi
     * @param {UiHelper} uiHelper
     * @param {LookupContainer} lookupContainer
     * @param {ConfirmDialog} confirmDialog
     * @param {SpinnerService} spinnerService
     */
    function ScopeDetailsController($scope, $state, $stateParams, $translate, $modal, scopesWebApi, uiHelper, lookupContainer, confirmDialog, spinnerService) {
        loadData();

        $scope.scopeTypes = lookupContainer.getLookupList(lookupContainer.keys.scopeTypes);

        function loadData() {
            spinnerService.startGlobalSpinner();
            var scopeId = $stateParams.scopeId;

            scopesWebApi.get(scopeId)
                .then(function (scope) {
                    $scope.scope = scope;
                }, function (err) {
                    uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_LOAD_DETAILS', {
                        scopeId: scopeId
                    }));
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.showScopeType = function () {
            return $scope.scopeTypes[$scope.scope.type].value.text;
        };

        function save() {
            spinnerService.startGlobalSpinner();

            scopesWebApi.update($scope.scope)
                .then(function () {
                    uiHelper.success($translate.instant('SCOPES.DETAILS.UPDATE_SUCCESSFUL'));
                }, function (err) {
                    uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_UPDATE'));
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.save = save;

        $scope.delete = function () {
            confirmDialog.confirmTranslated('SCOPES.OVERVIEW.CONFIRM_DELETE')
                .then(function () {
                    spinnerService.startGlobalSpinner();
                    return scopesWebApi.remove($scope.scope.id);
                })
                .then(function () {
                    $state.go('^.overview');
                    uiHelper.success($translate.instant('SCOPES.OVERVIEW.DELETE_SUCCESSFUL'));
                }, function (err) {
                    if (angular.isDefined(err)) {
                        uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_DELETE'));
                    }
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.newScopeClaim = function () {
            var modal = $modal.open({
                templateUrl: 'app/scopes/newScopeClaim.html',
                controller: 'newScopeClaimController'
            });

            modal.result
                .then(function (scopeClaim) {
                    $scope.scope.scopeClaims.push(scopeClaim);
                    save();
                });
        };

        $scope.removeScopeClaim = function (index) {
            confirmDialog.confirmTranslated('SCOPES.OVERVIEW.CONFIRM_DELETE_SCOPE_CLAIM', null, null, null, {
                scopeClaimName: $scope.scope.scopeClaims[index].name
            })
                .then(function () {
                    $scope.scope.scopeClaims.splice(index, 1);
                    save();
                });
        }
    }

    app.module.controller('scopeDetailsController', ScopeDetailsController);
})();
