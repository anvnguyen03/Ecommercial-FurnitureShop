package com.web.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.ProductDto;
import com.web.dto.ProductPagingReponse;
import com.web.entity.Category;
import com.web.entity.Product;
import com.web.entity.ProductStatus;
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
		product.setStoke(productDto.getStoke());
		product.setStatus(ProductStatus.AVAILABLE);
		product.setImg1(productDto.getImg1().getBytes());
		product.setImg2(productDto.getImg2().getBytes());
		product.setImg3(productDto.getImg3().getBytes());
		
		Category category = categoryRepository.findById(productDto.getCategoryId()).orElseThrow();
		product.setCategory(category);
		
		try {
			productRepository.save(product);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Add product failed. Error: "+e, HttpStatus.NOT_IMPLEMENTED);
		}
		
		return new ResponseEntity<>(product, HttpStatus.CREATED);
		
	}
	
	public ResponseEntity<?> getAllProducts() {
		List<Product> products = productRepository.findAll();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getNewsProducts() {
		List<Product> products = productRepository.findTop8ByOrderByIdDesc();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getAllProductsAvailable(int index) {
		Pageable pageable = PageRequest.of(index - 1, 6);	// page number starts with 0 but index in front-end starts with 1
		Page<Product> products = productRepository.findByStatus(ProductStatus.AVAILABLE, pageable);
		
		ProductPagingReponse resp = new ProductPagingReponse();
		resp.setProducts(products.getContent());
		resp.setCurrentNumberOfElement(products.getNumberOfElements());
		resp.setCurrentPage(index);
		resp.setTotalElement(products.getTotalElements());
		resp.setTotalPage(products.getTotalPages());
		
		return new ResponseEntity<>(resp, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getAllProductsByName(String name, int index) {
		Pageable pageable = PageRequest.of(index - 1, 6);
		Page<Product> products = productRepository.findAllByStatusAndNameContaining(ProductStatus.AVAILABLE, name, pageable);
		
		ProductPagingReponse resp = new ProductPagingReponse();
		resp.setProducts(products.getContent());
		resp.setCurrentNumberOfElement(products.getNumberOfElements());
		resp.setCurrentPage(index);
		resp.setTotalElement(products.getTotalElements());
		resp.setTotalPage(products.getTotalPages());
		
		return new ResponseEntity<>(resp, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getAllProductsByCategory(Long id, int index) {
		Pageable pageable = PageRequest.of(index - 1, 6);
		Category category = categoryRepository.findById(id).orElseThrow();
		Page<Product> products = productRepository.findByCategory(category, pageable);
		
		ProductPagingReponse resp = new ProductPagingReponse();
		resp.setProducts(products.getContent());
		resp.setCurrentNumberOfElement(products.getNumberOfElements());
		resp.setCurrentPage(index);
		resp.setTotalElement(products.getTotalElements());
		resp.setTotalPage(products.getTotalPages());
		
		return new ResponseEntity<>(resp, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getRelatedProducts(Long id) {
		Category category = categoryRepository.findById(id).orElseThrow();
		List<Product> products = productRepository.findTop6ByCategory(category);
		
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getProductById(Long id) {
		Product product = productRepository.findById(id).orElseThrow();
		return new ResponseEntity<>(product, HttpStatus.OK);
	}
}
