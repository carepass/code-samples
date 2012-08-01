package com.aetna.carepass.oauth.controller.insurance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.aetna.carepass.oauth.connector.api.insurance.Insurance;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.InsuranceService;
import com.google.gson.Gson;

@Controller
public class InsuranceController {

	@Autowired
	private InsuranceService insuranceService;

	@RequestMapping(value = { "/insurance.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitness() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("insurance");
		return mav;
	}

	@RequestMapping(value = { "/insurance-get.htm" }, method = RequestMethod.GET)
	public String fitnessGetById(WebRequest request, Model model) {
		try {

			List<Insurance> insuranceList = insuranceService
					.findInsurancePlan();
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(insuranceList));
		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "insurance";
	}

	@RequestMapping(value = { "/insurance-get-id.htm" }, method = RequestMethod.GET)
	public String fitnessGetById(@RequestParam("id") int id,
			WebRequest request, Model model) {
		try {

			Insurance insuranceList = insuranceService
					.findInsurancePlanById(id);

			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(insuranceList));
		} catch (EndpointException e) {

			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "insurance";
	}

}
