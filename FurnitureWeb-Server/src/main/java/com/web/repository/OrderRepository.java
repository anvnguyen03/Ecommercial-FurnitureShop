package com.web.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.entity.Order;
import com.web.entity.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);
	List<Order> findAllByOrderStatusIn(List<OrderStatus> orderStatusList);
	List<Order> findAllByUserIdAndOrderStatusIn(long userId, List<OrderStatus> orderStatusList);
	List<Order> findByDateBetweenAndOrderStatus(Date startOfMonth, Date endOfMonth, OrderStatus orderStatus);
	long countByOrderStatus(OrderStatus status);
}
