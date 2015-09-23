using System.Collections.Generic;
using IdentityServer3.Admin.Persistence;
using IdentityServer3.Core.Configuration;

namespace IdentityServer3.Admin.Storage
{
    public class StorageOptions
    {
        private readonly List<Registration> _registrations = new List<Registration>();

        public void Register<T>(Registration<T> registration)
            where T : class
        {
            this._registrations.Add(registration);
        }

        public IEnumerable<Registration> Registrations
        {
            get
            {
                return this._registrations;
            }
        }

        public StorageRegistrations StorageRegistrations { get; set; }

        public bool ScopeSupportEnabled
        {
            get { return StorageRegistrations != null && StorageRegistrations.ScopePersistence != null; }
        }

        public bool ClientSupportEnabled
        {
            get { return StorageRegistrations != null && StorageRegistrations.ClientPersistence != null; }
        }
    }
}