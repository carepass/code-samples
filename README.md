Carepass Sample Applications 
===================
This repoository contains a collection of sample application written in different programming languages for interacting with carepass. 
These samples provide boiler-plate samples for interacting with many different CarePass API, such as :
+ GoodRx Sync API
+ CarePass Sync API 
+ HHS Health Data Initiative
+ GoodRx Retail Rx
+ Est Cost of Care of Care

> *For more information on the APIS please visit* [CarePass API gallery](https://developer.carepass.com/api_gallery)


[HHSandGoodRx_JavaScript](https://github.com/carepass/code-samples/tree/master/HHSandGoodRx_JavaScript)
------------------------
A simple JQuery-mobile application that searches the following API's:
- HHS Health Data Initiative
- GoodRx Retail Rx

To run this app:

1. Run Google Chrome with disabled security: chrome.exe --disable-web-security

2. Open file js/config.js and edit urlAPI to point to your hhs-api deploy path.

3. Open index.html on Google Chrome.

[GoodRx_iOS](https://github.com/carepass/code-samples/tree/master/GoodRx_iOS)
-----------
A simple iOS application that looks up a drug on using the Retail Pricing API and displays the mobile view of the GoodRx drug information.

To run this app:

1. Open file GoodRxSample/Constants.h and supply your Retail Rx API key

2. Give it a run!

[OauthHandshake_iOS](https://github.com/carepass/code-samples/tree/master/OauthHandshake_iOS)
-------------------
A simple iOS application that allows a user to supply their client id and secret key and generate an access token for use with the CarePass Sync APIs. It is an implementation of Google's Oauth2 client library: http://code.google.com/p/gtm-oauth2/

[Grails_CPSync_Demo_Application](https://github.com/carepass/code-samples/tree/master/Grails_CPSync)
-------------------
A simple Grails application that demonstrates how to do the Oauth2 based Carepass login and the utilization of the cpsync.js to retrieve or update data about the logged in user.
Tested using STS 2.7.2


[CPSync_Java](https://github.com/carepass/code-samples/tree/master/CPSync_Java)
-------------------
A simple Java application that demonstrates how to do the Oauth2 based Carepass login and the utilization of the Carepass Sync Java Library works to retrieve or update data about the logged in user.

[CPSync_Python](https://github.com/carepass/code-samples/tree/master/CPSync_Python)
--------------------
Sample Python application for performing the CarePass Oauth-Handshake.

[CSync_ASP_MVC3](https://github.com/carepass/code-samples/tree/master/CSync_ASP_MVC3)
--------------------
Sample ASP.NET MVC 3 application for performing the CarePass Oauth-Handshake.

[CPSync_RubyOnRails1](https://github.com/carepass/code-samples/tree/master/CPSync_RubyOnRails1)
---------------------
Sample Ruby on Rails application for performing the CarePass Oauth-Handshake. This example uses the ruby oauth library

[CPSync_RubyOnRails2](https://github.com/carepass/code-samples/tree/master/CPSync_RubyOnRails2)
---------------------
Sample Ruby on Rails application for performing the CarePass Oauth-Handshake. This example uses the http-party to perform oauth dance (no third party oauth library used)


[CSync_PHP](https://github.com/carepass/code-samples/tree/master/CSync_PHP)
--------------------
Sample PHP  application for performing the CarePass Oauth-Handshake.


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

![alt text](https://www.carepass.com/carepass/resources/images/registered_cp_logo.png "CarePass Logo")
