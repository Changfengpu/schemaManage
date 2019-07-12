package com.veeparch.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
	@RequestMapping(value="/login.html")
	public String login(){
		return "jsp/login";
	}

	@RequestMapping(value="/manage.html")
	public String manage(){
		return "jsp/manage";
	}

	@RequestMapping(value="/find.html")
	public String find(){
		return "jsp/find";
	}
}
