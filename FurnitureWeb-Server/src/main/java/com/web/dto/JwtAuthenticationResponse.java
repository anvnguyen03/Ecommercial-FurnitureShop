package com.web.dto;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
	private UserResponse user;
	private String token;
	private String refreshToken;
	private String error;
}
