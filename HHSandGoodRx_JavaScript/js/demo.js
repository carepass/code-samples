
var dataObjectBase = {};
if(accessKey){
	dataObjectBase["apikey"] = accessKey;	
}

var gdRxDataObjectBase = {};
if(goodRxAccessKey){
	gdRxDataObjectBase["apikey"] = goodRxAccessKey;	
}


function getDrugInformation(ndc2s) {

	dataObjectBase || (dataObjectBase = {});								
    var dataObject = _.extend({}, dataObjectBase);
	
	$.ajax({
		type : "GET",
		url : urlAPI + "drugs/"+ndc2s,
		data :dataObject,
		cache : true,
		dataType : "text",
		success : function onSuccess(data) {
			var oData = jQuery.parseJSON(data);
			if(oData != null && oData.length > 0){
				$('#basicInformation-page #nda').val(oData[0].nda);
				$('#basicInformation-page #labelerName').val(oData[0].labelerName);
				$('#basicInformation-page #proprietaryName').val(oData[0].proprietaryName);
				$('#basicInformation-page #nonProprietaryName').val(oData[0].nonProprietaryName);
				$('#basicInformation-page #strength').val(oData[0].strength);
				$('#basicInformation-page #unit').val(oData[0].unit);
				$('#basicInformation-page #substanceName').val(oData[0].substanceName);
				$('#basicInformation-page #dosageFormname').val(oData[0].dosageFormname);
				$('#basicInformation-page #routeName').val(oData[0].routeName);
				$('#basicInformation-page #startMarketing_date').val(oData[0].startMarketing_date);
				$('#basicInformation-page #endMarketing_date').val(oData[0].endMarketing_date);
	
				$('.pkDesc').remove();
				var element = null;
				if (oData[0].packageInfo != null) {
					for ( var i = 0; i < oData[0].packageInfo.length; i++) {
						element = template_drugPackage;
						element = element.replace("{ndc3Segment}",oData[0].packageInfo[i].ndc3Segment);
						element = element.replace("{ndc3Segment}",oData[0].packageInfo[i].ndc3Segment);
						element = element.replace("{packageDescription}",oData[0].packageInfo[i].packageDescription);
	
						$("#packageList").append(element);
					}
				}
				
				$('#basicInformation-page #btnAlternatives').attr("href","javascript:getTherapeuticAlternatives('" + oData[0].nda + "')");
				$('#basicInformation-page #btnRecalls').attr("href","javascript:getRecalls('" + oData[0].proprietaryName + "')");
				$('#basicInformation-page #btnTrials').attr("href","javascript:getTrials('" + oData[0].proprietaryName + "')");				
				$('#basicInformation-page #btnCompare').attr("href","javascript:goToComparePage('" + oData[0].proprietaryName + "')");
				document.location.href = "#basicInformation-page";
			}
		}
	});

	return true;
}

function getRecalls(productName){

	dataObjectBase || (dataObjectBase = {});				
	var dataObject = _.extend({}, dataObjectBase);
	
	$.ajax({
		type : "GET",		
		url : urlAPI + "fdarecalls/search?product=" + productName,
		cache : true,
		data : dataObject,
		dataType : "text",
		success : function onSuccess(data) {
			$('.taList').remove();
			if(data == "[]"){
				$.mobile.changePage('#dataNotFound-page', 'pop', true, true);
				return true;
			}
			var rData = jQuery.parseJSON(data);

			if(rData != null &&
					rData.length > 0){
				
				var contentElement = "";
				var headerElement = "";
				var recallData;
				$("#brandName").html(productName);
				for(var i = 0; i < rData.length; i++){
					recallData = rData[i];
					var headerId = "taList" + i;
					contentElement = template_recalls_content;
					contentElement = contentElement.replace("{brandName}", recallData.brandName);
					contentElement = contentElement.replace("{date}", recallData.date);
					contentElement = contentElement.replace("{reason}",recallData.reason);
					contentElement = contentElement.replace("{company}", recallData.company);
					contentElement = contentElement.replace("{productDescription}", recallData.productDescription);
					
					
					var companyReleaseLinkElement = "<a target = 'blank' href=" + recallData.companyReleaseLink  + ">"+ "Release Link" + "</a>";
					contentElement = contentElement.replace("{companyReleaseLink}", companyReleaseLinkElement );
					
					contentElement = contentElement.replace("{PhotoImg}", recallData.photosLink);
					
					$("#recallResultContent").append(contentElement);
				
				}
			}

			document.location.href = "#recalls-page";
			$("#recallResultContent").trigger('create');

		}
	});

	return true;	
	
}

