package com.aetna.carepass.hhs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HhsApiController {


	@RequestMapping(value = { "/hhs-endpoints.htm" }, method = RequestMethod.GET)
	public String hhsApi(Model model) {
		return "hhs/hhsendpoints";
	}
}
