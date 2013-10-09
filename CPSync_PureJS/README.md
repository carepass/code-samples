# JSO - a Javascript OAuth Library

It's intended use is for web applications (javascript) that connects to one or more APIs using OAuth 2.0.

Current status is that the library is not well tested, due to lack of known providers with support for OAuth 2.0

Be aware of the cross-domain policy limitiations of browser. Check out CORS, JSONP, or consider proxying the requests from the browser through your own webserver.

If you want to use JSO together with Phonegap to support OAuth 2.0 in a hybrid web application, you may want to read the

* [JSO Phonegap Guide](README-Phonegap.md)


## Licence

UNINETT holds the copyright of the JSO library. The software can be used free of charge for both non-commercial and commercial projects. The software is licenced with *The GNU Lesser General Public License, version 2.1 (LGPL-2.1)*.

* <http://www.opensource.org/licenses/lgpl-2.1>


## Features

* Implements OAuth 2.0 Implicit Flow. All you need is a single javascript file.
* Implements OAuth 2.0 Authorization Grant Flow. (jQuery dependency for xhr request)
* Implements OAuth 2.0 Password Grant Flow. (jQuery dependency for xhr request)
* Supports the `bearer` access token type.
* No server component needed.
* Adds a jQuery plugin extending the `$.ajax()` function with OAuth capabilities.
* Can handle multilple providers at once.
* Uses *HTML 5.0 localStorage* to cache Access Tokens. You do not need to implement a storage.
* Can prefetch all needed tokens with sufficient scopes, to start with, then tokens can be used for requests later. This way, you can be sure that you would not need to redirect anywhere in your business logic, because you would need to refresh an expired token.
* Excellent scope support. 
* Caches and restores the hash, your application will not loose state when sending the user to the authorization endpoint.
* Python server using [flask micro-framework](http://flask.pocoo.org/) for testing

## Dependencies

JSO makes use of jQuery, mostly to plugin and make use of the `$.ajax()` function. If there is an interest for making JSO independent from jQuery, I can do that.

## Browser support

JSO uses localStorage for caching tokens. localStorage is supported in Firefox 3.5+, Safari 4+, IE8+, and Chrome. For better compatibility use the localstorage library that is included in the example.

JSO uses JSON serialization functions (stringify and parse). These are supported in Firefox 3.5, Internet Explorer 8.0 and Chrome 3. For better compatibility use the JSON2.js library that also is included in the example.


## Configure

First, you must configure your OAuth providers. You do that by calling `jso_configure` with a configuration object as a parameter.

The object is a key, value set of providers, where the providerID is an internal identifier of the provider that is used later, when doing protected calls.

In this example, we set the provider identifier to be `facebook`.

```javascript
	jso_configure({
		"facebook": {
			client_id: "xxxxxxxxxx",
			redirect_uri: "http://localhost/~andreas/jso/",
			authorization: "https://www.facebook.com/dialog/oauth",
			presenttoken: "qs"
		}
	});
```

* `client_id`: The client identifier of your client that as trusted by the provider.
* `redirect_uri`: OPTIONAL (may be needed by the provider). The URI that the user will be redirected back to when completed. This shuold be the same URL that the page is presented on.
* `presenttoken`: OPTIONAL How to present the token with the protected calls. Values can be `qs` (in query string) or `header` (default; in authorization header).
* `default_lifetime` : OPTIONAL Seconds with default lifetime of an access token. If set to `false`, it means permanent.
* `permanent_scope`: A scope that indicates that the lifetime of the access token is infinite. (not yet tested.)
* `isDefault`: Some OAuth providers does not support the `state` parameter. When this parameter is missing, the consumer does not which provider that is sending the access_token. If you only provide one provider config, or set isDefault to `true` for one of them, the consumer will assume this is the provider that sent the token.
* `scope`: For providers that does not support `state`: If state was not provided, and default provider contains a scope parameter we assume this is the one requested... Set this as the same list of scopes that you provide to `ensure_tokens`.


The second optional parameter, options, of `jso_configure(providerconfig, options)` allows you to configure these global settings:

* `debug`: Default value is `false`. If you enable debugging, JSO will log a bunch of things to the console, using `console.log` - if not, JSO will not log anything.


## Authorization

This OPTIONAL step involves checking that all necessary access tokens have been retrieved.


`jso_ensureTokens` can be used to force user authentication before you really need it; and the reason why you would typically do that is to make it easier to recover the state when you return. Typically if you need an OAuth token in the middle of a complex transaction it would be really difficult if the user is redirected away during that transaction, instead you can use `jso_ensureTokens` before starting with the transaction.

Using `jso_ensureTokens` is completely optional, and when you do not want to make sure that you have sufficient tokens before you really need it, then you can call `$.oajax` right away and it will redirect you for authentication - if needed.




By doing a call like this early in your code:

```javascript
	// Make sure that you have 
	jso_ensureTokens({
		"facebook": ["read_stream"],
		"google": ["https://www.googleapis.com/auth/userinfo.profile"]
	});
```

the library will check its cached tokens, and if it does not have the specified tokens/scopes, it will start a new authorization process.

When this code is completed, you know that you have valid tokens for your use cases.

The `jso_ensureTokens` function takes an object as input, with the providerids as keys, and the values are eigther `false` or an array of required scopes. A value of `false` mean that we do not care about scopes, but we want a valid token.


## OAuth protected data requests

To get data, you either use the `jso_getToken("facebook")` function, that returns a valid access token (or `null`), or you may use the `$.oajax()` function.

The `$.oajax()` function works very similar to `$.ajax()` ([see documentation](http://api.jquery.com/jQuery.ajax/)), actually the settings parameters are bypassed to the real `$.ajax()` function.

In addition to the settings properties allowed by `$.ajax()`, these properties are allowed:

* jso_provider: The providerid of the OAuth provider to use.
* jso_allowia: Allow user interaction? If you have prepared the tokens, using `jso_ensureTokens()` you might set this value to `false` (default) and it will trow an exception instead of starting a new authorization process.
* jso_scopes: If this specific call requires one or more scopes, provide it here. It will be used to find a suitable token, if multiple exists.

Here is an example of retrieving the Facebook news stream using OAuth:

```javascript
	$.oajax({
		url: "https://graph.facebook.com/me/home",
		jso_provider: "facebook",
		jso_scopes: ["read_stream"],
		jso_allowia: true,
		dataType: 'json',
		success: function(data) {
			console.log("Response (facebook):");
			console.log(data);
		}
	});
```

## jQuery or not jQuery

If you load jQuery before the JSO library, it will discover and add the `$.oajax` function. However, loading jQuery is optional, and if you do not load jQuery JSO will not complain, but neigther will if offer the easy to use `$.oajax` function.

If you do not use jQuery, you probably want to use the `jso_getToken(providerid, scopes)` function.

```javascript
	var accesstoken = jso_getToken("facebook", "read_stream");

	var authheader = "Authorization: Authorization " + accesstoken;
	// Perform the Cross site AJAX request using this custom header with your
	// preferred AJAX library.
```

> ** NB: Authorization Code Grant & Resource Owner Password Grant requires jQuery


## Using JSO With Phonegap

Normal use of JSO involves JSO redirecting to the OAuth authorization endpoint for authentication and authorization, then the user is redirected back to the callback url where JSO autoamtically inspects the hash for an access token, and caches it.

When using JSO with phonegap (or similar libraries), you would not perform a normal redirect, but instead open a *childbrowser*. And when the user returns you would need to tell JSO what URL the childbrowser ended up on.


**Register a custom URL redirect handler**

```javascript
	jso_registerRedirectHandler(function(url) {
		console.log("About to redirect the user to ", url);
		console.log("Instead we can do whatever we want, such as opening a child browser");

		// Open a child browser or similar.
	});
```
*Please help! I have not used phonegap my self, and if someone could provide exact code examples for use with phonegap I would appreciate that.*


**Tell JSO about the return URL**

Use the following function providing the url of the callback page, including the parameters in the hash: `jso_checkfortoken(providerid, url)`

The provided parameters might be like this: 

* `jso_checkfortoken('facebook', 'https://yourservice.org/callback#accesstoken=lsdkfjldkfj')`




## Some convenient debugging functions

For debugging, open the javascript console. And you might type:


```javascript
	jso_dump();
```

to list all cached tokens, and 

```javascript
	jso_wipe();
```

to remove all tokens.

## Authorization Code Grant

The authorization code is obtained by using an authorization server as an intermediary between the client and resource owner.  Instead of
requesting authorization directly from the resource owner, the client directs the resource owner to an authorization server , which in turn directs the
resource owner back to the client with the authorization code.

Extra optional parameters were added to support the authorization code flow.

```javascript
    "carepass" : {
        client_id: "d5axb6rfdsawv3hbxt3gh7x2",
        client_secret : "AfecRkCjka2ETdNWMhJZGgZs",
        redirect_uri:'http://127.0.0.1:5000',
        authorization:'https://www.carepass.com/carepass/oauth/authorize',
        token:'https://www.carepass.com/carepass/oauth/token',
        scope:['IDENTITY','FAMILY','INSURANCE','LIFESTYLE','ACTIVITY','APPOINTMENT','FITNESS'],
        response_type:'code',
        isDefault:true
    }
```

* `client_id`: The client identifier of your client that as trusted by the provider.
* `client_secret`: The client secret of your client that as trusted by the provider.
* `redirect_uri`: OPTIONAL (may be needed by the provider). The URI that the user will be redirected back to when completed. This shuold be the same URL that the page is presented on.
* `authorization`: The URI for then endpoint that authorize a user request and issue an authorization code
* `token`: The URI for then endpoint that issues access tokens and exchanges a user authorization code for a access token.
* `presenttoken`: OPTIONAL How to present the token with the protected calls. Values can be `qs` (in query string) or `header` (default; in authorization header).
* `default_lifetime` : OPTIONAL Seconds with default lifetime of an access token. If set to `false`, it means permanent.
* `permanent_scope`: A scope that indicates that the lifetime of the access token is infinite. (not yet tested.)
* `isDefault`: Some OAuth providers does not support the `state` parameter. When this parameter is missing, the consumer does not which provider that is sending the access_token. If you only provide one provider config, or set isDefault to `true` for one of them, the consumer will assume this is the provider that sent the token.
* `scope`: For providers that does not support `state`: If state was not provided, and default provider contains a scope parameter we assume this is the one requested... Set this as the same list of scopes that you provide to `ensure_tokens`.


```javascript
    // Make sure that you have
    jso_ensureTokens({
        "carepass": ['IDENTITY','FAMILY','INSURANCE','LIFESTYLE','ACTIVITY','APPOINTMENT','FITNESS']
    }, getUserData);


    function getUserData () {
        $.oajax({
            url: "https://api.carepass.com/user-directory-api/users/currentUser",
            jso_provider: "carepass", // Will match the config identifier
            jso_scopes: ['IDENTITY','FAMILY','INSURANCE','LIFESTYLE','ACTIVITY','APPOINTMENT','FITNESS'], // List of scopes (OPTIONAL)
            dataType: 'json',
            success: function(data) {
                console.log("Response (bridge):");
                console.log(data);
            },
            error: function() {
                console.log("ERROR Custom callback()");
            }
        });
    }
```

**jso_ensureTokens** checks for the existence of a token for a given provider that will be used to make request. An optional callback param was added to make execute a callback function after the token is retrieved


## Resource Owner Password Credentials Grant

The resource owner password credentials (i.e., username and password) can be used directly as an authorization grant to obtain an access
token.  The credentials should only be used when there is a high degree of trust between the resource owner and the client (e.g., the
client is part of the device operating system or a highly privileged application), and when other authorization grant types are not
available (such as an authorization code).

Extra optional parameters were added to support the authorization code flow.

```javascript
    // Add configuration for one or more providers.
    jso_configure({
        "carepass" : {
            "username": "ferronrsmith",
            "password": "*******",
            client_id: "5mm76nma#$22256tssu95ecg4e5g",
            client_secret : "s64Xmtp@#@11yvcU7rRBMQsESK5gW",
            token:'https://www.carepass.com/carepass/oauth/token',
            scope:['IDENTITY','FITNESS', 'NUTRITION'],
            isDefault:true
        }
    });
```

* `username`: The resource owner username.
* `passsword`: The resource owner password.
* `client_id`: The client identifier of your client that as trusted by the provider.
* `client_secret`: The client secret of your client that as trusted by the provider.
* `token`: The URI for then endpoint that issues access tokens and exchanges a user authorization code for a access token.
* `isDefault`: Some OAuth providers does not support the `state` parameter. When this parameter is missing, the consumer does not which provider that is sending the access_token. If you only provide one provider config, or set isDefault to `true` for one of them, the consumer will assume this is the provider that sent the token.
* `scope`: For providers that does not support `state`: If state was not provided, and default provider contains a scope parameter we assume this is the one requested... Set this as the same list of scopes that you provide to `ensure_tokens`.


```javascript
    // Make sure that you have
    jso_getPasswordToken("carepass", getUserData);
```

**jso_getPasswordToken**  Send data to resource owner data to the server and retrieve access token. An optional callback param was added to make execute a callback function after the token is retrieved


## Upgrade

This section will contain useful information if you have been using JSO already, and would like to update to the latest version. API and configuration changes will be listed here.


## Changelog

+ v 0.2
    + library rewrite
    + Implements OAuth 2.0 Authorization Grant Flow
    + Implements OAuth 2.0 Password Grant Flow
    + Python server using [flask micro-framework](http://flask.pocoo.org/) for testing
    + Updated modernizer from 2.5.3 to 2.6.2
    + Updated jQuery from 1.7 to 1.8.3
    + Updated json2 pollyfill
    + added unit test
    + added testacular support for managing unit test
    + jslint support
    +
+ v 0.1
    + Implements OAuth 2.0 Implicit Flow
    + Supports the `bearer` access token type
    + jQuery $.ojax functionality
    + localStorage modernizr for backward compatibility support
    + scope support

## Future

+ Better error handling
+ Easier request handling through generic method handler
+ more unit test





