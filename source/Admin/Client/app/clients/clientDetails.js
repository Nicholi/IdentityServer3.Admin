(function ($, jQuery) {

    /**
     * @constructor
     * @param $scope
     * @param $stateParams
     * @param $state
     * @param $translate
     * @param {ClientsWebApi} clientsWebApi
     * @param {UiHelper} uiHelper
     * @param {LookupContainer} lookupContainer
     * @param {ConfirmDialog} confirmDialog
     * @param {SpinnerService} spinnerService
     */
    "use strict";
    function ClientDetailsController($scope, $stateParams, $state, $translate, clientsWebApi, uiHelper, lookupContainer, confirmDialog, spinnerService) {
        loadData();

        $scope.flows = lookupContainer.getLookupList(lookupContainer.keys.flows);
        $scope.tokenUsage = lookupContainer.getLookupList(lookupContainer.keys.tokenUsage);
        $scope.tokenExpiration = lookupContainer.getLookupList(lookupContainer.keys.tokenExpiration);
        $scope.accessTokenType = lookupContainer.getLookupList(lookupContainer.keys.accessTokenType);

        $scope.showFlows = function () {
            return $scope.flows[$scope.client.flow].value.text;
        };

        $scope.showTokenUsage = function () {
            return $scope.tokenUsage[$scope.client.refreshTokenUsage].value.text;
        };

        $scope.showTokenExpiration = function () {
            return $scope.tokenExpiration[$scope.client.refreshTokenExpiration].value.text;
        };

        $scope.showAccessTokenType = function () {
            return $scope.accessTokenType[$scope.client.accessTokenType].value.text;
        };

        $scope.columnDefinitions = {
            clientSecrets: [
                {
                    headerText: $translate.instant('COMMON.DESCRIPTION'),
                    property: 'description'
                },
                {
                    headerText: $translate.instant('COMMON.VALUE'),
                    property: 'value'
                }
                ,
                {
                    headerText: $translate.instant('COMMON.EXPIRATION'),
                    property: 'expiration'
                }
            ],
            uris: [{
                headerText: $translate.instant('COMMON.URI'),
                property: 'uri'
            }],
            scopeRestrictions: [{
                headerText: $translate.instant('COMMON.VALUE'),
                property: 'scope'
            }],
            identityProviderRestrictions: [{
                headerText: $translate.instant('COMMON.VALUE'),
                property: 'provider'
            }],
            customGrantTypeRestrictions: [{
                headerText: $translate.instant('COMMON.VALUE'),
                property: 'grantType'
            }],
            allowedCorsOrigins: [{
                headerText: $translate.instant('COMMON.VALUE'),
                property: 'origin'
            }],
            claims: [
                {
                    headerText: $translate.instant('COMMON.CLAIM'),
                    property: 'type'
                },
                {
                    headerText: $translate.instant('COMMON.VALUE'),
                    property: 'value'
                }]
        };

        function loadData() {
            spinnerService.startGlobalSpinner();

            var clientId = $stateParams.clientId;

            return clientsWebApi.get(clientId)
                .then(function (client) {
                    $scope.client = client;
                }, function (err) {
                    var errMsg = $translate.instant('CLIENTS.ERRORS.COULD_NOT_LOAD_DETAILS', {
                        clientId: clientId
                    });
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        function save() {
            spinnerService.startGlobalSpinner();

            return clientsWebApi.update($scope.client)
                .then(function () {
                    uiHelper.success($translate.instant('CLIENTS.DETAILS.UPDATE_SUCCESSFUL'));
                }, function (err) {
                    var errMsg = $translate.instant('CLIENTS.ERRORS.COULD_NOT_UPDATE');
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.delete = function () {
            return confirmDialog.confirmTranslated('CLIENTS.OVERVIEW.CONFIRM_DELETE')
                .then(function () {
                    spinnerService.startGlobalSpinner();
                    return clientsWebApi.remove($scope.client.id);
                })
                .then(function () {
                    $state.go('^.overview');
                    uiHelper.success($translate.instant('CLIENTS.OVERVIEW.DELETE_SUCCESSFUL'));
                }, function (err) {
                    var errMsg = $translate.instant('CLIENTS.ERRORS.COULD_NOT_DELETE');
                    var errSafe = err;
                    if (!angular.isDefined(err)) {
                        errSafe = {};
                    }
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.save = save;
    }

    app.module.controller('clientDetailsController', ClientDetailsController);
})();
