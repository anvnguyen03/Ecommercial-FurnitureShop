import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule, RouterLink, ShopHeaderComponent, ShopFooterComponent],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit{

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  order!: any

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() {
    const orderId = this.route.snapshot.url[1].path
    this.userService.getOrder(orderId).subscribe({
      next: (resp) => {
        resp.cartItems.forEach((item: any) => {
          item.processedImg = 'data:image/jpeg;base64,' + item.img
        });
        this.order = resp
      }
    })
  }

  review(userId: any, productId: any, productName: any) {
    this.dialog.open(ReviewDialogComponent, {
      data: {
        userId: userId, 
        productId: productId, 
        productName: productName}
    })
  }

}
