package com.compsci.webapp.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compsci.webapp.model.RegisterDTO;
import com.compsci.webapp.model.UserInfo;
import com.compsci.webapp.repositiory.UserRepository;
import com.nimbusds.jose.jwk.source.ImmutableSecret;

import jakarta.validation.Valid;

/**
 * Module Name: AccountController.java
 * Date of Creation: 15-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@RestController
@RequestMapping("/account")
public class AccountController {
	
	@Value("${security.jwt.secret-key}")
	private String jwtSecretKey;
	
	@Value("${security.jwt.issuer}")
	private String jwtIssuer;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")
	public ResponseEntity<Object> register(@Valid @RequestBody RegisterDTO registerDto, BindingResult result){
		if(result.hasErrors()) {
			List<ObjectError> errorsList = result.getAllErrors();
			Map<String,String> errorsMap = new HashMap<String,String>();
			
			for(int i = 0;i< errorsList.size();i++) {
				ObjectError error = (FieldError) errorsList.get(i);
				errorsMap.put(error.getObjectName(), error.getDefaultMessage());
				
			}
			
			return ResponseEntity.badRequest().body(errorsMap);
			
		}else {
			//Create a new user
			
			var bCryptEncoder = new BCryptPasswordEncoder();
			
			UserInfo userInfo = new UserInfo();
			userInfo.setUserName(registerDto.getUserName());
			userInfo.setUserEmail(registerDto.getUserEmail());
			userInfo.setPassword(bCryptEncoder.encode(registerDto.getPassword()));
			userInfo.setCreatedAt(System.currentTimeMillis());
			
			try {
				UserInfo user = userRepository.findByuserName(registerDto.getUserName());
				if(user != null) {
					return ResponseEntity.badRequest().body("UserName already exist");
				}
				
				user = userRepository.findByuserEmail(registerDto.getUserEmail());
				if(user != null) {
					return ResponseEntity.badRequest().body("Email address already exist");
				}
				
				userRepository.save(userInfo);
				
				String jwtToken = generateJWTToken(user);
				
				Map<String,Object> response = new HashMap<String,Object>();
				response.put("user", user);
				response.put("token", jwtToken);
				
				return ResponseEntity.ok(response);
				
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		return ResponseEntity.badRequest().body("Error");
	}
	
	
	private String generateJWTToken(UserInfo user) {
		Instant now = Instant.now();
		
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer(jwtIssuer)
				.issuedAt(now)
				.expiresAt(now.plusSeconds(24*3600))
				.subject(user.getUserName())
				.build();
		
		var encoder = new NimbusJwtEncoder(new ImmutableSecret<>(jwtSecretKey.getBytes()));
		var params = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(),claims);
		
		return encoder.encode(params).getTokenValue();
	}
}
