using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin.Cors;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Thinktecture.IdentityServer3.Admin.Filters;
using Thinktecture.IdentityServer3.Admin.Storage;
using Thinktecture.IdentityServer3.Admin.Validation;
using Thinktecture.IdentityServer3.Admin.Configuration;
using System;

namespace Owin
{
	public static class IdentityServerAdminExtension
	{
		public static void UseIdentityServerAdmin(this IAppBuilder app, IdentityServerAdminOptions options)
		{
            if (options == null) throw new ArgumentNullException("options");

		    var httpConfiguration = new HttpConfiguration();
			var container = RegisterServices(httpConfiguration, options.StorageOptions);

#if DEBUG
            app.UseCors(CorsOptions.AllowAll);
#endif 

            options.SecurityMode.Configure(app, httpConfiguration);

			SetupHttpConfiguration(httpConfiguration, container);

            ConfigureFileServer(app);
            ConfigureJson(httpConfiguration);
			ConfigureRoutes(httpConfiguration);

			app.UseWebApi(httpConfiguration);
		}

	    private static void ConfigureFileServer(IAppBuilder app)
	    {
	        app.UseFileServer(new FileServerOptions
	        {
	            FileSystem =
	                new EmbeddedResourceFileSystem(typeof (IdentityServerAdminExtension).Assembly, "Thinktecture.IdentityServer3.Admin.Client.assets")
	        });
	    }

	    private static void SetupHttpConfiguration(HttpConfiguration configuration, IContainer container)
		{
		    configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
		    configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);

#if DEBUG
		    configuration.EnableCors(new EnableCorsAttribute("*", "*", "*"));
#endif
		}

		private static IContainer RegisterServices(HttpConfiguration configuration, StorageOptions storageOptions)
		{
			var builder = new ContainerBuilder();

		    builder.RegisterApiControllers(typeof (IdentityServerAdminExtension).Assembly);
		    builder.RegisterInstance(storageOptions).AsSelf();
		    builder.RegisterModule(new StorageModule(storageOptions));

            builder.RegisterWebApiFilterProvider(configuration);
		    builder.RegisterType<ExceptionFilter>()
                .AsWebApiExceptionFilterFor<ApiController>()
		        .InstancePerRequest();

		    RegisterValidation(builder);

			return builder.Build();
		}

	    private static void RegisterValidation(ContainerBuilder builder)
	    {
	        builder.RegisterType<ClientValidation>()
	            .As<IClientValidation>();

	        builder.RegisterType<ScopeValidation>()
	            .As<IScopeValidation>();
	    }

	    private static void ConfigureJson(HttpConfiguration config)
		{
			config.Formatters.Clear();
			config.Formatters.Add(new JsonMediaTypeFormatter());

			var jsonFormatter = config.Formatters.JsonFormatter;
			jsonFormatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
			jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
		}

		private static void ConfigureRoutes(HttpConfiguration config)
		{
			config.Routes.MapHttpRoute("Default", "api/{controller}/{action}");
		}
	}
}
