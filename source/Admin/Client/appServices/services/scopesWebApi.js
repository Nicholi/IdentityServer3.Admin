(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param {WebApi} webApi
     */
    function ScopesWebApi(webApi) {

        this.list = function (skip, take, searchTerm, sortColumns) {
            return webApi.performGetRequest('scope/list', {
                skip: skip,
                take: take,
                searchTerm: searchTerm,
                sortColumns: sortColumns
            });
        };

        this.get = function (key) {
            return webApi.performGetRequest('scope/get', {
                key: key
            });
        };

        this.add = function (scope) {
            return webApi.performPostRequest('scope/add', scope);
        };

        this.update = function (scope) {
            return webApi.performPutRequest('scope/update', scope);
        };

        this.remove = function (key) {
            return webApi.performDeleteRequest('scope/delete', {
                key: key
            });
        };

    }

    app.module.service('scopesWebApi', ScopesWebApi);
})();
