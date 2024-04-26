package com.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.JwtAuthenticationResponse;
import com.web.dto.SignInRequest;
import com.web.dto.SignUpRequest;
import com.web.dto.ValidateTokenRequest;
import com.web.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // origins = "*" for all types of url
public class AuthenticationController {
	private final AuthenticationService authenticationService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {
		return ResponseEntity.ok(authenticationService.signup(signUpRequest));
		
	}
	
	@PostMapping("/signin")
	public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SignInRequest signInRequest) {
		return ResponseEntity.ok(authenticationService.signin(signInRequest));
	}
	
	@PostMapping("/validate-token")
	public ResponseEntity<Boolean> validateToken(@RequestBody ValidateTokenRequest token) {
		return ResponseEntity.ok(authenticationService.validateToken(token));
	}
}
