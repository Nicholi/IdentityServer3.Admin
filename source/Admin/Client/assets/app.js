///#source 1 1 ../app/clients/clientDetails.js
(function ($, jQuery) {

    /**
     * @constructor
     * @param $scope
     * @param $stateParams
     * @param $state
     * @param $translate
     * @param {ClientsWebApi} clientsWebApi
     * @param {UiHelper} uiHelper
     * @param {LookupContainer} lookupContainer
     * @param {ConfirmDialog} confirmDialog
     * @param {SpinnerService} spinnerService
     */
    "use strict";
    function ClientDetailsController($scope, $stateParams, $state, $translate, clientsWebApi, uiHelper, lookupContainer, confirmDialog, spinnerService) {
        loadData();

        $scope.flows = lookupContainer.getLookupList(lookupContainer.keys.flows);
        $scope.tokenUsage = lookupContainer.getLookupList(lookupContainer.keys.tokenUsage);
        $scope.tokenExpiration = lookupContainer.getLookupList(lookupContainer.keys.tokenExpiration);
        $scope.accessTokenType = lookupContainer.getLookupList(lookupContainer.keys.accessTokenType);

        $scope.showFlows = function () {
            return $scope.flows[$scope.client.flow].value.text;
        };

        $scope.showTokenUsage = function () {
            return $scope.tokenUsage[$scope.client.refreshTokenUsage].value.text;
        };

        $scope.showTokenExpiration = function () {
            return $scope.tokenExpiration[$scope.client.refreshTokenExpiration].value.text;
        };

        $scope.showAccessTokenType = function () {
            return $scope.accessTokenType[$scope.client.accessTokenType].value.text;
        };

        function loadData () {
            spinnerService.startGlobalSpinner();

            var clientId = $stateParams.clientId;

            return clientsWebApi.get(clientId)
                .then(function (client) {
                    $scope.client = client;
                }, function (err) {
                    var errMsg = $translate.instant('CLIENTS.ERRORS.COULD_NOT_LOAD_DETAILS', {
                        clientId: clientId
                    });
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        function save() {
            spinnerService.startGlobalSpinner();

            return clientsWebApi.update($scope.client)
                .then(function () {
                    uiHelper.success($translate.instant('CLIENTS.DETAILS.UPDATE_SUCCESSFUL'));
                }, function (err) {
                    var errMsg = $translate.instant('CLIENTS.ERRORS.COULD_NOT_UPDATE');
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.delete = function () {
            return confirmDialog.confirmTranslated('CLIENTS.OVERVIEW.CONFIRM_DELETE')
                .then(function () {
                    spinnerService.startGlobalSpinner();
                    return clientsWebApi.remove($scope.client.id);
                })
                .then(function () {
                    $state.go('^.overview');
                    uiHelper.success($translate.instant('CLIENTS.OVERVIEW.DELETE_SUCCESSFUL'));
                }, function (err) {
                    var errMsg = $translate.instant('CLIENTS.ERRORS.COULD_NOT_DELETE');
                    var errSafe = err;
                    if (!angular.isDefined(err)) {
                        errSafe = {};
                    }
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.save = save;
    }

    app.module.controller('clientDetailsController', ClientDetailsController);
})();

///#source 1 1 ../app/clients/clientOverview.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $scope
     * @param $state
     * @param $translate
     * @param $modal
     * @param {ClientsWebApi} clientsWebApi
     * @param {CellTemplate} cellTemplate
     * @param {UiHelper} uiHelper
     * @param {SpinnerService} spinnerService
     */
    function ClientOverviewController($scope, $state, $translate, $modal, clientsWebApi, cellTemplate, uiHelper, spinnerService) {
        $scope.columns = [
            {field: 'clientId', cellTemplate: cellTemplate.templates.client},
            {field: 'clientName'},
            {field: 'clientUri'},
            {field: 'enabled', cellTemplate: cellTemplate.templates.bool}
        ];

        var refresh = function (pagingInformation) {
            spinnerService.startGlobalSpinner();

            return clientsWebApi.list((pagingInformation.currentPage - 1) * pagingInformation.itemsPerPage, pagingInformation.itemsPerPage, null, pagingInformation.sortColumns)
                .then(function (data) {
                    return data;
                }, function (err) {
                    uiHelper.showErrorMessage(err, $translate.instant('CLIENTS.ERRORS.COULD_NOT_LOAD_OVERVIEW'))
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.newClient = function () {
            var modal = $modal.open({
                templateUrl: 'html/app/clients/newClient.html',
                controller: 'newClientController',
                backdrop: 'static'
            });

            modal.result
                .then(function (newId) {
                    uiHelper.success($translate.instant('CLIENTS.NEW.SUCCESS'));

                    $state.go('clients.details', { clientId: newId });
                }, function (err) {
                    if (err && err !== 'escape key press') {
                        uiHelper.showErrorMessage(err, $translate.instant('CLIENTS.ERRORS.COULD_NOT_CREATE_NEW_CLIENT'))
                    }
                });
        };

        $scope.refresh = refresh;
    }

    app.module.controller('clientOverviewController', ClientOverviewController);
})();

///#source 1 1 ../app/clients/newClient.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $scope
     * @param $modalInstance
     * @param {ClientsWebApi} clientsWebApi
     * @param {SpinnerService} spinnerService
     * @constructor
     */
    function NewClientController($scope, $modalInstance, clientsWebApi, spinnerService) {
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            spinnerService.startGlobalSpinner();

            clientsWebApi.add($scope.client)
                .then(function (newId) {
                    $modalInstance.close(newId);
                }, function (err) {
                    $modalInstance.dismiss(err);
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };
    }

    app.module.controller('newClientController', NewClientController);
})();

///#source 1 1 ../app/scopes/newIdentityScope.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $scope
     * @param $modalInstance
     * @param {LookupContainer} lookupContainer
     * @param {ScopesWebApi} scopesWebApi
     * @param {SpinnerService} spinnerService
     * @constructor
     */
    function NewIdentityScopeController($scope, $modalInstance, lookupContainer, scopesWebApi, spinnerService) {
        $scope.oidcScopes = lookupContainer.getData(lookupContainer.keys.oidcScopes);
        $scope.scope = {};
        $scope.scope.type = lookupContainer.getData(lookupContainer.keys.scopeTypes).identity.enumValue;

        var scopeClaimMapping = lookupContainer.getData(lookupContainer.keys.scopeToClaimMapping);

        $scope.oidcScopeChanged = function () {
            delete $scope.mappedClaims;

            if (!$scope.selectedOidcScope) {
                delete $scope.alwaysIncludeInIdToken;
                return;
            }

            $scope.scope.name = $scope.selectedOidcScope.value;
            $scope.scope.displayName = $scope.selectedOidcScope.text;

            var scopeClaimMap = _.find(scopeClaimMapping, function (item) {
                return item.scope === $scope.selectedOidcScope;
            });

            if (scopeClaimMap) {
                $scope.mappedClaims = scopeClaimMap.claims;
            }
        };

        function createPayload() {
            var payload = {};

            payload.name = $scope.scope.name;
            payload.displayName = $scope.scope.displayName;
            payload.type = $scope.scope.type;

            if ($scope.selectedOidcScope) {
                payload.scopeClaims = [];

                angular.forEach($scope.mappedClaims, function(item) {
                    payload.scopeClaims.push({
                        name: item.value,
                        description: item.text,
                        alwaysIncludeInIdToken: !!$scope.alwaysIncludeInIdToken
                    })
                });
            }

            return payload;
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            spinnerService.startGlobalSpinner();

            var payload = createPayload();

            scopesWebApi.add(payload)
                .then(function (newId) {
                    $modalInstance.close(newId);
                }, function (err) {
                    $modalInstance.dismiss(err);
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };
    }

    app.module.controller('newIdentityScopeController', NewIdentityScopeController);
})();

///#source 1 1 ../app/scopes/newResourceScope.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $scope
     * @param $modalInstance
     * @param {LookupContainer} lookupContainer
     * @param {ScopesWebApi} scopesWebApi
     * @param {SpinnerService} spinnerService
     * @constructor
     */
    function NewResourceScopeController($scope, $modalInstance, lookupContainer, scopesWebApi, spinnerService) {
        $scope.scopeTypes = lookupContainer.getLookupList(lookupContainer.keys.scopeTypes);
        $scope.oidcScopes = lookupContainer.getLookupList(lookupContainer.keys.oidcScopes);
        $scope.scope = {};
        $scope.scope.type = lookupContainer.getData(lookupContainer.keys.scopeTypes).resource.enumValue;

        $scope.oidcScopeChanged = function () {
            if (!$scope.selectedOidcScope) {
                return;
            }

            var oidcScope = _.find($scope.oidcScopes, function (item) {
               return item.value.value === $scope.selectedOidcScope;
            });

            $scope.scope.name = oidcScope.value.value;
            $scope.scope.displayName = oidcScope.value.text;
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            spinnerService.startGlobalSpinner();

            scopesWebApi.add($scope.scope)
                .then(function (newId) {
                    $modalInstance.close(newId);
                }, function (err) {
                    $modalInstance.dismiss(err);
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };
    }

    app.module.controller('newResourceScopeController', NewResourceScopeController);
})();

///#source 1 1 ../app/scopes/newScopeClaim.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $scope
     * @param $modalInstance
     * @constructor
     */
    function NewScopeClaimController($scope, $modalInstance) {
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.ok = function () {
            $modalInstance.close($scope.scopeClaim);
        };
    }

    app.module.controller('newScopeClaimController', NewScopeClaimController);
})();

///#source 1 1 ../app/scopes/scopeDetails.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $scope
     * @param $translate
     * @param $state
     * @param $stateParams
     * @param $modal
     * @param {ScopesWebApi} scopesWebApi
     * @param {UiHelper} uiHelper
     * @param {LookupContainer} lookupContainer
     * @param {ConfirmDialog} confirmDialog
     * @param {SpinnerService} spinnerService
     */
    function ScopeDetailsController($scope, $state, $stateParams, $translate, $modal, scopesWebApi, uiHelper, lookupContainer, confirmDialog, spinnerService) {
        loadData();

        $scope.scopeTypes = lookupContainer.getLookupList(lookupContainer.keys.scopeTypes);

        function loadData() {
            spinnerService.startGlobalSpinner();
            var scopeId = $stateParams.scopeId;

            return scopesWebApi.get(scopeId)
                .then(function (scope) {
                    $scope.scope = scope;
                }, function (err) {
                    var errMsg = $translate.instant('SCOPES.ERRORS.COULD_NOT_LOAD_DETAILS');
                    uiHelper.showErrorMessage(err, errMsg, {
                        scopeId: scopeId
                    });
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.showScopeType = function () {
            return $scope.scopeTypes[$scope.scope.type].value.text;
        };

        function save() {
            spinnerService.startGlobalSpinner();

            return scopesWebApi.update($scope.scope)
                .then(function () {
                    uiHelper.success($translate.instant('SCOPES.DETAILS.UPDATE_SUCCESSFUL'));
                    return true;
                }, function (err) {
                    var errMsg = $translate.instant('SCOPES.ERRORS.COULD_NOT_UPDATE');
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        }

        $scope.save = save;

        $scope.delete = function () {
            return confirmDialog.confirmTranslated('SCOPES.OVERVIEW.CONFIRM_DELETE')
                .then(function () {
                    spinnerService.startGlobalSpinner();
                    return scopesWebApi.remove($scope.scope.id);
                })
                .then(function () {
                    $state.go('^.overview');
                    uiHelper.success($translate.instant('SCOPES.OVERVIEW.DELETE_SUCCESSFUL'));
                }, function (err) {
                    var errSafe = err;
                    if (!angular.isDefined(err)) {
                        errSafe = {};
                    }
                    var errMsg = $translate.instant('SCOPES.ERRORS.COULD_NOT_DELETE');
                    uiHelper.showErrorMessage(err, errMsg);
                    return errMsg;
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        $scope.newScopeClaim = function () {
            var modal = $modal.open({
                templateUrl: 'html/app/scopes/newScopeClaim.html',
                controller: 'newScopeClaimController'
            });

            modal.result
                .then(function (scopeClaim) {
                    $scope.scope.scopeClaims.push(scopeClaim);
                    save();
                });
        };

        $scope.removeScopeClaim = function (index) {
            confirmDialog.confirmTranslated('SCOPES.OVERVIEW.CONFIRM_DELETE_SCOPE_CLAIM', null, null, null, {
                scopeClaimName: $scope.scope.scopeClaims[index].name
            })
                .then(function () {
                    $scope.scope.scopeClaims.splice(index, 1);
                    save();
                });
        }
    }

    app.module.controller('scopeDetailsController', ScopeDetailsController);
})();

///#source 1 1 ../app/scopes/scopeOverview.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $scope
     * @param $state
     * @param $modal
     * @param $translate
     * @param {ScopesWebApi} scopesWebApi
     * @param {CellTemplate} cellTemplate
     * @param {UiHelper} uiHelper
     * @param {SpinnerService} spinnerService
     */
    function ScopeOverviewController($scope, $state, $modal, $translate, scopesWebApi, cellTemplate, uiHelper, spinnerService) {
        $scope.columns = [
            {field: 'displayName', cellTemplate: cellTemplate.templates.scope},
            {field: 'description'},
            {field: 'required', cellTemplate: cellTemplate.templates.bool},
            {field: 'enabled', cellTemplate: cellTemplate.templates.bool}
        ];

        var refresh = function (pagingInformation) {
            spinnerService.startGlobalSpinner();

            return scopesWebApi.list((pagingInformation.currentPage - 1) * pagingInformation.itemsPerPage, pagingInformation.itemsPerPage, null, pagingInformation.sortColumns)
                .then(function (data) {
                    return data;
                }, function (err) {
                    uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_LOAD_OVERVIEW'))
                })
                .finally(function () {
                    spinnerService.stopGlobalSpinner();
                });
        };

        function newScope (options) {
            var modal = $modal.open(options);

            modal.result
                .then(function (newId) {
                    uiHelper.success($translate.instant('SCOPES.NEW.SUCCESS'));

                    $state.go('scopes.details', {scopeId: newId});
                }, function (err) {
                    if (err && err !== 'escape key press') {
                        uiHelper.showErrorMessage(err, $translate.instant('SCOPES.ERRORS.COULD_NOT_CREATE_NEW_SCOPE'))
                    }
                });
        }

        $scope.newIdentityScope = function () {
            newScope({
                templateUrl: 'html/app/scopes/newIdentityScope.html',
                controller: 'newIdentityScopeController',
                backdrop: 'static'
            });
        };

        $scope.newResourceScope = function () {
            newScope({
                templateUrl: 'html/app/scopes/newResourceScope.html',
                controller: 'newResourceScopeController',
                backdrop: 'static'
            });
        };

        $scope.refresh = refresh;
    }

    app.module.controller('scopeOverviewController', ScopeOverviewController);
})
();

///#source 1 1 ../app/start/start.js
(function () {
    "use strict";

    /**
     * @param $scope
     * @param {DashboardWebApi} dashboardWebApi
     * @param {SpinnerService} spinnerService
     * @constructor
     */
    function StartController($scope, dashboardWebApi, spinnerService) {
        spinnerService.startGlobalSpinner();

        dashboardWebApi.totalCounts()
            .then(function (totalCounts) {
                $scope.totalCounts = totalCounts;
            })
            .finally(function () {
                spinnerService.stopGlobalSpinner();
            });
    }

    app.module.controller('startController', StartController);
})();

///#source 1 1 ../app/translations/translations-en.js
window.thinktecture = window.thinktecture || {};
window.thinktecture.translations = {};

window.thinktecture.translations.en = {
    'APP_TITLE': 'Thinktecture IdentityServer3 Admin',

    'MENU': {
        'SCOPES': 'Scopes',
        'CLIENTS': 'Clients'
    },

    'START': {
        'TITLE': 'Thinktecture IdentityServer3 Admin UI',
        'WELCOME_INFORMATION': 'Welcome to Thinktecture IdentityServer3 Admin UI! Please use the menu at the top of the page to go to the specific settings.',
        'STATISTICS': 'Statistics',
        'CLIENTS_TOTAL_COUNT': 'Clients',
        'SCOPES_TOTAL_COUNT': 'Scopes'
    },

    'SCOPES': {
        'COMMON': {
            'NAME': 'Name',
            'DISPLAY_NAME': 'Display Name',
            'DESCRIPTION': 'Description',
            'ENABLED': 'State',
            'REQUIRED': 'Required',
            'EMPHASIZE': 'Emphasize',
            'TYPE': 'Type',
            'CLAIMS': 'Claims',
            'INCLUDE_ALL_CLAIMS_FOR_USER': 'Include All Claims For User',
            'CLAIMS_RULE': 'Claims Rule',
            'SHOW_IN_DISCOVERY_DOCUMENT': 'Show In Discovery Document'
        },
        'OVERVIEW': {
            'TITLE': 'Scopes',
            'CONFIRM_DELETE': 'Do you really want to delete this scope?',
            'CONFIRM_DELETE_SCOPE_CLAIM': 'Do you really want to delete the scope claim “{{scopeClaimName}}“?',
            'NEW_IDENTITY_SCOPE': 'New identity scope',
            'NEW_RESOURCE_SCOPE': 'New resource scope',
            'DELETE_SUCCESSFUL': 'The scope has been deleted successfully'
        },
        'NEW': {
            'TITLE_IDENTITY_SCOPE': 'Create a new identity scope',
            'TITLE_RESOURCE_SCOPE': 'Create a new resource scope',
            'NOTICE': 'Additional settings can be provided after creating a new scope.',
            'NOTICE_OIDC': 'You can either choose one of the OIDC default scopes or create your own.' +
            'If you select an OIDC default scope, all necessary claims will be added automatically. Additional settings can be provided after creating a new scope.',
            'SUCCESS': 'Your new scope has been created.',
            'OIDC_DEFAULT_SCOPE': 'OIDC default scopes',
            'SCOPES_WILL_BE_ADDED': 'The following claims will be added to the scope:'
        },
        'NEW_SCOPE_CLAIM': {
            'TITLE': 'Create a new scope claim'
        },
        'DETAILS': {
            'TITLE': 'Scope Details',
            'ALWAYS_INCLUDE_IN_ID_TOKEN': 'Always Include In ID Token',
            'NO_CLAIMS': 'No claims are associated with this scope.',
            'SETTING': 'Setting',
            'VALUE': 'Value',
            'UPDATE_SUCCESSFUL': 'Scope has been updated successfully.'
        },
        'ERRORS': {
            'COULD_NOT_LOAD_DETAILS': 'Details could not be loaded for scope with ID “{{scopeId}}”.',
            'COULD_NOT_LOAD_OVERVIEW': 'Scopes could not be loaded.',
            'COULD_NOT_CREATE_NEW_SCOPE': 'New scope could not be created.',
            'COULD_NOT_UPDATE': 'Scope could not be updated.',
            'COULD_NOT_DELETE': 'Scope could not be deleted.'
        }
    },

    'CLIENTS': {
        'COMMON': {
            'ENABLED': 'State',
            'CLIENT_ID': 'Client ID',
            'CLIENT_SECRET': 'Client Secret',
            'CLIENT_NAME': 'Client Name',
            'CLIENT_URI': 'Client URI',
            'LOGO_URI': 'Logo URI',
            'REQUIRE_CONSENT': 'Require Consent',
            'ALLOW_REMEMBER_CONSENT': 'Allow Remember Consent',
            'FLOW': 'Flow',
            'REDIRECT_URIS': 'Redirect URIs',
            'POST_LOGOUT_REDIRECT_URIS': 'POST Logout Redirect URIs',
            'SCOPE_RESTRICTIONS': 'Scope Restrictions',
            'IDENTITY_TOKEN_LIFETIME': 'Identity Token Lifetime',
            'ACCESS_TOKEN_LIFETIME': 'Access Token Lifetime',
            'AUTHORIZATION_CODE_LIFETIME': 'Authorization Code Lifetime',
            'ABSOLUTE_REFRESH_TOKEN_LIFETIME': 'Absolute Refresh Token Lifetime',
            'SLIDING_REFRESH_TOKEN_LIFETIME': 'Sliding Refresh Token Lifetime',
            'REFRESH_TOKEN_USAGE': 'Refresh Token Usage',
            'REFRESH_TOKEN_EXPIRATION': 'Refresh Token Expiration',
            'IDENTITY_TOKEN_SIGNING_KEY_TYPE': 'Identity Token Signing Key Type',
            'ACCESS_TOKEN_TYPE': 'Access Token Type',
            'ENABLE_LOCAL_LOGIN': 'Enable Local Login',
            'IDENTITY_PROVIDER_RESTRICTIONS': 'Identity Provider Restrictions',
            'INCLUDE_JWT_ID': 'Include JWT ID',
            'CLAIMS': 'Client claims',
            'CUSTOM_GRANT_TYPE_RESTRICTIONS': 'Custom grant type restrictions',
            'PREFIX_CLIENT_CLAIMS': 'Prefix client claims',
            'ALWAYS_SEND_CLIENT_CLAIMS': 'Always send client claims',
            'CLIENT_SECRETS': 'Client secrets'
        },
        'OVERVIEW': {
            'TITLE': 'Clients',
            'CONFIRM_DELETE': 'Do you really want to delete this client?',
            'DELETE_SUCCESSFUL': 'The client has been deleted successfully'
        },
        'NEW': {
            'TITLE': 'Create a new client',
            'NOTICE': 'Additional settings can be provided after creating a new client.',
            'SUCCESS': 'Your new client has been created.'
        },
        'DETAILS': {
            'TITLE': 'Client Details',
            'SETTING': 'Setting',
            'VALUE': 'Value',
            'NO_REDIRECT_URIS': 'No redirect URIs are associated with this client.',
            'NO_POST_LOGOUT_REDIRECT_URIS': 'No POST logout redirect URIs are associated with this client.',
            'NO_SCOPE_RESTRICTIONS': 'No scope restrictions are associated with this client.',
            'NO_IDENTITY_PROVIDER_RESTRICTIONS': 'No identity provider restrictions are associated with this client.',
            'UPDATE_SUCCESSFUL': 'Client has been updated successfully.',
            'NO_CLAIMS': 'No client claims are associated with this client.',
            'NO_CUSTOM_GRANT_TYPE_RESTRICTIONS': 'No custom grant type restrictions are associated with this client.',
            'NO_CLIENT_SECRETS': 'No client secrets are associated with this client.',
            'TABS': {
                'GENERAL': 'General',
                'URIS_AND_RESTRICTIONS': 'URIs and restrictions',
                'TOKENS_AND_LIFETIME': 'Tokens and lifetime',
                'CLIENT_CLAIMS': 'Client claims'
            }
        },
        'ERRORS': {
            'COULD_NOT_LOAD_DETAILS': 'Details could not be loaded for client with ID “{{clientId}}”.',
            'COULD_NOT_LOAD_OVERVIEW': 'Clients could not be loaded.',
            'COULD_NOT_CREATE_NEW_CLIENT': 'New client could not be created.',
            'COULD_NOT_UPDATE': 'Client could not be updated.',
            'COULD_NOT_DELETE': 'Client could not be deleted.'
        }
    },

    'COMMON': {
        'TOGGLES': {
            'ON': 'On',
            'OFF': 'Off',
            'YES': 'Yes',
            'NO': 'No'
        },
        'NO_DATA': 'No data',
        'DESCRIPTION': 'Description',
        'VALUE': 'Value',
        'NEW': 'New',
        'OK': 'OK',
        'CANCEL': 'Cancel',
        'DELETE': 'Delete',
        'PLEASE_SELECT': 'Please select...',
        'EMPTY_FIELD': 'empty',
        'PLEASE_CONFIRM': 'Please confirm',
        'PAGING': {
            'PREVIOUS': '‹',
            'NEXT': '›',
            'FIRST': '«',
            'LAST': '»'
        },
        'EDITABLE_LIFETIME': {
            'ONE_HOUR': '1 hour',
            'ONE_DAY': '1 day',
            'ONE_WEEK': '1 week',
            'ONE_MONTH': '1 month',
            'ONE_YEAR': '1 year'
        }
    },

    // TODO: This is currently not the right place for the documentation. Take a look at documentation.js for further information
    DOCUMENTATION: {
        'CLIENTS' : {
            'ENABLED': 'Specifies if client is enabled. Defaults to <code>true</code>.',
            'ID': 'Unique ID of the client',
            'SECRETS': 'List of Client secrets - only relevant for flows that require a secret',
            'NAME': 'Client display name (used for logging and consent screen)',
            'URI': 'URI to further information about client (used on consent screen)',
            'LOGO_URI': 'URI to client logo (used on consent screen)',
            'REQUIRE_CONSENT': 'Specifies whether a consent screen is required. Defaults to <code>true</code>.',
            'ALLOW_REMEMBER_CONSENT': 'Specifies whether user can choose to store consent decisions. Defaults to <code>true</code>.',
            'FLOW': 'Specifies allowed flow for client (either <code>AuthorizationCode</code>, <code>Implicit</code>, <code>Hybrid</code>, <code>ResourceOwner</code>, <code>ClientCredentials</code> or <code>Custom</code>). Defaults to <code>Implicit</code>.',
            'REDIRECT_URIS': 'Specifies the allowed URIs to return tokens or authorization codes to',
            'POST_LOGOUT_REDIRECT_URIS': 'Specifies allowed URIs to redirect to after logout',
            'SCOPE_RESTRICTIONS': 'Specifies the scopes that the client is allowed to request. If empty, the client can request all scopes. Defaults to an empty collection.',
            'IDENTITY_TOKEN_LIFETIME': 'Lifetime to identity token in seconds (defaults to 300 seconds / 5 minutes)',
            'ACCESS_TOKEN_LIFETIME': 'Lifetime of access token in seconds (defaults to 3600 seconds / 1 hour)',
            'AUTHORIZATION_CODE_LIFETIME': 'Lifetime of authorization code in seconds (defaults to 300 seconds / 5 minutes)',
            'ABSOLUTE_REFRESH_TOKEN_LIFETIME': 'Maximum lifetime of a refresh token in seconds. Defaults to 2592000 seconds / 30 days',
            'SLIDING_REFRESH_TOKEN_LIFETIME': 'Sliding lifetime of a refresh token in seconds. Defaults to 1296000 seconds / 15 days',
            'REFRESH_TOKEN_USAGE': '<code>ReUse</code>: the refresh token handle will stay the same when refreshing tokens.<br/><code>OneTime</code>: the refresh token handle will be updated when refreshing tokens.',
            'REFRESH_TOKEN_EXPIRATION': '<code>Absolute</code>: the refresh token will expire on a fixed point in time (specified by the AbsoluteRefreshTokenLifetime).<br/><code>Sliding</code>: when refreshing the token, the lifetime of the refresh token will be renewed (by the amount specified in SlidingRefreshTokenLifetime). The lifetime will not exceed.',
            'ACCESS_TOKEN_TYPE': 'Specifies whether the access token is a reference token or a self contained JWT token (defaults to <code>Jwt</code>).',
            'ENABLE_LOCAL_LOGIN': 'Specifies if this client can use local accounts, or external IdPs only. Defaults to <code>true</code>.',
            'IDENTITY_PROVIDER_RESTRICTIONS': 'Specifies which external IdPs can be used with this client (if list is empty all IdPs are allowed). Defaults to empty.',
            'INCLUDE_JWT_ID': 'Specifies whether JWT access tokens should have an embedded unique ID (via the <code>jti</code> claim).',
            'CLAIMS': 'Allows settings claims for the client (will be included in the access token).',
            'ALWAYS_SEND_CLIENT_CLAIMS': 'If set, the client claims will be send for every flow. If not, only for client credentials flow (default is <code>false</code>)',
            'PREFIX_CLIENT_CLAIMS': 'If set, all client claims will be prefixed with client_ to make sure they don\'t accidentally collide with user claims. Default is <code>true</code>.',
            'CUSTOM_GRANT_TYPE_RESTRICTIONS': 'List of allowed custom grant types when Flow is set to <code>Custom</code>. If the list is empty, all custom grant types are allowed. Defaults to empty.'
        },
        'SCOPES': {
            'ENABLED': 'Indicates if scope is enabled and can be requested. Defaults to <code>true</code>.',
            'NAME': 'Name of the scope. This is the value a client will use to request the scope.',
            'DISPLAY_NAME': 'Display name for consent screen.',
            'DESCRIPTION': 'Description for the consent screen.',
            'REQUIRED': 'Specifies whether the user can de-select the scope on the consent screen. Defaults to <code>false</code>.',
            'EMPHASIZE': 'Specifies whether the consent screen will emphasize this scope. Use this setting for sensitive or important scopes. Defaults to <code>false</code>.',
            'TYPE': 'Either <code>Identity</code> (OpenID Connect related) or <code>Resource</code> (OAuth2 resources). Defaults to <code>Resource</code>.',
            'CLAIMS': 'List of user claims that should be included in the identity (identity scope) or access token (resource scope).',
            'INCLUDE_ALL_CLAIMS_FOR_USER': 'If enabled, all claims for the user will be included in the token. Defaults to <code>false</code>.',
            'CLAIMS_RULE': 'Rule for determining which claims should be included in the token (this is implementation specific)',
            'SHOW_IN_DISCOVERY_DOCUMENT': 'Specifies whether this scope is shown in the discovery document. Defaults to <code>true</code>.'
        },
        'SCOPE_CLAIMS': {
            'NAME': 'Name of the claim',
            'DESCRIPTION': 'Description of the claim',
            'ALWAYS_INCLUDE_IN_ID_TOKEN': 'Specifies whether this claim should always be present in the identity token (even if an access token has been requested as well). Applies to identity scopes only. Defaults to <code>false</code>.'
        }
    }
};
///#source 1 1 ../app/appController.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param {LookupContainer} lookupContainer
     * @constructor
     */
    function AppController(lookupContainer) {
        var oidcScopes = {
            openId: {value: 'openid', text: 'Open ID'},
            profile: {value: 'profile', text: 'Profile'},
            email: {value: 'email', text: 'E-Mail'},
            address: {value: 'address', text: 'Address'},
            phone: {value: 'phone', text: 'Phone'},
            offlineAccess: {value: 'offline_access', text: 'Offline Access'}
        };

        var oidcClaims = {
            subject: {value: 'sub', text: 'Subject'},
            name: {value: 'name', text: 'Name'},
            givenName: {value: 'given_name', text: 'Given name'},
            familyName: {value: 'family_name', text: 'Family name'},
            middleName: {value: 'middle_name', text: 'Middle name'},
            nickName: {value: 'nickname', text: 'Nick name'},
            preferredUserName: {value: 'preferred_username', text: 'Preferred username'},
            profile: {value: 'profile', text: 'Profile'},
            picture: {value: 'picture', text: 'Picture'},
            webSite: {value: 'website', text: 'WebSite'},
            email: {value: 'email', text: 'Email'},
            emailVerified: {value: 'email_verified', text: 'Email verified'},
            gender: {value: 'gender', text: 'Gender'},
            birthDate: {value: 'birthdate', text: 'Birth date'},
            zoneInfo: {value: 'zoneinfo', text: 'Zone info'},
            locale: {value: 'locale', text: 'Locale'},
            phoneNumber: {value: 'phone_number', text: 'Phone number'},
            phoneNumberVerified: {value: 'phone_number_verified', text: 'Phone number verified'},
            address: {value: 'address', text: 'Address'},
            audience: {value: 'aud', text: 'Audience'},
            issuer: {value: 'iss', text: 'Issuer'},
            notBefore: {value: 'nbf', text: 'Not before'},
            expiration: {value: 'exp', text: 'Expiration'},
            updatedAt: {value: 'updated_at', text: 'Updated at'},
            issuedAt: {value: 'iat', text: 'Issued at'},
            authenticationMethod: {value: 'amr', text: 'Authentication method'},
            authenticationContextClassReference: {value: 'acr', text: 'Authentication context class reference'},
            authenticationTime: {value: 'auth_time', text: 'Authentication time'},
            authorizedParty: {value: 'azp', text: 'Authorized party'},
            accessTokenHash: {value: 'at_hash', text: 'Access token hash'},
            authorizationCodeHash: {value: 'c_hash', text: 'Authorization code hash'},
            nonce: {value: 'nonce', text: 'Nonce'},
            jwtId: {value: 'jti', text: 'JWT id'}
        };

        var scopeToClaimMapping = {
            openId: {
                scope: oidcScopes.openId,
                claims: [
                    oidcClaims.subject
                ]
            },
            phone: {
                scope: oidcScopes.phone,
                claims: [
                    oidcClaims.phoneNumber,
                    oidcClaims.phoneNumberVerified
                ]
            },
            address: {
                scope: oidcScopes.address,
                claims: [
                    oidcClaims.address
                ]
            },
            email: {
                scope: oidcScopes.email,
                claims: [
                    oidcClaims.email,
                    oidcClaims.emailVerified
                ]
            },
            profile: {
                scope: oidcScopes.profile,
                claims: [
                    oidcClaims.name,
                    oidcClaims.familyName,
                    oidcClaims.givenName,
                    oidcClaims.middleName,
                    oidcClaims.nickName,
                    oidcClaims.preferredUserName,
                    oidcClaims.profile,
                    oidcClaims.picture,
                    oidcClaims.webSite,
                    oidcClaims.gender,
                    oidcClaims.birthDate,
                    oidcClaims.zoneInfo,
                    oidcClaims.locale,
                    oidcClaims.updatedAt
                ]
            }
        };

        // TODO: Should the text values be translated
        lookupContainer.addLookup(lookupContainer.keys.scopeTypes, {
            identity: {enumValue: 0, text: 'Identity'},
            resource: {enumValue: 1, text: 'Resource'}
        });

        lookupContainer.addLookup(lookupContainer.keys.flows, {
            authorizationCode: {enumValue: 0, text: 'Authorization code'},
            implicit: {enumValue: 1, text: 'Implicit'},
            hybrid: {enumValue: 2, text: 'Hybrid'},
            clientCredentials: {enumValue: 3, text: 'Client credentials'},
            resourceOwner: {enumValue: 4, text: 'Resource owner'},
            custom: {enumValue: 5, text: 'Custom'}
        });

        lookupContainer.addLookup(lookupContainer.keys.accessTokenType, {
            jwt: {enumValue: 0, text: 'Jwt'},
            reference: {enumValue: 1, text: 'Reference'}
        });

        lookupContainer.addLookup(lookupContainer.keys.tokenExpiration, {
            sliding: {enumValue: 0, text: 'Sliding'},
            absolute: {enumValue: 1, text: 'Absolute'}
        });

        lookupContainer.addLookup(lookupContainer.keys.tokenUsage, {
            reUse: {enumValue: 0, text: 'Re use'},
            oneTimeOnly: {enumValue: 1, text: 'One time only'}
        });

        lookupContainer.addLookup(lookupContainer.keys.oidcScopes, oidcScopes);
        lookupContainer.addLookup(lookupContainer.keys.oidcClaims, oidcClaims);
        lookupContainer.addLookup(lookupContainer.keys.scopeToClaimMapping, scopeToClaimMapping);
    }

    app.module.controller('appController', AppController);
})();
///#source 1 1 ../appServices/directives/clientDetailsTable.js
(function ($, jQuery) {
    "use strict";

    app.module.directive('clientDetailsTable', function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl: 'html/appServices/directives/clientDetailsTable.html',
            link: function (scope, element, attrs) {
                scope.propertyExpression = 'item';
                scope.noDataTranslationKey = 'COMMON.NO_DATA';

                if (angular.isDefined(attrs.property)) {
                    scope.propertyExpression = 'item.' + attrs.property;
                }

                if (angular.isDefined(attrs.noDataTranslationKey)) {
                    scope.noDataTranslationKey = attrs.noDataTranslationKey;
                }
            }
        }
    });
})();

///#source 1 1 ../appServices/directives/defaultGrid.js
(function ($, jQuery) {
    "use strict";

    app.module.directive('defaultGrid', function (uiGridHelper, broadcastEvents) {
        return {
            restrict: 'E',
            scope: {
                onRefresh: '&',
                columns: '='
            },
            templateUrl: 'html/appServices/directives/defaultGrid.html',
            link: function (scope, element, attrs) {
                var pagingInformation = {
                    itemsPerPage: 10,
                    currentPage: 1,
                    totalItems: 0
                };

                scope.paging = pagingInformation;

                function refresh() {
                    var onRefreshHandler = scope.onRefresh();

                    if (angular.isDefined(onRefreshHandler)) {
                        onRefreshHandler(scope.paging)
                            .then(function (result) {
                                scope.gridOptions.data = result.items;
                                scope.paging.totalItems = result.totalCount;
                            });
                    }
                }

                scope.refresh = refresh;

                scope.gridOptions = {
                    enableColumnMenus: false,
                    useExternalSorting: true,
                    columnDefs: scope.columns,
                    minRowsToShow: scope.paging.itemsPerPage,
                    onRegisterApi: function (gridApi) {
                        scope.gridApi = gridApi;
                        scope.gridApi.core.on.sortChanged(scope, function (grid, sortColumns) {
                            scope.paging.sortColumns = uiGridHelper.createSortInformation(sortColumns);
                            refresh();
                        });
                    }
                };

                scope.$on(broadcastEvents.DATA_REFRESH, refresh);

                refresh();
            }
        }
    });
})();

///#source 1 1 ../appServices/directives/documentationTooltip.js
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

///#source 1 1 ../appServices/directives/footerNav.js
(function ($, jQuery) {
    "use strict";

    app.module.directive('footerNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'html/appServices/directives/footerNav.html'
        }
    });
})();

///#source 1 1 ../appServices/directives/navbar.js
(function ($, jQuery) {
    "use strict";

    app.module.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'html/appServices/directives/navbar.html',
            link: function (scope, element, attrs) {

            }
        }
    });
})();

///#source 1 1 ../appServices/directives/onOffToggle.js
(function ($, jQuery) {
    "use strict";

    // TODO: Merge with yesNoToggle
    app.module.directive('onOffToggle', function () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                toggle: '&'
            },
            templateUrl: 'html/appServices/directives/onOffToggle.html'
        }
    });
})();

