import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { CheckoutService } from '../services/checkout.service';
import { PaymentDetailService } from '../services/payment-detail.service';

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

  orderId: any;
 
  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  }

  constructor(private formBuilder: FormBuilder, private _stripeService: StripeService, private _checkoutService: CheckoutService, private _paymentService: PaymentDetailService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.addressDetailForm = this.formBuilder.group({
      addr_line1: new FormControl('', Validators.required),
      addr_line2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });

    this.cardDetailForm = this.formBuilder.group({
      card_holder: new FormControl('', Validators.required),
      card_number: new FormControl('', Validators.required),
      cvc: new FormControl('', Validators.required),
      exp_month: new FormControl('', Validators.required)
            
    });

    this.addr_detail = true;
    this.card_detail = false;

    this.orderId = this.route.snapshot.queryParams['order_id'];

    if(this.route.snapshot.queryParams['addressFlag'] && !this.route.snapshot.queryParams['cardFlag']) {
      this.addr_detail = false;
      this.card_detail = true;
    } else if(!this.route.snapshot.queryParams['addressFlag'] && this.route.snapshot.queryParams['cardFlag']) {
      this.addr_detail = true;
      this.card_detail = false;
    } else {
      this.addr_detail = true;
    }

  }

  get validate() {
    return this.addressDetailForm.controls;
  }

  Submit_address() {
    console.log(this.addressDetailForm.value);
    this.addr_detail = false;
    this.card_detail = true;  
    this._paymentService.address_detail(this.addressDetailForm.value).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
        console.log(data);
      }  
    });   
  }

  Submit_Card() {
    this._paymentService.card_detail(this.cardDetailForm.value, this.orderId).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
        this._router.navigate( ['checkout'], { queryParams: { order_id : this.orderId } });
      } 
    });    
  }

    // 378282246310005
    // 371449635398431
    // 5555555555554444
    // 5105105105105100
    // 4111111111111111	
    // 5610591081018250
    // 4012888888881881


  

}
