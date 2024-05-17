package com.web.entity;

import com.web.dto.WishlistDto;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "wishlist")
@Data
public class Wishlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	public WishlistDto getDto() {
		WishlistDto wishlistDto = new WishlistDto();
		wishlistDto.setUser_id(user.getId());
		wishlistDto.setProduct_id(product.getId());
		wishlistDto.setProduct_name(product.getName());
		wishlistDto.setPrice(product.getPrice());
		wishlistDto.setStoke(product.getStoke());
		wishlistDto.setImg(product.getImg1());
		return wishlistDto;
	}
}