///#source 1 1 ../appServices/directives/paging.js
(function ($, jQuery) {
    "use strict";

    app.module.directive('paging', function () {
        return {
            restrict: 'E',
            scope: {
                currentPage: '=',
                pageChanged: '&',
                totalItems: '=',
                itemsPerPage: '='
            },
            templateUrl: 'html/appServices/directives/paging.html',
            link: {
                pre: function (scope, element, attrs) {
                    if (!attrs.itemsPerPage) {
                        attrs.itemsPerPage = 10
                    }
                },
                post: function (scope) {
                    scope.$watch('currentPage', function (newVal, oldVal) {
                        if (newVal && newVal !== oldVal) {
                            if (scope.pageChanged) {
                                scope.pageChanged();
                            }
                        }
                    });
                }
            }
        }
    });
})();

///#source 1 1 ../appServices/directives/spinner.js
(function ($, jQuery) {
    "use strict";

    app.module.directive('spinner', function () {
        return {
            restrict: 'E',
            scope: {
                key: '@'
            },
            templateUrl: 'html/appServices/directives/spinner.html'
        }
    });
})();

///#source 1 1 ../appServices/directives/yesNoToggle.js
(function ($, jQuery) {
    "use strict";

    // TODO: Merge with onOffToggle
    app.module.directive('yesNoToggle', function () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                toggle: '&'
            },
            templateUrl: 'html/appServices/directives/yesNoToggle.html'
        }
    });
})();

