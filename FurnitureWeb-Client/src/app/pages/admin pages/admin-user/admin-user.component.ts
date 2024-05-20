import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [RouterLink, CommonModule, DataTablesModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  users: any[] = []

  dtOptions: Config = {}

  constructor(private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllUserExceptAdmin()
    this.dtOptions = {
      pagingType: 'full_numbers',

    }
  }

  getAllUserExceptAdmin() {
    this.adminService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response
      }
    })
  }

  changeStatus(userId: any) {
    this.adminService.changeUserStatus(userId).subscribe({
      next: (resp) => {
        this.router.navigate(['/refreshing'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/user'])
        })
      }
    })
  }
}
