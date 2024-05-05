import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-product',
  standalone: true,
  imports: [RouterLink, ShopHeaderComponent, ShopFooterComponent, CommonModule],
  templateUrl: './shop-product.component.html',
  styleUrl: './shop-product.component.css'
})
export class ShopProductComponent implements OnInit{

  constructor(private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  products: any[] = []

  ngOnInit(): void {
    // this.products = this.productService.searchedProducts
    const currentUrl: UrlSegment[] = this.route.snapshot.url
    
    if (currentUrl.length == 1) { // shop - hiển thị tất cả product
      this.getAllProducts()
    } 
    else { 
      if (currentUrl[1].path.split('=')[0] == 'term') { // shop/term= - hiển thị sản phẩm theo từ khóa tìm kiếm
        const term = currentUrl[1].path.split('=')[1]
        console.log(term)
        this.productService.getAllProductByName(term).subscribe({
          next: (resp: any) => {
            resp.forEach((element: any) => {
              element.processedImg1 = 'data:img/jpeg;base64,' + element.img1
              element.processedImg2 = 'data:img/jpeg;base64,' + element.img2
              element.processedImg3 = 'data:img/jpeg;base64,' + element.img3
            })
            this.products = resp
          }
        })
      }

    }
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe({
      next: (resp: any) => {
        resp.forEach((element: any) => {
          element.processedImg1 = 'data:img/jpeg;base64,' + element.img1
          element.processedImg2 = 'data:img/jpeg;base64,' + element.img2
          element.processedImg3 = 'data:img/jpeg;base64,' + element.img3
          this.products.push(element)
        });
      }
    })
  }

}
