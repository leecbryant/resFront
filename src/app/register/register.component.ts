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
  Email =  '';
  Password = '';
  Lockout = '';

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getRegistration(this.route.snapshot.paramMap.get('hash')).subscribe(res => {
      this.Data = res.data[0];
      this.Hall = this.Data.HallName;
      this.Position = this.Data.AccessName;
    });
  }

  register(form) {
    console.log(form.value);
  }
}

