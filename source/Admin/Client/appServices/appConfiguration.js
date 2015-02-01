(function ($, jQuery) {
    "use strict";

    app.module
        .config(
        /**
         * @param $httpProvider
         * @param $translateProvider
         */
        function ($httpProvider, $translateProvider) {

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

            $translateProvider
                .translations("en", thinktecture.translations.en)
                .preferredLanguage("en");
        });

    app.module.config(
        /**
         * @param notificationServiceProvider
         */
        function (notificationServiceProvider) {
            notificationServiceProvider.setDefaults({
                styling: 'fontawesome',
                delay: 1500
            })
    });

    app.module.constant('broadcastEvents', {
        DATA_REFRESH: 'dataRefresh'
    });

    /**
     * @typedef {object} broadcastEvents
     * @property {string} DATA_REFRESH - Will be broadcasted when new data is available and all directives should call their refresh functions.
     */
})();
