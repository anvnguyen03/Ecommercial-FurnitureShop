import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-coupon',
  standalone: true,
  imports: [RouterLink, CommonModule, DataTablesModule,
    ReactiveFormsModule],
  templateUrl: './admin-coupon.component.html',
  styleUrl: './admin-coupon.component.css'
})
export class AdminCouponComponent {

  dtOptions: Config = {}
  addCouponForm!: FormGroup

  constructor(private authService: AuthService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  coupons: any[] = []
  isOpenAddCoupon!: boolean

  ngOnInit(): void {

    this.isOpenAddCoupon = false

    this.dtOptions = {
      pagingType: 'full_numbers',
    }

    this.addCouponForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required])
    })

    this.getAllCoupons()

  }

  getAllCoupons() {
    this.adminService.getAllCoupons().subscribe({
      next: (resp) => {
        this.coupons = resp
      }
    })
  }

  addCoupon() {
    if (this.addCouponForm.valid) {
      this.adminService.addCoupon(this.addCouponForm.value).subscribe({
        next: (resp) => {
          this.toggleAddCoupon()
          this.addCouponForm.reset()
          this.snackBar.open('Đã tạo thành thành một một mã giảm giá mới!', 'Đóng', { duration: 3000 })
          this.router.navigate(['/admin/coupon'])
        },
        error: (err) => {
          this.snackBar.open('Mã giảm giá đã tồn tại!', 'Đóng', { duration: 3000 })
        }
      })
    } else {
      this.snackBar.open('Bạn chưa điền đầy đủ thông tin!', 'Đóng', { duration: 2000 })
    }
  }

  toggleAddCoupon() {
    this.isOpenAddCoupon = !this.isOpenAddCoupon
  }

}
