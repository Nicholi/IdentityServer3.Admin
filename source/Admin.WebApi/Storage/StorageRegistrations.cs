using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Models.IdentityServer;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Storage
{
    public abstract class StorageRegistrations
    {
        public abstract Registration<IPersistence<Scope>> ScopePersistence { get; }
    }
}