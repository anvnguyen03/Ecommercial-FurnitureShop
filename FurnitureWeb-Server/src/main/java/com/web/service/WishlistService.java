package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.dto.WishlistDto;

public interface WishlistService {

	ResponseEntity<?> addProductToWishlist(WishlistDto wishlistDto);
	ResponseEntity<?> deleteProductInWishlist(WishlistDto wishlistDto);
	ResponseEntity<?> getUserWishlist(long userId);
}
