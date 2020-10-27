import { Component, OnInit } from '@angular/core';
import { GenerateVerifyService } from '../services/generate-verify.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-verification',
  templateUrl: './generate-verification.component.html',
  styleUrls: ['./generate-verification.component.scss']
})
export class GenerateVerificationComponent implements OnInit {

  generateverificationForm: FormGroup;
  submitted: false;

  constructor(private _gnrtvrfcntService: GenerateVerifyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generateverificationForm = this.formBuilder.group({
      email: new FormControl('', Validators.required) 
    });
  }

  get validate() {
    return this.generateverificationForm.controls;
  }

  Submit(event: any) {
    this._gnrtvrfcntService.post_gnrtvrfcnt(this.generateverificationForm.value).subscribe((data) => {
      if(data['meta']['status_code'] === 200 ) {
        alert("Successfully request sent. Generate verification via mail!!");
      }
      else if(data['status_code'] === 400 ) {
        alert(data['error']);
      }
      else if(data['status_code'] === 401) {
        alert(data['error']);
      }
      localStorage.setItem("token", JSON.stringify({ Bearertoken: data['token'] }));
    });
  }
}
