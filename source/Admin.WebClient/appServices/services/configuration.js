(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function Configuration() {

        this.apiBaseUrl = function () {
            // TODO: This value must be set accordingly later on
            return 'http://windows8vm.local:9010/';
        };

    }

    app.module.service('configuration', Configuration);
})();
