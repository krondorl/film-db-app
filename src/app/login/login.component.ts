import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [Validators.required, Validators.minLength(10)]);
  hide = true;
  usersList: any = [];
  loading = false;
  loginError = false;
  userLoggedin = false;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.usersList = this.userService.getUsers();
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('minlength')) {
      return 'Minimum is 10 chars length';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  onSubmit() {
    this.loading = true;

    if (this.getEmailErrorMessage() === '' && this.getPasswordErrorMessage() === '') {
      const userName = this.email.value;
      const password = this.password.value;

      let login = this.authenticationService.callLogin(userName, password);

      if (login) {
        this.loginError = false;
        this.router.navigate(['/watchlist']);
      } else {
        this.loginError = true;
      }
    }

    this.loading = false;
  }
}
