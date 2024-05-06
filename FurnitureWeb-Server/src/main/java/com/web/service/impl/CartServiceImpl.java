package com.web.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.AddProductInCartDto;
import com.web.dto.CartItemsDto;
import com.web.dto.OrderDto;
import com.web.entity.CartItems;
import com.web.entity.Order;
import com.web.entity.OrderStatus;
import com.web.entity.Product;
import com.web.entity.User;
import com.web.repository.CartItemsRepository;
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
				CartItems cart = new CartItems();
				cart.setProduct(product.get());
				cart.setPrice(product.get().getPrice());
				cart.setQuantity(addProductInCartDto.getQuantity());
				cart.setUser(user.get());
				cart.setOrder(activeOrder);
				
				CartItems updatedCart = cartItemsRepository.save(cart);
				
				activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cart.getPrice()*cart.getQuantity());
				activeOrder.setAmount(activeOrder.getAmount() + cart.getPrice()*cart.getQuantity());
				activeOrder.getCartItems().add(cart);
				
				orderRepository.save(activeOrder);
				
				return new ResponseEntity<>(cart, HttpStatus.CREATED);
				
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
		
		return new ResponseEntity<>(orderDto, HttpStatus.OK);
	}
	
}
