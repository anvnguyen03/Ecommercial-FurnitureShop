package com.web.dto;

import java.util.List;

import com.web.entity.Product;

import lombok.Data;

@Data
public class ProductPagingReponse {
	List<Product> products;
	int currentPage;
	int totalPage;
	int currentNumberOfElement;
	long totalElement;
}
