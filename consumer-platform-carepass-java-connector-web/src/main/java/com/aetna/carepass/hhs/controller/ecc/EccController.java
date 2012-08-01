package com.aetna.carepass.hhs.controller.ecc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.aetna.carepass.hhs.ecc.EccApiService;
import com.aetna.carepass.hhs.ecc.types.Categories;
import com.aetna.carepass.hhs.ecc.types.CostCareInformation;
import com.aetna.carepass.hhs.ecc.types.Cpt;
import com.google.gson.Gson;

@Controller
public class EccController {
private final String REDIRECT_URL="hhs/ecc";
	@Autowired
	private EccApiService eccApiService;

	@RequestMapping(value = { "/ecc-api.htm" }, method = RequestMethod.GET)
	public String hhsApi(Model model) {
		return "hhs/ecc";
	}

	@RequestMapping(value = { "/ecc-medical-list-cpt.htm" }, method = RequestMethod.GET)
	public String listMedicalCCCpt(
			@RequestParam(value = "cpt", required = false) String cpt,
			@RequestParam(value = "lat", required = false) String lat,
			@RequestParam(value = "lng", required = false) String lng,
			Model model) {
		try {

			List<CostCareInformation> cCInformationList = eccApiService
					.listECCMedicalInformation(cpt, lat, lng);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(cCInformationList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	@RequestMapping(value = { "/ecc-medical-list-cpt-zip.htm" }, method = RequestMethod.GET)
	public String listMedicalCCZip(
			@RequestParam(value = "cpt", required = false) String cpt,
			@RequestParam(value = "zip", required = false) String zip,
			Model model) {
		try {

			List<CostCareInformation> cCInformationList = eccApiService
					.listECCMedicalInformation(cpt, zip);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(cCInformationList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	@RequestMapping(value = { "/ecc-medical-list.htm" }, method = RequestMethod.GET)
	public String listOfAllMedicalCPT(Model model) {
		try {

			List<Cpt> cptList = eccApiService.listECCMedCPTCodes();
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(cptList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	@RequestMapping(value = { "/ecc-dental-list-cdt.htm" }, method = RequestMethod.GET)
	public String listDentalCCCpt(
			@RequestParam(value = "cdt", required = false) String cdt,
			@RequestParam(value = "lat", required = false) String lat,
			@RequestParam(value = "lng", required = false) String lng,
			Model model) {
		try {

			List<CostCareInformation> cCInformationList = eccApiService
					.listECCDentalInformation(cdt, lat, lng);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(cCInformationList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	@RequestMapping(value = { "/ecc-dental-list-cdt-zip.htm" }, method = RequestMethod.GET)
	public String listDentalCCZip(
			@RequestParam(value = "cdt", required = false) String cdt,
			@RequestParam(value = "zip", required = false) String zip,
			Model model) {
		try {

			List<CostCareInformation> cCInformationList = eccApiService
					.listECCDentalInformation(cdt, zip);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(cCInformationList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	@RequestMapping(value = { "/ecc-dental-list.htm" }, method = RequestMethod.GET)
	public String listOfAllDentalCPT(Model model) {
		try {

			List<Cpt> cptList = eccApiService.listECCDentalCPTCodes();
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(cptList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}
	
	
	@RequestMapping(value = { "/ecc-category-list.htm" }, method = RequestMethod.GET)
	public String listCategories(Model model) {
		try {

			List<Categories> categoriesList=eccApiService.listCategories();
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(categoriesList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	@RequestMapping(value = { "/ecc-sub-category-list.htm" }, method = RequestMethod.GET)
	public String listLowestPrices(
			@RequestParam(value = "category", required = false) String category,			
			Model model) {
		try {

			List<Categories> categoriesList=eccApiService.retrieveSubCategories(category);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(categoriesList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return REDIRECT_URL;
	}

	
}
