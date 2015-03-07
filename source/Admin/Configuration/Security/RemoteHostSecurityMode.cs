using System.Web.Http;
using Owin;
using Thinktecture.IdentityServer3.Admin.Configuration.Security.RemoteAuthenticationMiddleware;

namespace Thinktecture.IdentityServer3.Admin.Configuration.Security
{
    public class RemoteHostSecurityMode : SecurityMode
    {
        internal override void Configure(IAppBuilder app, HttpConfiguration httpConfiguration)
        {
            app.Use<RemoteAuthenticationMiddleware.RemoteAuthenticationMiddleware>(new RemoteAuthenticationOptions());

            httpConfiguration.SuppressDefaultHostAuthentication();
            httpConfiguration.Filters.Add(new HostAuthenticationAttribute(Constants.LocalAuthenticationType));
            httpConfiguration.Filters.Add(new AuthorizeAttribute() { Roles = Constants.DefaultAdminRole });
        }
    }
}