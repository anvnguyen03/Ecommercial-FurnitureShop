import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signUpForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    fullname: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [Validators.required])
  })

  message?: string
  constructor(private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  onSubmit() {
    const passsword = this.signUpForm.get('password')?.value
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value

    if (passsword != confirmPassword) {
      this.message = 'Passwords do not match!'
      return;
    }

    this.authService.register(this.signUpForm.value).subscribe({
      next: (response) => {
        if (response.statusCodeValue == 200) {
          this.snackBar.open('Đăng kí thành công', 'Đóng', { duration: 5000 })
        this.router.navigate(['/login'])
        } else {
          this.snackBar.open('Đăng ký thất bại, lỗi: ' + response.body, 'Đóng', {duration: 5000})
        }
      }
    })
  }
}
