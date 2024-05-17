package com.web.service;

import org.springframework.http.ResponseEntity;

public interface OrderService {

	ResponseEntity<?> getAllPlacedOrder();
	ResponseEntity<?> getMyOrders(long userId);
	ResponseEntity<?> getOrder(long orderId);
	ResponseEntity<?> changeOrderStatus(long orderId);
	ResponseEntity<?> calculateAnalytics();
}
