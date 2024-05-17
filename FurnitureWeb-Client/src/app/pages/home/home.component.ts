import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { authGuard } from '../../guards/auth.guard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ShopHeaderComponent, ShopFooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {

  products: any[] = []

  constructor(private authService: AuthService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productService.getNewestProducts().subscribe({
      next: (response: any) => {
        response.forEach((element: any) => {
          element.processedImg1 = 'data:image/jpeg;base64,' + element.img1
          element.processedImg2 = 'data:image/jpeg;base64,' + element.img2
          element.processedImg3 = 'data:image/jpeg;base64,' + element.img3
          this.products.push(element)
        });
      }
    })
  }

  ngAfterViewInit(): void {

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

  heroSlider() {
    const heroSlider = new Swiper('.hero-slider-active.swiper-container', {
      slidesPerView: 1,
      effect: "fade",
      speed: 1500,
      watchSlidesProgress: true,
      loop: true,
      autoplay: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  addToWishlist(productId: any) {
    this.userService.addProductToWishlist(productId).subscribe({
      next: (resp) => {
        this.snackBar.open('Đã thêm sản phẩm vào Wishlist', 'Đóng', { duration: 3000 })
      },
      error: () => {
        this.snackBar.open('Sản phẩm đã nằm trong wishlist', 'Đóng', { duration: 3000 })
      }
    })
  }
}
