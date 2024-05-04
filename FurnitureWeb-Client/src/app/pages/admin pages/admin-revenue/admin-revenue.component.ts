import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-revenue',
  standalone: true,
  imports: [RouterLink, CommonModule, AdminNavbarComponent],
  templateUrl: './admin-revenue.component.html',
  styleUrl: './admin-revenue.component.css'
})
export class AdminRevenueComponent {

  constructor() {}
  
  isOpen: boolean = false
  
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
