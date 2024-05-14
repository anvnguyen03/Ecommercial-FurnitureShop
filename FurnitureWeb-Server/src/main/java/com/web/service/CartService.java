package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.dto.AddProductInCartDto;
import com.web.dto.CartItemsDto;
import com.web.dto.PlaceOrderDto;

public interface CartService {
	ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto);
	ResponseEntity<?> getCartByUserId(Long userId);
	ResponseEntity<?> applyCoupon(Long userId, String code);
	ResponseEntity<?> updateCart(CartItemsDto cartItemDto);
	ResponseEntity<?> deleteCartItem(CartItemsDto cartItemDto);
	ResponseEntity<?> placeOrder(PlaceOrderDto placeOrderDto);
}
