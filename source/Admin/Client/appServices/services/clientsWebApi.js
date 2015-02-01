(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param {WebApi} webApi
     */
    function ClientsWebApi(webApi) {
        this.list = function (skip, take, searchTerm, sortColumns) {
            return webApi.performGetRequest('client/list', {
                skip: skip,
                take: take,
                searchTerm: searchTerm,
                sortColumns: sortColumns
            });
        };

        this.get = function (key) {
            return webApi.performGetRequest('client/get', {
                key: key
            });
        };

        this.add = function (client) {
            return webApi.performPostRequest('client/add', client);
        };

        this.update = function (client) {
            return webApi.performPutRequest('client/update', client);
        };

        this.remove = function (key) {
            return webApi.performDeleteRequest('client/delete', {
                key: key
            });
        };
    }

    app.module.service('clientsWebApi', ClientsWebApi);
})();
