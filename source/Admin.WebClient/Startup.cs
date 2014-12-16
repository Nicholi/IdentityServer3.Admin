using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Thinktecture.IdentityServer.v3.Admin.WebClient.Startup))]
namespace Thinktecture.IdentityServer.v3.Admin.WebClient
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
