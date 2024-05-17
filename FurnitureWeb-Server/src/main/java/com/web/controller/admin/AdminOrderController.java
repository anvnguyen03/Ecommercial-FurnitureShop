package com.web.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminOrderController {

	private final OrderService orderService;
	
	@GetMapping("/placed-order")
	public ResponseEntity<?> getAllPlacedOrder() {
		return orderService.getAllPlacedOrder();
	}
	
	@PostMapping("/order/{orderId}")
	public ResponseEntity<?> changeOrderStatus(@PathVariable long orderId) {
		return orderService.changeOrderStatus(orderId);
	}
	
	@GetMapping("/order/analytics")
	public ResponseEntity<?> getOrderAnalytics() {
		return orderService.calculateAnalytics();
	}
}
