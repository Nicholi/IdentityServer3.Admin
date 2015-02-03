(function ($, jQuery) {
    "use strict";

    app.module.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('start', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'html/app/start/start.html',
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
                        templateUrl: 'html/app/clients/clientOverview.html',
                        controller: 'clientOverviewController'
                    }
                }
            })
            .state('clients.details', {
                url: '/clients/:clientId',
                views: {
                    'content@': {
                        templateUrl: 'html/app/clients/clientDetails.html',
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
                        templateUrl: 'html/app/scopes/scopeOverview.html',
                        controller: 'scopeOverviewController'
                    }
                }
            })
            .state('scopes.details', {
                url: '/scopes/:scopeId',
                views: {
                    'content@': {
                        templateUrl: 'html/app/scopes/scopeDetails.html',
                        controller: 'scopeDetailsController'
                    }
                }
            });
    });
})();
