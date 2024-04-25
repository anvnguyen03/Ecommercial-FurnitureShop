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
        return protectedRoute.includes(state.url) ? true : router.createUrlTree(['/home'])
      } else {
        return router.createUrlTree(['/home'])
      }
    })
  )
}
