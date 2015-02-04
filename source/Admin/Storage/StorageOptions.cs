namespace Thinktecture.IdentityServer3.Admin.Storage
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