import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../../services/product.service';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [RouterLink, CommonModule, DataTablesModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent {

  products: any[] = []

  dtOptions: Config = {}

  constructor(private authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.productService.getAllProduct().subscribe({
      next: (response: any) => {
        response.forEach((element: any) => {
          element.processedImg1 = 'data:image/jpeg;base64,' + element.img1
          element.processedImg2 = 'data:image/jpeg;base64,' + element.img2
          element.processedImg3 = 'data:image/jpeg;base64,' + element.img3
          this.products.push(element)
        });
      }
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      
    }

  }

  isOpen: boolean = false

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
