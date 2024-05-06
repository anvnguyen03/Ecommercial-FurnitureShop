package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.entity.Coupon;

public interface CouponService {
	ResponseEntity<?> createCoupon(Coupon coupon);
	ResponseEntity<?> getAllCoupons();
}
