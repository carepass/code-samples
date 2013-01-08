using System;
using System.Collections.Specialized;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OAuth2.Configuration;
using OAuth2.Infrastructure;
using OAuth2.Models;
using RestSharp;
using RestSharp.Contrib;

namespace OAuth2.Client
{
    /// <summary>
    /// Base class for OAuth2 client implementation.
    /// </summary>
    public abstract class OAuth2Client : IClient
    {
        private const string AccessTokenKey = "access_token";

        private readonly IRequestFactory factory;
        private readonly IClientConfiguration configuration;

        /// <summary>
        /// Friendly name of provider (OAuth2 service).
        /// </summary>
        public abstract string ProviderName { get; }
        
        /// <summary>
        /// Access token returned by provider. Can be used for further calls of provider API.
        /// </summary>
        public string AccessToken { get; private set; }

        /// <summary>
        /// State (any additional information that was provided by application and is posted back by service).
        /// </summary>
        public string State { get; private set; }

        /// <summary>
        /// Defines URI of service which issues access code.
        /// </summary>
        protected abstract Endpoint AccessCodeServiceEndpoint { get; }

        /// <summary>
        /// Defines URI of service which issues access token.
        /// </summary>
        protected abstract Endpoint AccessTokenServiceEndpoint { get; }

        /// <summary>
        /// Defines URI of service which allows to obtain information about user 
        /// who is currently logged in.
        /// </summary>
        protected abstract Endpoint UserInfoServiceEndpoint { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="OAuth2Client"/> class.
        /// </summary>
        /// <param name="factory">The factory.</param>
        /// <param name="configuration">The configuration.</param>
        protected OAuth2Client(IRequestFactory factory, IClientConfiguration configuration)
        {
            this.factory = factory;
            this.configuration = configuration;
        }

        /// <summary>
        /// Returns URI of service which should be called in order to start authentication process.
        /// This URI should be used for rendering login link.
        /// </summary>
        /// <remarks>
        /// Any additional information that will be posted back by service.
        /// </remarks>
        public string GetLoginLinkUri(string state = null)
        {            
            var client = factory.NewClient();
            client.BaseUrl = AccessCodeServiceEndpoint.BaseUri;

            var request = factory.NewRequest();
            request.Resource = AccessCodeServiceEndpoint.Resource;

            request.AddObject(new
            {
                response_type = "code",
                client_id = configuration.ClientId,
                redirect_uri = configuration.RedirectUri,
                scope = configuration.Scope,
                state
            });

            return client.BuildUri(request).ToString();
        }

        /// <summary>
        /// Obtains user information using OAuth2 service and
        /// data provided via callback request.
        /// </summary>
        /// <param name="parameters">Callback request payload (parameters).</param>
        public UserInfo GetUserInfo(NameValueCollection parameters)
        {
            State = parameters["state"];

            var error = parameters["error"];
            if (!error.IsEmpty())
            {
                throw new ApplicationException(error);
            }

            return GetUserInfo(AccessToken = GetAccessToken(parameters));
        }

        /// <summary>
        /// Issues query for access token and parses response.
        /// </summary>
        /// <param name="parameters">Callback request payload (parameters).</param>
        private string GetAccessToken(NameValueCollection parameters)
        {
            var client = factory.NewClient();
            client.BaseUrl = AccessTokenServiceEndpoint.BaseUri;

            var request = factory.NewRequest();
            request.Resource = AccessTokenServiceEndpoint.Resource;
            request.Method = Method.POST;
            request.AddObject(new
            {
                response_type = "code",
                code = parameters["code"],
                client_id = configuration.ClientId,
                client_secret = configuration.ClientSecret,
                redirect_uri = configuration.RedirectUri,
                grant_type = "authorization_code"
            });

            var response = client.Execute(request);
            AfterGetAccessToken(response);

            var content = response.Content;
            try
            {
                // response can be sent in JSON format
                return (string) JObject.Parse(content).SelectToken(AccessTokenKey);
            }
            catch (JsonReaderException)
            {
                // or it can be in "query string" format (param1=val1&param2=val2)
                return HttpUtility.ParseQueryString(content)[AccessTokenKey];
            }
        }

        /// <summary>
        /// Obtains user information using provider API.
        /// </summary>
        /// <param name="accessToken">The access token.</param>
        private UserInfo GetUserInfo(string accessToken)
        {
            var client = factory.NewClient();
            client.BaseUrl = UserInfoServiceEndpoint.BaseUri;
            client.Authenticator = new OAuth2UriQueryParameterAuthenticator(accessToken);

            var request = factory.NewRequest();
            request.Resource = UserInfoServiceEndpoint.Resource;

            BeforeGetUserInfo(request);

            var result = ParseUserInfo(client.Execute(request).Content);
            result.ProviderName = ProviderName;

            return result;
        }

        /// <summary>
        /// Should return parsed <see cref="UserInfo"/> using content received from provider.
        /// </summary>
        /// <param name="content">The content which is received from provider.</param>
        protected abstract UserInfo ParseUserInfo(string content);

        /// <summary>
        /// Called just before issuing request to service when everything is ready.
        /// Allows to add extra parameters to request or do any other needed preparations.
        /// </summary>
        protected virtual void BeforeGetUserInfo(IRestRequest request)
        {
        }

        /// <summary>
        /// Called just after obtaining response with access token from service.
        /// Allows to read extra data returned along with access token.
        /// </summary>
        protected virtual void AfterGetAccessToken(IRestResponse response)
        {
        }
    }
}