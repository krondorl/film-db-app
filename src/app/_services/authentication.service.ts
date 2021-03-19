import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: string = '';

  constructor(private userService: UserService) {
  }

  callLogin(email: string, password: string): boolean {
    const users = this.userService.getUsers();
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
      this.userService.setCurrentUser(user.email);
      this.currentUser = user.email;
      return true;
    }

    return false;
  }

  logout(): void {
    this.userService.removeCurrentUser();
    this.currentUser = '';
    localStorage.removeItem('alreadyReloaded');
  }
}
