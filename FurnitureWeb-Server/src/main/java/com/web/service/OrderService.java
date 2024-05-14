package com.web.service;

import org.springframework.http.ResponseEntity;

public interface OrderService {

	ResponseEntity<?> getAllPlacedOrder();
}
