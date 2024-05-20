package com.web.dto;

import org.springframework.web.multipart.MultipartFile;

import com.web.entity.ProductStatus;

import lombok.Data;

@Data
public class ProductDto {
	private long id;

	private String name;

	private String description;

	private Long price;
	
	private long stoke;
	
	private ProductStatus status;

	private byte[] byteImg1;
	
	private byte[] byteImg2;
	
	private byte[] byteImg3;

	private Long categoryId;
	
	private String categoryName;
	
	private MultipartFile img1;
	
	private MultipartFile img2;
	
	private MultipartFile img3;
}
