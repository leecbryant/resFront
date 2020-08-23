import { Component, OnInit } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/_services/user.service';
import { SnackBar } from 'src/app/_services/notification.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Profile } from 'src/app/_interfaces/profile.interface';

const helper = new JwtHelperService();

@Component ({
    templateUrl: 'settings.html'
})

export class SettingsComponent implements OnInit {  
    //Display Data for Users
    Data:Profile;

    decodedToken:string = helper.decodeToken(localStorage.getItem('token'));
    Name:string;
    UsernameField:string;
    Email =  '';
    NewEmail = '';
    VerifyEmail = '';
    Password = '';
    VerifyPassword = '';
    OldPassword = '';
    // Errors
    uniqueErrorEmail = false;
    invalidCounter = 0;

    loaded = false;
    constructor(private api: UserService,
        private _snackbar: SnackBar,
        private router: Router
        ) { }

    ngOnInit() {
        new Promise((resolve, reject) => {
            this.api.getAccountInfo(localStorage.getItem('token')).subscribe(res => {
                this.Data = res;
                resolve(res);
            }, err => {
                reject(err);
            })
        }).then(res => {
            this.Name = this.Data.base.Name;
            this.UsernameField = this.Data.base.Username;
            this.Email = this.Data.base.Email;
            this.loaded = true;
        }).catch(err => {
            console.log(err)
        });
    }

    updateUser(form) {
        if(this.invalidCounter >= 3) {
            this._snackbar.sendError("Logged out for security purposes");
            this.router.navigateByUrl('/login');
        }
        if(form.value.email == "" && form.value.password == "") {
            this._snackbar.sendWarning("No changes made");
            form.reset();
        } else {
            let obj = {
                form: form.value
            }
            new Promise((resolve, reject) => {
              this.api.updateAccountInfo(obj).subscribe(res => {
                resolve(res);
              },
              err => {
                reject(err);
              });
            }).then(result => {
                this._snackbar.sendSuccess('Account updated');
                location.reload();
            }).catch(err => {
                this._snackbar.sendError('Invalid password');
                this.invalidCounter++;
                // form.reset();
            });
        }
    }

    checkEmail(email: string) {
        this.uniqueErrorEmail = false;
        if (email.length >= 3) {
          if (this.Data.emails.filter(e => {
            return email.toLocaleLowerCase() == e.Email.toLocaleLowerCase()
          }).length > 0) {
            this.uniqueErrorEmail = true;
          } else {
            this.uniqueErrorEmail = false;
          }
        }
      }
}