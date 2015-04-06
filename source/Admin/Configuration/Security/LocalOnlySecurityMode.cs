using System.Web.Http;
using IdentityServer3.Admin.Configuration.Security.LocalAuthenticationMiddleware;
using Owin;

namespace IdentityServer3.Admin.Configuration.Security
{
    public class LocalOnlySecurityMode : SecurityMode
    {
        internal override void Configure(IAppBuilder app, HttpConfiguration httpConfiguration)
        {
            app.Use<LocalAuthenticationMiddleware.LocalAuthenticationMiddleware>(new LocalAuthenticationOptions());

            httpConfiguration.SuppressDefaultHostAuthentication();
            httpConfiguration.Filters.Add(new HostAuthenticationAttribute(Constants.LocalAuthenticationType));
            httpConfiguration.Filters.Add(new AuthorizeAttribute() { Roles = Constants.DefaultAdminRole });
        }
    }
}
