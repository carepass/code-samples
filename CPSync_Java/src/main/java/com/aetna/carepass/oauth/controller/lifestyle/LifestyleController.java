package com.aetna.carepass.oauth.controller.lifestyle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.aetna.carepass.oauth.connector.api.lifestyle.Lifestyle;
import com.aetna.carepass.oauth.connector.api.lifestyle.LifestyleAttribute;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.LifestyleService;
import com.aetna.carepass.oauth.controller.UrlConstants;
import com.google.gson.Gson;

@Controller
public class LifestyleController {
	@Autowired
	private LifestyleService lifestyleService;

	@RequestMapping(value = { "/lifestyle.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToLifestyle() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("lifestyle");
		mav.addObject("goBackUrl",UrlConstants.END_POINT_MAIN_URI);
		return mav;
	}

	@RequestMapping(value = { "/lifestyle-put-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToLifestylePut() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("lifestyleput");
		mav.addObject("goBackUrl",UrlConstants.END_POINT_LIFESTYLE_URI);
		return mav;
	}

	@RequestMapping(value = { "/lifestyle-get.htm" }, method = RequestMethod.GET)
	public String findLifestyle(Model model) {
		try {

			Lifestyle lifestyle = lifestyleService.findLifeStyle();

			Gson gson = new Gson();			
			model.addAttribute("response",gson.toJson(lifestyle));
		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_LIFESTYLE_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}
	
	@RequestMapping(value = { "/lifestyle-put.htm" }, method = RequestMethod.GET)
	public String fitnessPut(
			@RequestParam("lifestyleId") long lifestyleId,
			@RequestParam("lifestyleType") String lifestyleType,
			@RequestParam("lifestyleName") String lifestyleName,
			@RequestParam("lifestyleImageUrl") String lifestyleImageUrl,
			
			WebRequest request, Model model) {
		try {

			Lifestyle lifestyle = new Lifestyle();
			LifestyleAttribute la = new LifestyleAttribute();
			la.setId(lifestyleId);
			la.setImageUrl(lifestyleImageUrl);
			la.setName(lifestyleName);
			la.setType(lifestyleType);			
			lifestyle.getLifestyleAttributes().add(la);


			Lifestyle lifestyleUpdated = lifestyleService.saveLifestyle(lifestyle);
			Gson gson = new Gson();			
			model.addAttribute("response",gson.toJson(lifestyleUpdated));

		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_LIFESTYLE_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}
}
