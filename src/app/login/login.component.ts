import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)    
  });

  constructor(private _loginService: LoginService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  Submit(event: any) {
    this._loginService.post_login(this.loginForm.value).subscribe((data) => {
      console.log(this.loginForm.value);
      console.log(data);
    })
    
  }

}


