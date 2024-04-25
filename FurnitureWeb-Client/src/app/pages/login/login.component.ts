import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  })

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  message: string|undefined;

  onSubmit() {
    const loginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.postLogin(loginRequest).subscribe({
      next: (response) => {
        if (response.token == null) {
          this.message = response.error
        } else {
          this.authService.setToken(response.token)
          this.authService.setUser(JSON.stringify(response.user))
          this.router.navigate(['/home'])
        }
      }
    });
  }
}
