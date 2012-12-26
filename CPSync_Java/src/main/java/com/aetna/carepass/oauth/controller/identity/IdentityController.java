package com.aetna.carepass.oauth.controller.identity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;

import com.aetna.carepass.oauth.connector.api.identity.Identity;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.IdentityService;
import com.aetna.carepass.oauth.controller.UrlConstants;
import com.google.gson.Gson;

@Controller
public class IdentityController {

	@Autowired
	private IdentityService identityService;

	@RequestMapping(value = { "/identity-get.htm" }, method = RequestMethod.GET)
	public String identityGet(WebRequest request, Model model) {
		try {
			Identity identity = identityService.findIdentity();
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(identity));

		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_MAIN_URI);
		return "response";
	}
}
