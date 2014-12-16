using System.Net.Http.Formatting;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Filters;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi
{
	public static class ThinktectureIdentityServerAdminExtension
	{
		public static void UseThinktectureIdentityServerAdmin(this IAppBuilder app, StorageOptions storageOptions)
		{
			var container = RegisterServices(storageOptions);
			
			var httpConfig = CreateHttpConfiguration(container);

			ConfigureJson(httpConfig);
			ConfigureFilters(httpConfig);
			ConfigureRoutes(httpConfig);

			app.UseWebApi(httpConfig);
		}

		private static HttpConfiguration CreateHttpConfiguration(IContainer container)
		{
			var httpConfig = new HttpConfiguration()
			{
				IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always,
				DependencyResolver = new AutofacWebApiDependencyResolver(container),
			};
			return httpConfig;
		}

		private static void ConfigureFilters(HttpConfiguration httpConfig)
		{
			httpConfig.Filters.Add(new ExceptionFilter());
		}

		private static IContainer RegisterServices(StorageOptions storageOptions)
		{
			var builder = new ContainerBuilder();

		    builder.RegisterApiControllers(typeof (ThinktectureIdentityServerAdminExtension).Assembly);
		    builder.RegisterInstance(storageOptions).AsSelf();
		    builder.RegisterModule(new StorageModule(storageOptions));

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
