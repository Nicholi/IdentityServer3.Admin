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