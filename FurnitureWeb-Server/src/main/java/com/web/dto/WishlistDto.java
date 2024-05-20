package com.web.dto;

import lombok.Data;

@Data
public class WishlistDto {

	private long id;
	
	private long product_id;
	
	private String product_name;
	
	private long price;
	
	private long stoke;
	
	private byte[] img;

	private long user_id;
}
