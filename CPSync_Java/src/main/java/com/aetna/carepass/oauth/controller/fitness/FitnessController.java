package com.aetna.carepass.oauth.controller.fitness;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.aetna.carepass.oauth.connector.api.fitness.Fitness;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.FitnessService;
import com.aetna.carepass.oauth.controller.UrlConstants;
import com.google.gson.Gson;

@Controller
public class FitnessController {

	@Autowired
	private FitnessService fitnessService;

	@RequestMapping(value = { "/fitness.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitness() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("fitness");
		mav.addObject("goBackUrl",UrlConstants.END_POINT_MAIN_URI);
		return mav;
	}
	@RequestMapping(value = { "/fitness-post-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPost() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("fitnesspost");
		mav.addObject("fitness",new Fitness());
		return mav;
	}
	@RequestMapping(value = { "/fitness-put-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPut() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("fitnessput");
		mav.addObject("fitness",new Fitness());
		return mav;
	}

	@RequestMapping(value = { "/fitness-get-date.htm" }, method = RequestMethod.GET)
	public String fitnessGetByDate(@RequestParam("dateFrom") String dateFrom,
			@RequestParam("dateTo") String dateTo, WebRequest request,
			Model model) {
		try {

			List<Fitness> fitnessActivities = fitnessService.findFitnessByDate(
					dateFrom, dateTo);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(fitnessActivities));

		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_FITNESS_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}

	@RequestMapping(value = { "/fitness-get-id.htm" }, method = RequestMethod.GET)
	public String fitnessGetById(@RequestParam("id") int id,
			WebRequest request, Model model) {
		try {

			Fitness fitnessActivity = fitnessService.findFitnessById(id);

			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(fitnessActivity));
		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_FITNESS_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}
	
	@RequestMapping(value = { "/fitness-get-types.htm" }, method = RequestMethod.GET)
	public String fitnessGetTypes(WebRequest request, Model model) {
		try {

			model.addAttribute("response",fitnessService.getFitnessTypes());
		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_FITNESS_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}

	@RequestMapping(value = { "/fitness-post.htm" }, method = RequestMethod.GET)
	public String fitnessPost( @ModelAttribute("fitness") Fitness fitness2, BindingResult result,
			WebRequest request, Model model) {
		try {

			List<Fitness> fitnesList = new ArrayList<Fitness>();

			fitnesList.add(fitness2);
			List<Fitness> responseFitnessList = fitnessService.saveFitness(
					fitnesList, RequestMethod.POST);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(responseFitnessList));

		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_FITNESS_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}

	@RequestMapping(value = { "/fitness-put.htm" }, method = RequestMethod.GET)
	public String fitnessPut( @ModelAttribute("fitness") Fitness fitness2, BindingResult result,
			WebRequest request, Model model) {
		try {

			List<Fitness> fitnesList = new ArrayList<Fitness>();
			
			fitnesList.add(fitness2);

			List<Fitness> responseFitnessList = fitnessService.saveFitness(
					fitnesList, RequestMethod.PUT);

			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(responseFitnessList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_FITNESS_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}
}
