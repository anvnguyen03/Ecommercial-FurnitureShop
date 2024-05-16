package com.web.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.ReviewDto;
import com.web.entity.Product;
import com.web.entity.Review;
import com.web.entity.User;
import com.web.repository.ProductRepository;
import com.web.repository.ReviewRepository;
import com.web.repository.UserRepository;
import com.web.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
	
	private final ReviewRepository reviewRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;
	
	@Override
	public ResponseEntity<?> createReview(ReviewDto reviewDto) throws IOException {
		User user = userRepository.findById(reviewDto.getUser_id()).orElseThrow();
		Product product = productRepository.findById(reviewDto.getProduct_id()).orElseThrow();
		
		Review review = new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setContent(reviewDto.getContent());
		review.setImg(reviewDto.getImg().getBytes());
		reviewRepository.save(review);
		return new ResponseEntity<>(review.getDto(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getReview(long userId, long productId) {
		Optional<Review> optionalReview = reviewRepository.findByUserIdAndProductId(userId, productId);
		if (optionalReview.isPresent()) {
			return new ResponseEntity<>(optionalReview.get().getDto(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	@Override
	public ResponseEntity<?> getReviewsByProductId(long productId) {
		List<Review> reviews = reviewRepository.findByProductId(productId);
		List<ReviewDto> reviewsDto = reviews.stream().map(Review::getDto).collect(Collectors.toList());
		return new ResponseEntity<>(reviewsDto, HttpStatus.OK);
	}

}
