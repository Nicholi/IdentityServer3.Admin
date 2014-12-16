$(function () {
    FastClick.attach(document.body);
});

(function () {
    "use strict";

    window.app = window.app || { resolver: {} };
    app.module = angular.module('ttIdentityAdmin', ['ui.router', 'ui.notify']);

    app.module
        .config(
        /**
         * @param $httpProvider
         */
        function ($httpProvider) {

            $httpProvider.interceptors.push(function ($q, $timeout) {

                return {
                    request: function (config) {
                        config = config || {};

                        if ((config.cache === false) && config.headers && angular.isUndefined(config.headers['If-Modified-Since'])) {
                            // prevents caching in win8 apps
                            config.headers['If-Modified-Since'] = 'Mon, 27 Mar 1972 00:00:00 GMT';
                        }

                        if (angular.isUndefined(config.timeout)) {
                            config.timeout = 30000;
                        }
                        // timeout is a promise => combine this promise with a $timeout-promise
                        else if (angular.isFunction(config.timeout.then)) {
                            // alas AngularJS has no implementation for $q.any([promise1, promise2,...])
                            var deferred = $q.defer();

                            var timeoutPromise = $timeout(function (reason) {
                                deferred.resolve(reason);
                            }, 30000);

                            config.timeout.then(function (reason) {
                                deferred.resolve(reason);
                                $timeout.cancel(timeoutPromise);
                            });

                            config.timeout = deferred.promise;
                        }

                        return config;
                    }
                };

            });
        });
})();