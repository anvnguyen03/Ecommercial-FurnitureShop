package com.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.AddProductInCartDto;
import com.web.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
	
	private final CartService cartService;
	
	@PostMapping("/cart")
	public ResponseEntity<?> addProductToCart(@RequestBody AddProductInCartDto product) {
		return cartService.addProductToCart(product);
	}
	
	@GetMapping("/cart/{userId}")
	public ResponseEntity<?> getCartByUserId(@PathVariable Long userId) {
		return cartService.getCartByUserId(userId);
	}
	
	@GetMapping("/coupon/{userId}/{code}")
	public ResponseEntity<?> applyCoupon(@PathVariable Long userId, @PathVariable String code) {
		return cartService.applyCoupon(userId, code);
	}
}
