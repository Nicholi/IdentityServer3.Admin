namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Storage
{
    public class StorageOptions
    {
        public StorageRegistrations StorageRegistrations { get; set; }

        public bool ScopeSupportEnabled
        {
            get { return StorageRegistrations != null && StorageRegistrations.ScopePersistence != null; }
        }

        public bool ClientSupportEnabled
        {
            get { return StorageRegistrations != null && StorageRegistrations.ClientPersistence != null; }
        }
    }
}