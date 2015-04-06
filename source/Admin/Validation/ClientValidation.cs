using System;
using IdentityServer3.Admin.Models;
using IdentityServer3.Admin.Storage;
using IdentityServer3.Admin.Persistence.Models.Storage;

namespace IdentityServer3.Admin.Validation
{
    public class ClientValidation : IClientValidation
    {
        private readonly ClientStore _clientStore;

        public ClientValidation(ClientStore clientStore)
        {
            _clientStore = clientStore;
        }

        public void Validate(Client entity)
        {
            if (entity == null)
            {
                throw new ApiException(ErrorCodes.NoEntitySubmitted);
            }

            if (String.IsNullOrWhiteSpace(entity.ClientId))
            {
                throw new ApiException(ErrorCodes.ClientIdNotSet);
            }

            if (!_clientStore.IsNameAvailable(entity))
            {
                throw new ApiException(ErrorCodes.NameNotAvailable);
            }

            if (String.IsNullOrWhiteSpace(entity.ClientName))
            {
                throw new ApiException(ErrorCodes.ClientNameNotSet);
            }

            if (entity.AbsoluteRefreshTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientAbsoluteRefreshTokenLifetimeCanNotBeLessThanOne);
            }

            if (entity.AccessTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientAccessTokenLifetimeCanNotBeLessThanOne);
            }

            if (entity.AuthorizationCodeLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientAuthorizationCodeLifetimeCanNotBeLessThanOne);
            }

            if (entity.IdentityTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientIdentityTokenLifetimeCanNotBeLessThanOne);
            }

            if (entity.SlidingRefreshTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientSlidingRefreshTokenLifetimeCanNotBeLessThanOne);
            }
        }
    }
}