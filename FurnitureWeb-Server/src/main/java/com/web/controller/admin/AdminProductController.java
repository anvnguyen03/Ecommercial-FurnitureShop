package com.web.controller.admin;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.ProductDto;
import com.web.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminProductController {
	
	private final ProductService productService;
	
	@PostMapping("/product")
	public ResponseEntity<?> addProduct(@ModelAttribute ProductDto productDto) throws IOException {
		return productService.addProduct(productDto);
	}
	
	@GetMapping("/product")
	public ResponseEntity<?> getAllProducts() {
		return productService.getAllProducts();
	}

}
