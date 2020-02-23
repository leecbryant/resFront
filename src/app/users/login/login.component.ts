import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { resolve } from 'q';
import { SnackBar } from '../../_services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  Username = '';
  Password = '';
  post: any;
  error = false;
  users: {
    Name: string,
    password: string,
    Access: number
  };
  error_message = '';
  loading = false;
  returnUrl: string;

  constructor(private loginService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private _snackbar: SnackBar) { }

  ngOnInit() {
    // this.loginService.logout();
    
    // get return url from route parameters or default to '/'
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/dashboard');
  }

  async login(form) {
    new Promise((resolve, reject) => {
      this.loginService.login(form.value).subscribe(res => {
        localStorage.setItem('token', res.token);
        resolve(res);
      },
      err => {
        this.error = true;
        this.error_message = 'Invalid username or password';
        reject(err);
      });
    }).then(result => {
        this._snackbar.sendSuccess('Logged in.');
        this.router.navigateByUrl('/dashboard');
    }).catch(err => {
        this._snackbar.sendError('Invalid username or password');
        form.reset();
        console.log("Error logging in: " + err)
    });;
  }
}

