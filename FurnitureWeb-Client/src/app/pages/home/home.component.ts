import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    // Initialize AOS library
    AOS.init()
    // this.heroSlider()
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
