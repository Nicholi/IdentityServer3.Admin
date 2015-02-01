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
            })

            .state('clients', {
                abstract: true
            })
            .state('clients.overview', {
                url: '/clients',
                views: {
                    'content@': {
                        templateUrl: 'app/clients/clientOverview.html',
                        controller: 'clientOverviewController'
                    }
                }
            })
            .state('clients.details', {
                url: '/clients/:clientId',
                views: {
                    'content@': {
                        templateUrl: 'app/clients/clientDetails.html',
                        controller: 'clientDetailsController'
                    }
                }
            })

            .state('scopes', {
                abstract: true
            })
            .state('scopes.overview', {
                url: '/scopes',
                views: {
                    'content@': {
                        templateUrl: 'app/scopes/scopeOverview.html',
                        controller: 'scopeOverviewController'
                    }
                }
            })
            .state('scopes.details', {
                url: '/scopes/:scopeId',
                views: {
                    'content@': {
                        templateUrl: 'app/scopes/scopeDetails.html',
                        controller: 'scopeDetailsController'
                    }
                }
            });
    });
})();
