using System;
using Autofac;
using Thinktecture.IdentityServer.Core.Configuration;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public class StorageModule : Module
    {
        private readonly StorageOptions _storageOptions;

        public StorageModule(StorageOptions storageOptions)
        {
            _storageOptions = storageOptions;
        }

        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            if (_storageOptions.StorageRegistrations.ScopeStore != null)
            {
                Register(builder, _storageOptions.StorageRegistrations.ScopeStore);
            }
        }

        // TODO: This is currently copied directly from identity server and should be refactored
        private static void Register(ContainerBuilder builder, Registration registration, string name = null)
        {
            if (registration.ImplementationType != null)
            {
                var reg = builder.RegisterType(registration.ImplementationType);
                if (name != null)
                {
                    reg.Named(name, registration.InterfaceType);
                }
                else
                {
                    reg.As(registration.InterfaceType);
                }
            }
            else
            {
                var message = "No type or factory found on registration " + registration.GetType().FullName;
                throw new InvalidOperationException(message);
            }
        }
    }
}