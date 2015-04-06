using IdentityServer3.Admin.Configuration.Security;
using IdentityServer3.Admin.Storage;

namespace IdentityServer3.Admin.Configuration
{
    public class IdentityServerAdminOptions
    {
        public IdentityServerAdminOptions()
        {
            SecurityMode = new LocalOnlySecurityMode();
        }
        
        public StorageOptions StorageOptions { get; set; }
        public SecurityMode SecurityMode { get; set; }
    }
}
