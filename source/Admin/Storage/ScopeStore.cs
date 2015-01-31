using Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Storage
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

        public object Add(Scope entity)
        {
            return _persistence.Add(entity);
        }

        public void Update(Scope entity)
        {
            _persistence.Update(entity);
        }

        public int TotalCount()
        {
            return _persistence.TotalCount();
        }

        public bool IsNameAvailable(Scope entity)
        {
            return _persistence.IsNameAvailable(entity);
        }
    }
}