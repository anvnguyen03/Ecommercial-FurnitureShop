package com.web.entity;

import com.web.dto.ReviewDto;

import jakarta.persistence.Column;
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
@Table(name = "review")
@Data
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	@Column(columnDefinition = "mediumblob")
	private byte[] img;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
	
	public ReviewDto getDto() {
		ReviewDto reviewDto = new ReviewDto();
		reviewDto.setId(id);
		reviewDto.setContent(content);
		reviewDto.setByteImg(img);
		reviewDto.setUser_id(user.getId());
		reviewDto.setUsername(user.getFullname());
		reviewDto.setProduct_id(product.getId());
		
		return reviewDto;
	}
}
