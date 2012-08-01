package com.aetna.carepass.oauth.controller.fitness;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.aetna.carepass.oauth.connector.api.fitness.Fitness;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.FitnessService;
import com.google.gson.Gson;

@Controller
public class FitnessController {

	@Autowired
	private FitnessService fitnessService;

	@RequestMapping(value = { "/fitness.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitness() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("fitness");
		return mav;
	}
	@RequestMapping(value = { "/fitness-post-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPost() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("fitnesspost");
		return mav;
	}
	@RequestMapping(value = { "/fitness-put-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPut() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("fitnessput");
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
		return "fitness";
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
		return "fitness";
	}
	
	@RequestMapping(value = { "/fitness-get-types.htm" }, method = RequestMethod.GET)
	public String fitnessGetTypes(WebRequest request, Model model) {
		try {

//			Fitness fitnessActivity = fitnessService.getFitnessTypes();
			fitnessService.getFitnessTypes();
			Gson gson = new Gson();
//			model.addAttribute("response", gson.toJson(fitnessActivity));
		} catch (EndpointException e) {
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "fitness";
	}

	@RequestMapping(value = { "/fitness-post.htm" }, method = RequestMethod.GET)
	public String fitnessPost(
			@RequestParam("fitnessDescription") String fitnessDescription,
			@RequestParam("fitnessNote") String fitnessNote,
			@RequestParam("fitnessType") String fitnessType,
			@RequestParam("fitnessExtraType") String fitnessExtraType,
			@RequestParam("fitnessDate") String fitnessDate,
			@RequestParam("fitnessStartTime") String fitnessStartTime,
			@RequestParam("fitnessEndTime") String fitnessEndTime,
			@RequestParam("fitnessStartCity") String fitnessStartCity,
			@RequestParam("fitnessEndCity") String fitnessEndCity,
			@RequestParam("fitnessStartState") String fitnessStartState,
			@RequestParam("fitnessEndState") String fitnessEndState,
			@RequestParam("fitnessEndCountry") String fitnessEndCountry,
			@RequestParam("fitnessStartCountry") String fitnessStartCountry,
			@RequestParam("fitnessStartLatitude") BigDecimal fitnessStartLatitude,
			@RequestParam("fitnessEndLatitude") BigDecimal fitnessEndLatitude,
			@RequestParam("fitnessStartLongitude") BigDecimal fitnessStartLongitude,
			@RequestParam("fitnessEndLongitude") BigDecimal fitnessEndLongitude,
			@RequestParam("fitnessCaloriesBurned") Float fitnessCaloriesBurned,
			@RequestParam("fitnessDistance") BigDecimal fitnessDistance,
			@RequestParam("fitnessLastUpdate") String fitnessLastUpdate,
			@RequestParam("fitnessDuration") String fitnessDuration,
			@RequestParam("fitnessDistanceUnit") String fitnessDistanceUnit,
			WebRequest request, Model model) {
		try {

			List<Fitness> fitnesList = new ArrayList<Fitness>();
			Fitness f = new Fitness();
			f.setCaloriesBurned(fitnessCaloriesBurned);
			f.setDate(fitnessDate);
			f.setDescription(fitnessDescription);
			f.setDistance(fitnessDistance);
			f.setDistanceUnit(fitnessDistanceUnit);
			f.setDuration(fitnessDuration);
			f.setEndCity(fitnessEndCity);
			f.setEndCountry(fitnessEndCountry);
			f.setEndLatitude(fitnessEndLatitude);
			f.setEndLongitude(fitnessEndLongitude);
			f.setEndState(fitnessEndState);
			f.setEndTime(fitnessEndTime);
			f.setLastUpdated(fitnessLastUpdate);
			f.setStartCity(fitnessStartCity);
			f.setStartCountry(fitnessStartCountry);
			f.setStartLatitude(fitnessStartLatitude);
			f.setStartLongitude(fitnessStartLongitude);
			f.setStartState(fitnessStartState);
			f.setStartTime(fitnessStartTime);
			f.setNotes(fitnessNote);
			f.setType(fitnessType);
			f.setTypeExtra(fitnessExtraType);
			fitnesList.add(f);

			List<Fitness> responseFitnessList = fitnessService.saveFitness(
					fitnesList, RequestMethod.POST);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(responseFitnessList));

		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "fitness";
	}

	@RequestMapping(value = { "/fitness-put.htm" }, method = RequestMethod.GET)
	public String fitnessPut(
			
			@RequestParam("fitnessId") Long fitnessId,
			@RequestParam("fitnessDescription") String fitnessDescription,
			@RequestParam("fitnessNote") String fitnessNote,
			@RequestParam("fitnessType") String fitnessType,
			@RequestParam("fitnessExtraType") String fitnessExtraType,
			@RequestParam("fitnessDate") String fitnessDate,
			@RequestParam("fitnessStartTime") String fitnessStartTime,
			@RequestParam("fitnessEndTime") String fitnessEndTime,
			@RequestParam("fitnessStartCity") String fitnessStartCity,
			@RequestParam("fitnessEndCity") String fitnessEndCity,
			@RequestParam("fitnessStartState") String fitnessStartState,
			@RequestParam("fitnessEndState") String fitnessEndState,
			@RequestParam("fitnessEndCountry") String fitnessEndCountry,
			@RequestParam("fitnessStartCountry") String fitnessStartCountry,
			@RequestParam("fitnessStartLatitude") BigDecimal fitnessStartLatitude,
			@RequestParam("fitnessEndLatitude") BigDecimal fitnessEndLatitude,
			@RequestParam("fitnessStartLongitude") BigDecimal fitnessStartLongitude,
			@RequestParam("fitnessEndLongitude") BigDecimal fitnessEndLongitude,
			@RequestParam("fitnessCaloriesBurned") Float fitnessCaloriesBurned,
			@RequestParam("fitnessDistance") BigDecimal fitnessDistance,
			@RequestParam("fitnessLastUpdate") String fitnessLastUpdate,
			@RequestParam("fitnessDuration") String fitnessDuration,
			@RequestParam("fitnessDistanceUnit") String fitnessDistanceUnit,
			WebRequest request, Model model) {
		try {

			List<Fitness> fitnesList = new ArrayList<Fitness>();
			Fitness f = new Fitness();
			f.setCaloriesBurned(fitnessCaloriesBurned);
			f.setDate(fitnessDate);
			f.setDescription(fitnessDescription);
			f.setDistance(fitnessDistance);
			f.setDistanceUnit(fitnessDistanceUnit);
			f.setDuration(fitnessDuration);
			f.setEndCity(fitnessEndCity);
			f.setEndCountry(fitnessEndCountry);
			f.setEndLatitude(fitnessEndLatitude);
			f.setEndLongitude(fitnessEndLongitude);
			f.setEndState(fitnessEndState);
			f.setEndTime(fitnessEndTime);
			f.setLastUpdated(fitnessLastUpdate);
			f.setStartCity(fitnessStartCity);
			f.setStartCountry(fitnessStartCountry);
			f.setStartLatitude(fitnessStartLatitude);
			f.setStartLongitude(fitnessStartLongitude);
			f.setStartState(fitnessStartState);
			f.setStartTime(fitnessStartTime);
			f.setNotes(fitnessNote);
			f.setType(fitnessType);
			f.setTypeExtra(fitnessExtraType);
			f.setId(fitnessId);
			fitnesList.add(f);

			List<Fitness> responseFitnessList = fitnessService.saveFitness(
					fitnesList, RequestMethod.PUT);

			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(responseFitnessList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "fitness";
	}
}
