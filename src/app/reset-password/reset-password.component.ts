import { Component, OnInit } from '@angular/core';
import { ResetPswdService } from '../services/reset-pswd.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted: false;

  resetpswdForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  })

  constructor(private _resetpswdService: ResetPswdService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get validate() {
    return this.resetpswdForm.controls;
  }

  Submit(event: any) {
    this._resetpswdService.post_resetpswd(this.resetpswdForm.value).subscribe((data) => {
      console.log(this.resetpswdForm.value);
      console.log(data);
      if(data['status_code'] === 200 ) {
        alert("Successfully password reseted!!");
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
