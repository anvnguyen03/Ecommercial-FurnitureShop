package com.web.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductDto {
	private long id;

	private String name;

	private String description;

	private Long price;

	private byte[] byteImg;

	private Long categoryId;
	
	private MultipartFile img;
}
