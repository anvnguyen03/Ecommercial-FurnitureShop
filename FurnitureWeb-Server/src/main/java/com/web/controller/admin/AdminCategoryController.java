package com.web.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.CategoryDto;
import com.web.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminCategoryController {

	private final CategoryService categoryService;
	
	@PostMapping("/category")
	public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto) {
		return categoryService.createCategory(categoryDto);
	}
}
