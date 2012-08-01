package com.aetna.carepass.oauth.controller.appointment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.aetna.carepass.oauth.connector.api.appointment.Appointment;
import com.aetna.carepass.oauth.connector.service.EndpointException;
import com.aetna.carepass.oauth.connector.service.endpoints.AppointmentService;
import com.google.gson.Gson;

@Controller
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;

	@RequestMapping(value = { "/appointment.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToAppointment() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("appointment");
		return mav;
	}

	@RequestMapping(value = { "/appointment-post-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPost() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("appointmentpost");
		return mav;
	}

	@RequestMapping(value = { "/appointment-put-redirect.htm" }, method = RequestMethod.GET)
	public ModelAndView redirectToFitnessPut() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("appointmentput");
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
		return "appointment";
	}

	@RequestMapping(value = { "/appointment-get.htm" }, method = RequestMethod.GET)
	public String appointmentGetBy(@RequestParam("afterDate") String afterDate,
			@RequestParam("carepassProviderId") String carepassProviderId,
			@RequestParam("npiProviderId") String npiProviderId,
			WebRequest request, Model model) {
		try {

			List<Appointment> appointmentList = appointmentService
					.findAppointment(afterDate,carepassProviderId,npiProviderId);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));

		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "appointment";
	}

	@RequestMapping(value = { "/appointment-post.htm" }, method = RequestMethod.GET)
	public String appointmentPost(@RequestParam("appStart") String appStart,
			@RequestParam("appEnd") String appEnd,
			@RequestParam("appScheduleDate") String appScheduleDate,
			@RequestParam("appType") String appType,
			@RequestParam("appReason") String appReason,
			@RequestParam("appProviderId") int appProviderId,
			@RequestParam("appFacilityName") String appFacilityName,
			@RequestParam("appLine1") String appLine1,
			@RequestParam("appLine2") String appLine2,
			@RequestParam("appCity") String appCity,
			@RequestParam("appState") String appState,
			@RequestParam("appPC") String appPC,
			@RequestParam("appCarrierId") int appCarrierId,
			@RequestParam("appPlanId") int appPlanId,
			@RequestParam("appStatus") String appStatus,
			@RequestParam("appCarepassProviderId") int appCarepassProviderId,
			WebRequest request, Model model) {

		Appointment app = new Appointment();
		app.setAppointmentEnd(appEnd);
		app.setAppointmentStart(appStart);
		app.setCarrierId(appCarrierId);
		app.setCity(appCity);
		app.setFacilityName(appFacilityName);
		app.setLine1(appLine1);
		app.setLine2(appLine2);
		app.setNpiProviderId(appProviderId);
		app.setPlanId(appPlanId);
		app.setPostalCode(appPC);
		app.setReason(appReason);
		app.setScheduledDate(appScheduleDate);
		app.setState(appState);
		app.setStatus(appStatus);
		app.setType(appType);
		app.setCarepassProviderId(appCarepassProviderId);

		try {
			Appointment appointmentList = appointmentService.saveAppointment(
					app, RequestMethod.POST);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "appointment";
	}

	@RequestMapping(value = { "/appointment-put.htm" }, method = RequestMethod.GET)
	public String appointmentPut(@RequestParam("appStart") String appStart,
			@RequestParam("appEnd") String appEnd,
			@RequestParam("appScheduleDate") String appScheduleDate,
			@RequestParam("appType") String appType,
			@RequestParam("appReason") String appReason,
			@RequestParam("appProviderId") int appProviderId,
			@RequestParam("appFacilityName") String appFacilityName,
			@RequestParam("appLine1") String appLine1,
			@RequestParam("appLine2") String appLine2,
			@RequestParam("appCity") String appCity,
			@RequestParam("appState") String appState,
			@RequestParam("appPC") String appPC,
			@RequestParam("appCarrierId") int appCarrierId,
			@RequestParam("appPlanId") int appPlanId,
			@RequestParam("appStatus") String appStatus,
			@RequestParam("appCarepassProviderId") int appCarepassProviderId,
			@RequestParam("appId") String appId, WebRequest request, Model model) {

		Appointment app = new Appointment();
		app.setId(appId);
		app.setAppointmentEnd(appEnd);
		app.setAppointmentStart(appStart);
		app.setCarrierId(appCarrierId);
		app.setCity(appCity);
		app.setFacilityName(appFacilityName);
		app.setLine1(appLine1);
		app.setLine2(appLine2);
		app.setNpiProviderId(appProviderId);
		app.setPlanId(appPlanId);
		app.setPostalCode(appPC);
		app.setReason(appReason);
		app.setScheduledDate(appScheduleDate);
		app.setState(appState);
		app.setStatus(appStatus);
		app.setType(appType);
		app.setCarepassProviderId(appCarepassProviderId);

		try {
			Appointment appointmentList = appointmentService.saveAppointment(
					app, RequestMethod.PUT);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(appointmentList));
		} catch (EndpointException e) {
			
			model.addAttribute("error", e.getMessage());
			e.printStackTrace();
		}
		return "appointment";
	}

}
