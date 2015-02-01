(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param {NotificationService} notificationService
     */
    function UiHelper(notificationService) {

        /**
         * @param httpResult
         * @param fallbackMessage
         */
        this.showErrorMessage = function (httpResult, fallbackMessage) {
            var errorMessage;
            if (httpResult && (httpResult.status === 400) && angular.isObject(httpResult.data) && angular.isString(httpResult.data.translation)) {
                errorMessage = httpResult.data.translation;
            } else {
                errorMessage = fallbackMessage;
            }

            notificationService.error(errorMessage);

            return errorMessage;
        };

        /**
         * @param httpResult
         * @param fallbackMessage
         */
        this.getErrorMessage = function (httpResult, fallbackMessage) {
            var errorMessage;
            if (httpResult && (httpResult.status >= 400) && angular.isObject(httpResult.data) && angular.isString(httpResult.data.translation)) {
                errorMessage = httpResult.data.translation;
            } else {
                errorMessage = fallbackMessage;
            }

            return errorMessage;
        };

        /**
         * Creates an error notification
         * @param content
         */
        this.error = notificationService.error;

        /**
         * Creates a notice notification
         * @param content
         */
        this.notice = notificationService.notice;

        /**
         * Creates a success notification
         * @param content
         */
        this.success = notificationService.success;

        /**
         * Creates an info notification
         * @param content
         */
        this.info = notificationService.info;
    }

    app.module.service('uiHelper', UiHelper);
})();
