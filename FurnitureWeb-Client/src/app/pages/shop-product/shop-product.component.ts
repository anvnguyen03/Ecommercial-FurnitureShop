import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';

@Component({
  selector: 'app-shop-product',
  standalone: true,
  imports: [RouterLink, ShopHeaderComponent, ShopFooterComponent],
  templateUrl: './shop-product.component.html',
  styleUrl: './shop-product.component.css'
})
export class ShopProductComponent {
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
