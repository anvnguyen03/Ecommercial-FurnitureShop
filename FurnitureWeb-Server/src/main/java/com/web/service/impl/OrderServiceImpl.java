package com.web.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.OrderDto;
import com.web.entity.Order;
import com.web.entity.OrderStatus;
import com.web.repository.OrderRepository;
import com.web.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

	private final OrderRepository orderRepository;
	
	@Override
	public ResponseEntity<?> getAllPlacedOrder() {
		List<Order> orders = orderRepository.findAllByOrderStatusIn(
				List.of(OrderStatus.PLACED, OrderStatus.SHIPPING, OrderStatus.DELIVERED));
		
		List<OrderDto> ordersDto = orders.stream().map(Order::getDto).collect(Collectors.toList());
		return new ResponseEntity<>(ordersDto, HttpStatus.OK);
	}
}
