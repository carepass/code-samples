package com.aetna.carepass.oauth.controller.biography;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;

import com.aetna.carepass.oauth.connector.api.biography.Biography;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.BiographyService;
import com.aetna.carepass.oauth.controller.UrlConstants;
import com.google.gson.Gson;

@Controller
public class BiographyController {

	@Autowired
	private BiographyService biographyService;

	@RequestMapping(value = { "/biography-get.htm" }, method = RequestMethod.GET)
	public String biographyGet(WebRequest request, Model model) {
		try {
			Biography biography = biographyService.findBiography();
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(biography));

		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_MAIN_URI);
		return "response";
	}
}
