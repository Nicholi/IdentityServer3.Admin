using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thinktecture.IdentityServer3.Admin.WebApi.Models;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Validation
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
