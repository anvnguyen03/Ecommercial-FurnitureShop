package com.web.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.CartItemsDto;
import com.web.dto.OrderDto;
import com.web.entity.CartItems;
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
	
	@Override
	public ResponseEntity<?> changeOrderStatus(long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow();
		if (order.getOrderStatus() == OrderStatus.PLACED) {
			order.setOrderStatus(OrderStatus.SHIPPING);
		} else if (order.getOrderStatus() == OrderStatus.SHIPPING) {
			order.setOrderStatus(OrderStatus.DELIVERED);
		}
		orderRepository.save(order);
		return new ResponseEntity<>(order.getDto(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getMyOrders(long userId) {
		List<Order> orders = orderRepository.findAllByUserIdAndOrderStatusIn(
				userId, List.of(OrderStatus.PLACED, OrderStatus.SHIPPING, OrderStatus.DELIVERED));
		
		List<OrderDto> ordersDto = orders.stream().map(Order::getDto).collect(Collectors.toList());
		return new ResponseEntity<>(ordersDto, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getOrder(long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow();
		List<CartItemsDto> cartItemsDto = order.getCartItems().stream().map(CartItems::getDto).collect(Collectors.toList());
		OrderDto orderDto = new OrderDto();
		orderDto.setAmount(order.getAmount());
		orderDto.setId(order.getId());
		orderDto.setOrderStatus(order.getOrderStatus());
		orderDto.setDiscount(order.getDiscount());
		orderDto.setTotalAmount(order.getTotalAmount());
		orderDto.setCartItems(cartItemsDto);
		if (order.getCoupon() != null) {
			orderDto.setCouponName(order.getCoupon().getName());
		}
		
		return new ResponseEntity<>(orderDto, HttpStatus.OK);
	}
}
