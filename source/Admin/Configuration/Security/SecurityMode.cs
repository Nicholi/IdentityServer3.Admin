using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Thinktecture.IdentityServer3.Admin.Configuration.Security
{
    public abstract class SecurityMode
    {
        internal abstract void Configure(IAppBuilder app, HttpConfiguration httpConfiguration);
    }
}
