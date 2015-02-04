using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thinktecture.IdentityServer3.Admin.Configuration.Security;
using Thinktecture.IdentityServer3.Admin.Storage;

namespace Thinktecture.IdentityServer3.Admin.Configuration
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
