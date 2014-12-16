using System;
using System.Configuration;
using Microsoft.Owin.Hosting;

namespace Thinktecture.IdentityServer.v3.Admin.Host
{
	class Program
	{
		static void Main()
		{
			var url = ConfigurationManager.AppSettings["BaseUrl"];

			if (String.IsNullOrWhiteSpace(url))
				throw new ConfigurationErrorsException("Value of AppSettings item \"BaseUrl\" is not a valid string.");

			using (WebApp.Start<Startup>(url))
			{
				Console.WriteLine("Server started. Press ENTER to end the process.");
				Console.ReadLine();
			}
		}
	}
}