function getTrials(productName){

	dataObjectBase || (dataObjectBase = {});				
	var dataObject = _.extend({}, dataObjectBase);
	
	$.ajax({
		type : "GET",		
		url : urlAPI + "clinicaltrials/search?drugname=" + productName + "&page=1", // for demo page 1 
		cache : true,
		data : dataObject,
		dataType : "text",
		success : function onSuccess(data) {
			$('.taList').remove();
			if(data == "[]"){
				$.mobile.changePage('#dataNotFound-page', 'pop', true, true);
				return true;
			}
			var cData = jQuery.parseJSON(data);

			if(cData.clinicalTrials != null &&
					cData.clinicalTrials.length > 0){
				
				var contentElement = "";
				var headerElement = "";
				var clinicalData;
				$("#recbrandName").html(productName);
				for(var i = 0; i < cData.clinicalTrials.length; i++){
					clinicalData = cData.clinicalTrials[i];
					var headerId = "taList" + i;
					contentElement = template_clinical_trials_content;
					var dataLinkElement = "<a target='_blank' href=" + clinicalData.url  + ">" +clinicalData.nctid +"</a>";
					contentElement = contentElement.replace("{nctidLink}", dataLinkElement);
					contentElement = contentElement.replace("{title}", clinicalData.title);
					contentElement = contentElement.replace("{score}",clinicalData.score);				
					contentElement = contentElement.replace("{statusOpen}", clinicalData.statusOpen);
					contentElement = contentElement.replace("{conditionSummary}", clinicalData.conditionSummary);
					contentElement = contentElement.replace("{lastChanged}", clinicalData.lastChanged);
					
					$("#trialsResultContent").append(contentElement);
				
				}
			}

			document.location.href = "#trials-page";
			$("#trialsResultContent").trigger('create');

		}
	});

	return true;	
	
}

function goToComparePage(productName){		
	$("input[name=name]").val(productName);
	$.mobile.changePage('#comparePrices-page');
	compareDrugPrices();
	return true;	
}

	function compareDrugPrices() {	
        $('.result').remove();/*	
		$("#lowestResultContent").empty();
		$("#lowestResultContent").append('<li data-role="list-divider">Lowest Price:</li>');
		
		$("#compareResultContent").empty();
		$("#compareResultContent").append('<li data-role="list-divider">Results:</li>');*/
		//get the common data needed if exists
		gdRxDataObjectBase || (gdRxDataObjectBase = {});				
		var dataObject = _.extend({}, gdRxDataObjectBase)
		
		//data to be used to search			
		var nameSearched = $.trim($("input[name=name]").val());
		dataObject["name"] = nameSearched;	
		var value = $.trim($("select[name=form]").val());
		value && (dataObject["form"] = value);	
		value = $.trim($("input[name=dosage]").val());				
		value && (dataObject["dosage"] = value);	
		value = $.trim($("input[name=quantity]").val());
		value && (dataObject["quantity"] = value);	
		value = $.trim($("input[name=manufacturer]").val());
		value && (dataObject["manufacturer"] = value);									
		if (nameSearched.length > 0) {
			//perform compare
			$.ajax({
				type : "GET",
				url : goodRxApi + "drugprices/compare",
				data : dataObject,
				cache : true,
				dataType : "text",
				success : function onSuccess(data) {
					var oData = jQuery.parseJSON(data);
					if(data == "[]"){
						$.mobile.changePage('#dataNotFound-page', 'pop', true, true);
						return true;
					}
					var element = null;
					for ( var i = 0; i < oData.length; i++) {
						element = template_drugCompare;
						var brands = '';
						for(var bIndex= 0; bIndex < oData[i].brand.length; bIndex++){
							if(bIndex == 0){
								brands += oData[i].brand[bIndex];
							}else{									
								brands += ", " + oData[i].brand[bIndex];
							}
						}
						element = element.replace("{brand}",brands);
						element = element.replace("{url}",oData[i].url); 
						element = element.replace("{urlText}",oData[i].url);
						element = element.replace("{display}",oData[i].display);
						
						var generics = '';
						for(var gIndex= 0; gIndex < oData[i].generic.length; gIndex++){
							if(gIndex == 0){
								generics += oData[i].generic[gIndex];
							}else{									
								generics += ", " + oData[i].generic[gIndex];
							}
						}
						element = element.replace("{generic}",generics);
						element = element.replace("{form}",oData[i].form);
						element = element.replace("{dosage}",oData[i].dosage);
						var prices = '';
						for(var pIndex= 0; pIndex < oData[i].price.length; pIndex++){
							if(pIndex == 0){
								prices += oData[i].price[pIndex];
							}else{									
								prices += ", " + oData[i].price[pIndex];
							}
						}
						element = element.replace("{price}",prices);
						element = element.replace("{quantity}",oData[i].quantity);
						element = element.replace("{mobile_url}",oData[i].mobileUrl);								
						element = element.replace("{mobile_urlText}",oData[i].mobileUrl);
						element = element.replace("{manufacturer}",oData[i].manufacturer);								

						$("#compareResultContent").append(element);
					}
				}
			});
			$.ajax({
				type : "GET",
				url : goodRxApi + "drugprices/low",
				data : dataObject,
				cache : true,
				dataType : "text",
				success : function onSuccess(data) {
					var oData = jQuery.parseJSON(data);
					if(data == "[]"){
						$.mobile.changePage('#dataNotFound-page', 'pop', true, true);
						return true;
					}
					var element = null;
					for ( var i = 0; i < oData.length; i++) {
						element = template_drugCompare;
						var brands = '';
						for(var bIndex= 0; bIndex < oData[i].brand.length; bIndex++){
							if(bIndex == 0){
								brands += oData[i].brand[bIndex];
							}else{									
								brands += ", " + oData[i].brand[bIndex];
							}
						}
						element = element.replace("{brand}",brands);
						element = element.replace("{url}",oData[i].url); 
						element = element.replace("{urlText}",oData[i].url);
						element = element.replace("{display}",oData[i].display);
						
						var generics = '';
						for(var gIndex= 0; gIndex < oData[i].generic.length; gIndex++){
							if(gIndex == 0){
								generics += oData[i].generic[gIndex];
							}else{									
								generics += ", " + oData[i].generic[gIndex];
							}
						}
						element = element.replace("{generic}",generics);
						element = element.replace("{form}",oData[i].form);
						element = element.replace("{dosage}",oData[i].dosage);
						var prices = '';
						for(var pIndex= 0; pIndex < oData[i].price.length; pIndex++){
							if(pIndex == 0){
								prices += oData[i].price[pIndex];
							}else{									
								prices += ", " + oData[i].price[pIndex];
							}
						}
						element = element.replace("{price}",prices);
						element = element.replace("{quantity}",oData[i].quantity);
						element = element.replace("{mobile_url}",oData[i].mobileUrl);								
						element = element.replace("{mobile_urlText}",oData[i].mobileUrl);
						element = element.replace("{manufacturer}",oData[i].manufacturer);								

						$("#lowestResultContent").append(element);
					}
				}
			});
		}
		
	}
	
