import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule,
    ShopHeaderComponent, ShopFooterComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  cartItems: any[] = []
  order: any

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this.cartItems = []
    this.userService.getCartByUserId().subscribe({
      next: (resp) => {
        this.order = resp
        resp.cartItems.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.img
        });
        this.cartItems = resp.cartItems
        console.log(resp)
      }
    })
  }
}
