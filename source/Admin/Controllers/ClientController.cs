using System.Web.Http;
using System.Web.Http.ModelBinding;
using Thinktecture.IdentityServer3.Admin.Models.Persistence;
using Thinktecture.IdentityServer3.Admin.Persistence.Models;
using Thinktecture.IdentityServer3.Admin.Persistence.Models.Storage;
using Thinktecture.IdentityServer3.Admin.Storage;
using Thinktecture.IdentityServer3.Admin.Validation;

namespace Thinktecture.IdentityServer3.Admin.Controllers
{
	public class ClientController : ApiController
	{
		private readonly ClientStore _clientStore;
	    private readonly IClientValidation _validation;

	    public ClientController(ClientStore clientStore, IClientValidation validation)
	    {
	        _clientStore = clientStore;
	        _validation = validation;
	    }

	    [HttpGet]
		public IHttpActionResult List([ModelBinder(typeof(PagingInformationModelBinder))] PagingInformation pagingInformation)
		{
			return Ok(_clientStore.List(pagingInformation));
		}

		[HttpGet]
		public IHttpActionResult Get(int key)
		{
		    var result = _clientStore.Get(key);

            if (result == null)
            {
                return NotFound();
            }

		    return Ok(result);
		}

		[HttpPost]
		public IHttpActionResult Add(Client client)
		{
            _validation.Validate(client);
            var newId = _clientStore.Add(client);
			
			return Ok(newId);
		}

		[HttpPut]
		public IHttpActionResult Update(Client client)
		{
            _validation.Validate(client);
            _clientStore.Update(client);

			return Ok();
		}

		[HttpDelete]
		public IHttpActionResult Delete(int key)
		{
			_clientStore.Delete(key);

			return Ok();
		}

        [HttpGet]
	    public IHttpActionResult TotalCount()
	    {
	        var totalCount = _clientStore.TotalCount();

	        return Ok(totalCount);
	    }
	}
}