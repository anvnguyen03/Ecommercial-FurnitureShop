import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [RouterLink, CommonModule, DataTablesModule,
    ReactiveFormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  dtOptions: Config = {}
  addCategoryForm!: FormGroup

  constructor(private authService: AuthService,
    private adminService: AdminService,
    private cateService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  categories: any[] = []
  isOpenAddCatetory!: boolean

  ngOnInit(): void {

    this.isOpenAddCatetory = false

    this.dtOptions = {
      pagingType: 'full_numbers',
    }

    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })

    this.getAllCategories()

  }

  getAllCategories() {
    this.cateService.getAllCategories().subscribe({
      next: (resp) => {
        this.categories = resp
      }
    })
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      this.adminService.addCategory(this.addCategoryForm.value).subscribe({
        next: (resp) => {
          this.toggleAddCategory()
          this.addCategoryForm.reset()
          this.snackBar.open('Đã thêm danh mục mới!', 'Đóng', { duration: 3000 })
          this.router.navigate(['/admin/category'])
        },
        error: (err) => {
          this.snackBar.open('Danh mục đã tồn tại!', 'Đóng', { duration: 3000 })
        }
      })
    } else {
      this.snackBar.open('Bạn chưa điền đầy đủ thông tin!', 'Đóng', { duration: 2000 })
    }
  }

  toggleAddCategory() {
    this.isOpenAddCatetory = !this.isOpenAddCatetory
  }
}
