namespace IdentityServer3.Admin.Models
{
    /// <summary>
    /// Error code which will be returned, if the error is well known.
    /// </summary>
    public enum ErrorCodes
    {
        /// <summary>
        /// Should not happen. :)
        /// </summary>
        Unknown = 0,

        /// <summary>
        /// If no entity is submitted during Add or Update
        /// </summary>
        NoEntitySubmitted = 1,

        /// <summary>
        /// If a name (e.g. client id) is not available
        /// </summary>
        NameNotAvailable = 2,

        ClientIdNotSet = 3,
        ClientNameNotSet = 4,
        ClientAbsoluteRefreshTokenLifetimeCanNotBeLessThanOne = 5,
        ClientAccessTokenLifetimeCanNotBeLessThanOne = 6,
        ClientAuthorizationCodeLifetimeCanNotBeLessThanOne = 7,
        ClientIdentityTokenLifetimeCanNotBeLessThanOne = 8,
        ClientSlidingRefreshTokenLifetimeCanNotBeLessThanOne = 9
    }
}