(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function Configuration() {

        this.apiBaseUrl = function () {
            return '/';
        };

    }

    app.module.service('configuration', Configuration);
})();
