using Admin.Host;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Thinktecture.IdentityServer3.Admin.EntityFramework;
using Thinktecture.IdentityServer3.Admin.WebApi;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

[assembly: OwinStartup(typeof (Startup))]

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