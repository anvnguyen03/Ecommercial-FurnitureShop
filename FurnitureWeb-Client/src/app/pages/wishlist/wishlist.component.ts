import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, ShopHeaderComponent, ShopFooterComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  wishlist: any[] = []
  constructor(private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist() {
    this.userService.getWishlist().subscribe({
      next: (resp) => {
        resp.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.img
        });
        this.wishlist = resp
      }
    })
  }

  deleteProductInWishlist(productId: any) {
    this.userService.deleteProductInWishlist(productId).subscribe({
      next: () => {
        this.snackBar.open('Đã xóa thành công', 'Đóng', { duration: 2000 }).afterDismissed().subscribe(() => {
          this.refresh()
        })
      }
    })
  }

  refresh() {
    this.router.navigate(['/refreshing'], { skipLocationChange: true}).then(() => {
      this.router.navigate(['/wishlist'])
    })
  }

  addToCart(productId: any) {
    if (this.authService.getUser()) {
      // add to cart from home, quantity = 1 by default
      this.userService.addToCart(productId, 1).subscribe({
        next: (resp) => {
          this.snackBar.open('Đã thêm thành công sản phẩm vào giỏ hàng.', 'Đóng', { duration: 3000 })
        },
        error: (err) => {
          this.snackBar.open('Sản phẩm đã tồn tại trong giỏ hàng.', 'Đóng', { duration: 3000})
        }
      })
    } else {
      this.snackBar.open('Vui lòng đăng nhập để thực hiện chức năng này.', 'Đóng', { duration: 5000 })
    }
  }
}
