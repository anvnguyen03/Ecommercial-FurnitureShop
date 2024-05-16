import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) {
    
  }

  productId: any
  productName: any
  userId: any

  reviewImgSelected: File | null = null
  reviewImg: string | null = null

  reviewForm!: FormGroup

  isReviewed: boolean | null = null

  ngOnInit(): void {
    this.productId = this.data.productId
    this.userId = this.data.userId
    this.productName = this.data.productName

    this.reviewForm = this.fb.group({
      img: [null, [Validators.required]],
      content: [null, [Validators.required]]
    })
    this.getReview()
  }


  getReview() {
    this.userService.getReviewsByProductId(this.productId).subscribe({
      next: (resp) => {
        if (resp.length != 0) {
          // neu da co review
          this.isReviewed = true
          this.reviewForm.get('content')?.setValue(resp[0].content)
          this.reviewImg = 'data:image/jpeg;base64,' + resp[0].byteImg
          console.log(resp)
        } else {
          this.isReviewed = false
        }
      }
    })
  }

  onSelectedFile(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.reviewImgSelected = file
      this.reviewImg = URL.createObjectURL(file)
    } else {
      this.reviewImg = null
      this.reviewImgSelected = null
    }
  }

  submitReviewForm() {
    const reviewForm: FormData = new FormData()
    reviewForm.append('user_id', this.userId)
    reviewForm.append('product_id', this.productId)
    reviewForm.append('content', this.reviewForm.get('content')?.value)
    reviewForm.append('img', this.reviewImgSelected!)

    this.userService.createReview(reviewForm).subscribe({
      next: (resp) => {
        this.dialogRef.close()
        this.snackBar.open('Đã thêm đánh giá cho sản phẩm', 'Đóng', { duration: 3000 })
      }
    })
  }
  
  closeDialog() {
    this.dialogRef.close()
  }
}
