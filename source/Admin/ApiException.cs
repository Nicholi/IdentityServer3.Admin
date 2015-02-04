using System;
using Thinktecture.IdentityServer3.Admin.Models;

namespace Thinktecture.IdentityServer3.Admin
{
    [Serializable]
    public class ApiException : Exception
    {
        public ErrorCodes ErrorCode { get; set; }


        public ApiException(ErrorCodes errorCode)
            : this(String.Empty, errorCode)
        {
        }

        public ApiException(string message, ErrorCodes errorCode) 
            : this(message, null, errorCode)
        {
        }

        public ApiException(string message, Exception inner, ErrorCodes errorCode) : base(message, inner)
        {
            ErrorCode = errorCode;
        }
    }
}