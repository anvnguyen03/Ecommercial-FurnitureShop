package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.dto.AddProductInCartDto;
import com.web.dto.OrderDto;

public interface CartService {
	ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto);
	ResponseEntity<?> getCartByUserId(Long userId);
}
