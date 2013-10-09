# CarePass-Sync Oauth Sample Application #

Sample ASP.NET MVC 3 application for performing the CarePass Oauth-Handshake.


## Usage Example ##

- Configure library

```xml
<configSections>
    <section name="oauth2" type="OAuth2.Configuration.OAuth2ConfigurationSection, OAuth2, Version=0.8.*, Culture=neutral"/>
</configSections>
<oauth2>
    <services>
      <add clientType="CarePassClient"
           enabled="true"
           clientId="3b2w35p4xrk5gar4vyb2gjfu"
           clientSecret="vbWP57X6DSJrcKjg8S86GutQ"
           scope="IDENTITY,FAMILY,INSURANCE,LIFESTYLE,ACTIVITY,APPOINTMENT,FITNESS"
           redirectUri="http://127.0.0.1:9000/authorized" />
    </services>
</oauth2>
```

> The application is already configured with sample **CLIENT_ID** and **CLIENT_SECRET**

> Feel free to replace the values in the *Web.config* file with your actual **client id** and *secret*.

> Remember to properly configure the **SCOPE** and **redirectUri** before proceeding

- Instantiate AuthorizationRoot (use IoC container or do manual "newing" using default ctor)

```c#
public RootController(AuthorizationRoot authorizationRoot)
{
    this.authorizationRoot = authorizationRoot;
}
public RootController() : this(new AuthorizationRoot())
{
}
```

- Obtain login URL and render page with it

```c#
public ActionResult Index()
{
	// model contains setter/getter for ProviderName
    var model = authorizationRoot.Clients.Select(client => new LoginInfoModel
    {
        ProviderName = client.ProviderName
    });
    return View(model);
}
```

- Define action for receiving callback from third-party service

```c#
public ActionResult Auth()
{
    return View(GetClient().GetUserInfo(Request.QueryString));
}

private IClient GetClient()
{
    return authorizationRoot.Clients.First(c => c.ProviderName == ProviderName);
}
```

- Use user info as you wish, for example, display user details:

```html
@model OAuth2.Models.UserInfo
<p>
    @if (@Model.PhotoUri.IsEmpty())
    {
        @:"No photo"
    }
    else
    {
        <img src="@Model.PhotoUri" alt="photo"/>
    }
</p>
<p>
    @Model.FirstName @Model.LastName (@Model.Email) [@Model.Id, @Model.ProviderName]
</p>
```

## Dependencies ##

This library is dependent on:

- Oauth2 Library (https://github.com/titarenko/OAuth2/) - Core library was modified to meet certain requirements for performing oauth2 handshake with carepass
- RestSharp (http://restsharp.org/)
- Newtonsoft.Json (http://json.codeplex.com/)

>> **For more information of on the CarePass integration with Oauth2 Library view the [CarePassClient Implementation](https://github.com/carepass/code-samples/blob/master/CSync_ASP_MVC3/OAuth2/Client/Impl/CarePassClient.cs) **

CarePass API Client Libraries: Java, JavaScript and Objective C
---------------------------------------------------------------
The CarePass API library offers unique and powerful APIs from Aetna, HHS, and other innovators in the health and wellness community. For more details, please visit <https://developer.carepass.com/>

Client libraries in Java, JavaScript and Objective C are available. Please view the respective branches for more information.

Details of each  library can be found in the README.md on each branch, or you can jump directly to:-

1. Javadoc <http://carepass.github.com/client-libraries/javadoc/>
2. JSdoc <https://github.com/carepass/client-libraries/blob/JavaScript/README.md>
3. iOS documentation <https://github.com/carepass/client-libraries/blob/iOS/README.md>

> **CarePass Sync APIs currently exposes three profiles - identity, fitness and lifestyle ,however, parts of these sample apps attempt to interact with upcoming APIs that may not yet be fully functional.**


Other Libraries 
---------------------------------------------------------------
+ Active Networks created a ruby gem for accessing the CarePass APIs and has made it available publicly https://github.com/activenetwork/carepass
	+ The following ruby gem implements a simple RESTFUL wrapper for carepass fitness api. It can be used to upload a user workout data
+ A Generic Python module for accessing several CarePass APIs is also availble https://github.com/msabramo/python-carepass
	+ The following library implements a simple RESTFUL wrapper for carepass GoodRx and CostOfCare API
	
Sample Applications
---------------------------------------------------------------- 
Sample applications are available in the following languages.
+ Ruby / Ruby on Rails
+ C# / ASP.NET MV3
+ Python
+ Java
+ JavaScript
+ Objective C / IOS
+ Grails
+ PHP
	
> Sample applications can be found here : https://github.com/carepass/code-samples


![alt text](https://www.carepass.com/carepass/resources/images/registered_cp_logo.png "CarePass Logo")