///#source 1 1 ../appServices/services/cellTemplate.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $templateCache
     * @constructor
     */
    function CellTemplate($templateCache) {
        var templateFileNames = {
            bool: 'boolCellTemplate.html',
            scope: 'scopeCellTemplate.html',
            client: 'clientCellTemplate.html'
        };

        $templateCache.put(templateFileNames.bool,
            '<div class="ui-grid-cell-contents text-center">' +
            '<i class="fa fa-circle" ng-class="{\'text-success\': COL_FIELD, \'text-danger\': !COL_FIELD}"></i>' +
            '</div>'
        );

        $templateCache.put(templateFileNames.scope,
            '<div class="ui-grid-cell-contents">' +
            '<a ui-sref="scopes.details({ scopeId: row.entity.id })"><i class="fa" ng-class="{\'fa-user\': row.entity.type === 0, \'fa-cog\': row.entity.type === 1}"></i> {{COL_FIELD}}</a>' +
            '</div>'
        );

        $templateCache.put(templateFileNames.client,
            '<div class="ui-grid-cell-contents">' +
            '<a ui-sref="clients.details({ clientId: row.entity.id })">{{COL_FIELD}}</a>' +
            '</div>'
        );

        this.templates = templateFileNames;
    }

    app.module.service('cellTemplate', CellTemplate);
})();

