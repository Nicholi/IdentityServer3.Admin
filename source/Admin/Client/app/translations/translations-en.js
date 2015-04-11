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
        'EXPIRATION': 'EXPIRATION',
        'URI': 'Uri',
        'CLAIM': 'Claim',
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