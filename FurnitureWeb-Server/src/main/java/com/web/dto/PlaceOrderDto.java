package com.web.dto;

import lombok.Data;

@Data
public class PlaceOrderDto {
	private long userId;
	
	private String address;
	
	private String description;
}
