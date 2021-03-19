import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../layout/dialog/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  hide2: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(10)]);
  password2 = new FormControl('', [Validators.required, Validators.minLength(10)]);

  constructor(public dialog: MatDialog,
    private router: Router, private userService: UserService) { }

  ngOnInit(): void {
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
      return 'Minimum length is 10 chars';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  getPassword2ErrorMessage() {
    if (this.password2.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password2.hasError('minlength')) {
      return 'Minimum length is 10 chars';
    }

    if (this.password.value !== this.password2.value) {
      return 'Passwords don\'t match';
    }

    return this.password2.hasError('password') ? 'Not a valid password' : '';
  }

  register(): void {
    if (this.getEmailErrorMessage() === ''
      && this.getPasswordErrorMessage() === ''
      && this.getPassword2ErrorMessage() === '') {
        this.userService.registerUser(this.email.value, this.password.value);
        this.successDialog();
      }
  }

  successDialog() {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {restoreFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }
}
