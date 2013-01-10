CarePass-Sync Oauth Sample Application
=============

Sample Python application for performing the CarePass Oauth-Handshake.



Configuration
--------------------------

```python

CLIENT_ID = 'uwmtu2recu98tfvc5t8agjgg'
CLIENT_SECRET = 'qAzXAArAg7vqcbTgtmzPb6Aj'
OAUTH_ENDPOINT = 'https://www.carepass.com/carepass/oauth'
BASE_URL = 'https://www.carepass.com/'
REDIRECT_URI = '/authorized'
USER_ENDPOINT = 'https://api.carepass.com/user-directory-api/{0}'
BIO_API = 'users/currentUser' # add additional api's if needed
SCOPE = 'IDENTITY,FAMILY,INSURANCE,LIFESTYLE,ACTIVITY,APPOINTMENT,FITNESS'
GRANT_TYPE = 'authorization_code'
RESPONSE_TYPE = 'code'

```
> The application is already configured with sample **CLIENT_ID** and **CLIENT_SECRET**

> Feel free to replace the values in the *config.py* file with your actual **client id** and *secret*.

> Feel free to add additional APIs and remember to configure the correct SCOPE when running the application.

> The carepass API currently supports only [authorization_code grant type](http://tools.ietf.org/html/draft-ietf-oauth-v2-31#page-23)

Application Requirements (Python 2.5 or higher)
-----------------------------------------------

+ Flask micro-framework http://flask.pocoo.org
+ Flask Oauth http://packages.python.org/Flask-OAuth/
+ Requests HTTP for Humans http://docs.python-requests.org/


> **NB: Additional dependencies will be downloaded by the respective libraries**


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
