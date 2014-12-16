using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer.v3.Admin.Storage.Models.IdentityServer;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public class StorageRegistrations
    {
        public Registration<IPersistence<Scope>> ScopeStore { get; set; }
    }
}