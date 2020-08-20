import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { resolve } from 'q';
import { SnackBar } from '../../_services/notification.service';
import { APIService } from 'src/app/_services/api.service';
import { Datum } from 'src/app/_interfaces/hall.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  Halls: Datum[];
  SelectedHall: '';
// Other
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
  loaded = false;
  returnUrl: string;  

  constructor(private loginService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private _snackbar: SnackBar,
              private api: APIService) { }
              
  ngOnInit() {
    localStorage.clear();
    this.route.queryParams.subscribe(params => this.returnUrl = params['returnUrl'] || '/dashboard');
    this.loadHalls().then(result => {
      this.loaded = true;
    }, err => {
      console.log(err);
    });
  }

  async loadHalls() {
    new Promise((resolve, reject) => {
      this.api.getHalls().subscribe(res => {
        this.Halls = res.data.filter(e => {
          return e.id > 1;
        });
        resolve()
      }, err => {
        console.log(err);
        this._snackbar.sendError("Error loading login page: " + err);
        reject();
      });
    });
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
        // this._snackbar.sendSuccess('Logged in.');
        this.router.navigate([this.returnUrl]);
    }).catch(err => {
        this._snackbar.sendError('Invalid username or password');
        // form.reset();
        console.log("Error logging in: " + err)
    });
  }

  keyDownFunction(event, form) {
    if(event.keyCode == 13) {
      if(form.valid) this.login(form);
    }
  }
}

