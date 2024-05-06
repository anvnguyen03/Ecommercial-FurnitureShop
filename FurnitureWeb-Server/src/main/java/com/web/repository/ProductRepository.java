package com.web.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.entity.Category;
import com.web.entity.Product;
import com.web.entity.ProductStatus;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findTop8ByOrderByIdDesc();
	List<Product> findTop6ByCategory(Category category);
	Page<Product> findAllByStatusAndNameContaining( ProductStatus status, String name, Pageable pageable);
	Page<Product> findByStatus(ProductStatus status, Pageable pageable);
	Page<Product> findByCategory(Category category,Pageable pageable);
	Optional<Product> findById(Long id);
}
