using System;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models
{
	public class UiPreparedException : Exception
	{
		public string Translation { get; private set; }

		public UiPreparedException(string translation)
		{
			Translation = translation;
		} 
	}
}