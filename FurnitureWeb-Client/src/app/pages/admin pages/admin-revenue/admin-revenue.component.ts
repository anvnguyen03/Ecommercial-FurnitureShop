import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-revenue',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-revenue.component.html',
  styleUrl: './admin-revenue.component.css'
})
export class AdminRevenueComponent implements OnInit{

  constructor(private adminService: AdminService) {}
 
  analytics!: any
  currentDate!: any
  percentageOfOrderChange!: number
  percentageOfProfitChange!: number

  ngOnInit(): void {
    this.getOrderAnalytics()
    this.currentDate = new Date()
  }

  getOrderAnalytics() {
    this.adminService.getOrderAnalytics().subscribe({
      next: (resp) => {
        this.analytics = resp
        this.calOrderChange(this.analytics.currentMonthOrders, this.analytics.previousMonthOrders)
        this.calProfitChange(this.analytics.currentMonthProfit, this.analytics.previousMonthProfit)
      }
    })
  }

  calOrderChange(currentMonthOrders: number, previousMonthOrders: number) {
    if (previousMonthOrders == 0) {
      this.percentageOfOrderChange = 100
      return
    }
    const change: number = currentMonthOrders - previousMonthOrders
    this.percentageOfOrderChange = (change / previousMonthOrders) * 100
  }

  calProfitChange(currentMonthProfit: number, previousMonthProfit: number) {
    if (previousMonthProfit == 0) {
      this.percentageOfProfitChange = 100
      return
    }
    const change: number = currentMonthProfit - previousMonthProfit
    this.percentageOfProfitChange = (change / previousMonthProfit) * 100
  }
}
