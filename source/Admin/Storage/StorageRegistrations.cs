using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer3.Admin.Models.Storage;
using Thinktecture.IdentityServer3.Admin.Persistence;

namespace Thinktecture.IdentityServer3.Admin.Storage
{
    public abstract class StorageRegistrations
    {
        public abstract Registration<IPersistence<Scope>> ScopePersistence { get; }
        public abstract Registration<IPersistence<Client>> ClientPersistence { get; }
    }
}