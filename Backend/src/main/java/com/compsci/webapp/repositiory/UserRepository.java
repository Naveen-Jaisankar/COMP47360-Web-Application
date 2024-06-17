package com.compsci.webapp.repositiory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.compsci.webapp.model.UserInfo;

/**
 * Module Name: UserRepository.java
 * Date of Creation: 15-Jun-2024
 * Author: naveen
 *
 * Description:
 * This class handles ...
 */

public interface UserRepository extends JpaRepository<UserInfo, Integer>{
	
	public UserInfo findByuserName(String userName);
	public UserInfo findByuserEmail(String userEmail);
}
