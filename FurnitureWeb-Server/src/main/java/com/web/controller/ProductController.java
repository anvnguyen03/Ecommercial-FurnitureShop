package com.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

	private final ProductService productService;
	
	@GetMapping("/getnewest")
	public ResponseEntity<?> getNewestProducts(){
		return productService.getNewsProducts();
	}
	
	@GetMapping("/getall/{index}")
	public ResponseEntity<?> getAllProducts(@PathVariable int index){
		return productService.getAllProductsAvailable(index);
	}
	
	@GetMapping("/search/{name}/{index}")
	public ResponseEntity<?> getAllProductsByName(@PathVariable String name, @PathVariable int index){
		return productService.getAllProductsByName(name, index);
	}
	
	@GetMapping("/category/{id}/{index}")
	public ResponseEntity<?> getAllProductsByCategory(@PathVariable Long id, @PathVariable int index) {
		return productService.getAllProductsByCategory(id, index);
	}
	
	@GetMapping("/getone/{id}")
	public ResponseEntity<?> getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	
	@GetMapping("/related/{categoryid}")
	public ResponseEntity<?> get6ProductsByCategory(@PathVariable Long categoryid) {
		return productService.getRelatedProducts(categoryid);
	}
}
