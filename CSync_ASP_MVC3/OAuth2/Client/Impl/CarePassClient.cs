using Newtonsoft.Json.Linq;
using OAuth2.Client;
using OAuth2.Infrastructure;
using OAuth2.Configuration;
using OAuth2.Models;
using RestSharp;



namespace OAuth2.Client.Impl
{
    public class CarePassClient : OAuth2Client
    {
        private readonly string BASE_URL = "https://www.carepass.com/carepass";
        private string access_token;

        public CarePassClient(IRequestFactory factory, IClientConfiguration configuration)
            : base(factory, configuration)
        {
        }

        /// <summary>
        /// Friendly name of provider (OAuth2 service).
        /// </summary>
        public override string ProviderName
        {
            get { return "CarePass"; }
        }

        /// <summary>
        /// Defines URI of service which issues access code.
        /// </summary>
        protected override Endpoint AccessCodeServiceEndpoint
        {
            get
            {
                return new Endpoint
                {
                    BaseUri = BASE_URL,
                    Resource = "/oauth/authorize"
                };
            }
        }

        /// <summary>
        /// Defines URI of service which issues access token.
        /// </summary>
        protected override Endpoint AccessTokenServiceEndpoint
        {
            get
            {
                return new Endpoint
                {
                    BaseUri = BASE_URL,
                    Resource = "/oauth/token"
                };
            }
        }

        /// <summary>
        /// Defines URI of service which allows to obtain information about user which is currently logged in.
        /// </summary>
        protected override Endpoint UserInfoServiceEndpoint
        {
            get
            {
                return new Endpoint
                {
                    BaseUri = "https://api.carepass.com/user-directory-api",
                    Resource = "/users/currentUser"
                };
            }
        }


        protected override UserInfo ParseUserInfo(string content)
        {
            if (!string.IsNullOrEmpty(content))
            {
                var response = JObject.Parse(content);
                return new UserInfo
                {
                    Id = response["id"].Value<string>(),
                    FirstName = response["firstName"].Value<string>(),
                    LastName = response["lastName"].Value<string>(),
                    Email = response["email"].Value<string>()
                };
            }
            else
            {
                return default(UserInfo);
            }
        }


        /// <summary>
        /// Called just after obtaining response with access token from third-party service.
        /// Allows to read extra data returned along with access token.
        /// </summary>
        protected override void AfterGetAccessToken(IRestResponse response)
        {
            access_token = JObject.Parse(response.Content)["access_token"].Value<string>();
        }

        /// <summary>
        /// Called just before issuing request to service when everything is ready.
        /// Allows to add extra parameters to request or do any other needed preparations.
        /// </summary>
        protected override void BeforeGetUserInfo(IRestRequest request)
        {
            request.AddHeader("Authorization", string.Format("Bearer {0}", access_token));
        }
    }
}