///#source 1 1 ../appServices/services/clientsWebApi.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param {WebApi} webApi
     */
    function ClientsWebApi(webApi) {
        this.list = function (skip, take, searchTerm, sortColumns) {
            return webApi.performGetRequest('client/list', {
                skip: skip,
                take: take,
                searchTerm: searchTerm,
                sortColumns: sortColumns
            });
        };

        this.get = function (key) {
            return webApi.performGetRequest('client/get', {
                key: key
            });
        };

        this.add = function (client) {
            return webApi.performPostRequest('client/add', client);
        };

        this.update = function (client) {
            return webApi.performPutRequest('client/update', client);
        };

        this.remove = function (key) {
            return webApi.performDeleteRequest('client/delete', {
                key: key
            });
        };
    }

    app.module.service('clientsWebApi', ClientsWebApi);
})();

///#source 1 1 ../appServices/services/configuration.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function Configuration() {

        /**
         * Returns the API base url. This can be relative or absolute
         * @returns {string}
         */
        this.apiBaseUrl = function () {
            return '/';
        };

    }

    app.module.service('configuration', Configuration);
})();

///#source 1 1 ../appServices/services/confirmDialog.js
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

///#source 1 1 ../appServices/services/dashboardWebApi.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param {WebApi} webApi
     * @constructor
     */
    function DashboardWebApi(webApi) {
        this.totalCounts = function () {
            return webApi.performGetRequest('dashboard/totalCounts', null);
        }
    }

    app.module.service('dashboardWebApi', DashboardWebApi);
})();

