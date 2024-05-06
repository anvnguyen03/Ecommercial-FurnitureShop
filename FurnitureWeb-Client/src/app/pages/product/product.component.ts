import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import Swiper from 'swiper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ShopHeaderComponent, ShopFooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  product: any = null
  relatedProducts: any[] = []
  addToCartForm: FormGroup = new FormGroup({
    quantity: new FormControl(1, [Validators.min(1)])
  })

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    const currentUrl: UrlSegment[] = this.route.snapshot.url
    const productId = currentUrl[1].path

    this.productService.getProductById(productId).subscribe({
      next: (resp: any) => {
        resp.proccessedImg1 = 'data:image/jpeg;base64,' + resp.img1
        resp.proccessedImg2 = 'data:image/jpeg;base64,' + resp.img2
        resp.proccessedImg3 = 'data:image/jpeg;base64,' + resp.img3
        this.product = resp
        this.getRelatedProduct(this.product.categoryId)
      }
    })
  }

  getRelatedProduct(categoryId: any) {
    this.productService.getRelatedProductByCategory(categoryId).subscribe({
      next: (resp: any) => {
        resp.forEach((element: any) => {
          element.proccessedImg1 = 'data:image/jpeg;base64,' + element.img1
          element.proccessedImg2 = 'data:image/jpeg;base64,' + element.img2
          element.proccessedImg3 = 'data:image/jpeg;base64,' + element.img3
        })
        this.relatedProducts = resp
      }
    })
  }

  ngAfterViewInit(): void {

    // Khởi tạo Swiper cho thumbnail images
    const galleryThumbsHorizontal = new Swiper('.product-image-thumb-horizontal.swiper-container', {
      loop: true,
      speed: 1000,
      spaceBetween: 25,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Khởi tạo Swiper cho large images
    const galleryLargeHorizontal = new Swiper('.product-large-image-horaizontal.swiper-container', {
      slidesPerView: 1,
      speed: 1500,
      thumbs: {
        swiper: galleryThumbsHorizontal,
      },
    });

    const productSlider4grid1row = new Swiper('.product-default-slider-4grid-1row.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 1500,

      navigation: {
        nextEl: '.product-slider-default-1row .swiper-button-next',
        prevEl: '.product-slider-default-1row .swiper-button-prev',
      },

      breakpoints: {

        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        }
      }
    })

  }

  // hàm add khi thêm từ trong trang chi tiết sản phẩm
  addToCart(productId: any) {
    var quantity = this.addToCartForm.get('quantity')?.value
    if (quantity > this.product.stoke) {
      quantity = this.product.stoke
    }

    this.userService.addToCart(productId, quantity).subscribe({
      next: (resp) => {
        this.router.navigate(['/cart'])
        this.snackBar.open('Đã thêm sản phẩm vào giỏ.', 'Đóng', { duration: 3000 })
      },
      error: (err) => {
        this.snackBar.open('Sản phẩm đã tồn tại trong giỏ hàng.', 'Đóng', { duration: 3000 })
      }
    })
  }

  // hàm add to cart khi ấn add trực tiếp từ thumbnail của sản phẩm
  addToCartByDefault(productId: any) {
    this.userService.addToCart(productId, 1).subscribe({
      next: (resp) => {
        this.router.navigate(['/cart'])
        this.snackBar.open('Đã thêm sản phẩm vào giỏ.', 'Đóng', { duration: 3000 })
      },
      error: (err) => {
        this.snackBar.open('Sản phẩm đã tồn tại trong giỏ hàng.', 'Đóng', { duration: 3000 })
      }
    })
  }

  descriptionTab: boolean = true
  commentTab: boolean = false

  moveTab(index: any) {
    if (index == 1) {
      this.descriptionTab = true
      this.commentTab = false
    } else if (index == 2) {
      this.commentTab = true
      this.descriptionTab = false
    }
  }

  navigate(id: any) {
    this.router.navigateByUrl('/refreshing', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/product/${id}`])
    })
  }
}
