(function ($, jQuery) {
    "use strict";

    app.module.directive('documentationTooltip',
        /**
         * @param $compile
         * @param {Documentation} documentation
         */
        function ($compile, documentation) {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                element.attr('tooltip-html-unsafe', documentation.getDocumentationText(attrs.documentationTooltip));
                element.removeAttr('documentation-tooltip');

                return {
                    pre: function () {},
                    post: function (scope, element) {
                        $compile(element)(scope);
                    }
                }
            }
        }
    });
})();
