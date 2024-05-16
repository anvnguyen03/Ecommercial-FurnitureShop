package com.web.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ReviewDto {
	private Long id;
	
	private String content;
	
	private MultipartFile img;
	
	private byte[] byteImg;
	
	private long user_id;
	
	private String username;
	
	private long product_id;
}
