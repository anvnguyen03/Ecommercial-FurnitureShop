import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-product',
  standalone: true,
  imports: [RouterLink, ShopHeaderComponent, ShopFooterComponent, CommonModule],
  templateUrl: './shop-product.component.html',
  styleUrl: './shop-product.component.css'
})
export class ShopProductComponent implements OnInit {

  constructor(private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  products: any[] = []
  totalResult?: any
  totalPage?: any
  currentPage?: any
  currentNumberOfElement?: any

  ngOnInit(): void {
    const currentUrl: UrlSegment[] = this.route.snapshot.url

    if (currentUrl.length == 1) { // shop - hiển thị tất cả product page 1
      this.getAllProducts(1)
    }
    else {
      if (currentUrl[1].path.split('=')[0] == 'term') { // shop/term= - hiển thị sản phẩm theo từ khóa tìm kiếm
        const term = currentUrl[1].path.split('=')[1]
        this.getAllProductByName(term, 1)
      }
      else if (currentUrl[1].path.split('=')[0] == 'category') {  // shop/category= - hiển thị sản phẩm theo category
        const categoryId = currentUrl[1].path.split('=')[1]
        this.getAllProductByCategory(categoryId, 1)
      }

    }
  }

  getAllProducts(page: any) {
    this.productService.getAllProductsAvailable(page).subscribe({
      next: (resp: any) => {
        resp.products.forEach((element: any) => {
          element.processedImg1 = 'data:img/jpeg;base64,' + element.img1
          element.processedImg2 = 'data:img/jpeg;base64,' + element.img2
          element.processedImg3 = 'data:img/jpeg;base64,' + element.img3
        });
        this.products = resp.products
        this.currentPage = resp.currentPage
        this.totalPage = resp.totalPage
        this.totalResult = resp.totalElement
        this.currentNumberOfElement = resp.currentNumberOfElement
      }
    })
  }

  getAllProductByName(term: any, page: any) {
    this.productService.getAllProductByName(term, page).subscribe({
      next: (resp: any) => {
        resp.products.forEach((element: any) => {
          element.processedImg1 = 'data:img/jpeg;base64,' + element.img1
          element.processedImg2 = 'data:img/jpeg;base64,' + element.img2
          element.processedImg3 = 'data:img/jpeg;base64,' + element.img3
        })
        this.products = resp.products
        this.currentPage = resp.currentPage
        this.totalPage = resp.totalPage
        this.totalResult = resp.totalElement
        this.currentNumberOfElement = resp.currentNumberOfElement
      }
    })
  }

  getAllProductByCategory(categoryId: any, page: any) {
    this.productService.getAllProductsByCategory(categoryId, page).subscribe({
      next: (resp: any) => {
        resp.products.forEach((element: any) => {
          element.processedImg1 = 'data:img/jpeg;base64,' + element.img1
          element.processedImg2 = 'data:img/jpeg;base64,' + element.img2
          element.processedImg3 = 'data:img/jpeg;base64,' + element.img3
        })
        this.products = resp.products
        this.currentPage = resp.currentPage
        this.totalPage = resp.totalPage
        this.totalResult = resp.totalElement
        this.currentNumberOfElement = resp.currentNumberOfElement
      }
    })
  }

  paging(page: any) {
    const currentUrl: UrlSegment[] = this.route.snapshot.url

    if (currentUrl.length == 1) {
      this.getAllProducts(page)
    }
    else {
      if (currentUrl[1].path.split('=')[0] == 'term') {
        const term = currentUrl[1].path.split('=')[1]
        this.getAllProductByName(term, page)
      }
      else if (currentUrl[1].path.split('=')[0] == 'category') {
        const categoryId = currentUrl[1].path.split('=')[1]
        this.getAllProductByCategory(categoryId, page)
      }

    }
  }

  nextPage(currentPage: any) {
    const currentUrl: UrlSegment[] = this.route.snapshot.url

    if (currentUrl.length == 1) {
      this.getAllProducts(currentPage+1)
    }
    else {
      if (currentUrl[1].path.split('=')[0] == 'term') { 
        const term = currentUrl[1].path.split('=')[1]
        this.getAllProductByName(term, currentPage+1)
      }
      else if (currentUrl[1].path.split('=')[0] == 'category') {
        const categoryId = currentUrl[1].path.split('=')[1]
        this.getAllProductByCategory(categoryId, currentPage+1)
      }

    }
  }

  backPage(currentPage: any) {
    const currentUrl: UrlSegment[] = this.route.snapshot.url

    if (currentUrl.length == 1) {
      this.getAllProducts(currentPage-1)
    }
    else {
      if (currentUrl[1].path.split('=')[0] == 'term') { 
        const term = currentUrl[1].path.split('=')[1]
        this.getAllProductByName(term, currentPage-1)
      }
      else if (currentUrl[1].path.split('=')[0] == 'category') {  
        const categoryId = currentUrl[1].path.split('=')[1]
        this.getAllProductByCategory(categoryId, currentPage-1)
      }

    }
  }

  sortingType?: string

  sortByNewness() {
    this.products.sort((a, b) => b.id - a.id)
    this.sortingType = 'Sort by newness'
  }

  sortByPriceAscending() {
    this.products.sort((a, b) => a.price - b.price)
    this.sortingType = 'Price: low to high'
  }

  sortByNewnessDescending() {
    this.products.sort((a, b) => b.price - a.price)
    this.sortingType = 'Price: high to low'
  }

  count(totalPage: any) {
    return Array.from({ length: totalPage }, (_, i) => i + 1) // (_, i) (value of element, index)
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
