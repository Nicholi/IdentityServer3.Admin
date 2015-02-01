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
    function NewResourceScopeController($scope, $modalInstance, lookupContainer, scopesWebApi, spinnerService) {
        $scope.scopeTypes = lookupContainer.getLookupList(lookupContainer.keys.scopeTypes);
        $scope.oidcScopes = lookupContainer.getLookupList(lookupContainer.keys.oidcScopes);
        $scope.scope = {};
        $scope.scope.type = lookupContainer.getData(lookupContainer.keys.scopeTypes).resource.enumValue;

        $scope.oidcScopeChanged = function () {
            if (!$scope.selectedOidcScope) {
                return;
            }

            var oidcScope = _.find($scope.oidcScopes, function (item) {
               return item.value.value === $scope.selectedOidcScope;
            });

            $scope.scope.name = oidcScope.value.value;
            $scope.scope.displayName = oidcScope.value.text;
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            spinnerService.startGlobalSpinner();

            scopesWebApi.add($scope.scope)
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

    app.module.controller('newResourceScopeController', NewResourceScopeController);
})();
