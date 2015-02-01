$(function () {
    FastClick.attach(document.body);
});

(function () {
    "use strict";

    window.app = window.app || { resolver: {} };
    app.module = angular.module('ttIdentityAdmin', ['ui.router', 'ui.notify', 'ui.grid', 'ui.bootstrap', 'pascalprecht.translate', 'angular-bootstrap-toggle', 'xeditable', 'angularSpinner']);
})();