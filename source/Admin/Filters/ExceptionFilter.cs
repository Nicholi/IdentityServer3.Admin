using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http.Filters;
using Autofac.Integration.WebApi;
using IdentityServer3.Admin.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace IdentityServer3.Admin.Filters
{
    public class ErrorDto
    {
        public ErrorCodes ErrorCode { get; set; }
        public string Message { get; set; }
    }

    /// <summary>
    /// Will return an error code, if the error if well known.
    /// Otherwise will only return an internal server error.
    /// Returns <see cref="Exception.ToString()"/> when build in debug
    /// </summary>
    public class ExceptionFilter : IAutofacExceptionFilter
    {
        public void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            var exception = actionExecutedContext.Exception;

            if (exception == null)
            {
                return;
            }

            var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);

            var validationException = exception as ApiException;
            if (validationException != null)
            {
                var errorDto = new ErrorDto()
                {
                    ErrorCode = validationException.ErrorCode
                };

#if DEBUG
                errorDto.Message = validationException.ToString();
#endif

                response.Content = new ObjectContent(typeof(ErrorDto), errorDto, CreateMediaTypeFormatter(), new MediaTypeHeaderValue("application/json"));
            }

            actionExecutedContext.Response = response;
            // TODO: Log exception
        }

        private MediaTypeFormatter CreateMediaTypeFormatter()
        {
            return new JsonMediaTypeFormatter()
            {
                SerializerSettings = new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    NullValueHandling = NullValueHandling.Ignore
                }
            };
        }
    }
}