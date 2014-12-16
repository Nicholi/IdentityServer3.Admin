using System;
using Thinktecture.IdentityServer.v3.Admin.Storage.Models.Persistence;

namespace Thinktecture.IdentityServer.v3.Admin.Storage
{
	public class ClientStore
	{
		// TODO: Implement from IPersistence
		// TODO: Use real DTO

		public PageResult<object> List(PagingInformation pagingInformation)
		{
			throw new NotImplementedException();
		}

		public object Get(int key)
		{
			throw new NotImplementedException();
		}

		public void Delete(int key)
		{
			throw new NotImplementedException();
		}

		public void Add(object entity)
		{
			throw new NotImplementedException();
		}

		public void Update(object entity)
		{
			throw new NotImplementedException();
		}
	}
}