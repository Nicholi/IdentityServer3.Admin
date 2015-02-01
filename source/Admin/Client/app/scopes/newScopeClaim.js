(function ($, jQuery) {
    "use strict";

    /**
     * @param $scope
     * @param $modalInstance
     * @constructor
     */
    function NewScopeClaimController($scope, $modalInstance) {
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            $modalInstance.close($scope.scopeClaim);
        };
    }

    app.module.controller('newScopeClaimController', NewScopeClaimController);
})();
