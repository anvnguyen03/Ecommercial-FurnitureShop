package com.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.WishlistDto;
import com.web.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class WishlistController {

	private final WishlistService wishlistService;
	
	@GetMapping("/wishlist/{userId}")
	public ResponseEntity<?> getUserWishlist(@PathVariable long userId) {
		return wishlistService.getUserWishlist(userId);
	}
	
	@PostMapping("/wishlist")
	public ResponseEntity<?> addProductToWishlist(@RequestBody WishlistDto wishlistDto) {
		return wishlistService.addProductToWishlist(wishlistDto);
	}
	
	@PostMapping("/wishlist/delete")
	public ResponseEntity<?> deleteProductInWishlist(@RequestBody WishlistDto wishlistDto) {
		return wishlistService.deleteProductInWishlist(wishlistDto);
	}
}
