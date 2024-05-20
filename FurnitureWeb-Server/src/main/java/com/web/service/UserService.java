package com.web.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
	UserDetailsService userDetailsService();

	ResponseEntity<?> getAllUser();

	ResponseEntity<?> changeUserStatus(long userId);
}
