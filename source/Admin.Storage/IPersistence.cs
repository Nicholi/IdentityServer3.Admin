using Thinktecture.IdentityServer.v3.Admin.Storage.Models.Persistence;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
    public interface IPersistence<in TEntityKey, TEntity>
    {
        PageResult<TEntity> List(PagingInformation pagingInformation);
        TEntity Get(TEntityKey key);
        void Delete(TEntityKey key);
        void Add(TEntity entity);
        void Update(TEntity entity);
    }
}