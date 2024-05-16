package com.web.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;

import com.web.dto.ReviewDto;

public interface ReviewService {
	ResponseEntity<?> createReview(ReviewDto reviewDto) throws IOException;
	ResponseEntity<?> getReview(long userId, long productId);
	ResponseEntity<?> getReviewsByProductId(long productId);
}
