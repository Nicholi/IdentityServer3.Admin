using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Storage
{
    /// <summary>
    /// Provides basic storage capabilities for in memory client storage
    /// </summary>
    public class InMemoryClientStorage : IPersistence<Client>
    {
        private readonly IList<Client> _clients = new List<Client>();
        private int _internalClientCount = 1;

        public PageResult<Client> List(PagingInformation pagingInformation)
        {
            return new PageResult<Client>()
            {
                Items = _clients.Skip(pagingInformation.Skip).Take(pagingInformation.Take).ToList(),
                TotalCount = _clients.Count
            };
        }

        public Client Get(int key)
        {
            return _clients.SingleOrDefault(c => c.Id == key);
        }

        public void Delete(int key)
        {
            _clients.Remove(_clients.SingleOrDefault(c => c.Id == key));
        }

        public object Add(Client entity)
        {
            entity.Id = _internalClientCount++;

            _clients.Add(entity);

            return entity.Id;
        }

        public void Update(Client entity)
        {
            var oldId = entity.Id;
            Delete(entity.Id);
            Add(entity);

            _clients.Last().Id = oldId;
        }

        public int TotalCount()
        {
            return _clients.Count;
        }

        public bool IsNameAvailable(Client entity)
        {
            return !_clients.Any(c => c.ClientId == entity.ClientId && c.Id != entity.Id);
        }
    }
}