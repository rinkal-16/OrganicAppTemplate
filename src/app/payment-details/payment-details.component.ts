import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})

export class PaymentDetailsComponent implements OnInit {

  addressDetailForm: FormGroup;
  cardDetailForm: FormGroup;

  addr_detail: boolean = false;
  card_detail: boolean = false;

 
  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  }

  constructor(private formBuilder: FormBuilder, private _stripeService: StripeService, private _checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.addressDetailForm = this.formBuilder.group({
      addr_line1: new FormControl('', Validators.required),
      addr_line2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });

    this.cardDetailForm = this.formBuilder.group({
      card_holder: new FormControl('', Validators.required),
      card_number: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      expiry_date: new FormControl('', Validators.required)
    });

    this.addr_detail = true;
    this.card_detail = false;

  }

  get validate() {
    return this.addressDetailForm.controls;
  }

  Submit_adress() {
    this.addr_detail = false;
    this.card_detail = true;
    console.log("submit");  
  }

  Submit_Card() {
    console.log("submit"); 
  }

  

}
