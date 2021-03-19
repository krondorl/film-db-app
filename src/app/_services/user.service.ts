import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): any {
    return JSON.parse(localStorage.getItem('users') as any);
  }

  registerUser(email: string, password: string): void {
    let users: any = this.getUsers();
    const newUser: object = {
      email: email,
      password: password
    };

    if (users === null) {
      users = [];
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') as any);
  }

  setCurrentUser(userName: string): void {
    localStorage.setItem('currentUser', JSON.stringify(userName));
  }

  removeCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }
}
