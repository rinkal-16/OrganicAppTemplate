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

  addr_detail_available: string;
  card_detail_available: string;

  addressFlag: boolean;
  cardFlag: boolean;

  verify_form: boolean = false;
 
  orderId: any;
 
  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: string;
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
      defaultCard: new FormControl('', Validators.required),
      order_id: new FormControl('' 
      )      
    });

    this.cvvVerifyForm = this.formBuilder.group({
      cvc: new FormControl('', Validators.required),
      last4digit: new FormControl('', Validators.required),
      card_id: new FormControl('', Validators.required),
      order_id: new FormControl('', Validators.required)
    })

    this.addr_detail_available = this.route.snapshot.queryParams['addressFlag'];
    this.card_detail_available = this.route.snapshot.queryParams['cardFlag'];
    this.orderId = this.route.snapshot.queryParams['order_id'];    
    this.token = this.route.snapshot.queryParams['token'];
    

    console.log(this.route.snapshot.queryParams);
    
    if(this.addr_detail_available && this.card_detail_available) {
      console.log(this.addr_detail_available, this.card_detail_available)
      if(this.addr_detail_available == 'true' && this.card_detail_available == 'false') {
        this.addressFlag = false;
        this.cardFlag = true;
        this.fetch_addr();
      } 
      else if(this.addr_detail_available == 'true' && this.card_detail_available == 'true') {
        this.addressFlag = false;
        this.cardFlag = true;
        this.fetch_card();
      } 
      else if(this.addr_detail_available == 'false' && this.card_detail_available == 'true') {
        this.addressFlag = true;
        this.cardFlag = false;
        this.fetch_card();
      } else if(this.addr_detail_available == 'false' && this.card_detail_available == 'false')  {
          this.addressFlag = true;        
      } 
      this.orderId = this.route.snapshot.queryParams['order_id'];
    } else {
      if(this.route.snapshot.queryParams['address'] == 'true') {
        this.addressFlag = true;
        this.fetch_addr();
      }
    } 
      
    this._paymentService.get_card_detail().subscribe((data) => {
          console.log(data);
          this.carddetail = data['data']['card'];
    });

    this._paymentService.get_address_detail().subscribe((data) => {
      console.log(data);
      this.addrdetail = data['data']['address'];
    })
  }

  get validate() {
    return this.addressDetailForm.controls;
  }

  onItemChange(value: any) {
    console.log(value);
    this.addressDetailForm.controls['defaultAddress'].setValue(value);
    this.cardDetailForm.controls['defaultCard'].setValue(value);
  }

  fetch_addr() {
    this._paymentService.get_address_detail().subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error'])
      } else {
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
        this.cards = data['data']['card'];
      }
    })
  }

  Submit_address() {
    console.log(this.addressDetailForm.value);
    this.addressFlag = false;
    this.cardFlag = true;  
    this._paymentService.address_detail(this.addressDetailForm.value).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }  
    });   
    this._paymentService.get_address_detail().subscribe((data) => {
      console.log(data);
      this.addresses = data['data']['address'];
    })
  }

  Submit_Card() {
  	this.cardDetailForm.controls['order_id'].setValue(this.route.snapshot.queryParams['order_id']);
    console.log(this.orderId);
    if(!this.cardDetailForm.controls['defaultCard']) {
      this.cardDetailForm.controls['defaultCard'].setValue("false");
    }   
    this._paymentService.card_detail(this.cardDetailForm.value).subscribe((data) => {
      console.log(data);     
      if(data['error']) {
        alert(data['error']);
      }
      else {
        alert(data['meta']['success']);
        this.fetch_card();
        this.stripeData = data['data']['token'];
        this.continue();
        
      }
    });
         
  }

  delete_addr(id) {
    this._paymentService.delete_address(id).subscribe((data) => {
      console.log();
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }
    })
  }

  delete_card(id) {
    this._paymentService.delete_card(id).subscribe((data) => {
      console.log();
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }
    });
    this.cardDetailForm.reset();
  }

  continue() {
    let buy = this.route.snapshot.queryParams['buy_from_cart'];
      let order_id = this.route.snapshot.queryParams['order_id'];
      let quantity = this.route.snapshot.queryParams['quantity'];
      
        if(buy == 'true') {
          this._router.navigate(['checkout'], { queryParams: { buy_from_cart : true, 
          'order_id': order_id, 'token': this.stripeData  } });
        }
        else {
          this._router.navigate(['checkout'], { queryParams: { buy_from_cart : false,
          'order_id': order_id, 'token': this.stripeData  } });
        }
      
      
        // if(buy == 'true') {
        //   this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : true, 
        //   'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
        // }
        // else {
        //   this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : false,
        //   'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
        // }
        
  }

  openForm() {
    this.verify_form = true;
  }

  onAddrChange(value: any) {
    console.log(value);
    this.addressDetailForm.controls['defaultAddress'].setValue(value);    
      // let buy = this.route.snapshot.queryParams['buy_from_cart'];
      // let order_id = this.route.snapshot.queryParams['order_id'];
      // let id = this.route.snapshot.queryParams['product_id'];
      // let quantity = this.route.snapshot.queryParams['quantity'];
      // let product_id = this.route.snapshot.queryParams['product_id'];
      // if(buy == 'true') {
      //   this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : true, 
      //   'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
      // }
      // else {
        
      //   this._router.navigate(['/checkout'], { queryParams: { buy_from_cart : false,
      //   'order_id': order_id, 'id' : id, 'quantity': quantity, 'product_id': product_id,
      //   'token': this.route.snapshot.queryParams['token']  } });
      // }
  }

  onCardChange(value: any) {
    console.log(value);
    this.cardDetailForm.controls['defaultCard'].setValue(value);
  }

  change_default_Address(id: any) {   
    this._paymentService.change_default_addr(id).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      }
      else {
       alert(data['meta']['success']);
       this._router.navigate(['/checkout'], { queryParams: {  
      'order_id': this.orderId, 'token': this.route.snapshot.queryParams['token']  } });
      }
    });
  }

  sendCardId(id) {
    console.log(id);
    this.cvvVerifyForm.controls['card_id'].setValue(id);
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
}
 

  // 378282246310005
  // 371449635398431
  // 5555555555554444
  // 5105105105105100
  // 4111111111111111	
  // 5610591081018250
  // 4012888888881881


  

