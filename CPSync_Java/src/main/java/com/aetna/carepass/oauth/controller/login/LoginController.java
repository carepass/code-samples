package com.aetna.carepass.oauth.controller.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;

import com.aetna.carepass.oauth.connector.service.CarePassOAuth;
import com.aetna.carepass.oauth.connector.service.EndpointException;

@Controller
public class LoginController {
	
	@Autowired
	private CarePassOAuth carePassOAuth;

	@RequestMapping(value = { "/loging-oauth.htm" }, method = RequestMethod.GET)
	public String carePassLogin() {

		return "redirect:" + carePassOAuth.retrieveInitialRequest();

	}

	@RequestMapping(value = { "/login-oauth-completed.htm" }, method = RequestMethod.GET)
	public String carePassLoginSuccess(
			@RequestParam(value = "code", required = false) String oauthVerifier,
			WebRequest request, Model model) {
		try{
		carePassOAuth.grantOauthAccess(oauthVerifier);		
		return "endpoint";
		}catch(EndpointException e){
			model.addAttribute("error",e.getMessage());
			return "login";
		}
	}
}
