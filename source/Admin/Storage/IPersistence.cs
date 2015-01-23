using Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Storage
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