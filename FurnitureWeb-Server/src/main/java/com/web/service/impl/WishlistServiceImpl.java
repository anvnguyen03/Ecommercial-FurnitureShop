package com.web.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.WishlistDto;
import com.web.entity.Product;
import com.web.entity.User;
import com.web.entity.Wishlist;
import com.web.repository.ProductRepository;
import com.web.repository.UserRepository;
import com.web.repository.WishlistRepository;
import com.web.service.WishlistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{
	
	private final WishlistRepository wishlistRepository;
	private final ProductRepository productRepository;
	private final UserRepository userRepository;

	@Override
	public ResponseEntity<?> addProductToWishlist(WishlistDto wishlistDto) {
		
		Optional<Wishlist> existedProduct = wishlistRepository.findByUserIdAndProductId(wishlistDto.getUser_id(), wishlistDto.getProduct_id());
		if (existedProduct.isPresent()) {
			return new ResponseEntity<>("Sản phẩm đã tồn tại trong wishlist", HttpStatus.CONFLICT);
		}
		
		Product product = productRepository.findById(wishlistDto.getProduct_id()).orElseThrow();
		User user = userRepository.findById(wishlistDto.getUser_id()).orElseThrow();
		
		Wishlist wishlist = new Wishlist();
		wishlist.setProduct(product);
		wishlist.setUser(user);
		wishlistRepository.save(wishlist);
		
		return new ResponseEntity<>(wishlist.getDto(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getUserWishlist(long userId) {
		Optional<List<Wishlist>> existedWishlist = wishlistRepository.findByUserId(userId);
		if (existedWishlist.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		List<WishlistDto> wishlist = existedWishlist.get().stream().map(Wishlist::getDto).collect(Collectors.toList());
		return new ResponseEntity<>(wishlist, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> deleteProductInWishlist(WishlistDto wishlistDto) {
		Optional<Wishlist> existedProduct = wishlistRepository.findByUserIdAndProductId(wishlistDto.getUser_id(), wishlistDto.getProduct_id());
		if (existedProduct.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		wishlistRepository.delete(existedProduct.get());
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
