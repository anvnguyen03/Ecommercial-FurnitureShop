package com.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnalyticsResponse {
	private long placed;
	
	private long shipping;
	
	private long delivered;
	
	private long currentMonthOrders;
	
	private long previousMonthOrders;
	
	private long currentMonthProfit;
	
	private long previousMonthProfit;
}
