using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer3.Admin.Models.Storage;

namespace Thinktecture.IdentityServer3.Admin.Storage
{
    public abstract class StorageRegistrations
    {
        public abstract Registration<IPersistence<Scope>> ScopePersistence { get; }
        public abstract Registration<IPersistence<Client>> ClientPersistence { get; }
    }
}