<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Carepass Sync Demo</title>
 
	<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>	
	<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
	<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.21.custom.css" rel="stylesheet" />	
    
    <g:javascript src="underscore.js"></g:javascript>
    <g:javascript src="cpsync.js"></g:javascript>
    <g:javascript src="api.js"></g:javascript>

    
   <script>
	$(function() {
		$( "#accordion" ).accordion();
	});
   </script>    
  <script type="text/javascript">
	  var htsObj = new HTSObject();
	  var theUserApi = '<API_KEY_HERE>';
	  var clinicalTrialsObject = new htsObj.clinicalTrialsApi('<API_KEY_HERE>');
	  var drugsObject = new htsObj.drugsAPI('<API_KEY_HERE>');
	  var deIdentClaims = new htsObj.deIdentifiedClaimsAPI('<API_KEY_HERE>');
	  var goodRxObject = new htsObj.goodRxAPI('<API_KEY_HERE>');
	  var medicalCostOfMethods = new htsObj.MedCostOfCareAPI('<API_KEY_HERE>');
	  
	  var cpObj = new CPSyncObject();

	  function getCurrentUserData(){
		  var bearerToken = 'Bearer ' + document.getElementById('bearerToken').value;
		  var theBioApi = new cpObj.biographyApi(bearerToken);

    	  var options = {};
    	  options.onSuccess = clearAndAppendFromPageFunction;
    	  //options.onFailure = showAlert;
    	  
    	  theBioApi.getUserIdentity(options);
		  
	  }

	  function getBiographyData(){
		  var bearerToken = 'Bearer ' + document.getElementById('bearerToken').value;
		  var theBioApi = new cpObj.biographyApi(bearerToken);

    	  var options = {};
    	  options.onSuccess = clearAndAppendFromPageFunction;
    	  //options.onFailure = showAlert;
    	  
    	  theBioApi.getUserBiography(options);

	  }


	  function  getLifestyleData(param){

		  
		  var bearerToken = 'Bearer ' + document.getElementById('bearerToken').value;
		  var lsApi = new cpObj.lifeStyleApi(bearerToken);

    	  var options = {};
    	  options.onSuccess = clearAndAppendFromPageFunction;
    	  //options.onFailure = showAlert;
    	  if (param == 'sport'){
	       	  lsApi.getLifestyleData(param, options);
           }
		 
    	  if (param == 'all'){
	       	  lsApi.getLifestyleData(param, options);
           }

	  }

	  function getInsuranceCarriers(){

		  var bearerToken = 'Bearer ' + document.getElementById('bearerToken').value;
		  var insApi = new cpObj.insuranceApi(bearerToken);

    	  var options = {};
    	  options.onSuccess = clearAndAppendFromPageFunction;
	      insApi.getInsuranceCarriers(options);		  
	  }

	  function drugsAlternativesByNDA(){
    	  var options = {};
    	  options.onSuccess = showHHSdisplay;		  
		  drugsObject.getDrugAlternativesByApplicationCode(document.getElementById('drugCode').value,options);
	  }

	  function drugsByNDA(){
    	  var options = {};
    	  options.onSuccess = showHHSdisplay;		  
		  drugsObject.getDrugByApplicationCode(document.getElementById('drugCode').value,options);
	  }

	  function drugResourcesByApplicationCode(){
    	  var options = {};
    	  options.onSuccess = showHHSdisplay;		  
		  drugsObject.getDrugResourcesByApplicationCode(document.getElementById('drugCode').value,options);
	  }


	  function drugPricesLow(){
    	  var options = {};
    	  options.onSuccess = showDrugDisplay;	

		  goodRxObject.lowPrice(document.getElementById('drugName').value, options);
		  
	  }

	  function drugPricesCompare(){
    	  var options = {};
    	  options.onSuccess = showDrugDisplay;	

		  goodRxObject.compare(document.getElementById('drugName').value, options);
	  }

	  function drugUrlByNDC(){

		  var options = {};
    	  options.onSuccess =  showHHSdisplay;	
    	  	  
		  drugsObject.getDrugImagesByURL(document.getElementById('drugCode').value,options);
	  }

	  function saveActivity(){

		  var options = {};
		  var theActivitiesApi = new cpObj.activitiesApi('Bearer ' + document.getElementById('bearerToken').value);
		  options.onSucess = showHHSdisplay;

		  theActivitiesApi.createActivityData(JSON.parse(document.getElementById('activityData').value), options);
	
	  }
	  
	  /*function  saveLifeStyle(){
		  var bearerToken = 'Bearer ' + document.getElementById('bearerToken').value;
		  
		  var theNewApi = new cpObj.lifeStyleApi(bearerToken);
		  var theBioApi = new cpObj.biographyApi(bearerToken);
		  var theActivitiesApi = new cpObj.activitiesApi(bearerToken);
		  var theInsuranceApi = new cpObj.insuranceApi(bearerToken);
		  var theAppointmentsApi = new cpObj.appointmentsAPI(bearerToken);
		  
    	  var options = {};
    	  options.onSuccess = clearAndAppendFromPageFunction;
    	  options.onFailure = showAlert;
    	  
		  var lo = {};
		  var customers = new Object ({id: 1, firstName:'Delton'});

		 // theNewApi.getLifestyleData("blah", options);
		  theBioApi.getUserIdentity(options);
		  theBioApi.getUserBiography(options);
		  theInsuranceApi.getPlans(options);
		  theInsuranceApi.getInsurancePlansLookup(options);
		  theInsuranceApi.getInsuranceCarriers(options);
		  var theDataObject = JSON.parse('[{"id": 59455, "desc":"Human transportation with legs where both legs are in the air at the same time",					"text":"Running",					"type":"Running",					"typeExtra":"running 1",					"date":"05/05/2012 00:00:00",					"startTime":"12/14/2011 09:11:00",					"endTime":"12/14/2011 11:11:00",					"startCity":"Milford",					"endCity":"Shelton",					"startState":"Connecticut",					"endState":"Connecticut",					"startCountry":"USA",					"endCountry":"USA",					"startLatitudeLongitide":"42:12",					"endLatitudeLongitide":" 41:11",					"caloriesBurned":122,	"distance":1650,					"duration":600,					"lastUpdated":"12/14/2011 00:00:00"				},{"id": 59457,			"desc":"Human transportation with legs where both legs are in the air at the same time",				"text":"Running",				"type":"Running",				"typeExtra":"some sport",				"date":"05/05/2012 00:00:00",				"startTime":"12/14/2011 09:11:00",				"endTime":"12/14/2011 11:11:00",				"startCity":"Milford",				"endCity":"Shelton",				"startState":"Connecticut",				"endState":"Connecticut",				"startCountry":"USA",				"endCountry":"USA",				"startLatitudeLongitide":"42:12",				"endLatitudeLongitide":" 41:11",				"caloriesBurned":122,				"distance":1100,				"duration":75 ,				"lastUpdated":"12/14/2011 00:00:00"			}			]');

		  var theString = '[{"id": 59455, "desc":"Human transportation with legs where both legs are in the air at the same time",					"text":"Running",					"type":"Running",					"typeExtra":"running 1",					"date":"05/05/2012 00:00:00",					"startTime":"12/14/2011 09:11:00",					"endTime":"12/14/2011 11:11:00",					"startCity":"Milford",					"endCity":"Shelton",					"startState":"Connecticut",					"endState":"Connecticut",					"startCountry":"USA",					"endCountry":"USA",					"startLatitudeLongitide":"42:12",					"endLatitudeLongitide":" 41:11",					"caloriesBurned":122,	"distance":1650,					"duration":600,					"lastUpdated":"12/14/2011 00:00:00"				},{"id": 59457,			"desc":"Human transportation with legs where both legs are in the air at the same time",				"text":"Running",				"type":"Running",				"typeExtra":"some sport",				"date":"05/05/2012 00:00:00",				"startTime":"12/14/2011 09:11:00",				"endTime":"12/14/2011 11:11:00",				"startCity":"Milford",				"endCity":"Shelton",				"startState":"Connecticut",				"endState":"Connecticut",				"startCountry":"USA",				"endCountry":"USA",				"startLatitudeLongitide":"42:12",				"endLatitudeLongitide":" 41:11",				"caloriesBurned":122,				"distance":1100,				"duration":75 ,				"lastUpdated":"12/14/2011 00:00:00"			}			]';
		  theActivitiesApi.getActivityTypes(options);
		  theActivitiesApi.createActivityData(theDataObject, options);
		  theActivitiesApi.updateActivityData(theDataObject, options);
		  var appointmentString ='{"appointmentStart": "2012/05/25",  "appointmentEnd": "2012/05/25",   "scheduledDate": "",			   "type": "consulting",			   "reason": "general",			   "npiProviderId": 123,			   "facilityName": "Princeton-Plainsboro Teaching Hospital",			   "line1": "line1",			   "line2": "line2",			   "city": "Lakes",			   "state": "Alaska",			   "postalCode": "20910",			   "carrierId": 23,			   "planId": 210,			   "status": "completed",			   "carepassProviderId": 25			}';

		  var updateApptString = '{	"id": "66465",				    "appointmentStart": "01/01/2012",				    "appointmentEnd": "01/01/2012",				    "scheduledDate": "",				    "type": "consulting",				    "reason": "general",				    "npiProviderId": 123,				    "facilityName": "Princeton-Plainsboro Teaching Hospital",				    "line1": "line1",				    "line2": "line2",				    "city": "Lakes",				    "state": "Alaska",				    "postalCode": "20910",				    "carrierId": 23,				    "planId": 210,				    "status": "completed",				    "carepassProviderId": 25				  }';
		  
		  theAppointmentsApi.createAppointment(appointmentString, options);		
		  theAppointmentsApi.updateAppointment(updateApptString, options);
		  theAppointmentsApi.getAppointmentById(66465, options);	
		  theAppointmentsApi.getAppointmentsByDateNpiOrCarePassProviderId('',25,'', options);
		  theAppointmentsApi.getAppointmentsByDateNpiOrCarePassProviderId('','',123, options);


		 // theActivitiesApi.createActivityData(theString, options);
		 
		 // theNewApi.saveLifestyleData(lo, options);
		  
	  }
	  */
	  
      function getClinicalTrials(){
    	  var options = {};
    	  options.onSuccess = clearAndAppendFromPageFunction
    	  options.onFailure = showAlert
    	  clinicalTrialsObject.search({'state3':'NY'}, options)
      }
      function getTrialById(){
    	  var options = {};
    	  options.onSuccess = clearAndAppendResultsfunction
    	  options.onFailure = showAlert
    	  clinicalTrialsObject.getTrialsByNCTId('NCT00835224', options);
      }

      /*
      function searchForArt(){
    	  var options = {};
    	  options.onSuccess = clearAndAppendResultsfunction;
    	  options.onFailure = showAlert;
    	  
       	  drugsObject.searchForART('Alabama Fertility Specialists', 'Birmingham', 'Alabama', 'Steinkampf', '', false , options);
    	  drugsObject.getDrugsByName('Cymbalta',options);
    	  drugsObject.getDrugsByNDCPackages("0002-4760", "0002-4760-76", options);
    	  var searchParams = {};
    	  searchParams['product'] = 'Tylenol';
    	  searchParams['date'] = '2012-02-17';
    	  searchParams['pastdays'] = '10';
	    	  
    	  drugsObject.fdaRecallSearch(searchParams,options);
    	  clinicalTrialsObject.getTrialsByNCTId('NCT00835224', options);
    	  deIdentClaims.search('0004-0098','F',1980,'2010Q1','2011Q3',1, options);
    	  
    	  goodRxObject.lowPrice("Lipitor", options);
    	  goodRxObject.compare("Lipitor", options);
    	  
    	  medicalCostOfMethods.CostOfCareLatLngByCPT('99205', '38.898717', '-77.035974');
    	  medicalCostOfMethods.CostOfCareByZip('99205', '90210');

       	  medicalCostOfMethods.getCategories();
    	  var dentals = medicalCostOfMethods.getCategories('Dental');    	  
     	  
      }*/
      
     function showAll(){
 
   	  var options = {};
	  options.onSuccess = clearAndAppendResultsfunction;
	  options.onFailure = showAlert;  
     }
      
      var clearAndAppendFromPageFunction = function(data, textStatus){ 

           $("#cpSyncDisplay").val(JSON.stringify(data));
      }

      var showHHSdisplay = function (data, textStatus){
		   $("#hhsDisplay").val(JSON.stringify(data));
          }

      var showDrugDisplay = function (data, textStatus){
		   $("#drugDisplay").val(JSON.stringify(data));
         }     
      var showAlert = function(msg){
    	  document.write(msg.responseText);
      }
  </script>   
      
    <style>
      .hidden {
        display: none;
      }
    </style>
  </head>

  <body>
  	
  	<table border="0">
		 <tr>
		 	<td>User AuthCode:</td><td><input type="text" id="myAuthToken" value = "${userAuthCode}"/></td>
		 </tr>
		 <tr>
		 	<td>Token Data Response:</td><td><input type="text" id="tokenURL" size="100"></td>
		 </tr>
		 <tr>
		 	<td>Bearer Token:</td><td> <input type="text" id="bearerToken" size="50"></td>
		 </tr>
		 <!-- tr>
		 	<td><input type="button" id="getData" value="Query CPSync" onClick="saveLifeStyle();"/></td>
		 </tr-->
	 </table>
  	
  	<div id="accordion">
	    <h3><a href="#">Carepass Sync Queries</a></h3>
	    <div>
	    
	    	<table> 
	    		<tr>
	    			<td>
	    				<input type="button" value="Get Current User Data" onClick="getCurrentUserData()"/><br>
	    				<input type="button" value="GetBiography Data" onClick="getBiographyData()"/><br>
	    				<input type="button" value="Get Lifestyle Data (sport)" onClick="getLifestyleData('sport')"/><br>
	    				<input type="button" value="Get Lifestyle Data (all)" onClick="getLifestyleData('all')"/><br>
	    				<input type="button" value="Get Insurance Carriers" onClick="getInsuranceCarriers()"/><br/>
	    			<td>
	    			<td rowspan="3">
	    				<input type="text" id="cpSyncDisplay" size="100" style="height:150px;font-size:14pt;"/>
	    			</td>
	    		</tr>
	    	
	    	</table>
	    	
	    	
	    </div>
	    <h3><a href="#">HHS Queries</a></h3>
	    <div>
	    	<table>
	    		<tr>
	    			<td>Drug Code (e.g. NDA006035): <input type="text" id="drugCode" name="drugCode"/><br></td>
	    		</tr>	    			 
	    		<tr>
	    			<td>
	    				<input type="button" value="FDA Drugs" onClick="drugsByNDA()"/>
	    				<input type="button" value="Drug Alt by NDA" onClick="drugsAlternativesByNDA()"/>
	    				<input type="button" value="Drug Resources by NDA" onClick="drugResourcesByApplicationCode()"/>
	    				<input type="button" value="Drugs URL BY NDC" onClick="drugUrlByNDC()"/>
	    			<td>
	    			<td rowspan="3">
	    				<input type="text" id="hhsDisplay" size="100" style="height:150px;font-size:14pt;"/>
	    			</td>
	    		</tr>    	
	    	</table> 
	    </div>
	    <h3><a href="#">Retail RX Pricing</a></h3>
	    <div>
	    	<table>
	    		<tr>
	    			<td>Drug Name: <input type="text" id="drugName" name="drugName"/><br></td>
	    		</tr>	    			 
	    		<tr>
	    			<td>
	    				<input type="button" value="Drug Prices Compare" onClick="drugPricesCompare()"/>
	    				<input type="button" value="Drug Prices Low" onClick="drugPricesLow()"/>
	    			<td>
	    			<td rowspan="3">
	    				<input type="text" id="drugDisplay" size="100" style="height:150px;font-size:14pt;"/>
	    			</td>
	    		</tr>
	    	
	    	</table>		    
	 	    
	    </div>	   
	    
	    <h3><a href="#">Update/Create Functions</a></h3>
	    <div>
	    	<table>    			 
	    		<tr>
	    			<td>
	    				<input type="button" value="Save Activity" onClick="saveActivity()"/>
	    			<td>
	    			<td rowspan="3">
	    				<input type="text" id="activityData" size="100" style="height:150px;font-size:14pt;"/>
	    			</td>
	    		</tr>
	    	
	    	</table>		    
	 	    
	    </div>		     
    </div>
  </body>
  
  <script type="text/javascript" charset="utf-8">
        var setting =
          {
            'host':     "www.carepass.com/carepass/oauth"
          , 'clientId': "<YOUR_CLIENT_ID>"
          , 'client_secret' : '<YOUR_CLIENT_SECRET>'
          };

        var authHost     = "https://"     + setting.host;
        var endUserAuthorizationEndpoint = authHost + "/token";

        $.ajax({
			type : "POST",
			url : endUserAuthorizationEndpoint,
			data : "response_type=code" +
            "&client_id="    + setting.clientId +
            "&grant_type=authorization_code" + 
            "&code=" + document.getElementById('myAuthToken').value +
            "&client_secret=" + setting.client_secret +
            "&redirect_uri=http://localhost:8092/MyCPSyncApp/auth",
			success : function(data) {
				$("#tokenURL").val(JSON.stringify(data));
				$("#bearerToken").val(data.access_token);
			},
			error : function(data) {
				console.log(data);
			}
		});          
      
    </script>  
</html>
