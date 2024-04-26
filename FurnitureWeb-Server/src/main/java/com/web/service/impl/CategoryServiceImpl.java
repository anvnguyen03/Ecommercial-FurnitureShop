package com.web.service.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.dto.CategoryDto;
import com.web.entity.Category;
import com.web.repository.CategoryRepository;
import com.web.service.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

	private final CategoryRepository categoryRepository;
	
	public ResponseEntity<?> createCategory(CategoryDto categoryDto) {
		Category category = new Category();
		category.setName(categoryDto.getName());
		category.setDescription(categoryDto.getDescription());
		
		try {
			categoryRepository.save(category);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Create category failed. Error:" + e, HttpStatus.NOT_IMPLEMENTED);
		}
		
		return new ResponseEntity<>(category, HttpStatus.CREATED);
	}
	
	public ResponseEntity<?> getAllCategories() {
		List<Category> categories = categoryRepository.findAll();
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}
}
