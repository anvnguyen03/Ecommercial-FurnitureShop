package com.web.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;

import com.web.dto.ProductDto;

public interface ProductService {
	ResponseEntity<?> addProduct(ProductDto productDto) throws IOException;
	ResponseEntity<?> getAllProducts();
	ResponseEntity<?> getNewsProducts();
	ResponseEntity<?> getAllProductsAvailable(int index);
	ResponseEntity<?> getAllProductsByName(String name, int index);
	ResponseEntity<?> getAllProductsByCategory(Long id, int index);
	ResponseEntity<?> getProductById(Long id);
	ResponseEntity<?> getRelatedProducts(Long id);
}
