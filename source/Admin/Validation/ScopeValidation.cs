using System;
using IdentityServer3.Admin.Models;
using IdentityServer3.Admin.Storage;
using IdentityServer3.Admin.Persistence.Models.Storage;

namespace IdentityServer3.Admin.Validation
{
    public class ScopeValidation : IScopeValidation
    {
        private readonly ScopeStore _scopeStore;

        public ScopeValidation(ScopeStore scopeStore)
        {
            _scopeStore = scopeStore;
        }

        public void Validate(Scope entity)
        {
            if (entity == null)
            {
                throw new ApiException(ErrorCodes.NoEntitySubmitted);
            }

            if (String.IsNullOrWhiteSpace(entity.Name))
            {
                throw new ApiException(ErrorCodes.ClientIdNotSet);
            }

            if (!_scopeStore.IsNameAvailable(entity))
            {
                throw new ApiException(ErrorCodes.NameNotAvailable);
            }
        }
    }
}
