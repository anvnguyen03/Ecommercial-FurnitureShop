package com.web.service;

import com.web.dto.JwtAuthenticationResponse;
import com.web.dto.SignInRequest;
import com.web.dto.SignUpRequest;
import com.web.dto.ValidateTokenRequest;
import com.web.entity.User;

public interface AuthenticationService {
	User signup(SignUpRequest signUpRequest);
	JwtAuthenticationResponse signin(SignInRequest signInRequest);
	Boolean validateToken(ValidateTokenRequest token);
}
