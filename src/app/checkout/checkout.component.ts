import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup

  constructor(private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required), 
      address: new FormControl('', Validators.required)    
    });
  }

  get validate() {
    return this.checkoutForm.controls;
  }

}
