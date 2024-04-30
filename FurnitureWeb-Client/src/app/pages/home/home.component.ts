import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import Swiper from 'swiper';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

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
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (response: any) => {
        response.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.img
          this.products.push(element)
        });
      }
    })
  }

  ngAfterViewInit(): void {
    // Initialize AOS library
    AOS.init({
      once: true
    });
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
}
