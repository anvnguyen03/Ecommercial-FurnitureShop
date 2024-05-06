import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ShopHeaderComponent } from './pages/shop-header/shop-header.component';
import { ShopFooterComponent } from './pages/shop-footer/shop-footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShopHeaderComponent, ShopFooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'FurnitureWeb-Client';

  constructor(private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.authService.getToken()) {
        const token = { token: this.authService.getToken()}
        this.authService.validateToken(token).subscribe({
          next: (response) => {
            if (response == false) {
              this.authService.logout()
              this.snackBar.open("Đã hết phiên đăng nhập, vui lòng đăng nhập lại để tiếp tục",
              "Đóng",
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
              .afterDismissed().subscribe(() => { this.router.navigate(['/home']) })
            }
          }
        })
      }
    }, 10000)
  }

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      AOS.init({
        duration: 1000, 
        once: true, 
        easing: 'ease'
      }
      )
    })
  }

}
