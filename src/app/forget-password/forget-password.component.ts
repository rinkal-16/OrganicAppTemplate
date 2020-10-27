import { Component, OnInit } from '@angular/core';
import { ForgetPswdService } from '../services/forget-pswd.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpswdForm: FormGroup;
  submitted: false;
 
  constructor(private _forgetpswdService: ForgetPswdService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.forgetpswdForm = this.formBuilder.group({
      email: new FormControl('', Validators.required) 
    });
  }
  
  get validate() {
    return this.forgetpswdForm.controls;
  }

  Submit(event: any) {
    this._forgetpswdService.post_forgetpswd(this.forgetpswdForm.value).subscribe((data) => {
      if(data['status_code'] === 401) {
        this._router.navigate(['/login',{value: true}]);
      }
      else if(data['meta']['status_code'] === 200) {
        alert("Successfully request sent. Check your mail!!");        
      }
      else if(data['status_code'] === 400) {
        alert(data['error']);        
      }
    });
  }

}
