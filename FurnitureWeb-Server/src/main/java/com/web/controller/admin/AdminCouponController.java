package com.web.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.entity.Coupon;
import com.web.service.CouponService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminCouponController {

	private final CouponService couponService;
	
	@PostMapping("/coupon")
	public ResponseEntity<?> createCoupon(@RequestBody Coupon coupon) {
		return couponService.createCoupon(coupon);
	}
	
	@GetMapping("/coupon")
	public ResponseEntity<?> getAllCoupons() {
		return couponService.getAllCoupons();
	}
	
}