function getTherapeuticAlternatives(ndaValue){
	//ndaValue = ndaValue.replace(/[^0-9]/g, ''); 	
	dataObjectBase || (dataObjectBase = {});				
	var dataObject = _.extend({}, dataObjectBase);
	
	$.ajax({
		type : "GET",
		url : urlAPI + "applications/" + ndaValue + "/alternatives",
		cache : true,
		data : dataObject,
		dataType : "text",
		success : function onSuccess(data) {
			$('.taList').remove();
			if(data == "[]"){
				$.mobile.changePage('#dataNotFound-page', 'pop', true, true);
				return true;
			}
			var oData = jQuery.parseJSON(data);

			if(oData != null &&
					oData.length > 0){
				
				var headerElement = "";
				var oDrugAlternatives;
				for(var i = 0; i < oData.length; i++){
					oDrugAlternatives = oData[i];
					var headerId = "taList" + i;
					headerElement = template_alternative_header;
					headerElement = headerElement.replace("{id}", headerId);
					headerElement = headerElement.replace("{dosageForm}", oDrugAlternatives.dosageForm);
					headerElement = headerElement.replace("{dosageRoute}",oDrugAlternatives.dosageRoute);
					headerElement = headerElement.replace("{strength}", oDrugAlternatives.strength);
					
					$("#alternativesContent").append(headerElement);
					
					var contentElement = "";
					var headerSelector = "#" + headerId;
					for(var j = 0; j < oDrugAlternatives.drugs.length; j++){
						contentElement = template_alternative_content;
						contentElement = contentElement.replace("{company}", oDrugAlternatives.drugs[j].company);
						contentElement = contentElement.replace("{appNumber}", oDrugAlternatives.drugs[j].applicationNumber);
						contentElement = contentElement.replace("{status}", oDrugAlternatives.drugs[j].marketingStatus);

						$(headerSelector).append(contentElement);
					}
				}
			}

			document.location.href = "#alternatives-page";
			$("#alternativesContent").trigger('create')

		}
	});

	return true;	
}

$(document).delegate("#aboutPage", "pageinit", function() {
	$.mobile.allowCrossDomainPages = true;
});

$(function() {
	$("#ajaxSeachByDrugName").click(
			function() {
				var nameSearched = $.trim($("#nameToSearch").val());
				//get the common data needed if exists
                dataObjectBase || (dataObjectBase = {});				
                var dataObject = _.extend({}, dataObjectBase);
				
				//data to be used to search
			    dataObject["name"] = nameSearched;					
				
				if (nameSearched.length > 0) {
					$('.result').remove();

					$.ajax({
						type : "GET",
						url : urlAPI + "drugs/search",
						data : dataObject,
						cache : true,
						dataType : "text",
						success : function onSuccess(data) {
							var oData = jQuery.parseJSON(data);
							if(data == "[]"){
								$.mobile.changePage('#dataNotFound-page', 'pop', true, true);
								return true;
							}
							var element = null;
							for ( var i = 0; i < oData.length; i++) {
								element = template_drugName;
								element = element.replace("{ndc2Segment}",oData[i].ndc2Segment); // click
								element = element.replace("{ndc2Segment}",oData[i].nda); // naming on results
								element = element.replace("{proprietaryName}",oData[i].proprietaryName);
								element = element.replace("{nonProprietaryName}",oData[i].nonProprietaryName);

								$("#resultContent").append(element);
							}
						}
					});
				}
			});
			
	$("#btnComparePrices").click(compareDrugPrices);

	$("#resultLog").ajaxError(
			function(event, request, settings, exception) {
				$("#resultLog").html("Error Calling: " + settings.url + "<br />HTPP Code: "+ request.status);
			});
});

