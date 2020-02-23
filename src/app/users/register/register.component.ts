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
  FormData: Registration;
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

  // Errors
  uniqueErrorUser = false;
  uniqueErrorEmail = false;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private userService: UserService,
              private _snackbar: SnackBar) { }

  ngOnInit() {
    this.loadRegistration().then(result => {
        console.log(result)
        this.loaded = true
    }).catch(err => {
        console.log("Error in loading page: " + err)
    });
    console.log(this.Hall)
  }

  async loadRegistration() {
    return new Promise((resolve, reject) => {
      this.userService.getRegistration(this._route.snapshot.paramMap.get('hash')).subscribe(res => {
        this.FormData = res;
        this.Hall = res.data.base[0].HallName;
        this.Position = res.data.base[0].AccessName; 
        resolve();
      },
      err => {
        this._router.navigateByUrl('/404');
        console.log(err);
        reject();
      });
    });
  }

  register(form) {
    const PostData = {
      form: form.value,
      HallId: this.FormData.data.base[0].HallId,
      AccessLevel: this.FormData.data.base[0].HallId
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
        if (this.FormData.data.users.filter(e => {
          return user.toLocaleLowerCase() == e.Username.toLocaleLowerCase()
        }).length > 0) {
          this.uniqueErrorUser = true;
        } else {
          this.uniqueErrorUser = false;
        }
    }
  }

  checkEmail(email: string) {
    this.uniqueErrorEmail = false;
    if (email.length >= 3) {
      if (this.FormData.data.users.filter(e => {
        return email.toLocaleLowerCase() == e.Email.toLocaleLowerCase()
      }).length > 0) {
        this.uniqueErrorEmail = true;
      } else {
        this.uniqueErrorEmail = false;
      }
    }
  }
}

