import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatInputModule,
    MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit{

  placeOrderForm!: FormGroup

  constructor(private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.placeOrderForm = this.fb.group({
      address: [null, [Validators.required]],
      description: [null]
    })
  }

  placeOrder() {
    this.userService.placeOrder(this.placeOrderForm?.value).subscribe({
      next: (resp) => {
        this.snackBar.open('Order placed', 'Close', { duration: 3000 })
        this.dialog.closeAll()
        this.router.navigate(['/my-order'])
      },
      error: (err) => {
        this.snackBar.open('Error while placing order', 'Close', { duration: 3000 })
      }
    })
  }
}
