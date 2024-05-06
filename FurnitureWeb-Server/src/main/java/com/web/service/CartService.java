package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.dto.AddProductInCartDto;

public interface CartService {
	ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto);
	ResponseEntity<?> getCartByUserId(Long userId);
	ResponseEntity<?> applyCoupon(Long userId, String code);
}
