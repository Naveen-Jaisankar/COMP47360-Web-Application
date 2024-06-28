 package com.compsci.webapp.controller;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.compsci.webapp.request.ResendVerificationEmailReqeust;
import com.compsci.webapp.request.UserRegisterRequest;
import com.compsci.webapp.request.UserSignInRequest;
import com.compsci.webapp.response.ResendVerificationEmailResponse;
import com.compsci.webapp.response.UserRegisterResponse;
import com.compsci.webapp.response.UserSignInResponse;
import com.compsci.webapp.service.AuthService;

import jakarta.validation.Valid;

 @RestController
 @RequestMapping("/api/v1/auth")
 public class AuthController {

     @Autowired 
     private AuthService userService;

     @PostMapping("/registerUser")
     public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
         UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
         userRegisterResponse = userService.registerUser(userRegisterRequest);
         return ResponseEntity.ok(userRegisterResponse);

     }
     
     @PostMapping("/resendVerificationEmail")
     public ResponseEntity<?> resendVerificationEmail(@Valid @RequestBody ResendVerificationEmailReqeust resendVerificationEmailReqeust){
    	 ResendVerificationEmailResponse resendVerificationEmailResponse = new ResendVerificationEmailResponse();
    	 resendVerificationEmailResponse = userService.resendVerificationEmail(resendVerificationEmailReqeust);
    	 return ResponseEntity.ok(resendVerificationEmailResponse);
     }
     
     @GetMapping("/confirm")
     public ResponseEntity<?> confirm(@RequestParam("token") String token) {
         return ResponseEntity.ok(userService.confirmToken(token));
     }

     @PostMapping("/signin")
     public ResponseEntity<?> userSignin(
             @Valid @RequestBody UserSignInRequest userSignInRequest) {
         UserSignInResponse userSignInResponse = new UserSignInResponse();
         userSignInResponse = userService.userSignIn(userSignInRequest);
         return ResponseEntity.ok(userSignInResponse);
     }

     @GetMapping("/validateToken")
     public String validateToken(@RequestParam("token") String token) {
         userService.validateToken(token);
         return "Token is valid";
     }

 }