import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.css'
})
export class AdminAddProductComponent {

  constructor(private categoryService: CategoryService,
    private adminService: AdminService
  ) { }
  
  isOpen: boolean = false
  
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
