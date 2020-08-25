// Angular Default
import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../_services/user.service';
import { SnackBar } from '../../_services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset.component.html'
})

export class ResetComponent implements OnInit {
  // Form Information
  Password = '';
  VerifyPassword = '';

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
    this.loadPasswordReset().then(result => {
        this.loaded = true
    }).catch(err => {
        console.log("Error in loading page: " + err)
    });
  }

  async loadPasswordReset() {
    return new Promise((resolve, reject) => {
      this.userService.getPasswordReset(this._route.snapshot.paramMap.get('hash')).subscribe(res => {
        resolve();
      },
      err => {
        this._router.navigateByUrl('/404');
        console.log(err);
        reject();
      });
    });
  }

  reset(form) {
    this.userService.resetPasswordUpdate({ form: form.value, hash: this._route.snapshot.paramMap.get('hash')}).subscribe(res => {
      this._snackbar.sendSuccess('Password reset');
      this._router.navigateByUrl('/');
    },
    err => {
      this._snackbar.sendError('Unable to register.');
    });
  }
}

