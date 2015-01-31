using System;
using Thinktecture.IdentityServer3.Admin.WebApi.Models;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Validation
{
    public class ClientValidation : IClientValidation
    {
        private readonly ClientStore _clientStore;

        public ClientValidation(ClientStore clientStore)
        {
            _clientStore = clientStore;
        }

        public void Validate(Client client)
        {
            if (client == null)
            {
                throw new ApiException(ErrorCodes.NoEntitySubmitted);
            }

            if (String.IsNullOrWhiteSpace(client.ClientId))
            {
                throw new ApiException(ErrorCodes.ClientIdNotSet);
            }

            if (!_clientStore.IsNameAvailable(client))
            {
                throw new ApiException(ErrorCodes.NameNotAvailable);
            }

            if (String.IsNullOrWhiteSpace(client.ClientName))
            {
                throw new ApiException(ErrorCodes.ClientNameNotSet);
            }

            if (client.AbsoluteRefreshTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientAbsoluteRefreshTokenLifetimeCanNotBeLessThanOne);
            }

            if (client.AccessTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientAccessTokenLifetimeCanNotBeLessThanOne);
            }

            if (client.AuthorizationCodeLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientAuthorizationCodeLifetimeCanNotBeLessThanOne);
            }

            if (client.IdentityTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientIdentityTokenLifetimeCanNotBeLessThanOne);
            }

            if (client.SlidingRefreshTokenLifetime < 1)
            {
                throw new ApiException(ErrorCodes.ClientSlidingRefreshTokenLifetimeCanNotBeLessThanOne);
            }
        }
    }
}