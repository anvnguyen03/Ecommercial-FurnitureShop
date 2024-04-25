package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.dto.JwtAuthenticationResponse;
import com.web.dto.SignInRequest;
import com.web.dto.SignUpRequest;
import com.web.dto.ValidateTokenRequest;

public interface AuthenticationService {
	ResponseEntity<?> signup(SignUpRequest signUpRequest);
	JwtAuthenticationResponse signin(SignInRequest signInRequest);
	Boolean validateToken(ValidateTokenRequest token);
}
