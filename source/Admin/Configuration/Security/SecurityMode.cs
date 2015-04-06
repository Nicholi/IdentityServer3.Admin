using System.Web.Http;
using Owin;

namespace IdentityServer3.Admin.Configuration.Security
{
    public abstract class SecurityMode
    {
        internal abstract void Configure(IAppBuilder app, HttpConfiguration httpConfiguration);
    }
}
