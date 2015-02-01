(function ($, jQuery) {
    "use strict";

    /**
     * @param $scope
     * @param $modalInstance
     * @param {LookupContainer} lookupContainer
     * @param {ScopesWebApi} scopesWebApi
     * @param {SpinnerService} spinnerService
     * @constructor
     */
    function NewIdentityScopeController($scope, $modalInstance, lookupContainer, scopesWebApi, spinnerService) {
        $scope.oidcScopes = lookupContainer.getData(lookupContainer.keys.oidcScopes);
        $scope.scope = {};
        $scope.scope.type = lookupContainer.getData(lookupContainer.keys.scopeTypes).identity.enumValue;

        var scopeClaimMapping = lookupContainer.getData(lookupContainer.keys.scopeToClaimMapping);

        $scope.oidcScopeChanged = function () {
            delete $scope.mappedClaims;

            if (!$scope.selectedOidcScope) {
                delete $scope.alwaysIncludeInIdToken;
                return;
            }

            $scope.scope.name = $scope.selectedOidcScope.value;
            $scope.scope.displayName = $scope.selectedOidcScope.text;

            var scopeClaimMap = _.find(scopeClaimMapping, function (item) {
                return item.scope === $scope.selectedOidcScope;
            });

            if (scopeClaimMap) {
                $scope.mappedClaims = scopeClaimMap.claims;
            }
        };

        function createPayload() {
            var payload = {};

            payload.name = $scope.scope.name;
            payload.displayName = $scope.scope.displayName;
            payload.type = $scope.scope.type;

            if ($scope.selectedOidcScope) {
                payload.scopeClaims = [];

                angular.forEach($scope.mappedClaims, function(item) {
                    payload.scopeClaims.push({
                        name: item.value,
                        description: item.text,
                        alwaysIncludeInIdToken: !!$scope.alwaysIncludeInIdToken
                    })
                });
            }

            return payload;
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            spinnerService.startGlobalSpinner();

            var payload = createPayload();

            scopesWebApi.add(payload)
                .then(function (newId) {
                    $modalInstance.close(newId);
                }, function (err) {
                    $modalInstance.dismiss(err);
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };
    }

    app.module.controller('newIdentityScopeController', NewIdentityScopeController);
})();
