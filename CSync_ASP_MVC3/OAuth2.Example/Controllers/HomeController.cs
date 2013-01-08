using System.Linq;
using System.Web.Mvc;
using OAuth2.Client;
using OAuth2.Example.Models;

namespace OAuth2.Example.Controllers
{
    /// <summary>
    /// The only controller in this example app.
    /// </summary>
    public class HomeController : Controller
    {
        private AuthorizationRoot authorizationRoot;

        private string ProviderNameKey = "CarePass";

        private string ProviderName
        {
            get 
            { 
                string value =  (string)Session[ProviderNameKey];
                if (string.IsNullOrEmpty(value))
                    return ProviderNameKey;
                else return value;

            }
            set { Session[ProviderNameKey] = value; }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HomeController"/> class.
        /// </summary>
        /// <param name="authorizationRoot">The authorization manager.</param>
        public HomeController(AuthorizationRoot authorizationRoot)
        {
            this.authorizationRoot = authorizationRoot;
        }

        public HomeController() : this(new AuthorizationRoot()) { }

        /// <summary>
        /// Renders home page with login link.
        /// </summary>
        public ActionResult Index()
        {
            var model = authorizationRoot.Clients.Select(client => new LoginInfoModel
            {
                ProviderName = client.ProviderName
            });
            return View(model);
        }

        /// <summary>
        /// Redirect to login url of selected provider.
        /// </summary>        
        public RedirectResult Login(string providerName)
        {
            ProviderName = providerName;
            return new RedirectResult(GetClient().GetLoginLinkUri());
        }

        /// <summary>
        /// Renders information received from authentication service.
        /// </summary>
        public ActionResult Auth()
        {
            return View(GetClient().GetUserInfo(Request.QueryString));
        }

        private IClient GetClient()
        {
            return authorizationRoot.Clients.First(c => c.ProviderName == ProviderName);
        }
    }
}
