package com.web.service.impl;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.dto.JwtAuthenticationResponse;
import com.web.dto.SignInRequest;
import com.web.dto.SignUpRequest;
import com.web.dto.UserResponse;
import com.web.dto.ValidateTokenRequest;
import com.web.entity.Order;
import com.web.entity.OrderStatus;
import com.web.entity.Role;
import com.web.entity.Status;
import com.web.entity.User;
import com.web.repository.OrderRepository;
import com.web.repository.UserRepository;
import com.web.service.AuthenticationService;
import com.web.service.JWTService;
import com.web.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{

	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JWTService jwtService;
	private final UserService userService;
	
	@Override
	public ResponseEntity<?> signup(SignUpRequest signUpRequest) {
		User user = new User();

		Optional<User> userExisted = userRepository.findByEmail(signUpRequest.getEmail());
		
		// kiểm tra xem đã tồn tại User này chưa
		if (userExisted.isPresent()) {
			return new ResponseEntity<>("User already existed, please use another email address", HttpStatus.NOT_ACCEPTABLE);
		} else {
			user.setEmail(signUpRequest.getEmail());
			user.setFullname(signUpRequest.getFullname());
			user.setRole(Role.CUSTOMER);
			user.setStatus(Status.ACTIVE);
			user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
			User createdUser = userRepository.save(user);
			
			Order order = new Order();
			order.setAmount(0L);
			order.setTotalAmount(0L);
			order.setDiscount(0L);
			order.setUser(createdUser);
			order.setOrderStatus(OrderStatus.PENDING);
			orderRepository.save(order);
			
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
	}

	@Override
	public JwtAuthenticationResponse signin(SignInRequest signInRequest) {
		// khởi tạo một đối tượng authentication để thực hiện xác thực qua lớp Username Password
				Authentication authentication;
				
				try {
					authentication = authenticationManager.authenticate(
							new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
				} catch (AuthenticationException e) {
					authentication = null;
				}

				JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

				// kiểm tra xem đối tượng authentication đã xác thực thành công chưa
				if (authentication != null && authentication.isAuthenticated()) {
					var user = userRepository.findByEmail(signInRequest.getEmail())
							.orElseThrow(() -> new IllegalArgumentException("Invalid Email or password"));
					var jwt = jwtService.generateToken(user);
					var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
					
					UserResponse userRes = new UserResponse();
					userRes.setUserId(user.getId());
					userRes.setFullname(user.getFullname());

					jwtAuthenticationResponse.setUser(userRes);
					jwtAuthenticationResponse.setToken(jwt);
					jwtAuthenticationResponse.setRefreshToken(refreshToken);
				} else {
					jwtAuthenticationResponse.setError("Invalid Email or password");
				}

				return jwtAuthenticationResponse;
	}

	@Override
	public Boolean validateToken(ValidateTokenRequest token) {
		String userEmail;
		try {
			userEmail = jwtService.extractUsername(token.getToken());	
		} catch (Exception e) {
			userEmail = "";
			System.out.println("Error: " + e);
		}
		
		if (!userEmail.isEmpty()) {
			UserDetails userDetails = this.userService.userDetailsService().loadUserByUsername(userEmail);
			if (jwtService.isTokenValid(token.getToken(), userDetails)) {
				return true;
			} 
			return false;
		} else {
			return false;
		}
	}

}
