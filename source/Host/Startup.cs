using Admin.Host;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer3.Admin.WebApi;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

[assembly: OwinStartup(typeof (Startup))]

namespace Admin.Host
{
    public class Startup
    {
        private class InMemoryStorageRegistrations : StorageRegistrations
        {
            public override Registration<IPersistence<Scope>> ScopePersistence
            {
                get { return new Registration<IPersistence<Scope>>(context => new InMemoryScopeStorage()); }
            }

            public override Registration<IPersistence<Client>> ClientPersistence
            {
                get { return new Registration<IPersistence<Client>>(context => new InMemoryClientStorage()); }
            }
        }

        public void Configuration(IAppBuilder app)
        {
            var options = CreateOptions();
            app.UseThinktectureIdentityServerAdmin(options);
        }

        private StorageOptions CreateOptions()
        {
            return new StorageOptions()
            {
                StorageRegistrations = new InMemoryStorageRegistrations()
            };
        }
    }
}