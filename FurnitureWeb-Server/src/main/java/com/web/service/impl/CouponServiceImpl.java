package com.web.service.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.entity.Coupon;
import com.web.repository.CouponRepository;
import com.web.service.CouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService{

	private final CouponRepository couponRepository;
	
	public ResponseEntity<?> createCoupon(Coupon coupon) {
		if (couponRepository.existsByCode(coupon.getCode())) {
			return new ResponseEntity<>("Coupon already existed", HttpStatus.CONFLICT);
		}
		Coupon createdCoupon = couponRepository.save(coupon);
		return new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
	}
	
	public ResponseEntity<?> getAllCoupons() {
		List<Coupon> coupons = couponRepository.findAll();
		return new ResponseEntity<>(coupons, HttpStatus.OK);
	}
}
