using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer.v3.Admin.Storage.Models.IdentityServer;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public abstract class StorageRegistrations
    {
        public abstract Registration<IPersistence<Scope>> ScopePersistence { get; }
    }
}