package com.compsci.webapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.compsci.webapp.model.UserInfo;
import com.compsci.webapp.repositiory.UserRepository;

/**
 * Module Name: UserService.java
 * Date of Creation: 15-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfo user = userRepository.findByuserName(username); //This will fetch the user from the database;
		
		if(user != null) {
			var validateUser = User.withUsername(user.getUserName())
					.password(user.getPassword())
					.build(); //This will if the user has provided a correct password or not
			
			return validateUser;
		}
		
		return null;
	}

}
