// Angular Default
import { Component, OnInit } from '@angular/core';

// Interfaces
import { Registration } from '../_interfaces/registration.interface';

// Services
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  Data: Registration;
  Hall = '';
  Position = '';
  Name = '';
  Username = '';
  Email =  '';
  Password = '';
  Lockout = '';
  loaded = false;
  loadUser = true;
  uniqueErrorUser = false;
  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getRegistration(this.route.snapshot.paramMap.get('hash')).subscribe(res => {
      this.Data = res.data[0];
      this.Hall = this.Data.HallName;
      this.Position = this.Data.AccessName;
      this.loaded = true;
    });
  }

  register(form) {
    console.log(form.value);
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
}

