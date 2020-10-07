import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any; 

  showVerify: Boolean = false;
  submitted: false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])    
  });

  constructor(private _loginService: LoginService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let stringValue = this.route.snapshot.paramMap.get('value');
    //console.log(stringValue);
    this.showVerify = JSON.parse(stringValue);
    //console.log(this.showVerify);
    //this.returnUrl = this.route.snapshot.queryParamMap['returnUrl'] || '/';
  }

  get validate() {
    return this.loginForm.controls;
  }

  Submit(event: any) {     
    this._loginService.post_login(this.loginForm.value).subscribe((data) => {
      console.log(data); 
      console.log(this.loginForm.value);  
      if(data['status_code'] == '200' ) {
        alert("Sucessfully loggedIn!!");
      } else {
        alert(data['error']);
        
      }
      localStorage.setItem("token", JSON.stringify(data['token']));
    })     
  }
  
  
}


