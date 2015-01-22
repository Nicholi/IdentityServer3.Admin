using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using Autofac.Integration.WebApi;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Filters
{
    public class ExceptionFilter : IAutofacExceptionFilter
    {
        public void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            var exception = actionExecutedContext.Exception;

            if (exception == null)
            {
                return;
            }

            actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            // TODO: Log exception
        }
    }
}