import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './shop-header.component.html',
  styleUrl: './shop-header.component.css'
})
export class ShopHeaderComponent implements OnInit {

  username?: string
  isLoggedIn: boolean = false
  isAdmin: boolean = false
  categories: any[] = []

  searchForm!: FormGroup

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private cateService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const token = { token: this.authService.getToken() }
    this.authService.validateToken(token).subscribe({
      next: (response) => {
        this.isLoggedIn = response
        this.username = this.authService.getUsername()
        this.isAdmin = this.authService.getUserRole() == "ADMIN" ? true : false
      }
    })

    this.searchForm = this.fb.group({
      term: [null, [Validators.required]]
    })

    this.getAllCategories()

    this.offCanvasFunctionCart()
    this.offSearchModalFunction()
  }

  search() {
    const term = this.searchForm.get('term')?.value
    if (!term) {
      return;
    }
    this.router.navigateByUrl('/refreshing', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/shop/term=${term}`])
    })
  }

  searchByCategory(id: any) {
    this.router.navigateByUrl('/refreshing', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/shop/category=${id}`])
    })
  }

  getAllCategories() {
    this.cateService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response
      }
    })
  }

  offCanvasFunctionCart() {
    const offCanvasToggle = this.elementRef.nativeElement.querySelector('.offcanvas-toggle');
    const offCanvas = this.elementRef.nativeElement.querySelector('.offcanvas');
    const offCanvasOverlay = this.elementRef.nativeElement.querySelector('.offcanvas-overlay');
    const mobileMenuToggle = this.elementRef.nativeElement.querySelector('.mobile-menu-toggle');

    offCanvasToggle.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target = offCanvasToggle.getAttribute('href');
      document.body.classList.add('offcanvas-open');
      offCanvas.classList.add('offcanvas-open');
      this.renderer.setStyle(offCanvasOverlay, 'display', 'block');
      if (offCanvasToggle.parentElement.classList.contains('mobile-menu-toggle')) {
        offCanvasToggle.classList.add('close');
      }
    });

    const offCanvasClose = this.elementRef.nativeElement.querySelector('.offcanvas-close');
    offCanvasClose.addEventListener('click', (e: Event) => {
      e.preventDefault();
      document.body.classList.remove('offcanvas-open');
      offCanvas.classList.remove('offcanvas-open');
      this.renderer.setStyle(offCanvasOverlay, 'display', 'none');
      mobileMenuToggle.querySelector('a').classList.remove('close');
    });

    offCanvasOverlay.addEventListener('click', (e: Event) => {
      e.preventDefault();
      document.body.classList.remove('offcanvas-open');
      offCanvas.classList.remove('offcanvas-open');
      this.renderer.setStyle(offCanvasOverlay, 'display', 'none');
      mobileMenuToggle.querySelector('a').classList.remove('close');
    });
  }

  offSearchModalFunction() {
    const searchLink = this.elementRef.nativeElement.querySelector('a[href="#search"]');
    const searchContainer = this.elementRef.nativeElement.querySelector('#search');
    const searchInput = this.elementRef.nativeElement.querySelector('#search > form > input[type="search"]');
    const closeButton = this.elementRef.nativeElement.querySelector('#search button.close');

    searchLink.addEventListener('click', (event: Event) => {
      event.preventDefault();
      searchContainer.classList.add('open');
      searchInput.focus();
    });

    searchContainer.addEventListener('click', (event: Event) => {
      if ((event.target as HTMLElement).classList.contains('close')) {
        searchContainer.classList.remove('open');
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const stickyHeader = this.elementRef.nativeElement.querySelector('.sticky-header');
    if (stickyHeader) {
      if (scroll < 100) {
        stickyHeader.classList.remove('sticky');
      } else {
        stickyHeader.classList.add('sticky');
      }
    }

    const separateStickyBar = this.elementRef.nativeElement.querySelector('.separate-sticky-bar');
    if (separateStickyBar) {
      if (scroll < 100) {
        separateStickyBar.classList.remove('sticky');
      } else {
        separateStickyBar.classList.add('sticky');
      }
    }
  }
}
