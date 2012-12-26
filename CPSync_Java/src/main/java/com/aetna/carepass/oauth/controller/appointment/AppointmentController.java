package com.aetna.carepass.oauth.controller.appointment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.aetna.carepass.oauth.connector.api.appointment.Appointment;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.AppointmentService;
import com.aetna.carepass.oauth.controller.UrlConstants;
import com.google.gson.Gson;

@Controller
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;

	@RequestMapping(value = { "/appointment.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToAppointment() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("appointment");
		mav.addObject("goBackUrl",UrlConstants.END_POINT_MAIN_URI);
		return mav;
	}

	@RequestMapping(value = { "/appointment-post-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPost() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("appointmentpost");
		mav.addObject("appointment", new Appointment());
		return mav;
	}

	@RequestMapping(value = { "/appointment-put-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPut() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("appointmentput");
		mav.addObject("appointment", new Appointment());
		return mav;
	}

	@RequestMapping(value = { "/appointment-get-id.htm" }, method = RequestMethod.GET)
	public String appointmentGetById(@RequestParam("id") int id,
			WebRequest request, Model model) {
		try {

			List<Appointment> appointmentList = appointmentService
					.findAppointmentById(id);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_APPOINTMENT_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;		
	}

	@RequestMapping(value = { "/appointment-get.htm" }, method = RequestMethod.GET)
	public String appointmentGetBy(@RequestParam("afterDate") String afterDate,
			@RequestParam("carepassProviderId") String carepassProviderId,
			@RequestParam("ProviderIdValue") String providerIdValue,
			WebRequest request, Model model) {
		try {

			List<Appointment> appointmentList = appointmentService
					.findAppointment(afterDate,carepassProviderId,providerIdValue);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));

		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_APPOINTMENT_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}

	@RequestMapping(value = { "/appointment-post.htm" }, method = RequestMethod.GET)
	public String appointmentPost(@ModelAttribute("appointment") Appointment appointment,
			WebRequest request, Model model) {

		

		try {
			Appointment appointmentList = appointmentService.saveAppointment(
					appointment, RequestMethod.POST);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_APPOINTMENT_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}

	@RequestMapping(value = { "/appointment-put.htm" }, method = RequestMethod.GET)
	public String appointmentPut(@ModelAttribute("appointment")Appointment appointment,
			 WebRequest request, Model model) {
		

		try {
			Appointment appointmentList = appointmentService.saveAppointment(
					appointment, RequestMethod.PUT);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		model.addAttribute("goBackUrl",UrlConstants.END_POINT_APPOINTMENT_URI);
		return UrlConstants.END_POINT_MAIN_RESPONSE;
	}

}
