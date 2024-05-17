package com.web.service.impl;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.AnalyticsResponse;
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
	
	@Override
	public ResponseEntity<?> calculateAnalytics() {
		
        LocalDate currentDate = LocalDate.now();
        LocalDate previousDate = currentDate.minusMonths(1);
        
        long currentMonthOrders = getTotalOrdersForMonth(currentDate.getMonthValue(), currentDate.getYear());
        long previousMonthOrders = getTotalOrdersForMonth(previousDate.getMonthValue(), previousDate.getYear());
        
        long currentMonthProfit = getProfitsForMonth(currentDate.getMonthValue(), currentDate.getYear());
        long previousMonthProfit = getProfitsForMonth(previousDate.getMonthValue(), previousDate.getYear());
        
        long placed = orderRepository.countByOrderStatus(OrderStatus.PLACED);
        long shipping = orderRepository.countByOrderStatus(OrderStatus.SHIPPING);
        long delivered = orderRepository.countByOrderStatus(OrderStatus.DELIVERED);
        
        AnalyticsResponse response = new AnalyticsResponse(placed, shipping, delivered, currentMonthOrders, previousMonthOrders, currentMonthProfit, previousMonthProfit);
        return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	private long getTotalOrdersForMonth(int month, int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		
		Date startOfMonth = calendar.getTime();
		
		// Move calendar to the end of month
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		
		Date endOfMonth = calendar.getTime();
		
		List<Order> orders = orderRepository.findByDateBetweenAndOrderStatus(startOfMonth, endOfMonth, OrderStatus.DELIVERED);
		return (long) orders.size();
	}
	
	private long getProfitsForMonth(int month, int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		
		Date startOfMonth = calendar.getTime();
		
		// Move calendar to the end of month
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		
		Date endOfMonth = calendar.getTime();
		
		List<Order> orders = orderRepository.findByDateBetweenAndOrderStatus(startOfMonth, endOfMonth, OrderStatus.DELIVERED);
		
		long sum = 0l;
		for (Order order : orders) {
			sum += order.getTotalAmount();
		}
		
		return sum;
	}
}
