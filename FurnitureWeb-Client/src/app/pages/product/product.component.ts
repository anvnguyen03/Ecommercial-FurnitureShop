import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ShopHeaderComponent, ShopFooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
