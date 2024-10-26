import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const isLoggedIn = this.loginService.isloggedIn;
    console.log('isLoggedIn:', isLoggedIn); // Check the login state here
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect if not logged in
      return false;
    }
    return true;
    // return this.loginService.isloggedIn;
  }
}
