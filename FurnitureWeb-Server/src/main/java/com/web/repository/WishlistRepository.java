package com.web.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.entity.Wishlist;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long>{

	Optional<Wishlist> findByUserIdAndProductId(long userId, long productId);
	Optional<List<Wishlist>> findByUserId(long userId);
}
