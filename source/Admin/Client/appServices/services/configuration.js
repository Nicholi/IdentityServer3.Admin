(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function Configuration() {

        /**
         * Returns the API base url. This can be relative or absolute
         * @returns {string}
         */
        this.apiBaseUrl = function () {
            return '/';
        };

    }

    app.module.service('configuration', Configuration);
})();