///#source 1 1 ../appServices/services/documentation.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $translate
     * @constructor
     *
     * TODO: Maybe it would be possible to have some IDs within the Identity Server documentation which are used
     * to get the current documentation automatically. As long we don't have them, we stick to a
     * custom json file containing the IDs and the documentation texts
     */
    function Documentation($translate) {
        this.getDocumentationText = function (id) {
            return $translate.instant('DOCUMENTATION.' + id);
        };
    }

    app.module.service('documentation', Documentation);
})();

///#source 1 1 ../appServices/services/editableLifetime.js
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

///#source 1 1 ../appServices/services/lookupContainer.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function LookupContainer() {
        var data = {};

        this.keys = {
            scopeTypes: 'scopeTypes',
            flows: 'flows',
            tokenUsage: 'tokenUsage',
            tokenExpiration: 'tokenExpiration',
            accessTokenType: 'accessTokenType',
            oidcScopes: 'oidcScopes',
            oidcClaims: 'oidcClaims',
            scopeToClaimMapping: 'scopeToClaimMapping'
        };

        /**
         * Adds a lookup entry to the service. The values property names are used as the lookup keys.
         * @param {String} name
         * @param {Object} values
         */
        this.addLookup = function (name, values) {
            var entry = data[name] = {};

            angular.forEach(values, function (value, key) {
                if (angular.isObject(value)) {
                    entry[key] = value;
                } else {
                    entry[key] = {text: value};
                }
            });
        };

        /**
         * Returns the lookup entry if available; otherwise, undefined.
         * @param {String} name
         * @param {Number|String} key
         * @returns {*}
         */
        this.getLookup = function (name, key) {
            return (data[name] || {})[key] || {};
        };

        /**
         * Returns the lookup entry as a key-value-pair array if available; otherwise, an empty array.
         * @param {String} name
         * @param {String?} property
         * @returns {Array<{ key:Number|String, value:* }>}
         */
        this.getLookupList = function (name, property) {
            return _.map(data[name] || {}, function (value, key) {
                return {key: key, value: property ? value[property] : value};
            })
        };

        /**
         * Returns the original data
         * @param {String} name
         * @returns {*}
         */
        this.getData = function (name) {
            return data[name] || {};
        };
    }

    app.module.service('lookupContainer', LookupContainer);
})();

