import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { resolve } from 'q';


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

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder:
              FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/dashboard');
  }

  login(form) {
    console.log(form.value);
  }
}

