using Thinktecture.IdentityServer.v3.Admin.Storage.Models.IdentityServer;
using Thinktecture.IdentityServer.v3.Admin.Storage.Models.Persistence;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public class ScopeStore : IPersistence<Scope, int>
    {
        private readonly IPersistence<Scope, int> _persistence;

        public ScopeStore(IPersistence<Scope, int> persistence)
        {
            _persistence = persistence;
        }

        public PageResult<int> List(PagingInformation pagingInformation)
        {
            return _persistence.List(pagingInformation);
        }

        public int Get(Scope key)
        {
            return _persistence.Get(key);
        }

        public void Delete(Scope key)
        {
            _persistence.Delete(key);
        }

        public void Add(int entity)
        {
            _persistence.Add(entity);
        }

        public void Update(int entity)
        {
            _persistence.Update(entity);
        }
    }
}