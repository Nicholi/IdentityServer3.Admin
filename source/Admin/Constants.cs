using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Thinktecture.IdentityServer3.Admin
{
    class Constants
    {
        public const string LocalAuthenticationType = "idsvr3.admin.local";
        public const string DefaultAdminRole = "admin";

        public class ClaimTypes
        {
            public const string Subject = "sub";
            public const string Name = "name";
            public const string Role = "role";
        }

    }
}
