package com.web.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
	Optional<Review> findByUserIdAndProductId(long userId, long productId);
	List<Review> findByProductId(long productId);
}
