package com.web.entity;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.web.dto.OrderDto;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String Description;
	
	private Date date;
	
	private Long amount;
	
	private String address;
	
	private String payment;
	
	private OrderStatus orderStatus;
	
	private Long totalAmount;
	
	private Long discount;
	
	private UUID trackingId;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "coupon_id")
	private Coupon coupon;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
	private List<CartItems> cartItems;
	
	public OrderDto getDto() {
		OrderDto orderDto = new OrderDto();
		orderDto.setId(id);
		orderDto.setDescription(Description);
		orderDto.setDate(date);
		orderDto.setAmount(amount);
		orderDto.setTotalAmount(totalAmount);
		orderDto.setAddress(address);
		orderDto.setDescription(Description);
		orderDto.setDiscount(discount);
		orderDto.setTrackingId(trackingId);
		orderDto.setOrderStatus(orderStatus);
		orderDto.setUserName(user.getFullname());
		if (coupon != null) {
			orderDto.setCouponName(coupon.getName());
		}
		return orderDto;
	}
	
	public void updateOrderAmount() {
		
		long amount = 0;
		for (CartItems item: this.cartItems) {
			amount += item.getPrice()*item.getQuantity();
		}
		this.setAmount(amount);
		
		double discountAmount = 0;
		if (this.getCoupon() != null) {
			discountAmount = this.getAmount()*(this.getCoupon().getDiscount()/100.0);
		} 
		
		this.setDiscount((long)discountAmount);
		this.setTotalAmount(this.getAmount() - (long)discountAmount);
	}
	
	public void applyCoupon(Coupon coupon) {
		double discountAmount = ((coupon.getDiscount() / 100.0) * this.getAmount());
		double totalAmount = this.getTotalAmount() - discountAmount;
		
		this.setTotalAmount((long)totalAmount);
		this.setDiscount((long)discountAmount);
	}
	
}
