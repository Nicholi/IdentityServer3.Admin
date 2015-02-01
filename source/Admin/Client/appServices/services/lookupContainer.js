(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function LookupContainer() {
        var data = {};

        this.keys = {
            scopeTypes: 'scopeTypes',
            flows: 'flows',
            tokenUsage: 'tokenUsage',
            tokenExpiration: 'tokenExpiration',
            accessTokenType: 'accessTokenType',
            oidcScopes: 'oidcScopes',
            oidcClaims: 'oidcClaims',
            scopeToClaimMapping: 'scopeToClaimMapping'
        };

        /**
         * Adds a lookup entry to the service. The values property names are used as the lookup keys.
         * @param {String} name
         * @param {Object} values
         */
        this.addLookup = function (name, values) {
            var entry = data[name] = {};

            angular.forEach(values, function (value, key) {
                if (angular.isObject(value)) {
                    entry[key] = value;
                } else {
                    entry[key] = {text: value};
                }
            });
        };

        /**
         * Returns the lookup entry if available; otherwise, undefined.
         * @param {String} name
         * @param {Number|String} key
         * @returns {*}
         */
        this.getLookup = function (name, key) {
            return (data[name] || {})[key] || {};
        };

        /**
         * Returns the lookup entry as a key-value-pair array if available; otherwise, an empty array.
         * @param {String} name
         * @param {String?} property
         * @returns {Array<{ key:Number|String, value:* }>}
         */
        this.getLookupList = function (name, property) {
            return _.map(data[name] || {}, function (value, key) {
                return {key: key, value: property ? value[property] : value};
            })
        };

        /**
         * Returns the original data
         * @param {String} name
         * @returns {*}
         */
        this.getData = function (name) {
            return data[name] || {};
        };
    }

    app.module.service('lookupContainer', LookupContainer);
})();
