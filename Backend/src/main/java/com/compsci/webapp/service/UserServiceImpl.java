package com.compsci.webapp.service;

 import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Module Name: UserServiceImpl.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.compsci.webapp.config.JwtService;
import com.compsci.webapp.entity.EmailConfirmationEntity;
import com.compsci.webapp.entity.UserEntity;
import com.compsci.webapp.repositiory.EmailConfirmationRepository;
import com.compsci.webapp.repositiory.UserRepository;
import com.compsci.webapp.request.UserRegisterRequest;
import com.compsci.webapp.request.UserSignInRequest;
import com.compsci.webapp.response.UserRegisterResponse;
import com.compsci.webapp.response.UserSignInResponse;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private EmailConfirmationRepository emailConfirmationRepository;
	
	@Autowired
	private EmailService emailService;
	
	 @Autowired
	 private Configuration freemarkerConfig;

	@Override
	public UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest) {

		if (Boolean.TRUE.equals(userRepository.existsByUserEmail(userRegisterRequest.getUserEmail()))) {
		    throw new IllegalArgumentException("Email is already in use!");
		}
        
		UserEntity user = new UserEntity();
		
        user.setUserName(userRegisterRequest.getUserName());
        user.setUserEmail(userRegisterRequest.getUserEmail());
        user.setUserPassword(passwordEncoder.encode(userRegisterRequest.getUserPassword()));
        
        userRepository.save(user);
        
        String token = UUID.randomUUID().toString();

        EmailConfirmationEntity confirmationToken = new EmailConfirmationEntity();
        
        confirmationToken.setEmailConfirmationCreatedAt(LocalDateTime.now());
        confirmationToken.setEmailConfirmationExpiresAt(LocalDateTime.now().plusMinutes(15));
        confirmationToken.setUserId(user);
        confirmationToken.setEmailConfirmationToken(token);
        
        emailConfirmationRepository.save(confirmationToken);
        
        String link = "http://localhost:8080/api/v1/auth/confirm?token=" + token;
        try {
        	Template verificationEmailTemplate = freemarkerConfig.getTemplate("verification_email.ftl");
        	Map<String, Object> verificationEmailValueMapper = new HashMap<>();
            verificationEmailValueMapper.put("name", user.getUsername());
            verificationEmailValueMapper.put("link", link);
            emailService.send(
            		user.getUserEmail(),
            		FreeMarkerTemplateUtils.processTemplateIntoString(verificationEmailTemplate, verificationEmailValueMapper));
        }catch(Exception e) {
        	System.out.println("Failed to send verification email");
        }
        
        
        return mapToUserRegisterResponse(user);
		
	}

	private UserRegisterResponse mapToUserRegisterResponse(UserEntity user){
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		userRegisterResponse.setUserName(user.getUserName());
		userRegisterResponse.setUserEmail(user.getUserEmail());
		userRegisterResponse.setMessage("User registered successfully!");
        return userRegisterResponse;
    }

	@Override
	public UserSignInResponse userSignIn(UserSignInRequest userSignInRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInRequest.getUserEmail(), userSignInRequest.getUserPassword()));
		var user = userRepository.findByUserEmail(userSignInRequest.getUserEmail()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		UserSignInResponse userSignInResponse = new UserSignInResponse();
		userSignInResponse.setToken(jwtToken);
		userSignInResponse.setMessage("Login Successfull!!");
		userSignInResponse.setUserEmail(user.getUserEmail());
		userSignInResponse.setUserName(user.getUserName());
		return userSignInResponse;
	}

	@Override
	@Transactional
    public String confirmToken(String token) {
		Optional<EmailConfirmationEntity> emailConfirmationEntity = emailConfirmationRepository.findByEmailConfirmationToken(token);

		if(emailConfirmationEntity.isEmpty()) {
			return "User not found";
		}

		EmailConfirmationEntity emailConfirmation = emailConfirmationEntity.get();

        if (emailConfirmation.getEmailConfirmationConfirmedAt() != null) {
            return "Email already confirmed";
        }

        LocalDateTime expiredAt = emailConfirmation.getEmailConfirmationExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            return "Activation expired";
        }

        emailConfirmationRepository.updateEmailConfirmationConfirmedAt(token, LocalDateTime.now());

        userRepository.enableUserEntity(emailConfirmation.getUserId().getUserEmail());
        return buildAccountConfirmationEmail();
    }

	@Override
	public void validateToken(String token) {
		jwtService.validateToken(token);
	}
	
	public String buildAccountConfirmationEmail() {
		return "Confirmed";
	}

}