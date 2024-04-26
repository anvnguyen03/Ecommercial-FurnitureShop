import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

// guard bảo vệ các trang yêu cầu đăng nhập 
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  // các route yêu cầu đăng nhập
  const protectedRoute: string[] = ['/shop']

  const token = { token: authService.getToken() }

  /**
   * hàm xử lí callback trong subscribe được thực thi bất đồng bộ,
   * tức sẽ không chờ authService.validateToken() hoàn thành mà sẽ tiếp tục thực thi các dòng tiếp theo
   * ==> "final status" sẽ được log ra và kiểm tra trong return trước khi biến loggedIn được thay đổi 
   */
  // var loggedIn: boolean = false
  // if (token) {
  //   authService.validateToken(token).subscribe({
  //     next: (response) => {
  //       if (response == true) {
  //         console.log("response:" ,response)
  //         loggedIn = true
  //         console.log("log in status:" ,loggedIn)
  //       } else {
  //         localStorage.removeItem('token')
  //         loggedIn = false
  //       }
  //     }
  //   })
  // }
  // console.log("final status:", loggedIn)
  // return protectedRoute.includes(state.url) && loggedIn ? true : router.navigate(['/login'])

  return authService.validateToken(token).pipe(
    map((response) => {
      if (response == true) {
        // Nếu token hợp lệ, cho phép truy cập route 
        return protectedRoute.includes(state.url) ? true : router.createUrlTree(['/login']);
      } else {
        localStorage.removeItem('token');
        // Nếu token không hợp lệ, chuyển hướng đến trang đăng nhập
        return router.createUrlTree(['/login']);
      }
    })
  )
  
};