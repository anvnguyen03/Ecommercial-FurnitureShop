import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
export class CartComponent implements OnInit {

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  cartItems: any[] = []
  order: any
  couponForm!: FormGroup

  ngOnInit(): void {
    this.getCart()

    this.couponForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    })
  }

  applyCoupon() {
    const code = this.couponForm?.get('code')?.value
    this.userService.applyCoupon(code).subscribe({
      next: (resp) => {
        this.order = resp
        this.snackBar.open('Áp dụng mã giảm giá thành công!', 'Đóng', { duration: 3000 })
        this.router.navigateByUrl('/refreshing', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart'])
        })
      },
      error: (err) => {
        this.snackBar.open('Mã không hợp lệ, vui lòng nhập mã khác', 'Đóng', { duration: 3000 })
      }
    })
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
      }
    })
  }

  change(event: Event, itemId: any) {
    const quantity = (event.target as HTMLInputElement).value
    this.userService.updateCart(itemId, quantity).subscribe({
      next: (resp) => {
        this.getCart()
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open(err.error, 'Đóng', { duration: 3000 })
      }
    })
  }

  deleteItem(itemId: any) {
    this.userService.deleteItem(itemId).subscribe({
      next: () => {
        this.snackBar.open('Item removed', 'Đóng', { duration: 3000 })
        this.getCart()
      }
    })
  }

}
