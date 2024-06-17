package com.compsci.webapp.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

/**
 * Module Name: RegisterDTO.java
 * Date of Creation: 15-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class RegisterDTO {
	
	@NotEmpty
	private String userName;
	
	@NotEmpty
	private String userEmail;
	
	@NotEmpty
	@Size(min = 8, message = "Minimum password length is 6 characters")
	private String password;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
