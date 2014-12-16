using System.Web.Http;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Controllers
{
	public class HelloController : ApiController
	{
		[HttpGet]
		public IHttpActionResult Hello()
		{
			return Ok("Hello");
		}
	}
}
