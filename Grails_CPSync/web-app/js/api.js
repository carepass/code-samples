var HTSObject = function() {

	var baseURL = 'https://api.carepass.com';	

	return {
		setBaseURL : function(newBaseUrl) {
			baseURL = newBaseUrl;
		},

		clinicalTrialsApi : function(theApiKey) {
			var trialContext = this;
			var apiKey = theApiKey;
			var subWeb = '/hhs-directory-api';

			var url = '/clinicaltrials/';

			return {
				/**
				 * A method used to search a clinical trial by nctId
				 * 
				 * @param {string}  nctId: Registry number (example:NCT00835224)   (required)
				 * 
				 * @param {Object}   options: options for the method call
				 * @param {string}   options.performDataValidation: option which determines
				 * 					 if the object should perform validation on the parameters
				 * 					 before making the api call.
				 * @param {function}
				 *            [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}
				 *            [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */
				getTrialsByNCTId : function(nctId, options) {
					var searchParams = {};
					
					if (!nctId) {
						return false;
					}
					
					searchParams['apikey'] = apiKey;
					
					$.ajax({
						type : "GET",
						url : baseURL + subWeb + url + nctId,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,

								textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,

								textStatus);
							}
						}

					});
				},

				/**
				 * A method used to search the clinical trials (at least one
				 * parameter in
				 * 
				 * the searchParams parameter is required
				 * 
				 * @param {Object}   searchParams: search parameters for the method    call
				 * @param {string}   searchParams.drugname: Name of drug (not required)
				 * @param {string}   searchParams.status: Status of clinical trials /   "open" or "closed" (not required)
				 * @param (integer)  searchParams.page: Page number. Each page has  until 500 results. (e.g. page=1 return the last 500 clinical trials). (not required)
				 * @param {string}
				 *            searchParams.condition: condition summary
				 *            (example:
				 * 
				 * Depression).(not required)
				 * @param {string}
				 *            searchParams.state1: Two letter abreviation of the
				 *            state
				 * 
				 * to be searched (not required)
				 * @param {string}
				 *            searchParams.state2: Two letter abreviation of the
				 *            state
				 * 
				 * to be searched (not required)
				 * @param {string}
				 *            searchParams.state3: Two letter abreviation of the
				 *            state
				 * 
				 * to be searched (not required)
				 * @param {string}
				 *            searchParams.country1: Two letter abreviation of
				 *            the
				 * 
				 * region followed by the two letter country code to be searched
				 * (not required)
				 * @param {string}
				 *            searchParams.country2: Two letter abreviation of
				 *            the
				 * 
				 * region followed by the two letter country code to be searched
				 * (not required)
				 * @param {string}
				 *            searchParams.country3: Two letter abreviation of
				 *            the
				 * 
				 * region followed by the two letter country code to be searched
				 * (not required)
				 * @param {string}
				 *            searchParams.firstreceivedfrom: "mm/dd/yyyy" - The
				 *            first
				 * 
				 * received date is the date when the clinical trial was first
				 * submitted to ClinicalTrials.gov. There
				 * 
				 * is often a delay of a few days before the trial is available
				 * on the ClinicalTrials.gov website.
				 * 
				 * (not required)
				 * @param {string}
				 *            searchParams.firstreceivedto: "mm/dd/yyyy" - The
				 *            first
				 * 
				 * received date is the date when the clinical trial was first
				 * submitted to ClinicalTrials.gov. There
				 * 
				 * is often a delay of a few days before the trial is available
				 * on the ClinicalTrials.gov website.
				 * 
				 * (not required)
				 * @param {string}
				 *            searchParams.lastupdatedfrom: "mm/dd/yyyy" - The
				 *            last updated date is the most recent date when changes to a
				 * clinical trial were submitted to
				 * 
				 * ClinicalTrials.gov. There is often a delay of a few days
				 * before the updated trial is available on
				 * 
				 * the ClinicalTrials.gov website. (not required)
				 * @param {string}
				 *            searchParams.lastupdatedto: "mm/dd/yyyy" -
				 *            "mm/dd/yyyy" - The last updated date is the most
				 *            recent date when changes to a clinical trial were
				 *            submitted to
				 * 
				 * ClinicalTrials.gov. There is often a delay of a few days
				 * before the updated trial is available on
				 * 
				 * the ClinicalTrials.gov website. (not required)
				 * @param {string}
				 *            searchParams.country3: Two letter abreviation of
				 *            the
				 * 
				 * region followed by the two letter country code to be searched
				 * (not required)
				 * 
				 * @param {Object}
				 *            options: options for the method call
				 * @param {string}
				 *            options.performDataValidation: option which
				 *            determines
				 * 
				 * if the object should perform validation on the parameters
				 * before making the api call.
				 * @param {function}
				 *            [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}
				 *            [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */
				search : function(searchParams, options) {
					searchParams || (searchParams = {});
					options || (options = {});
					var statePrefix = 'NA:US:';
					var stateOption = searchParams['state1']
					if (stateOption) {
						searchParams['state1'] = statePrefix +	searchParams['state1'];
					}
					stateOption = searchParams['state2']
					if (stateOption) {
						searchParams['state2'] = statePrefix + searchParams['state2'];
					}
					stateOption = searchParams['state3']
					if (stateOption) {
						searchParams['state3'] = statePrefix +	searchParams['state3'];
					}
					
					searchParams['apiKey'] = apiKey;
					

					$.ajax({
						type : "GET",
						url : baseURL + url + 'search?',
						data : searchParams,
						dataType : "jsonp",
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				}
			};

		},// end of clinicalTrials object

		drugsAPI : function(theApiKey) {
			var drugsContext = this;
			var drugsUrl = '/drugs/';
			var applicationsUrl = '/applications/';
			var artUrl = 'art/';
			var drugpricesUrl = '/drugprices/';
			var recallsUrl = '/fdarecalls/';
			var apiKey = theApiKey;
			var drugResources = '/drugsresources';
			var drugDocuments = '/documents';				
			var drugsAlternatives = '/alternatives';
			var subWeb = '/hhs-directory-api';
			var apiKey = theApiKey;
			
			return {
				/**
				 * A method used to search the drug database by new drug
				 * 
				 * application code
				 * 
				 * @param {string}
				 *            drugApplicationCode: New Drug Application Code
				 * 
				 * (example:NDA022307) (required)
				 * 
				 */
				getDrugByApplicationCode : function(drugApplicationCode, options) {

					if (!drugApplicationCode) {
						return false;
					}
					
					var searchParams = {};
					searchParams['apikey'] = apiKey;

					$.ajax({
						type : "GET",
						url : baseURL + subWeb + applicationsUrl +	drugApplicationCode,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});
				},

				/**
				 * A method used to Search NDC's associated to a New Drug
				 * 
				 * Application.
				 * 
				 * @param {string}
				 *            drugApplicationCode: New Drug Application Code
				 * 
				 * (example:NDA022307) (required)
				 */
				getDrugResourcesByApplicationCode : function(drugApplicationCode, options) {
					if (!drugApplicationCode) {
						return false;
					}
					
					var searchParams = {};
					searchParams['apikey'] = apiKey;

					$.ajax({
						type : "GET",
						url : baseURL + subWeb + applicationsUrl +	drugApplicationCode + drugResources,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});
				},

				/**
				 * A method used to search for therapeutic alternatives by a New
				 * 
				 * Drug Application Code.
				 * 
				 * @param {string}
				 *            drugApplicationCode: New Drug Application Code
				 * 
				 * (example:NDA022307) (required)
				 */
				getDrugAlternativesByApplicationCode : function	(drugApplicationCode, options) {
					if (!drugApplicationCode) {
						return false;
					}
										
					var searchParams = {};
					searchParams['apikey'] = apiKey;

					$.ajax({
						type : "GET",
						url : baseURL + subWeb + applicationsUrl +	drugApplicationCode + drugsAlternatives,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});
				},

				/**
				 * A method used to search for drug documents nby drug code
				 * 
				 * Drug Application Code.
				 * 
				 * @param {string}
				 *            drugApplicationCode: New Drug Application Code
				 * 
				 * (example:NDA022307) (required)
				 */
				getDrugDocumentsByApplicationCode : function	(drugApplicationCode, options) {
					if (!drugApplicationCode) {
						return false;
					}
										
					var searchParams = {};
					searchParams['apikey'] = apiKey;
					
					$.ajax({
						type : "GET",
						url : baseURL + subWeb + applicationsUrl +	drugApplicationCode + drugDocuments,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});
				},
				
				
				
				/**
				 * A method used to search for Assisted Reproductive Technology
				 * 
				 * Information
				 * 
				 * @param {string}   clinicname: Search for all ART that match with the given clinic name
				 * @param {string}
				 *            city: Search for all ART that match with the
				 * 
				 * given city
				 * @param {string}
				 *            state: Search for all ART that match with the
				 * 
				 * given state
				 * @param {string}
				 *            medicaldirector: Search for all ART that match
				 * 
				 * with the given medical director
				 * @param {string}
				 *            year: Search for all ART that match with the
				 * 
				 * given year
				 * @param {bool}
				 *            exactmatch: Search for all ART that exactly
				 * 
				 * matches with the given parameter
				 */
				searchForART : function(clinicname, city, state, medicaldirector, year, exactmatch, options) {
					var searchParams;

					searchParams || (searchParams = {});
					options || (options = {});

					if (state != '') {
						searchParams['state'] = state;
					}

					if (clinicname != '') {
						searchParams['clinicname'] = clinicname;
					}

					if (city != '') {
						searchParams['city'] = city;
					}

					if (medicaldirector != '') {
						searchParams['medicaldirector'] = medicaldirector;

					}

					if (year != '') {
						searchParams['year'] = year;
					}

					if (exactmatch == true) {
						searchParams['exactmatch'] = true;

					}

					searchParams['apiKey'] = apiKey;

					var theURL = baseURL + subWeb + '/' + artUrl +	'search';

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});
				},
				/**
				 * Maps to the URL drugs/search. Example where the name is Cymbalta
				 * https://api.carepass.com/hhs-directory-api/drugs/search?name=Cymbalta&
				 * @drugName 
				 */
				getDrugsByName : function(drugName, options) {

					var theURL = baseURL + subWeb  + drugsUrl	+ 'search';
					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['name'] = drugName;
					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});

				},

				/**
				 * Returns all image information about the requested NDC 
				 * https://api.carepass.com/hhs-directory-api/drugs/0002-4760/images?
				 * @ndc2segment
				 */
				getDrugImagesByURL : function(ndc2segment, options) {

					var theURL = baseURL + subWeb +  drugsUrl	+ ndc2segment + '/images';
					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['ndc2segment'] = ndc2segment;
					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});

				},
				/**
				 * Returns all information about the requested NDC
				 * https://api.carepass.com/hhs-directory-api/drugs/0002-4760/packages/0002-4760-76 
				 * @ndc2segment
				 * @ndc3Segment
				 */
				getDrugsByNDCPackages : function(ndc2Segment, ndc3Segment,	options) {

					var theURL = baseURL + subWeb +  drugsUrl	+ ndc2Segment + '/packages/' + ndc3Segment;
					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['apikey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data, textStatus);
							}
						}

					});

				},
				fdaRecallSearch : function(searchParams, options) {

					var theURL = baseURL + subWeb + recallsUrl + 'search';
					options || (options = {});

					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(drugsContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(drugsContext, data,	textStatus);
							}
						}

					});

				}
			}
		},// end of drugs object
		deIdentifiedClaimsAPI : function(theApiKey) {
			var apiKey = theApiKey;
			var claimsUrl = '/claims-directory-api/';
			var subWeb = '/hhs-directory-api';
			var deIdentContext = this;

			return {

				/***
				 * https://developer.carepass.com/io-docs
				 * https://api.carepass.com/claims-directory-api/claims/search?ndc=0004-0098&gender=F&birthyear=1980&from=2010Q1&to=2011Q3&page=1
				 * Search data of claims. At least one parameter is required. 
				 * @ndc
				 * @gender
				 * @birthyear
				 * @from
				 * @to
				 * @page
				 */
				search : function(ndc, gender, birthyear, from, to, page, options) {

					var theURL = baseURL + claimsUrl + 'claims/search';

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['ndc'] = ndc;
					searchParams['gender'] = gender;
					searchParams['birthyear'] = birthyear;
					searchParams['from'] = from;
					searchParams['to'] = to;
					searchParams['page'] = page;
					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(deIdentContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(deIdentContext, data, textStatus);
							}
						}

					});

				}
			}
		},
		goodRxAPI : function(theApiKey) {
			var apiKey = theApiKey;
			var drugPricesUrl = '/drugprices';
			var deIdentContext = this;
			var subWeb = '/good-rx-api';

			return {

				/***
				 * https://api.carepass.com/good-rx-api/drugprices/low?name=lipitor
				 * Search low drug price  
				 * @name 
				 */
				lowPrice : function(name,	options) {

					var theURL = baseURL + subWeb + drugPricesUrl + '/low';

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['name'] = name;
					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(deIdentContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(deIdentContext, data, textStatus);
							}
						}

					});

				},
				
				/***
				 * https://api.carepass.com/good-rx-api/drugprices/compare?name=lipitor&apikey=g2m4m43z7bzhebxv73ehswt8
				 * Compare drug prices 
				 * @name 
				 */
				compare : function(name,	options) {

					var theURL = baseURL + subWeb + drugPricesUrl + '/compare';

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['name'] = name;
					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(deIdentContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(deIdentContext, data, textStatus);
							}
						}

					});

				}				
				
			}
		},
		
		MedCostOfCareAPI : function(theApiKey) {
			var apiKey = theApiKey;
			var medCostCareUrl = '/med/';
			var dentalCostCareUrl = '/dental/';
			var medCostContext = this;
			var subWeb = '/ecc-directory-api';

			return {
				
				/***
				 * Get Cost of Care for lat, lng 
				 * https://api.carepass.com/ecc-directory-api/med/99205/38.898717,-77.035974
				 * @cpt - Current medical procedural terminology code
				 * @lat - lat eg. (38.898717) 
				 * @lng - lng eg. (-77.035974) 
				 */
				CostOfCareLatLngByCPT : function(cpt, lat, lng,	options) {

					var theURL = baseURL + subWeb + medCostCareUrl + cpt + '/' + lat + ',' + lng;

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(medCostContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(medCostContext, data, textStatus);
							}
						}

					});

				},
				/***
				 * Get Cost of Zip for lat, lng 
				 * https://api.carepass.com/ecc-directory-api/med/99205/38.898717,-77.035974
				 * @cpt - Current medical procedural terminology code
				 * @lat - lat eg. (38.898717) 
				 * @lng - lng eg. (-77.035974) 
				 */				
				CostOfCareByZip : function(cpt, zip, options) {

					var theURL = baseURL + subWeb + medCostCareUrl + cpt + '/zip/' + zip;

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(medCostContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(medCostContext, data, textStatus);
							}
						}

					});

				},

				/***
				 * Get Cost of Care for lat, lng 
				 * https://api.carepass.com/ecc-directory-api/med/99205/38.898717,-77.035974
				 * @cpt - Current medical procedural terminology code
				 * @lat - lat eg. (38.898717) 
				 * @lng - lng eg. (-77.035974) 
				 */
				DentalCostOfCareLatLngByCPT : function(cpt, lat, lng,	options) {

					var theURL = baseURL + subWeb + dentalCostCareUrl + cpt + '/' + lat + ',' + lng;

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(medCostContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(medCostContext, data, textStatus);
							}
						}

					});

				},
				/***
				 * Get Cost of Zip for lat, lng 
				 * https://api.carepass.com/ecc-directory-api/med/99205/38.898717,-77.035974
				 * @cpt - Current medical procedural terminology code
				 * @lat - lat eg. (38.898717) 
				 * @lng - lng eg. (-77.035974) 
				 */				
				
				DentalCostOfCareLatLngByZip : function(cpt, zip, options) {

					var theURL = baseURL + subWeb + dentalCostCareUrl + cpt + '/zip/' + zip;

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(medCostContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(medCostContext, data, textStatus);
							}
						}

					});
				},
				
				/**
				 * Get all categories
				 * https://api.carepass.com/ecc-directory-api/categories?
				 */
				
				getCategories : function() {

					var theURL = baseURL + subWeb + '/categories?apiKey=' + apiKey;
					alert(theURL);
					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(medCostContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(medCostContext, data, textStatus);
							}
						}

					});
				},
				
				/**
				 * Get category
				 * https://api.carepass.com/ecc-directory-api/categories?
				 */
				
				getCategories : function(category,options) {

					var theURL = baseURL + subWeb + '/categories/' + category;

					// searchParams || (searchParams = {});
					var searchParams = {};
					options || (options = {});

					searchParams['apiKey'] = apiKey;

					$.ajax({
						type : "GET",
						url : theURL,
						dataType : "jsonp",
						data : searchParams,
						async : false,
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(medCostContext, data, textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(medCostContext, data, textStatus);
							}
						}

					});
				}					
			}
		}		
	}
};