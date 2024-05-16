package com.web.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.ReviewDto;
import com.web.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ReviewController {

	private final ReviewService reviewService;
	
	@PostMapping("/review")
	public ResponseEntity<?> createReview(@ModelAttribute ReviewDto reviewDto) throws IOException {
		return reviewService.createReview(reviewDto);
	}
	
	@GetMapping("/review/{userId}/{productId}")
	public ResponseEntity<?> getReview(@PathVariable long userId, @PathVariable long productId) {
		return reviewService.getReview(userId, productId);
	}
	
	@GetMapping("/review/{productId}")
	public ResponseEntity<?> getReviewsByProductId(@PathVariable long productId) {
		return reviewService.getReviewsByProductId(productId);
	}
}
