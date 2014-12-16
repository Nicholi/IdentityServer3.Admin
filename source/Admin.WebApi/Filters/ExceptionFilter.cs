using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http.Filters;
using Newtonsoft.Json.Serialization;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Models;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Filters
{
	public class ExceptionFilter : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			UiPreparedException exception = context.Exception as UiPreparedException;

			if (exception != null)
			{
				var formatter = new JsonMediaTypeFormatter()
				{
					SerializerSettings = { ContractResolver = new CamelCasePropertyNamesContractResolver() }
				};

				context.Response = new HttpResponseMessage(HttpStatusCode.BadRequest)
				{
					Content = new ObjectContent(typeof(object), new { Translation = exception.Translation }, formatter)
				};
			}
			else
			{
				base.OnException(context);
			}

		}
	}
}