using System.Collections.Generic;
using System.Linq;
using Admin.Host;
using IdentityServer3.Admin.Configuration;
using IdentityServer3.Admin.Configuration.Security;
using IdentityServer3.Admin.Storage;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Ploeh.AutoFixture;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Admin;
using IdentityServer3.Admin.Persistence;
using IdentityServer3.Admin.Persistence.Models.Storage;

[assembly: OwinStartup(typeof (Startup))]

namespace Admin.Host
{
    public class Startup
    {
        private class InMemoryStorageRegistrations : StorageRegistrations
        {
            private InMemoryScopeStorage _scopeStorage;
            private InMemoryClientStorage _clientStorage;

            public InMemoryStorageRegistrations(bool includeTestData)
            {
                CreateAndPopulateScopeStorage(includeTestData);
                CreateAndPopulateClientStorage(includeTestData);
            }

            private void CreateAndPopulateClientStorage(bool includeTestData)
            {
                _clientStorage = new InMemoryClientStorage();

                if (!includeTestData)
                {
                    return;
                }

                var fixture = new Fixture();
                fixture.Behaviors.Clear();
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());
                var clients = fixture
                    .Build<Client>()
                    .WithAutoProperties()
                    .Without(p => p.Id)
                    .CreateMany(20);

                foreach (var client in clients)
                {
                    _clientStorage.Add(client);
                }
            }

            private void CreateAndPopulateScopeStorage(bool includeTestData)
            {
               _scopeStorage = new InMemoryScopeStorage();

               if (!includeTestData)
               {
                   return;
               }

               var fixture = new Fixture();
               fixture.Behaviors.Clear();
               fixture.Behaviors.Add(new OmitOnRecursionBehavior());
                var scopes = fixture
                    .Build<Scope>()
                    .WithAutoProperties()
                    .Without(p => p.Id)
                    .CreateMany(20);

                foreach (var scope in scopes)
                {
                    _scopeStorage.Add(scope);
                }
            }

            public override Registration<IPersistence<Scope>> ScopePersistence
            {
                get { return new Registration<IPersistence<Scope>>(context => _scopeStorage); }
            }

            public override Registration<IPersistence<Client>> ClientPersistence
            {
                get { return new Registration<IPersistence<Client>>(context => _clientStorage); }
            }
        }

        public void Configuration(IAppBuilder app)
        {
            var options = CreateOptions(true);
            app.UseIdentityServerAdmin(options);
        }

        private IdentityServerAdminOptions CreateOptions(bool includeTestData)
        {
            return new IdentityServerAdminOptions()
            {
                StorageOptions = CreateStorageOptions(includeTestData),
                SecurityMode = new RemoteHostSecurityMode()
            };
        }

        private StorageOptions CreateStorageOptions(bool includeTestData)
        {
            return new StorageOptions()
            {
                StorageRegistrations = new InMemoryStorageRegistrations(includeTestData)
            };
        }
    }
}