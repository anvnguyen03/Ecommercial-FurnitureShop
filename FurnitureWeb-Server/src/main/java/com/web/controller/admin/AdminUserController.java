package com.web.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminUserController {
	
	private final UserService userService;
	
	@GetMapping("/user")
	public ResponseEntity<?> getAllUsers() {
		return userService.getAllUser();
	}
	
	@GetMapping("/user/change-status/{userId}")
	public ResponseEntity<?> changeUserStatus(@PathVariable long userId) {
		return userService.changeUserStatus(userId);
	}
}
