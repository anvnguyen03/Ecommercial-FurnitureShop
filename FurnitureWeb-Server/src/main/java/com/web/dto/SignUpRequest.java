package com.web.dto;

import lombok.Data;

@Data
public class SignUpRequest {
	private String fullname;
	private String email;
	private String password;
}
