(function ($, jQuery) {
    "use strict";

    app.module.directive('paging', function () {
        return {
            restrict: 'E',
            scope: {
                currentPage: '=',
                pageChanged: '&',
                totalItems: '=',
                itemsPerPage: '='
            },
            templateUrl: 'appServices/directives/paging.html',
            link: {
                pre: function (scope, element, attrs) {
                    if (!attrs.itemsPerPage) {
                        attrs.itemsPerPage = 10
                    }
                },
                post: function (scope) {
                    scope.$watch('currentPage', function (newVal, oldVal) {
                        if (newVal && newVal !== oldVal) {
                            if (scope.pageChanged) {
                                scope.pageChanged();
                            }
                        }
                    });
                }
            }
        }
    });
})();
