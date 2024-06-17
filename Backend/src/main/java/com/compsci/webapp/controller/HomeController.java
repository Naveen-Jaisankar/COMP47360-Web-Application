package com.compsci.webapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Module Name: HomeController.java
 * Date of Creation: 15-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */
@RestController
public class HomeController {
	
	
	@GetMapping("/")
	public String home() {
		return "Home Page";
	}
	
	@GetMapping("/client/home")
	public String home() {
		return "Client Home Page";
	}
}
