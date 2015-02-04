using Thinktecture.IdentityServer3.Admin.Models.Storage;

namespace Thinktecture.IdentityServer3.Admin.Validation
{
    public interface IValidation<in TEntity>
    {
        /// <summary>
        /// Validates an entity. Must throw an exception when it can not be validated.
        /// </summary>
        /// <param name="entity"></param>
        void Validate(TEntity entity);
    }

    // Marker interfaces
    public interface IClientValidation : IValidation<Client> { }
    public interface IScopeValidation : IValidation<Scope> { }
}