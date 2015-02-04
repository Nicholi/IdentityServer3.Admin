using Thinktecture.IdentityServer3.Admin.Models.Persistence;

namespace Thinktecture.IdentityServer3.Admin.Storage
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

        /// <summary>
        /// Returns the total count of all items within this storage
        /// </summary>
        /// <returns></returns>
        int TotalCount();

        /// <summary>
        /// Checks if a name is available (e.g. for creation of a new entity).
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        bool IsNameAvailable(TEntity entity);
    }
}