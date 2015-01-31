using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Validation
{
    public interface IClientValidation
    {
        /// <summary>
        /// Validates a client
        /// </summary>
        /// <param name="client"></param>
        void Validate(Client client);
    }
}