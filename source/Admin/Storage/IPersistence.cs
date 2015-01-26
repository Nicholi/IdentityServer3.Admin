using Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Storage
{
    public interface IPersistence<TEntity>
    {
        /// <summary>
        /// Gets a list of <see cref="TEntity"/>.
        /// </summary>
        /// <param name="pagingInformation"></param>
        /// <returns></returns>
        PageResult<TEntity> List(PagingInformation pagingInformation);

        /// <summary>
        /// Gets a single <see cref="TEntity"/>
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        TEntity Get(int key);

        /// <summary>
        /// Deletes a <see cref="TEntity"/> by its <paramref name="key"/>
        /// </summary>
        /// <param name="key"></param>
        void Delete(int key);

        /// <summary>
        /// Adds a new <see cref="TEntity"/>
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>The id of the created entity</returns>
        object Add(TEntity entity);

        /// <summary>
        /// Updates the given <paramref name="entity"/>
        /// </summary>
        /// <param name="entity"></param>
        void Update(TEntity entity);
    }
}