package com.web.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.ProductDto;
import com.web.entity.Category;
import com.web.entity.Product;
import com.web.repository.CategoryRepository;
import com.web.repository.ProductRepository;
import com.web.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	
	public ResponseEntity<?> addProduct(ProductDto productDto) throws IOException {
		Product product = new Product();
		product.setName(productDto.getName());
		product.setDescription(productDto.getDescription());
		product.setPrice(productDto.getPrice());
		product.setImg(productDto.getImg().getBytes());
		
		Category category = categoryRepository.findById(productDto.getCategoryId()).orElseThrow();
		product.setCategory(category);
		
		try {
			productRepository.save(product);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Add product failed. Error: "+e, HttpStatus.NOT_IMPLEMENTED);
		}
		
		return new ResponseEntity<>(product.getDto(), HttpStatus.CREATED);
		
	}
	
	public ResponseEntity<?> getAllProducts() {
		List<Product> products = productRepository.findAll();
		products.stream().map(Product::getDto).collect(Collectors.toList());
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
}
