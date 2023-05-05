import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private router: Router,
    private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
