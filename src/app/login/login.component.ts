import { Component, OnInit } from '@angular/core';
import { LoginService } from "../_services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { resolve } from 'q';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  signinForm:FormGroup;
  index_signin:string;
  password_signin:string;
  post:any;
  error:boolean=false;
  users: { Name:string,
          password:string,
          Access:number
  };          
  error_message="";
  loading = false;
  returnUrl: string;

  constructor(private loginService:LoginService, private router:Router, private formBuilder:FormBuilder, private route: ActivatedRoute,) { 
   
      this.index_signin=""; 
      this.password_signin="";
      
  
    this.signinForm=formBuilder.group({
      "index_signin":[null, Validators.required],
      "password_signin":[null,Validators.required]
    });
  }

  ngOnInit() {
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/dashboard');
  }

  login(post){
    this.index_signin = post.index_signin;
    this.password_signin = post.password_signin;
    this.loading = true;
    this.error = false;
    this.loginService.login(this.index_signin, this.password_signin).subscribe(users=>{
      this.users = users;
      localStorage.setItem('token', users);
      this.router.navigateByUrl(this.returnUrl);
    },
    error=>{
     // this.error = !this.error;
      this.error = error;
      this.loading = false;
      this.error_message = "Invalid username or password";
      console.log(this.error_message);
    }
  );
  }
}

