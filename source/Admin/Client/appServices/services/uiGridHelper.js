(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function UiGridHelper() {
        this.createSortInformation = function (sortColumns) {
            if (!sortColumns || !angular.isArray(sortColumns) || sortColumns.length === 0) {
                return null;
            }

            var result = [];

            angular.forEach(sortColumns, function (sortColumn) {
                result.push({
                    name: sortColumn.field,
                    uiGridSortDirection: sortColumn.sort.direction
                });
            });

            return result;
        };
    }

    app.module.service('uiGridHelper', UiGridHelper);
})();