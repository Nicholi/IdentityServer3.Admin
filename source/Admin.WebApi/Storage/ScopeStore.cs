using Thinktecture.IdentityServer.v3.Admin.WebApi.Models.IdentityServer;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Persistence;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Storage
{
    public class ScopeStore : IPersistence<Scope>
    {
        private readonly IPersistence<Scope> _persistence;

        public ScopeStore(IPersistence<Scope> persistence)
        {
            _persistence = persistence;
        }

        public PageResult<Scope> List(PagingInformation pagingInformation)
        {
            return _persistence.List(pagingInformation);
        }

        public Scope Get(int key)
        {
            return _persistence.Get(key);
        }

        public void Delete(int key)
        {
            _persistence.Delete(key);
        }

        public void Add(Scope entity)
        {
            _persistence.Add(entity);
        }

        public void Update(Scope entity)
        {
            _persistence.Update(entity);
        }
    }
}