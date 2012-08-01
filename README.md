About These Samples
===================
Sample API usage from http://developer.carepass.com

/HHSandGoodRx_JavaScript
------------------------
A simple JQuery-mobile application that searches the following API's:
- HHS Health Data Initiative
- GoodRx Retail Rx

To run this app:

1. Run Google Chrome with disabled security: chrome.exe --disable-web-security

2. Open file js/config.js and edit urlAPI to point to your hhs-api deploy path.

3. Open index.html on Google Chrome.

/GoodRx_iOS
-----------
A simple iOS application that looks up a drug on using the Retail Pricing API and displays the mobile view of the GoodRx drug information.

To run this app:

1. Open file GoodRxSample/Constants.h and supply your Retail Rx API key

2. Give it a run!

/OauthHandshake_iOS
-------------------
A simple iOS application that allows a user to supply their client id and secret key and generate an access token for use with the CarePass Sync APIs. It is an implementation of Google's Oauth2 client library: http://code.google.com/p/gtm-oauth2/



/Grails_CPSync_Demo_Application
-------------------
A simple Grails application that demonstrates how to do the Oauth2 based Carepass login and the utilization of the cpsync.js to retrieve or update data about the logged in user.