var CPSyncObject = function() {

	var baseURL = 'https://api.carepass.com';	

	return {
		setBaseURL : function(newBaseUrl) {
			baseURL = newBaseUrl;
		},
		utilityApi : function(){
			return {
			}			
		},
				
		insuranceApi : function(bearerAuthorization) {
			var trialContext = this;
			var bearerAuth = bearerAuthorization;
			var userDirApiUrl = '/user-directory-api';

			return {
				
				/**
				 * Saves Insurance for current User.
				 *
				 * @param {function}    [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}  [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */
				
				saveInsurance : function(dataObject,options) {
					
					$.ajax({
						type : "POST",
						url : baseURL + userDirApiUrl + '/users/currentUser/insurance/plans',
						dataType : "json",
						async : false,
						data : JSON.stringify(dataObject),
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				},
				
				/**
				 * Retrieve plans by plan id
				 *
				 * @param {function}    [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}  [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */				
				getPlansById : function(planId,options) {
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/insurance/plans/' + planId,
						dataType : "json",
						async : false,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});				
				},				
				
				/**
				 * Retrieve all plans
				 *
				 * @param {function}    [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}  [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */				
				getPlans: function(options) {
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/insurance/plans',
						dataType : "json",
						async : false,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				},							
				
				/**
				 * Retrieves carrierid and carriername of the insurance for lookup purpose
				 *
				 * @param {function}    [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}  [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */				
				getInsuranceCarriers: function(options) {
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/insurance/carriers',
						dataType : "json",
						async : false,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});

				},					
	
				
				/**
				 * Retrieves carrierid, planid and planname of the insurance for lookup purpose
				 *
				 * @param {function}    [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}  [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */						
				getInsurancePlansLookup: function(options) {
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/insurance/plans',
						dataType : "json",
						async : false,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				},	
				
				/**
				 * Update Insurance for current User.
				 * 
				 * @param plansData  - json object containing 1 or more plans
				 * @param {function}    [options.onSuccess] a callback function called on
				 * 
				 * success. takes args data, textStatus
				 * @param {function}  [options.onFailure] a callback function called on
				 * 
				 * failure. takes args xhr, msg, exc
				 * 
				 */						
				
				updateInsurancePlans: function(plansData, options) {
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + 'users/currentUser/insurance/plans',
						dataType : "json",
						async : false,
						data: plansData,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				
				function setHeader(xhr, token){
					xhr.setRequestHeader('Authorization',token);					
					}
				},					
			};

		},// end of lifestyle object		
		
		lifeStyleApi : function(bearerAuthorization){
			var trialContext = this;
			var bearerAuth = bearerAuthorization;
			var userDirApiUrl = '/user-directory-api';

			return {
				/**
				 * A method used to search for lifestyle 
				 *
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
				
				getLifestyleData : function(attribute, options) {
					
					var searchParams = {};
					
					if (attribute){
						searchParams['type'] = attribute;
					}
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/lifestyle',
						dataType : "json",
						async : false,
						data : searchParams,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				},
				
				/**
				 * A method used to save lifestyle data
				 *
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
			 saveLifestyleData : function(dataObject, options){
				 
				 	var theRequestUrl = baseURL + userDirApiUrl + '/users/currentUser/lifestyle';
				 	
				    if (dataObject.attribute){
				    	theRequestUrl = theRequestUrl + '/' + dataObject.attribute;
				    }
				 
					$.ajax({
						type : "PUT",
						url : theRequestUrl ,
						dataType : "json",
						async : false,
						data : JSON.stringify(dataObject),
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
			 },
			 
			};

		},// end of lifestyle object

		activitiesApi : function(bearerAuthorization) {
			var trialContext = this;
			var bearerAuth = bearerAuthorization;
			var userDirApiUrl = '/user-directory-api';

			return {
				/**
				 * Retrieves the Activities data for the current user for the given date range.
				 *
				 * @param dateFrom Format: MM/DD/YYYY Example Values: 12/10/2010
				 * @param dateTo Format: MM/DD/YYYY Example Values: 01/30/2012
				 * 
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
				
				getUserActivityByDateRange : function(fromDate, toDate) {
					
					var searchParams = {};
					
					if (fromDate){
						searchParams['dateFrom'] = fromDate;
					}
					
					if (toDate){
						searchParams['dateTo'] = toDate;
					}
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/fitness/activities',
						dataType : "json",
						async : false,
						data : searchParams,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				},
				/***
				 * Retrieves the Activities data for the current user for the given activity id.
				 * 
				 * @param activityId example 1296
				 */
				getUserActivityById : function(activityId, options) {
					
					var theRequestUrl = baseURL + userDirApiUrl + '/users/currentUser/fitness/activity/' + activityId;
					
					$.ajax({
						type : "GET",
						url : theRequestUrl,
						dataType : "json",
						async : false,
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
				},

				/***
				 * Retrieves all valid Activity types for look-up purpose.
				 *
				 */
				getActivityTypes : function(options) {
					
					var theRequestUrl = baseURL + userDirApiUrl + '/users/currentUser/fitness/activities/types';
					
					$.ajax({
						type : "GET",
						url : theRequestUrl,
						dataType : "json",
						async : false,
						headers : {
							'Authorization' : bearerAuth							
						},						
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});				
				},				
				
			 /***
			  * Creates activity data for the current user.
			  * 
			  * @param jsonObject reflecting the data structure as per api
			  */
			 createActivityData : function(dataObject, options){
				 
				 	var theRequestUrl = baseURL + userDirApiUrl + '/users/currentUser/fitness/activities';

				 	$.ajax({
						type : 'POST',
						url : theRequestUrl ,
						async : false,
						data : JSON.stringify(dataObject),
						contentType: 'application/json; charset=utf-8',
						dataType : 'json',
						headers : {
							'Authorization' : bearerAuth							
						},
						contentType: 'application/json; charset=utf-8',
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
			 },
			 
			 /***
			  * Update activity data for the current user. PUT /users/currentUser/fitness/activities
			  * 
			  * @param jsonObject reflecting the data structure as per api
			  */			 
			 updateActivityData : function(dataObject, options){
				 
				 	var theRequestUrl = baseURL + userDirApiUrl + '/users/currentUser/fitness/activities';
				 
					$.ajax({
						type : "PUT",
						url : theRequestUrl ,
						dataType : "json",
						async : false,
						data : JSON.stringify(dataObject),
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						success : function(data, textStatus) {
							if (options.onSuccess) {
								options.onSuccess.call(trialContext, data,	textStatus);
							}
						},
						error : function(data, textStatus, other) {
							if (options.onFailure) {
								options.onFailure.call(trialContext, data,	textStatus);
							}
						}

					});
			 },			 
			 
			 
			};

		},// end of lifestyle object		
		
		biographyApi : function(bearerAuthorization) {
			var drugsContext = this;
			var bearerAuth = bearerAuthorization;
			var userDirApiUrl = '/user-directory-api';
			
			return {
				/**
				 * Get a user's identity
				 * 
			
				 * 
				 */
				getUserIdentity : function(options) {

					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser',
						dataType : "json",
						data : {},
						headers : {
							'Authorization' : bearerAuth							
						},
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
				 * Get a user's identity
				 * 
			
				 * 
				 */
				getUserBiography : function(options) {

					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/biography',
						dataType : "json",
						data : {},
						headers : {
							'Authorization' : bearerAuth							
						},
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
				 * Creates (if one does not exist) or updates in context user's biography
				 * @param dataObject - user Biography object
			
				 * 
				 */
				saveUserBiography : function(dataObj, options) {

					$.ajax({
						type : "PUT",
						url : baseURL + userDirApiUrl + '/users/currentUser/biography',
						dataType : "json",
						data : JSON.stringify(dataObject),
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						async : false,
						contentType: 'application/json; charset=utf-8',
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
		},// end of biography object
		appointmentsAPI : function(bearerAuthorization) {
			var drugsContext = this;
			var bearerAuth = bearerAuthorization;
			var userDirApiUrl = '/user-directory-api';
			
			return {
				
				
				/**
				 * Get all appointments by appointmentId
				 */
				getAppointmentById : function(appointmentId, options) {

					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/appointments/' + appointmentId,
						dataType : "json",
						data : {},
						headers : {
							'Authorization' : bearerAuth							
						},
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
				 * Update an appointment for the current user.
				 * @param JSON String dataObject - user Biography object
				 */
				
				updateAppointment : function(dataObj, options) {

					$.ajax({
						type : "PUT",
						url : baseURL + userDirApiUrl + '/users/currentUser/appointments',
						dataType : "json",
						data : dataObj,
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						async : false,
						contentType: 'application/json; charset=utf-8',
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
				 * Create an appointment for the current user
				 * @param dataObject - user Biography object
				 */			
				createAppointment : function(dataObj, options) {

					$.ajax({
						type : "POST",
						url : baseURL + userDirApiUrl + '/users/currentUser/appointments',
						dataType : "json",
						data : dataObj,
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						async : false,
						contentType: 'application/json; charset=utf-8',
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
				 * Create an appointment for the current user
				 * @param dataObject - user Biography object
				 */			
				getAppointmentsByDateNpiOrCarePassProviderId : function(afterDate, carepassProviderId, npiProviderId, options) {

					var searchParams = {};
					
					if (afterDate){
						searchParams['afterDate'] = afterDate;
					}
					
					if (carepassProviderId){
						searchParams['carepassProviderId'] = carepassProviderId;
					}
					
					if (npiProviderId){
						searchParams['npiProviderId'] = npiProviderId;						
					}
					
					$.ajax({
						type : "GET",
						url : baseURL + userDirApiUrl + '/users/currentUser/appointments',
						dataType : "json",
						data : searchParams,
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						async : false,
						contentType: 'application/json; charset=utf-8',
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
				 * Delete an appointment for the current user.
				 * @param id - appointmentid
				 */			
				deleteAppointment : function(appointmentId, options) {

					$.ajax({
						type : "POST",
						url : baseURL + userDirApiUrl + '/users/currentUser/appointments/' + appointmentId,
						dataType : "json",
						contentType: 'application/json; charset=utf-8',
						headers : {
							'Authorization' : bearerAuth							
						},
						async : false,
						contentType: 'application/json; charset=utf-8',
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
		},// end of appointments object	
	}
};