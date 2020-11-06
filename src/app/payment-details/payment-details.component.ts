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
  cvvVerifyForm: FormGroup;

  addr_detail: boolean = false;
  card_detail: boolean = false;
  verify_form: boolean = false;
 
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

  addrdetail: any;
  carddetail: any;
  cards: any;
  addresses: any;
  token: any;

  constructor(private formBuilder: FormBuilder, private _stripeService: StripeService, private _checkoutService: CheckoutService, private _paymentService: PaymentDetailService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {

    this.addressDetailForm = this.formBuilder.group({
      addr_line1: new FormControl('', Validators.required),
      addr_line2: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      defaultAddress: new FormControl('', Validators.required)
    });

    this.cardDetailForm = this.formBuilder.group({
      card_holder: new FormControl('', Validators.required),
      card_number: new FormControl('', Validators.required),
      cvc: new FormControl('', Validators.required),
      exp_month: new FormControl('', Validators.required),
      defaultCard: new FormControl('', Validators.required)      
    });

    this.cvvVerifyForm = this.formBuilder.group({
      cvc: new FormControl('', Validators.required),
      last4digit: new FormControl('', Validators.required),
      card_id: new FormControl('', Validators.required),
      order_id: new FormControl('', Validators.required)
    })

    this.addr_detail = true;
    this.card_detail = false;

    this.orderId = this.route.snapshot.queryParams['order_id'];
    this.token = this.route.snapshot.queryParams['token'];
    

    console.log(this.route.snapshot.queryParams);

    // if(JSON.stringify(this.route.snapshot.queryParams['addressFlag'])) {
    //   this._paymentService.get_address_detail().subscribe((data) => {
    //     console.log(data);
    //     this.addrdetail = data['data']['address'];                 
    //   })
    // } else if(JSON.stringify(this.route.snapshot.queryParams['cardFlag'])) {
    //   this.addr_detail = false;
    //   this.card_detail = true;
    //   this._paymentService.get_card_detail().subscribe((data) => {
    //     console.log(data);
    //     this.carddetail = data['data']['card'];
    //   }) 

      
    // } 

    //if(this.route.snapshot.queryParams) {
      console.log(this.route.snapshot.queryParams);
      if(this.route.snapshot.queryParams['addressFlag'] && !this.route.snapshot.queryParams['cardFlag']) {
        this.addr_detail = false;
        this.card_detail = true;
        this.fetch_addr();
      } 
      else if(this.route.snapshot.queryParams['addressFlag'] && this.route.snapshot.queryParams['cardFlag']) {
        this.addr_detail = false;
        this.card_detail = true;
        this.fetch_card();
      } 
      else if(!this.route.snapshot.queryParams['addressFlag'] && this.route.snapshot.queryParams['cardFlag']) {
        this.addr_detail = true;
        this.card_detail = false;
        this.fetch_card();
      } else if(this.route.snapshot.queryParams['addressFlag']) {
          this.addr_detail = true;
          this.fetch_addr();
      } 
      else {
        this.addr_detail = true;
      }
      this.orderId = this.route.snapshot.queryParams['order_id'];
  //}

    // this._paymentService.get_card_detail().subscribe((data) => {
    //       console.log(data);
    //       this.carddetail = data['data']['card'];
    // });

    // this._paymentService.get_address_detail().subscribe((data) => {
    //   console.log(data);
    //   this.addrdetail = data['data']['address'];
    //   console.log(this.addrdetail);
    // })
  }

  get validate() {
    return this.addressDetailForm.controls;
  }

  // onItemChange(value: any) {
  //   console.log(value);
  //   //this.addressDetailForm.controls['defaultAddress'].setValue(value);
  //   this.cardDetailForm.controls['defaultCard'].setValue(value);
  // }

  fetch_addr() {
    this._paymentService.get_address_detail().subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error'])
      } else {
        console.log(data);
        this.addresses = data['data']['address'];
      }
    })
  }

  fetch_card() {
    this._paymentService.get_card_detail().subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error'])
      } else {
        console.log(data);
        this.cards = data['data']['card'];
      }
    })
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
    this._paymentService.get_address_detail().subscribe((data) => {
      console.log(data);
      this.addresses = data['data']['address'];
    })
  }

  Submit_Card() {
    
      if(this.cardDetailForm.controls['defaultCard']) {
        this.cardDetailForm.controls['defaultCard'].setValue('false');
      }
      this.cardDetailForm.controls['order_id'].setValue(this.route.snapshot.queryParams['order_id']);

      this._paymentService.card_detail(this.cardDetailForm.value).subscribe((data) => {
        console.log(data);
        if(data['error']) {
          alert(data['error']);
        } else {
          alert(data['meta']['success']);
          
        } 
      })
      
     
  }

  openForm() {
    this.verify_form = true;
    console.log('opening....')
  }

  onAddrChange(value: any) {
    console.log(value);
    this.addressDetailForm.controls['defaultAddress'].setValue(value);
      let buy = this.route.snapshot.queryParams['buy_from_cart'];
      let order_id = this.route.snapshot.queryParams['order_id'];
      let id = this.route.snapshot.queryParams['product_id'];
      let quantity = this.route.snapshot.queryParams['quantity'];
      let product_id = this.route.snapshot.queryParams['product_id'];
      if(buy == 'true') {
        this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : true, 
        'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
      }
      else {
        
        this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : false,
        'order_id': order_id, 'id' : id, 'quantity': quantity, 'product_id': product_id,
        'token': this.route.snapshot.queryParams['token']  } });
      }
  }

  onCardChange(value: any) {
    console.log(value);
    this.cardDetailForm.controls['defaultCard'].setValue(value);
  }

  change_default(id: any) {
    console.log(typeof id);
    this._paymentService.change_default_addr(id).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      }
      else {
       alert(data['meta']['success']);
       
      }
    });
  }

  verified(id) {     
    this.cvvVerifyForm.controls['card_id'].setValue(id);    
    this.cvvVerifyForm.controls['order_id'].setValue(this.route.snapshot.queryParams['order_id']);             
    this._paymentService.verify_cvv(this.cvvVerifyForm.value).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
        this.stripeData = data['data']['token'];
        console.log(data);
        console.log(this.stripeData);
        let buy = this.route.snapshot.queryParams['buy_from_cart'];
        let orderId = this.route.snapshot.queryParams['order_id'];
        let id = this.route.snapshot.queryParams['product_id'];
        let quantity = this.route.snapshot.queryParams['quantity'];
        let product_id = this.route.snapshot.queryParams['product_id'];
        console.log(product_id, id);
        this.token = data['data']['token'];
        if(buy == 'true') {
          this._router.navigate( ['checkout'], { queryParams: { 'order_id' : orderId, buy_from_cart: true, token : this.token } });
        } else {
          this._router.navigate( ['checkout'], { queryParams: { 'order_id' : orderId, buy_from_cart: false, 'id': id, 'quantity': quantity, 'product_id': product_id, token : this.token } });
        }
       
      }
    })
  }

  // continue() {  
  //     let buy = this.route.snapshot.queryParams['buy_from_cart'];
  //     let order_id = this.route.snapshot.queryParams['order_id'];
  //     let id = this.route.snapshot.queryParams['product_id'];
  //     let quantity = this.route.snapshot.queryParams['quantity'];
  //     let pro_id = this.route.snapshot.queryParams['product_id'];
  //     if(buy == 'true') {
  //       this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : true, 
  //       'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
  //     }
  //     else {
  //       this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : false,
  //       'order_id': order_id, 'id' : id, 'quantity': quantity, 'product_id': pro_id,
  //       'token': this.route.snapshot.queryParams['token']  } });
  //     }
  // }

    // 378282246310005
    // 371449635398431
    // 5555555555554444
    // 5105105105105100
    // 4111111111111111	
    // 5610591081018250
    // 4012888888881881


  

}
