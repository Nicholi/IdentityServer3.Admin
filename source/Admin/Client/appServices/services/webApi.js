(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $http
     * @param {Configuration} configuration
     */
    function WebApi($http, configuration) {

        var baseUrl = configuration.apiBaseUrl() + 'api/';

        /**
         * @param {string} relUrl
         * @param {object} params
         * @returns {Promise}
         */
        this.performGetRequest = function (relUrl, params) {
            return $http.get(baseUrl + relUrl, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

        /**
         * @param {string} relUrl
         * @param {object} params
         * @returns {Promise}
         */
        this.performDeleteRequest = function (relUrl, params) {
            return $http.delete(baseUrl + relUrl, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

        /**
         * @param {string} relUrl
         * @param {object} data
         * @param {object?} params
         * @returns {Promise}
         */
        this.performPutRequest = function (relUrl, data, params) {
            return $http.put(baseUrl + relUrl, data, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

        /**
         * @param {string} relUrl
         * @param {object} data
         * @param {object?} params
         * @returns {Promise}
         */
        this.performPostRequest = function (relUrl, data, params) {
            return $http.post(baseUrl + relUrl, data, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

    }

    app.module.service('webApi', WebApi);
})();
