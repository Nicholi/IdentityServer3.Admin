(function ($, jQuery) {
    "use strict";

    /**
     * @param $translate
     * @constructor
     *
     * TODO: Maybe it would be possible to have some IDs within the Identity Server documentation which are used
     * to get the current documentation automatically. As long we don't have them, we stick to a
     * custom json file containing the IDs and the documentation texts
     */
    function Documentation($translate) {
        this.getDocumentationText = function (id) {
            return $translate.instant('DOCUMENTATION.' + id);
        };
    }

    app.module.service('documentation', Documentation);
})();
