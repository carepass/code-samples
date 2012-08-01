package com.aetna.carepass.hhs.controller.hhs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.aetna.carepass.hhs.hhsapi.HhsApiService;
import com.aetna.carepass.hhs.hhsapi.types.ART;
import com.aetna.carepass.hhs.hhsapi.types.Alternative;
import com.aetna.carepass.hhs.hhsapi.types.ClinicalTrialsNCTID;
import com.aetna.carepass.hhs.hhsapi.types.ClinicalTrialsSearch;
import com.aetna.carepass.hhs.hhsapi.types.Document;
import com.aetna.carepass.hhs.hhsapi.types.DrugImage;
import com.aetna.carepass.hhs.hhsapi.types.DrugNDC;
import com.aetna.carepass.hhs.hhsapi.types.DrugPackageInfo;
import com.aetna.carepass.hhs.hhsapi.types.DrugResource;
import com.aetna.carepass.hhs.hhsapi.types.DrugSearch;
import com.aetna.carepass.hhs.hhsapi.types.FDARecallSearch;
import com.aetna.carepass.hhs.hhsapi.types.Nda;
import com.google.gson.Gson;

@Controller
public class HhsController {

	@Autowired
	private HhsApiService hhsApiService;

	private final String RESPONSE_URL="hhs/hhs";
	
	@RequestMapping(value = { "/hhs-api.htm" }, method = RequestMethod.GET)
	public String hhsApi(Model model) {
		return RESPONSE_URL;
	}
	

	@RequestMapping(value = { "/hhs-list-drugs-nda.htm" }, method = RequestMethod.GET)
	public String listDocumentsNda(@RequestParam("nda") String nda, Model model) {
		try {

			List<Document> drugs = hhsApiService.getDocuments(nda);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(drugs));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "/hhs-list-drugs-resources-nda.htm" }, method = RequestMethod.GET)
	public String listDrugsNda(@RequestParam("nda") String nda, Model model) {
		try {

			List<DrugResource> drugResource = hhsApiService
					.listDrugResources(nda);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(drugResource));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;

	}

	@RequestMapping(value = { "/hhs-list-nda.htm" }, method = RequestMethod.GET)
	public String listNda(@RequestParam("nda") String nda, Model model) {
		try {

			List<Nda> ndaList = hhsApiService.getAllNDA(nda);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(ndaList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;

	}

	@RequestMapping(value = { "/hhs-list-alternatives-nda.htm" }, method = RequestMethod.GET)
	public String listNdaAlternatives(@RequestParam("nda") String nda,
			Model model) {
		try {

			List<Alternative> alternativeList = hhsApiService
					.getAllAlternatives(nda);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(alternativeList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;

	}

	@RequestMapping(value = { "/hhs-list-img-ndc2.htm" }, method = RequestMethod.GET)
	public String listDrugsImages(@RequestParam("ndc2") String ndc2, Model model) {
		try {

			List<DrugImage> drugImageList = hhsApiService
					.getAllDrugImages(ndc2);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(drugImageList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}
	
	@RequestMapping(value = { "/hhs-list-drugs-name.htm" }, method = RequestMethod.GET)
	public String listDrugsByName(@RequestParam("name") String name, Model model) {
		try {

			List<DrugSearch> drugSearchList = hhsApiService.listDrugs(name);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(drugSearchList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "/hhs-list-drugs-ndc2.htm" }, method = RequestMethod.GET)
	public String listDrugsNDC2(@RequestParam("ndc2") String ndc2, Model model) {
		try {

			List<DrugNDC> drugNDCList = hhsApiService.getAllDrugByNDC(ndc2);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(drugNDCList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "hhs-list-package-ndc2-ndc3.htm" }, method = RequestMethod.GET)
	public String listDrugPackageByNDC2AndNDC3(
			@RequestParam("ndc2") String ndc2,
			@RequestParam("ndc3") String ndc3, Model model) {
		try {

			List<DrugPackageInfo> drugPackageInfoList = hhsApiService
					.getAllDrugPackageInfo(ndc2, ndc3);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(drugPackageInfoList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "/hhs-list-art.htm" }, method = RequestMethod.GET)
	public String listArt(@RequestParam(value="clinicName",required = false) String clinicName,
			@RequestParam(value="city",required = false) String city,
			@RequestParam(value="state",required = false) String state,
			@RequestParam(value="medicaldirector",required = false) String medicaldirector,
			@RequestParam(value="Year",required = false) String year,
			@RequestParam(value="exactMatch",required = false) String exactMatch, Model model) {
		try {

			List<ART> artList = hhsApiService.listARTs(clinicName, city, state,
					medicaldirector, year, new Boolean(exactMatch));
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(artList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "/hhs-list-clinical-trials.htm" }, method = RequestMethod.GET)
	public String listClinicalTrialsNCTID(@RequestParam("nctid") String nctid,
			Model model) {
		try {

			List<ClinicalTrialsNCTID> clinicalTrialsNCTIDList = hhsApiService
					.listClinicalTrialsNCTID(nctid);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(clinicalTrialsNCTIDList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "/hhs-clinical-trials.htm" }, method = RequestMethod.GET)
	public String listClinicalTrials(@RequestParam("drugname") String drugname,
			@RequestParam(value="status", required=false) String status,
			@RequestParam(value="page", required=false) String page,
			@RequestParam(value="condition", required=false) String condition,
			@RequestParam(value="state1", required=false) String state1,
			@RequestParam(value="state2", required=false) String state2,
			@RequestParam(value="state3", required=false) String state3,
			@RequestParam(value="country1", required=false) String country1,
			@RequestParam(value="country2", required=false) String country2,
			@RequestParam(value="country3", required=false) String country3,
			@RequestParam(value="firstreceivedfrom", required=false) String firstreceivedfrom,
			@RequestParam(value="firstreceivedto", required=false) String firstreceivedto,
			@RequestParam(value="lastupdatedfrom", required=false) String lastupdatedfrom,
			@RequestParam(value="lastupdatedto", required=false) String lastupdatedto, Model model) {
		try {

			ClinicalTrialsSearch clinicalTrialsSearchList = hhsApiService.listClinicalTrials(
					drugname, status, page, condition, state1, state2, state3,
					country1, country2, country3, firstreceivedfrom,
					firstreceivedto, lastupdatedfrom, lastupdatedto);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(clinicalTrialsSearchList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

	@RequestMapping(value = { "/hhs-list-fda.htm" }, method = RequestMethod.GET)
	public String listFDA(@RequestParam(value="product", required=false) String product,
			@RequestParam(value="date", required=false) String date,
			@RequestParam(value="pastdays", required=false, defaultValue="0") int pastdays, Model model) {
		try {

			List<FDARecallSearch> fdaRecallSearchList= hhsApiService.listFDARecall(product, date, pastdays);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(fdaRecallSearchList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return RESPONSE_URL;
	}

}