///#source 1 1 ../appServices/services/scopesWebApi.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param {WebApi} webApi
     */
    function ScopesWebApi(webApi) {

        this.list = function (skip, take, searchTerm, sortColumns) {
            return webApi.performGetRequest('scope/list', {
                skip: skip,
                take: take,
                searchTerm: searchTerm,
                sortColumns: sortColumns
            });
        };

        this.get = function (key) {
            return webApi.performGetRequest('scope/get', {
                key: key
            });
        };

        this.add = function (scope) {
            return webApi.performPostRequest('scope/add', scope);
        };

        this.update = function (scope) {
            return webApi.performPutRequest('scope/update', scope);
        };

        this.remove = function (key) {
            return webApi.performDeleteRequest('scope/delete', {
                key: key
            });
        };

    }

    app.module.service('scopesWebApi', ScopesWebApi);
})();

///#source 1 1 ../appServices/services/spinnerService.js
(function ($, jQuery) {
    "use strict";

    /**
     * @param $timeout
     * @param usSpinnerService
     * @constructor
     */
    function SpinnerService($timeout, usSpinnerService) {
        var globalSpinnerKey = 'globalSpinner';
        var globalSpinnerTimeout;

        this.startGlobalSpinner = function () {
            if (angular.isDefined(globalSpinnerTimeout)) {
                return;
            }

            globalSpinnerTimeout = $timeout(function () {
                usSpinnerService.spin(globalSpinnerKey);
            }, 500);
        };

        this.stopGlobalSpinner = function () {
            if (angular.isDefined(globalSpinnerTimeout)) {
                $timeout.cancel(globalSpinnerTimeout);
                globalSpinnerTimeout = undefined;
            }
            
            usSpinnerService.stop(globalSpinnerKey);
        }
    }

    app.module.service('spinnerService', SpinnerService);
})();

