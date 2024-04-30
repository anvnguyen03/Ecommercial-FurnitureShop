import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-revenue',
  standalone: true,
  imports: [RouterLink, AdminNavbarComponent, CommonModule],
  templateUrl: './admin-revenue.component.html',
  styleUrl: './admin-revenue.component.css'
})
export class AdminRevenueComponent {

}
