import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ShopFooterComponent } from '../shop-footer/shop-footer.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterLink, ShopHeaderComponent, ShopFooterComponent, ReactiveFormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{

  constructor(private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}
  
  isTabAccount: boolean = true
  isTabOrder: boolean = false

  formAccountDetails!: FormGroup
  fullname!: any
  email!: any

  orders: any[] = []

  ngOnInit(): void {
    this.getAccountDetails()
    this.getMyOrders()
  }

  getAccountDetails() {
    this.fullname = this.authService.getUserFullName()
    this.email = this.authService.getUserEmail()
    this.formAccountDetails = this.fb.group({
      fullname: [this.fullname, [Validators.required]],
      email: [this.email, [Validators.email, Validators.required]]
    })
  }

  getMyOrders() {
    this.userService.getMyOrders().subscribe({
      next: (resp) => {
        this.orders = resp
      }
    })
  }

  changeAccountDetails() {

  }

  changeTab(index: any) {
    if (index == 0) {
      this.isTabAccount = true
      this.isTabOrder = false
    } else {
      this.isTabOrder = true
      this.isTabAccount = false
    }
  }
}
