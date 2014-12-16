(function ($, jQuery) {
    "use strict";

    app.module.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('start', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'app/start/start.html',
                        controller: 'startController'
                    }
                }
            });
    });
})();
