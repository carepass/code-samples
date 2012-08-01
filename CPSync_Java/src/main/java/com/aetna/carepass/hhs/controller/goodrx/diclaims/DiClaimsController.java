package com.aetna.carepass.hhs.controller.goodrx.diclaims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.aetna.carepass.hhs.claims.DeIdentificatedClaimsApiService;
import com.aetna.carepass.hhs.claims.types.DeIdentificatedClaimsSearch;
import com.google.gson.Gson;

@Controller
public class DiClaimsController {

	@Autowired
	private DeIdentificatedClaimsApiService deIdentificationClaimsApiService;
	
	private final String RESPONSE_URL="hhs/claims";
	
	@RequestMapping(value = { "/claims-api.htm" }, method = RequestMethod.GET)
	public String claimsApi(Model model) {
		return RESPONSE_URL;
	}

	
	@RequestMapping(value = { "/di-claims.htm" }, method = RequestMethod.GET)
	public String searchClaimsData(
			@RequestParam(value = "ndc", required = false) String ndc,
			@RequestParam(value = "gender", required = false) String gender,
			@RequestParam(value = "birthyearfrom", required = false) int birthyearfrom,
			@RequestParam(value = "birthyearto", required = false) int birthyearto,
			@RequestParam(value = "from", required = false) String from,
			@RequestParam(value = "to", required = false) String to,
			@RequestParam(value = "page", required = false) int page,
	
			Model model) {
		try {

			DeIdentificatedClaimsSearch deIdentificatedClaimsSerach=deIdentificationClaimsApiService.searchDeIdentificatedClaims(ndc, gender, birthyearfrom, birthyearto, from, to, page);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(deIdentificatedClaimsSerach));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}
}
