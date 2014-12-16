using System.Net.Http.Formatting;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Filters;

[assembly:OwinStartup(typeof(Thinktecture.IdentityServer.v3.Admin.WebApi.Startup))]
namespace Thinktecture.IdentityServer.v3.Admin.WebApi
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var container = RegisterServices();
			app.UseAutofacMiddleware(container);

			var httpConfig = CreateHttpConfiguration(container);

			ConfigureJson(httpConfig);
			ConfigureFilters(httpConfig);
			ConfigureRoutes(httpConfig);

			app.UseWebApi(httpConfig);
		}

		private HttpConfiguration CreateHttpConfiguration(IContainer container)
		{
			var httpConfig = new HttpConfiguration()
			{
				IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always,
				DependencyResolver = new AutofacWebApiDependencyResolver(container),
			};
			return httpConfig;
		}

		private void ConfigureFilters(HttpConfiguration httpConfig)
		{
			httpConfig.Filters.Add(new ExceptionFilter());
		}

		private static IContainer RegisterServices()
		{
			var builder = new ContainerBuilder();

			return builder.Build();
		}

		private static void ConfigureJson(HttpConfiguration config)
		{
			config.Formatters.Clear();
			config.Formatters.Add(new JsonMediaTypeFormatter());

			var jsonFormatter = config.Formatters.JsonFormatter;
			jsonFormatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
			jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
		}

		private static void ConfigureRoutes(HttpConfiguration config)
		{
			config.Routes.MapHttpRoute("Default", "api/{controller}/{action}");
		}
	}
}
