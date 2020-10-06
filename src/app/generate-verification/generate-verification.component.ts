import { Component, OnInit } from '@angular/core';
import { GenerateVerifyService } from '../services/generate-verify.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-verification',
  templateUrl: './generate-verification.component.html',
  styleUrls: ['./generate-verification.component.scss']
})
export class GenerateVerificationComponent implements OnInit {

  

  gnrtvrfcntForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(private _gnrtvrfcntService: GenerateVerifyService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  Submit(event: any) {
    this._gnrtvrfcntService.post_gnrtvrfcnt(this.gnrtvrfcntForm.value).subscribe((data) => {
      console.log(this.gnrtvrfcntForm.value);
      console.log(data);
      if(data['status_code'] === 200 ) {
        alert("Successfully request sent. Generate verification via mail!!");
      }
      else if(data['status_code'] === 400 ) {
        alert(data['error']);
      }
      else if(data['status_code'] === 401) {
        alert("User is already verified");
      }
      localStorage.setItem("token", JSON.stringify({Bearertoken: data['token']}));
    })
  }

}
