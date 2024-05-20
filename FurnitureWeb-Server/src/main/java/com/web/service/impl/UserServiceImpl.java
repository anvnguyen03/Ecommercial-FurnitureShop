package com.web.service.impl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.web.entity.Role;
import com.web.entity.Status;
import com.web.entity.User;
import com.web.repository.UserRepository;
import com.web.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	private final UserRepository userRepository;

	@Override
	public UserDetailsService userDetailsService() {
		return new UserDetailsService() {
			
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				return userRepository.findByEmail(username)
						.orElseThrow(() -> new UsernameNotFoundException("User not found"));
			}
		};
	}
	
	@Override
	public ResponseEntity<?> getAllUser() {
		return new ResponseEntity<>(userRepository.findByRole(Role.CUSTOMER), HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<?> changeUserStatus(long userId) {
		User user = userRepository.findById(userId).orElseThrow();
		if (user.getStatus() == Status.ACTIVE) {
			user.setStatus(Status.LOCKED);
		} else {
			user.setStatus(Status.ACTIVE);
		}
		userRepository.save(user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
