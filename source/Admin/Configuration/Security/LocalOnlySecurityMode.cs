using Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Thinktecture.IdentityServer3.Admin.Configuration.Security.LocalAuthentication;

namespace Thinktecture.IdentityServer3.Admin.Configuration.Security
{
    public class LocalOnlySecurityMode : SecurityMode
    {
        internal override void Configure(IAppBuilder app, HttpConfiguration httpConfiguration)
        {
            app.Use<LocalAuthenticationMiddleware>(new LocalAuthenticationOptions());

            httpConfiguration.SuppressDefaultHostAuthentication();
            httpConfiguration.Filters.Add(new HostAuthenticationAttribute(Constants.LocalAuthenticationType));
            httpConfiguration.Filters.Add(new AuthorizeAttribute() { Roles = Constants.DefaultAdminRole });
        }
    }
}
