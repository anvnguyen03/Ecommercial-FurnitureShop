package com.web.dto;

import lombok.Data;

@Data
public class CartItemsDto {
	private Long id;

	private Long price;

	private Long quantity;
	
	private Long productId;
	
	private String productName;
	
	private Long userId;
	
	private Long orderId;
	
	private byte[] img;
}
