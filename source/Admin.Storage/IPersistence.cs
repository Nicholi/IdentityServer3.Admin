using Thinktecture.IdentityServer.v3.Admin.Storage.Models.Persistence;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public interface IPersistence<TEntity>
    {
        PageResult<TEntity> List(PagingInformation pagingInformation);
        TEntity Get(int key);
        void Delete(int key);
        void Add(TEntity entity);
        void Update(TEntity entity);
    }
}