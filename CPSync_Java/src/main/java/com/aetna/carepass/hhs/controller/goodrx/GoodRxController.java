package com.aetna.carepass.hhs.controller.goodrx;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.aetna.carepass.hhs.goodrx.GoodRXApiService;
import com.aetna.carepass.hhs.goodrx.types.DrugPrices;
import com.google.gson.Gson;

@Controller
public class GoodRxController {
	@Autowired
	private GoodRXApiService goodRXApiService;

	@RequestMapping(value = { "/good-rx-api" }, method = RequestMethod.GET)
	public String hhsApi(Model model) {
		return "hhs/goodrx";
	}

	@RequestMapping(value = { "/goodrx-lowest" }, method = RequestMethod.GET)
	public String listLowestPrices(
			@RequestParam(value = "form", required = false) String form,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "dosage", required = false) String dosage,
			@RequestParam(value = "quantity", required = false) String quantity,
			@RequestParam(value = "manufacturer", required = false) String manufacturer,
			@RequestParam(value = "ndc", required = false) String ndc,
			Model model) {
		try {

			List<DrugPrices> theDrugLowerPricesList =goodRXApiService.listDrugLowestPrices(name, form, dosage, quantity, manufacturer, ndc);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(theDrugLowerPricesList));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return "hhs/goodrx";
	}

	@RequestMapping(value = { "/goodrx-available" }, method = RequestMethod.GET)
	public String ListAvailablePrices(@RequestParam(value = "form", required = false) String form,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "dosage", required = false) String dosage,
			@RequestParam(value = "quantity", required = false) String quantity,
			@RequestParam(value = "manufacturer", required = false) String manufacturer,
			@RequestParam(value = "ndc", required = false) String ndc,
			Model model) {
		try {

			List<DrugPrices> listDrugComparePrices =goodRXApiService.listDrugComparePrices(name, form, dosage, quantity, manufacturer, ndc);
			Gson gson = new Gson();
			model.addAttribute("response", gson.toJson(listDrugComparePrices));
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
		}
		return "hhs/goodrx";
	}
}
