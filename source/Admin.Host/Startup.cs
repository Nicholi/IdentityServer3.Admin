using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Thinktecture.IdentityServer.v3.Admin.EntityFramework;
using Thinktecture.IdentityServer.v3.Admin.WebApi;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Storage;

[assembly: OwinStartup(typeof(Admin.Host.Startup))]

namespace Admin.Host
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var options = CreateOptions();
            app.UseThinktectureIdentityServerAdmin(options);
        }

        private StorageOptions CreateOptions()
        {
            return new StorageOptions()
            {
                StorageRegistrations = new AdminEntityFrameworkStorageRegistrations("IdentityServer")
            };
        }
    }
}
