namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public class StorageOptions
    {
        public StorageRegistrations StorageRegistrations { get; set; }

        public bool ScopeSupportEnabled
        {
            get { return StorageRegistrations != null && StorageRegistrations.ScopeStore != null; }
        }
    }
}