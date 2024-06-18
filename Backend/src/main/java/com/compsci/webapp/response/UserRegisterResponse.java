package com.compsci.webapp.response;

 /**
 * Module Name: UserRegisterResponse.java
 * Date of Creation: 17-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

public class UserRegisterResponse {
    
    private Long userId;
    
    private String userName;
        
    private String userEmail;
    
    private String userPassword;
    
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

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

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }


}