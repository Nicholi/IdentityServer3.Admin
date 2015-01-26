using System.Web.Http;
using System.Web.Http.ModelBinding;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Controllers
{
	public class ClientController : ApiController
	{
		private readonly ClientStore _clientStore;

		public ClientController(ClientStore clientStore)
		{
			_clientStore = clientStore;
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
            // TODO: Validation
            var newId = _clientStore.Add(client);
			
			return Ok(newId);
		}

		[HttpPut]
		public IHttpActionResult Update(Client client)
		{
			// TODO: Validation
            _clientStore.Update(client);

			return Ok();
		}

		[HttpDelete]
		public IHttpActionResult Delete(int key)
		{
			_clientStore.Delete(key);

			return Ok();
		}
	}
}