///#source 1 1 ../appServices/services/uiGridHelper.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     */
    function UiGridHelper() {
        this.createSortInformation = function (sortColumns) {
            if (!sortColumns || !angular.isArray(sortColumns) || sortColumns.length === 0) {
                return null;
            }

            var result = [];

            angular.forEach(sortColumns, function (sortColumn) {
                result.push({
                    name: sortColumn.field,
                    uiGridSortDirection: sortColumn.sort.direction
                });
            });

            return result;
        };
    }

    app.module.service('uiGridHelper', UiGridHelper);
})();
///#source 1 1 ../appServices/services/uiHelper.js
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

///#source 1 1 ../appServices/services/webApi.js
(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @param $http
     * @param {Configuration} configuration
     */
    function WebApi($http, configuration) {

        var baseUrl = configuration.apiBaseUrl() + 'api/';

        /**
         * @param {string} relUrl
         * @param {object} params
         * @returns {Promise}
         */
        this.performGetRequest = function (relUrl, params) {
            return $http.get(baseUrl + relUrl, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

        /**
         * @param {string} relUrl
         * @param {object} params
         * @returns {Promise}
         */
        this.performDeleteRequest = function (relUrl, params) {
            return $http.delete(baseUrl + relUrl, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

        /**
         * @param {string} relUrl
         * @param {object} data
         * @param {object?} params
         * @returns {Promise}
         */
        this.performPutRequest = function (relUrl, data, params) {
            return $http.put(baseUrl + relUrl, data, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

        /**
         * @param {string} relUrl
         * @param {object} data
         * @param {object?} params
         * @returns {Promise}
         */
        this.performPostRequest = function (relUrl, data, params) {
            return $http.post(baseUrl + relUrl, data, { params: params })
                .then(function (webResponse) {
                    return webResponse.data;
                });
        }

    }

    app.module.service('webApi', WebApi);
})();

///#source 1 1 ../appServices/appConfiguration.js
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

///#source 1 1 ../appServices/routing.js
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

///#source 1 1 ../appServices/run.js
(function ($, jQuery) {
    "use strict";

    app.module.run(function (editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
    });
})();

