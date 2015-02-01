(function ($, jQuery) {
    "use strict";

    angular.module('xeditable').directive('editableLifetime', function (editableDirectiveFactory, $compile, $translate, $rootScope) {

        var lifetimes = [
            {
                text: $translate.instant('COMMON.EDITABLE_LIFETIME.ONE_HOUR'),
                timeInSeconds: 60 * 60
            },
            {
                text: $translate.instant('COMMON.EDITABLE_LIFETIME.ONE_DAY'),
                timeInSeconds: 60 * 60 * 24
            },
            {
                text: $translate.instant('COMMON.EDITABLE_LIFETIME.ONE_WEEK'),
                timeInSeconds: 60 * 60 * 24 * 7
            },
            {
                text: $translate.instant('COMMON.EDITABLE_LIFETIME.ONE_MONTH'),
                timeInSeconds: 60 * 60 * 24 * 30
            },
            {
                text: $translate.instant('COMMON.EDITABLE_LIFETIME.ONE_YEAR'),
                timeInSeconds: 60 * 60 * 24 * 30 * 12
            }
        ];

        var selectTemplate = '<select class="editable-input form-control {{inputClass}} editable-lifetime" ng-model="selectedTime" ng-change="timeSelected()" ng-options="item.timeInSeconds as item.text for item in lifetimes">' +
            '<option value="">' + $translate.instant('COMMON.PLEASE_SELECT') + '</option>' +
            '</select>';

        return editableDirectiveFactory({
            directiveName: 'editableLifetime',
            inputTpl: '<input type="number" />',
            render: function () {
                this.parent.render.call(this);

                var self = this;

                var scope = $rootScope.$new(true);
                scope.inputClass = self.theme.inputClass;
                scope.lifetimes = lifetimes;
                scope.timeSelected = function () {
                    if (!scope.selectedTime) {
                        return;
                    }

                    self.scope.$data = scope.selectedTime;
                };

                $compile(selectTemplate)(scope, function (cloned) {
                    self.inputEl.after(cloned);
                });
            }
        });
    });
})();
