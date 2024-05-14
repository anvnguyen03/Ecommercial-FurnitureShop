import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.css'
})
export class AdminAddProductComponent implements OnInit {

  categories: any = [];

  selectedFile1: File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;
  imagePreview1: string | null = null;
  imagePreview2: string | null = null;
  imagePreview3: string | null = null;

  constructor(private categoryService: CategoryService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) { }

  addProductForm!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories()

    this.addProductForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      stoke: [null, [Validators.required]]
    })
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (resp) => {
        this.categories = resp
      }
    })
  }

  addProduct() {
    if (this.addProductForm.valid) {
      const product: FormData = new FormData()
      product.append('img1', this.selectedFile1!)
      product.append('img2', this.selectedFile2!)
      product.append('img3', this.selectedFile3!)
      product.append('name', this.addProductForm.get('name')?.value)
      product.append('description', this.addProductForm.get('description')?.value)
      product.append('price', this.addProductForm.get('price')?.value)
      product.append('stoke', this.addProductForm.get('stoke')?.value)
      product.append('categoryId', this.addProductForm.get('categoryId')?.value)

      this.adminService.addProduct(product).subscribe({
        next: (resp) => {
          if (resp.id) {
            this.snackBar.open('Product created successfully!', 'Close', {duration: 5000})
            this.router.navigate(['/admin/product'])
          } else {
            this.snackBar.open('ERROR: ' + resp.body, 'Close', {duration: 5000})
          }
        }
      })
    } else {
      for (let i in this.addProductForm.controls) {
        this.addProductForm.controls[i].markAsDirty()
        this.addProductForm.controls[i].updateValueAndValidity()
      }
    }
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0]
    if (file) {
      if (index == 1) {
        this.selectedFile1 = file
        this.imagePreview1 = URL.createObjectURL(file)
      } else if (index == 2) {
        this.selectedFile2 = file
        this.imagePreview2 = URL.createObjectURL(file)
      } else if (index == 3) {
        this.selectedFile3 = file
        this.imagePreview3 = URL.createObjectURL(file)
      }
    } else {
      if (index == 1) {
        this.selectedFile1 = null
        this.imagePreview1 = null
      } else if (index == 2) {
        this.selectedFile2 = null
        this.imagePreview2 = null
      } else if (index == 3) {
        this.selectedFile3 = null
        this.imagePreview3 = null
      }
    }
  }
}
