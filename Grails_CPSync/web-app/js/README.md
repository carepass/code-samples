CarePass JavaScript Client Libraries
====================================

The goal of these libraries is to remove the need for a CarePass developer to manage the baseline connectivity and data un-packing of interacting with the CarePass APIs.

There are two main libraries, CarepassSync for interaction around the current user and HTS which contains interactions for drugs, claims, clinical trials.

Installation
============

There is nothing to install. This library is simply a wrapper around existing REST services offered up by CarePass.

In order to use the CarePass Sync library the client application needs to start the OAuth 2 authentication work flow.

    <script type="text/javascript" charset="utf-8">
      $(function () {

        var setting =
          {
            'host':     "api.aetna.com/carepass/oauth"
          , 'clientId': "12dh79324jia9008z"
          , 'scope': : "IDENTITY,INSURANCE,FITNESS,LIFESTYLE"
          , 'redirectUrl': "http://localhost:8080/MyApplicationOauth/auth"
          };

        var authHost     = "https://"     + setting.host;
        var endUserAuthorizationEndpoint = authHost + "/authorize";
        
        var authUrl = endUserAuthorizationEndpoint + "?response_type=code" +
            "&client_id="    + setting.clientId + "&scope="     + setting.scope +
            "&redirect_uri=" + setting.redirectUrl;

          $("a.connect").attr("href", authUrl);
      });
    </script>
    </head>
    <body> 
    	<a class="connect" href="">Connect</a> 
  	</body>
  	
The application will redirect to Carepass for the user to enter their username/password. Once they are successfully 
authenticated the user is redirected back to their application based on the redirect url setup with a grant code.
  	  	  	
	http://localhost:8080/MyApplicationOauth/auth?code=7aDghI
	
Using the received grant code, call is made to /token endpoint with additional parameters as seen below
	
        var endUserAuthorizationEndpoint = authHost + "/token";

        $.ajax({
			type : "POST",
			url : endUserAuthorizationEndpoint,
			data : "response_type=code" +
            "&client_id="    + setting.clientId +
            "&grant_type=authorization_code" + 
            "&code=" + document.getElementById('myAuthToken').value +
            "&client_secret=" + setting.client_secret +
            "&redirect_uri=http://localhost:8080/DeltonPhilipsOauth/auth",
			success : function(data) {
				$("#tokenURL").val(JSON.stringify(data));
				$("#bearerToken").val(data.access_token);
			},
			error : function(data) {
				console.log(data);
			}
		});  
	
The retrieved access_token should be stored locally as it is used in the CPSync calls as seen below in the examples.
	
Adding the CarePass JavaScript Client Libraries to Your Project
=========================================================
To include the libraries in your project a reference to the api.js file must be made.

> <script type="text/javascript" src = "api.js"></script>

To include the Carepass sync libraries a reference to the cpsync.js file must be made.

> <script type="text/javascript" src = "cpsync.js"></script>

Key Ideas and Basic Usage
=========================

The first step is to make a reference to the object you're interested in CarepassSync (CPSyncObject) or HTS (HTSObject). This is done by declaring a new instance of the object:
 
	var htsObj = new HTSObject();
	
FOr the HTSObject you can get an instance of the API you're interested in, in this case its the clinicalTrialsAPI. The developer API is a requirement for the constructor.

	var theUserApi = 'zasasfa75sdwyv2589asdf';
	var clinicalTrialsObject = new htsObj.clinicalTrialsAPI(theUserApi);
	var trialsData = clinicalTrialsObject.getTrialsByNCTId('myNCTID');
	
This retrieves a JSON object which can be accessed using DOT notation

	trialsData.trialName;
	
The same obtains for the CPSyncObject except the constructor parameter is the access token for the user

	var cpSyncObj = new CPSyncObject();
	var theBioApi = new cpObj.biographyApi('Bearer 8834901dac4568a27da681cdd155ec0a6209');
	var bioData = theBioApi.getUserIdentity();
	
	bioData.firstName; 
	
There is no requirement to close any connections or any other interaction.

Thereafter access is allowed to to multiple APIs once the developer apiKey (access token) or is specified. The apis available are:

HTS Object
	* ClinicalTrialsAPI
	* DrugsAPI
	* deIdentifiedClaimsAPI
	* goodRxAPI
	* MedCostOfCareAPI

CPSync Object
	* biographyApi
	* insuranceApi
	* lifeStyleApi
	* activitiesApi