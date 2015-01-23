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
			return Ok(_clientStore.Get(key));
		}

		[HttpPost]
		public IHttpActionResult Add(Client client)
		{
            // TODO: Validation
            _clientStore.Add(client);
			
			return Ok();
		}

		[HttpPut]
		public IHttpActionResult Update(Client client)
		{
			// TODO: Validation
            _clientStore.Update(client);

			return Ok();
		}

		[HttpDelete]
		public IHttpActionResult Delete([FromBody] int key)
		{
			_clientStore.Delete(key);

			return Ok();
		}
	}
}