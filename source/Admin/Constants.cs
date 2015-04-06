namespace IdentityServer3.Admin
{
    public class Constants
    {
        public const string LocalAuthenticationType = "idsvr3.admin.local";
        public const string RemoteHostAuthenticationType = "idsvr3.admin.remote";
        public const string DefaultAdminRole = "admin";

        public class ClaimTypes
        {
            public const string Subject = "sub";
            public const string Name = "name";
            public const string Role = "role";
        }

        public const string RemoteHostAuthenticationConfigurationKey = "IdentityServer.Admin.RemoteHostAuthentication.Whitelist";
    }
}
