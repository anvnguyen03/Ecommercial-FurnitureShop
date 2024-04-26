package com.web.service;

import org.springframework.http.ResponseEntity;

import com.web.dto.CategoryDto;

public interface CategoryService {
	ResponseEntity<?> createCategory(CategoryDto categoryDto);
	ResponseEntity<?> getAllCategories();
}
