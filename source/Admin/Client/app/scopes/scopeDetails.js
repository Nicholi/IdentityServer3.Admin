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

            return scopesWebApi.get(scopeId)
                .then(function (scope) {
                    $scope.scope = scope;
                }, function (err) {
                    var errMsg = $translate.instant('SCOPES.ERRORS.COULD_NOT_LOAD_DETAILS');
                    uiHelper.showErrorMessage(err, errMsg, {
                        scopeId: scopeId
                    });
                    return errMsg;
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

            return scopesWebApi.update($scope.scope)
                .then(function () {
                    uiHelper.success($translate.instant('SCOPES.DETAILS.UPDATE_SUCCESSFUL'));
                    return true;
                }, function (err) {
                    var errMsg = $translate.instant('SCOPES.ERRORS.COULD_NOT_UPDATE');
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.save = save;

        $scope.delete = function () {
            return confirmDialog.confirmTranslated('SCOPES.OVERVIEW.CONFIRM_DELETE')
                .then(function () {
                    spinnerService.startGlobalSpinner();
                    return scopesWebApi.remove($scope.scope.id);
                })
                .then(function () {
                    $state.go('^.overview');
                    uiHelper.success($translate.instant('SCOPES.OVERVIEW.DELETE_SUCCESSFUL'));
                }, function (err) {
                    var errSafe = err;
                    if (!angular.isDefined(err)) {
                        errSafe = {};
                    }
                    var errMsg = $translate.instant('SCOPES.ERRORS.COULD_NOT_DELETE');
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.newScopeClaim = function () {
            var modal = $modal.open({
                templateUrl: 'html/app/scopes/newScopeClaim.html',
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
