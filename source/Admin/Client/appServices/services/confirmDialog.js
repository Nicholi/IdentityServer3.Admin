(function ($, jQuery) {
    "use strict";

    /**
     * @param $modal
     * @param $translate
     * @param $templateCache
     * @constructor
     */
    function ConfirmDialog($modal, $translate, $templateCache) {
        $templateCache.put('configDialog.html',
            '<div class="modal-header">' +
            '   <h3 class="modal-title">{{titleText}}</h3>' +
            '</div>' +
            '<div class="modal-body">' +
            '   <p>{{text}}</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '   <button class="btn btn-danger" ng-click="ok()">{{okText}}</button>' +
            '   <button class="btn btn-success" ng-click="cancel()">{{cancelText}}</button>' +
            '</div>'
        );

        function openConfirmDialog(text, okText, cancelText, titleText) {
            var modal = $modal.open({
                backdrop: 'static',
                templateUrl: 'configDialog.html',
                controller: 'confirmDialogController',
                resolve: {
                    text: function () {
                        return text;
                    },

                    okText: function () {
                        return okText;
                    },

                    cancelText: function () {
                        return cancelText;
                    },

                    titleText: function () {
                        return titleText;
                    }
                }
            });

            return modal.result;
        }

        /**
         * Shows a confirm dialog to the user
         * @param {string} text The dialog's body text
         * @param {string} [okText=OK] Text for "OK"-button
         * @param {string} [cancelText=Cancel] Text for "Cancel"-button
         * @param {string} [titleText=Please confirm] Text for dialog's headline
         */
        this.confirm = function (text, okText, cancelText, titleText) {
            return openConfirmDialog(
                text,
                okText || $translate.instant('COMMON.OK'),
                cancelText || $translate.instant('COMMON.CANCEL'),
                titleText || $translate.instant('COMMON.PLEASE_CONFIRM'));
        };

        /**
         * Shows a confirm dialog to the user but will translate automatically by the given keys
         * @param {string} textTranslationKey The dialog's body text
         * @param {string} [okTextTranslationKey=COMMON.OK] TranslationKey for "OK"-button
         * @param {string} [cancelTextTranslationKey=COMMON.CANCEL] TranslationKey for "Cancel"-button
         * @param {string} [titleTextTranslationKey=COMMON.PLEASE_CONFIRM] TranslationKey for dialog's headline
         * @param {object} [interpolationParameters=null] Parameters which will be used for interpolation (e.g. to replace variables)
         */
        this.confirmTranslated = function (textTranslationKey, okTextTranslationKey, cancelTextTranslationKey, titleTextTranslationKey, interpolationParameters) {
            return openConfirmDialog(
                $translate.instant(textTranslationKey, interpolationParameters),
                $translate.instant(okTextTranslationKey || 'COMMON.OK', interpolationParameters),
                $translate.instant(cancelTextTranslationKey || 'COMMON.CANCEL', interpolationParameters),
                $translate.instant(titleTextTranslationKey || 'COMMON.PLEASE_CONFIRM', interpolationParameters));
        }
    }

    /**
     * @param $scope
     * @param $modalInstance
     * @constructor
     */
    function ConfirmDialogController($scope, $modalInstance, text, okText, cancelText, titleText) {
        $scope.text = text;
        $scope.okText = okText;
        $scope.cancelText = cancelText;
        $scope.titleText = titleText;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        }
    }

    app.module.controller('confirmDialogController', ConfirmDialogController);

    app.module.service('confirmDialog', ConfirmDialog);
})();
