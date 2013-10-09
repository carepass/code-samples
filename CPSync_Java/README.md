CarePass Java Client Libraries
====================================

This is the maven repository for the carepass java client libraries.

The goal of these libraries is to remove the need for a CarePass developer to manage the baseline connectivity and data un-packing of interacting with the CarePass APIs.

There are two main libraries, CarepassSync for interaction around the current user and HTS which contains interactions for drugs, claims, clinical trials.

About CarePass APIs
--------------------
Read all about the available API's at https://developer.carepass.com

CarePass Sync Configuration
--------------------

The main configuration for OAuth authentification should looks like the below portion of code, that has to be set in your Spring configuration file

```xml
	<!-- OAuth -->
	<bean id="carePassOAuthData"
		class="com.aetna.carepass.oauth.connector.scribe.api.CarePassOAuthData">
		<property name="apiKey" value="${api.key}" />
		<property name="apiSecret" value="${api.secret}" />
		<property name="callback" value="${callback}"/>

		<property name="api" ref="carePassApi" />
	</bean>
	<bean id="carePassOAuth"
		class="com.aetna.carepass.oauth.connector.service.CarePassOAuthImpl">
		<property name="data" ref="carePassOAuthData" />
	</bean>
	<bean id="carePassApi"
		class="com.aetna.carepass.oauth.connector.scribe.api.CarePassApi">
		<property name="scope"
			value="${scope}" />
	</bean>
	<!--End OAuth -->
```

```INI
	api.key=sbnrcvts8k3ceh9yqk6wyenx
	api.secret=9pDwrx2d5PGE2w8MXrQfTaFh
	callback=http://localhost:8080/CPSync_Java/login-oauth-completed.htm
	api=carePassApi
	scope=IDENTITY,INSURANCE,FITNESS,LIFESTYLE,APPOINTMENT
	api.hhs=2vedztxvwq4pgnmkecmqrebv
	api.ecc=45z6eg74j6j2nr6rgvjzdz5c
	api.goodRX=7mqgq94zjsbex9zgzs9n92yf
	api.claims=nj5utnwq99rfqggzmce83mnk
```

Configurations are added to the [cpsync.properties](https://github.com/ferronrsmith/code-samples/blob/master/CPSync_Java/src/main/webapp/WEB-INF/properties/cpsync.properties) as shown above

In order to use the CarePass Sync library the client application needs to start the OAuth 2 authentication work flow. The OAuth work flow has 2 main steps
we should be interested in :
- **Step 1 -** the first is the call to the *authorize* endpoint  by a request call to **USER_APPLICATION_URL**/login-carepass where the apiKey, the apiSecret and the return_uri are passed to retrieve the grant code which is seen in the section *Retrieving Grant Code* below.
- **Step 2 -** after receiving the access code other call is made to retrieve the access token by calling the *token* endpoint as seen in *Exchanging Grant Code for Access Token*.

### Retrieving Grant Code

```java
	@Autowired
	private CarePassOAuth carePassOAuth;

	@RequestMapping(value = { "REQUEST_OAUTH_URI" }, method = RequestMethod.GET)
	public String carePassLogin() {
		return "redirect:" + carePassOAuth.retrieveInitialRequest();
	}
```

The application will redirect to Carepass for the user to enter their username/password if it initially does not have the Access Token. Once they are successfully
authenticated the user is redirected back to their application based on the redirect url setup which redirects to the request mapping "/carepass-callback" with a grant code.

	http://{YOUR_APPLICATION_CAREPASS_REDIRECT_URL}?code={ACCESS_CODE}

Using the received grant code, call is made to /token endpoint with additional parameters as seen below

### Exchanging Grant Code for Access Token

```java
    @RequestMapping(value = { "RESPONSE_AUTHENTIFICATION_CODE_URI" }, method = RequestMethod.GET)
	public String carePassLoginSuccess(
			@RequestParam(value = "code", required = false) String oauthVerifier,
			WebRequest request) {
		carePassOAuth.grantOauthAccess(oauthVerifier);
		return "endpoint";
	}
```
				
The retrieved access_token is stored in the CarePassOAuth service and could be requested to be used. 

The retrieved access_token is stored in the CarePassOAuth service and could be requested to be used.

CarePass Sync Endpoint Implementation Example
--------------------

The following is an example of an API call after getting the access_token

```java
	@Autowired
	private IdentityService identityService;

	@RequestMapping(value = { "MAPPED_API_CALL_URI" }, method = RequestMethod.GET)
	public String identityGet(WebRequest request, Model model) {
		try {
		Identity identity=	identityService.findIdentity();

		model.addAttribute("firstName", identity.getFirstName());
		model.addAttribute("lastName", identity.getLastName());
		model.addAttribute("email",identity.getEmail());

		} catch (EndpointException e) {
			model.addAttribute("error",e.getMessage());
			e.printStackTrace();
			return "redirect:"+AUTHENTIFICATION_PAGE;
		}
		return "USER_IDENTITY_PAGE";
	}
```

CarePass HTS Configuration
--------------------

The main configuration for HTS should looks like the below portion of code, that has to be set in your Spring configuration file

```xml
	<bean id="hhsApiService" class="com.aetna.carepass.hhs.hhsapi.HhsApiServiceImpl">
		<property name="apiKey" value="HHS_API_KEY"></property>
	</bean>
	<bean id="eccApiService" class="com.aetna.carepass.hhs.ecc.EccApiServiceImpl">
		<property name="apiKey" value="ECC_API_KEY"></property>
	</bean>
	<bean id="goodRXApiService" class="com.aetna.carepass.hhs.goodrx.GoodRXApiServiceImpl">
		<property name="apiKey" value="GOODRX_API_KEY"></property>
	</bean>
	<bean id="deIdentificatedClaimsApiService"
		class="com.aetna.carepass.hhs.claims.DeIdentificatedClaimsApiServiceImpl">
		<property name="apiKey" value="DE_IDENTIFICATED_CLAIMS_API_KEY"></property>
	</bean>
```

CarePass HTS Endpoint Implementation Example
----------------------------------------

The following is an example of an API an ECC's api call.

```java
	@RequestMapping(value = { "/MAPPED_API_CALL_URI" }, method = RequestMethod.GET)
	public String listMedicalCCCpt(
			@RequestParam(value = "REQUEST_PARAMETER_1", required = false) String rp1,
			@RequestParam(value = "REQUEST_PARAMETER_2", required = false) String rp2,
			@RequestParam(value = "REQUEST_PARAMETER_3", required = false) String rp3,
			Model model) {
		try {

			List<CostCareInformation> responseList = eccApiService
					.listECCMedicalInformation(rp1, rp2, rp3);
			//Parsing to show in JSON format
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(responseList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return "hhs/ecc";
	}
```

Adding the CarePass Java Client Libraries to Your Project
------------------------------------------------------------

The Java Client library for CarePass is a Maven project.


Using Maven(or ivy, sbt, etc), add the following to your pom.xml:
```xml
<repositories>
	<repository>
		<id>github</id>
		<name>Carepass Client Libraries Repository</name>
		<url>https://github.com/carepass/maven/raw/master</url>
	</repository>
</repositories>

<dependencies>
	<dependency>
		<groupId>com.aetna.carepass</groupId>
		<artifactId>consumer-platform-carepass-java-connector</artifactId>
		<version>2.2-SNAPSHOT</version>
	  </dependency>
</dependencies>
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
Sample applications are available and implement were implemented in the following languages.
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