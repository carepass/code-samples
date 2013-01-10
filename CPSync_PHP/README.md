CarePass-Sync Oauth Sample Application
=============

Sample PHP application for performing the CarePass Oauth-Handshake.


About CarePass APIs
--------------------
Read all about the available API's at https://developer.carepass.com

CarePass Sync Configuration
--------------------

The main configuration for OAuth authentification is located in the *index.php*. Default tokens have been provided for testing purposes.
 
```php

$client = new CarePass(array(
    'clientId' => '2me8aqm3q5nqjtkus6yk4mxp',
    'clientSecret' => 'AkyAXqFptvSgFEVr9c9JUvH3',
    'redirectUri' => 'http://localhost/CPSync_PHP/callback',
    'scopes' => array('IDENTITY','FAMILY','INSURANCE','LIFESTYLE','ACTIVITY','APPOINTMENT','FITNESS')
));

```

##### Carepass Provider Implementation is as follows
```php

<?php
/**
 * CarePass OAuth2 Provider
 *
 * @category   Provider
 * @author     Ferron Hanse
 * @license    http://philsturgeon.co.uk/code/dbad-license
 */

class CarePass extends OAuth2\Client\IDP
{
    public function urlAuthorize()
    {
        return 'https://www.carepass.com/carepass/oauth/authorize';
    }

    public function urlAccessToken()
    {
        return 'https://www.carepass.com/carepass/oauth/token';
    }

    public function urlUserDetails(\OAuth2\Client\Token\Access $token)
    {
        return 'https://api.carepass.com/user-directory-api/users/currentUser';
    }

    public function userDetails($response, \OAuth2\Client\Token\Access $token)
    {
        return array(
            'id' => $response->id,
            'firstName' => $response->firstName,
            'lastName' => $response->lastName,
            'email' => $response->email
        );
    }
}

```


				
The retrieved access_token is stored in the CarePassOAuth service and could be requested to be used. 

CarePass Sync Endpoint Implementation Example
--------------------

The following is an example of an API call after getting the access_token. 

```php
    public function getUserDetails(\OAuth2\Client\Token\Access $token)
    {
        $url = $this->urlUserDetails($token);

        try {
            $client = new GuzzleClient($url);

            $this->headers = array(
                'Authorization' => 'Bearer '. $token
            );

            $request = $client->get(null,$this->headers,null)->send();
            $response = $request->getBody();

            return $this->userDetails(json_decode($response), $token);
        }

        catch (\Guzzle\Http\Exception\BadResponseException $e)
        {
            $raw_response = explode("\n", $e->getResponse());
            throw new \Oauth2\Client\IDPException(end($raw_response));
        }
    }
```	
	
Application Requirements (PHP 5.3 or higher)
-----------------------------------------------
+ php-curl extension
+ [slim php framework](http://www.slimframework.com/)
+ slim extras (templating engine functionality i.e [twig views](http://twig.sensiolabs.org/))
+ customized version of [lncd/Oauth2 plugin](https://github.com/lncd/OAuth2)
+ [twig templating engine](http://twig.sensiolabs.org/)

> **NB : Ensure .htaccess files are allowed by your server and that the rewrite module is enabled. php-curl module is needed for REST Requests**

##### Sample Twig Syntax
```twig
{% extends 'layout.twig' %}

{% block page_title %}Sample{% endblock %}

{% block content %}
        <p>Simple template example</p>

        {{ name }}
        {{ date }}
{% endblock %}
```

> *Documentation can be found here  http://twig.sensiolabs.org/doc/templates.html*


> **NB: Additional dependencies will be downloaded by the respective libraries**

[PHP Composer Dependency Manager](http://getcomposer.org/) was used to manage all of the project dependencies. Please review the *composer.json* file

```json
{
    "require": {
        "slim/slim": "2.*",
        "lncd/Oauth2": "dev-feature/reorg",
        "slim/extras": "2.*",
        "twig/twig": "1.12.*@dev"
    }

}
```


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
