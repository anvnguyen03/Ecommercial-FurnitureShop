import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopHeaderComponent } from './pages/shop-header/shop-header.component';
import { ShopFooterComponent } from './pages/shop-footer/shop-footer.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShopHeaderComponent, ShopFooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FurnitureWeb-Client';
}
