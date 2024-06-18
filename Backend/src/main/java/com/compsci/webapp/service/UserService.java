package com.compsci.webapp.service;

import com.compsci.webapp.request.UserRegisterRequest;
import com.compsci.webapp.request.UserSignInRequest;
import com.compsci.webapp.response.UserRegisterResponse;
import com.compsci.webapp.response.UserSignInResponse;

/**
 * Module Name: UserService.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */


public interface UserService {
    
    UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest);

    UserSignInResponse userSignIn(UserSignInRequest userSignInRequest);

    String confirmToken(String token);

    void validateToken(String token);
    
}