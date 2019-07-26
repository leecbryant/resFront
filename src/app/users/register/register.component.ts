// Angular Default
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Registration } from '../../_interfaces/registration.interface';

// Services
import { UserService } from '../../_services/user.service';
import { SnackBar } from '../../_services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  Data: Registration;
  // Form Information
  Hall = '';
  Position = '';
  Name = '';
  Username = '';
  Email =  '';
  VerifyEmail = '';
  Password = '';
  VerifyPassword = '';
  Lockout = '';

  // Loaders
  loaded = false;
  loadUser = true;
  loadEmail = true;

  // Errors
  uniqueErrorUser = false;
  uniqueErrorEmail = false;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private userService: UserService,
              private _snackbar: SnackBar) { }

  ngOnInit() {
    this.userService.getRegistration(this._route.snapshot.paramMap.get('hash')).subscribe(res => {
      this.Data = res.data[0];
      this.Hall = this.Data.HallName;
      this.Position = this.Data.AccessName;
      this.loaded = true;
    });
  }

  register(form) {
    const PostData = {
      form: form.value,
      hallId: this.Data.Hall,
      accessId: this.Data.Access
    };
    this.userService.register(PostData).subscribe(res => {
      this._snackbar.sendSuccess('Registration successful!');
      this._router.navigateByUrl('/');
    },
    err => {
      this._snackbar.sendError('Unable to register.');
    });
  }

  checkUser(user: string) {
    this.uniqueErrorUser = false;
    if (user.length >= 3) {
      this.loadUser = true;
      this.userService.getUser(user).subscribe(res => {
        this.loadUser = false;
        if (res.data.length) {
          this.uniqueErrorUser = true;
        } else {
          this.uniqueErrorUser = false;
        }
      });
    } else {
      this.loadUser = false;
    }
  }

  checkEmail(email: string) {
    this.uniqueErrorEmail = false;
    if (email.length >= 3) {
      this.loadEmail = true;
      this.userService.getEmail(email).subscribe(res => {
        this.loadEmail = false;
        if (res.data.length) {
          this.uniqueErrorEmail = true;
        } else {
          this.uniqueErrorEmail = false;
        }
      });
    } else {
      this.loadEmail = false;
    }
  }
}

