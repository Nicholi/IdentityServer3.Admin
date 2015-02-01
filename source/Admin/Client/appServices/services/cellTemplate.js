(function ($, jQuery) {
    "use strict";

    /**
     * @param $templateCache
     * @constructor
     */
    function CellTemplate($templateCache) {
        var templateFileNames = {
            bool: 'boolCellTemplate.html',
            scope: 'scopeCellTemplate.html',
            client: 'clientCellTemplate.html'
        };

        $templateCache.put(templateFileNames.bool,
            '<div class="ui-grid-cell-contents text-center">' +
            '<i class="fa fa-circle" ng-class="{\'text-success\': COL_FIELD, \'text-danger\': !COL_FIELD}"></i>' +
            '</div>'
        );

        $templateCache.put(templateFileNames.scope,
            '<div class="ui-grid-cell-contents">' +
            '<a ui-sref="scopes.details({ scopeId: row.entity.id })"><i class="fa" ng-class="{\'fa-user\': row.entity.type === 0, \'fa-cog\': row.entity.type === 1}"></i> {{COL_FIELD}}</a>' +
            '</div>'
        );

        $templateCache.put(templateFileNames.client,
            '<div class="ui-grid-cell-contents">' +
            '<a ui-sref="clients.details({ clientId: row.entity.id })">{{COL_FIELD}}</a>' +
            '</div>'
        );

        this.templates = templateFileNames;
    }

    app.module.service('cellTemplate', CellTemplate);
})();
