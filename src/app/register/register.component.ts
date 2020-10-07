import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: false;

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  });

  constructor(private _signupService: SignupService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  get validate() {
    return this.signupForm.controls;
  }

  Submit() {
    this._signupService.post_signup(this.signupForm.value).subscribe((data) => {
      console.log(data);
      if(data['status_code'] === 200 ) {
        alert("Sucessfully registered!!");
      }
      else if (data['status_code'] === 400) {
        alert(data['error']);
      }
      else if (data['status_code'] === 401) {
        alert(data['error']);
      }
      localStorage.setItem("token", JSON.stringify({Bearertoken: data['token']}));
    })
  }

}
