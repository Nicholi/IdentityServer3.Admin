using System.Web.Http;
using Thinktecture.IdentityServer.v3.Admin.Storage;
using Thinktecture.IdentityServer.v3.Admin.Storage.Models.Persistence;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Controllers
{
	public class ClientController : ApiController
	{
		private readonly ClientStore _clientStore;

		public ClientController(ClientStore clientStore)
		{
			_clientStore = clientStore;
		}

		[HttpGet]
		public IHttpActionResult List([FromUri] PagingInformation pagingInformation)
		{
			return Ok(_clientStore.List(pagingInformation));
		}

		[HttpGet]
		public IHttpActionResult Get(int key)
		{
			return Ok(_clientStore.Get(key));
		}

		[HttpPost]
		public IHttpActionResult Add()
		{
			// TODO: Add Web API Scope model as parameter and map it
			_clientStore.Add(new object());

			return Ok();
		}

		[HttpPut]
		public IHttpActionResult Update()
		{
			// TODO: Add Web API Scope model as parameter and map it
			_clientStore.Update(new object());

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