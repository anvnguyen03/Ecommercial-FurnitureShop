import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)
  const protectedRoute: string[] = ['/login', '/register']

  const token = { token: authService.getToken() }

  return authService.validateToken(token).pipe(
    map(response => {
      if (response == false) {
        // nếu chưa đăng nhập mà truy cập protectedRoute thì cho phép, các route còn lại điều hướng về login
        return protectedRoute.includes(state.url) ? true : router.createUrlTree(['/login'])
      } else {
        // nếu đã đăng nhập mà truy cập protectedRoute thì điều hướng về /home, các route còn lại cho phép
        return protectedRoute.includes(state.url) ? router.createUrlTree(['/home']) : true
      }
    })
  )
}
