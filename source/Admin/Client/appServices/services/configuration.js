(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function Configuration() {

        this.apiBaseUrl = function () {
            // TODO: This value must be set accordingly later on
            return '/';
        };

    }

    app.module.service('configuration', Configuration);
})();
