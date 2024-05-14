import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [RouterLink, CommonModule, DataTablesModule
  ],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css'
})
export class AdminOrderComponent implements OnInit {

  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  orders: any = []
  dtOptions: Config = {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    }
    this.getAllPlacedOrders()
  }

  getAllPlacedOrders() {
    this.adminService.getAllPlacedOrders().subscribe({
      next: (resp) => {
        this.orders = resp
      }
    })
  }

  chainOfAction(orderStatus: any): string {
    const listOrderStatus: string[] = ['PLACED', 'SHIPPING', 'DELIVERED']
    if (orderStatus == 'PLACED') {
      return 'SHIP'
    } else if (orderStatus == 'SHIPPING') {
      return 'DELIVERED'
    } else {
      return 'NONE'
    }
  }

  changeOrderStatus(order: any): any {
    if (order.orderStatus == 'DELIVERED') {
      return null;
    }
    
    this.adminService.changeOrderStatus(order.id).subscribe({
      next: (resp) => {
        this.snackBar.open('Action completed', 'Close', { duration: 2000 })
          .afterDismissed().subscribe(() => {
            this.router.navigate(['refreshing'], { skipLocationChange: true}).then(() => {
              this.router.navigate(['admin/order'])
            })
          })
      }
    })
  }
}