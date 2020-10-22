import { Component, OnInit } from '@angular/core';
import { ResetPswdService } from '../services/reset-pswd.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted: false;
  resetpswdForm:  FormGroup;
  public token: string;

  constructor(private _resetpswdService: ResetPswdService, private _router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.resetpswdForm = this.formBuilder.group({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmpassword: new FormControl ('', Validators.required)
      }, {
          validator: this.MustMatch('password', 'confirmpassword')
      });      
  }

  get validate() {
    return this.resetpswdForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  Submit(event: any) {
    let accessToken = this.activatedRoute.snapshot.paramMap.get('token');  //To send token to backend
    this._resetpswdService.post_resetpswd(this.resetpswdForm.value, accessToken).subscribe((data) => {
      if(data['meta']['status_code'] === 200 ) {
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
