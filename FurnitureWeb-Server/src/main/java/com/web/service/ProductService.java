package com.web.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;

import com.web.dto.ProductDto;

public interface ProductService {
	ResponseEntity<?> addProduct(ProductDto productDto) throws IOException;
	ResponseEntity<?> getAllProducts();
}
