using System;
using Autofac;
using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer.Core.Services;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Storage
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

            builder.RegisterType<ScopeStore>().SingleInstance();
            builder.RegisterType<ClientStore>().SingleInstance();

            if (_storageOptions.ScopeSupportEnabled)
            {
                Register(builder, _storageOptions.StorageRegistrations.ScopePersistence);
            }

            if (_storageOptions.ClientSupportEnabled)
            {
               Register(builder, _storageOptions.StorageRegistrations.ClientPersistence); 
            }
        }

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
            else if (registration.ImplementationFactory != null)
            {
                var reg = builder.Register(ctx => registration.ImplementationFactory(new AutofacDependencyResolver(ctx)));
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

    class AutofacDependencyResolver : IDependencyResolver
    {
        IComponentContext ctx;
        public AutofacDependencyResolver(IComponentContext ctx)
        {
            this.ctx = ctx;
        }

        public T Resolve<T>()
        {
            return ctx.Resolve<T>();
        }
    }
}