using System.Web;
using System.Web.Optimization;

namespace Thinktecture.IdentityServer.v3.Admin.WebClient
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
