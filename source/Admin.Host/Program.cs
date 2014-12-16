using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin.Hosting;

namespace Admin.Host
{
    public class Program
    {
        public static void Main(string[] args)
        {
            using (WebApp.Start<Startup>("http://+:9010"))
            {
                Console.WriteLine("Server is running. Press ENTER to stop.");
                Console.ReadLine();
            }
        }
    }
}