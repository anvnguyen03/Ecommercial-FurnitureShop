package com.web.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.AddProductInCartDto;
import com.web.dto.CartItemsDto;
import com.web.dto.OrderDto;
import com.web.dto.PlaceOrderDto;
import com.web.entity.CartItems;
import com.web.entity.Coupon;
import com.web.entity.Order;
import com.web.entity.OrderStatus;
import com.web.entity.Product;
import com.web.entity.User;
import com.web.repository.CartItemsRepository;
import com.web.repository.CouponRepository;
import com.web.repository.OrderRepository;
import com.web.repository.ProductRepository;
import com.web.repository.UserRepository;
import com.web.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{
	
	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final CartItemsRepository cartItemsRepository;
	private final ProductRepository productRepository;
	private final CouponRepository couponRepository;
	
	public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
		Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.PENDING);
		Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
				addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId());
		
		if (optionalCartItems.isPresent()) {
			return new ResponseEntity<>(null, HttpStatus.CONFLICT); 
		} else {
			Optional<Product> product = productRepository.findById(addProductInCartDto.getProductId());
			Optional<User> user = userRepository.findById(addProductInCartDto.getUserId());
			
			if (product.isPresent() && user.isPresent()) {
				CartItems cartItem = new CartItems();
				cartItem.setProduct(product.get());
				cartItem.setPrice(product.get().getPrice());
				cartItem.setQuantity(addProductInCartDto.getQuantity());
				cartItem.setUser(user.get());
				cartItem.setOrder(activeOrder);
				cartItemsRepository.save(cartItem);

				activeOrder.getCartItems().add(cartItem);
				activeOrder.updateOrderAmount();
				orderRepository.save(activeOrder);
				
				return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
				
			} else {
				return new ResponseEntity<>("User or Product not found", HttpStatus.NOT_FOUND);
			}
		}
	}
	
	public ResponseEntity<?> getCartByUserId(Long userId) {
		Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
		List<CartItemsDto> cartItemsDtos = activeOrder.getCartItems().stream().map(CartItems::getDto).collect(Collectors.toList());
		OrderDto orderDto = new OrderDto();
		orderDto.setAmount(activeOrder.getAmount());
		orderDto.setId(activeOrder.getId());
		orderDto.setOrderStatus(activeOrder.getOrderStatus());
		orderDto.setDiscount(activeOrder.getDiscount());
		orderDto.setTotalAmount(activeOrder.getTotalAmount());
		orderDto.setCartItems(cartItemsDtos);
		if (activeOrder.getCoupon() != null) {
			orderDto.setCouponName(activeOrder.getCoupon().getName());
		}
		
		return new ResponseEntity<>(orderDto, HttpStatus.OK);
	}
	
	public ResponseEntity<?> applyCoupon(Long userId, String code) {
		Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
		Optional<Coupon> coupon = couponRepository.findByCode(code);
		
		if (coupon.isPresent()) {
			if (isCouponExpired(coupon.get())) {
				return new ResponseEntity<>(null, HttpStatus.LOCKED);
			} else {
				activeOrder.setCoupon(coupon.get());
				activeOrder.applyCoupon(coupon.get());
				
				orderRepository.save(activeOrder);
				return new ResponseEntity<>(activeOrder.getDto(), HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
	}
	
	private boolean isCouponExpired(Coupon coupon) {
		Date currentDate = new Date();
		Date expirationDate = coupon.getExpirationDate();
		
		return currentDate.after(expirationDate);
	}

	@Override
	public ResponseEntity<?> updateCart(CartItemsDto cartItemDto) {
		Optional<CartItems> existedCartItem = cartItemsRepository.findById(cartItemDto.getId());
		if (existedCartItem.isEmpty()) {
			return new ResponseEntity<>("Cart Item not found", HttpStatus.NOT_FOUND);
		}
		
		CartItems cartItem = existedCartItem.get();
		Product product = productRepository.findById(cartItem.getProduct().getId()).orElseThrow();
		if (cartItemDto.getQuantity() > product.getStoke()) {
			return new ResponseEntity<>("Product out of stoke", HttpStatus.BAD_REQUEST);
		} else {
			cartItem.setQuantity(cartItemDto.getQuantity());
			cartItemsRepository.save(cartItem);
			Order activeOrder = orderRepository.findByUserIdAndOrderStatus(cartItemDto.getUserId(), OrderStatus.PENDING);
			activeOrder.updateOrderAmount();
			orderRepository.save(activeOrder);
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		
	}

	@Override
	public ResponseEntity<?> deleteCartItem(CartItemsDto cartItemDto) {
		Optional<CartItems> existedCartItem = cartItemsRepository.findById(cartItemDto.getId());
		Order activeOrder = orderRepository.findByUserIdAndOrderStatus(cartItemDto.getUserId(), OrderStatus.PENDING);
		if (existedCartItem.isEmpty()) {
			return new ResponseEntity<>("Cart Item not found", HttpStatus.NOT_FOUND);
		}
		CartItems cartItem = existedCartItem.get();
		cartItemsRepository.delete(cartItem);
		
		activeOrder.updateOrderAmount();
		orderRepository.save(activeOrder);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<?> placeOrder(PlaceOrderDto placeOrderDto) {
		Order activeOrder = orderRepository.findByUserIdAndOrderStatus(placeOrderDto.getUserId(), OrderStatus.PENDING);
		Optional<User> existedUser = userRepository.findById(placeOrderDto.getUserId());
		
		if (existedUser.isPresent()) {
			activeOrder.setDescription(placeOrderDto.getDescription());
			activeOrder.setAddress(placeOrderDto.getAddress());
			activeOrder.setDate(new Date());
			activeOrder.setOrderStatus(OrderStatus.PLACED);
			activeOrder.setTrackingId(UUID.randomUUID());
			orderRepository.save(activeOrder);
			
			Order order = new Order();
			order.setAmount(0L);
			order.setTotalAmount(0L);
			order.setDiscount(0L);
			order.setUser(existedUser.get());
			order.setOrderStatus(OrderStatus.PENDING);
			orderRepository.save(order);
			return new ResponseEntity<>(activeOrder.getDto(), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}
}
