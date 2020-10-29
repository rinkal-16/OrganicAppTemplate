
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { ProductService } from '../services/product.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { getMaxListeners } from 'process';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  
  order_buy_product: any;
  orderId: number;  
  checkBoolean: string;
  total_pay: number;

  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  }

  public stripeForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    addr_line1: new FormControl('', [Validators.required]),
    addr_line2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required])
  });
  
  
  constructor(private formBuilder: FormBuilder, private _cartService: CartService, private route: ActivatedRoute, private _checkoutService: CheckoutService, private _productService: ProductService, private _stripeService: StripeService ) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),    
      shipping_address: new FormControl('', Validators.required),
      order_id: new FormControl('', Validators.required)
    }); 

    // this.stripeForm = this.formBuilder.group({
    //   name: new FormControl('', Validators.required),
    //   amount: new FormControl('', Validators.required),
    // })

    this.checkBoolean = this.route.snapshot.queryParams['buy_from_cart'];  	    
    if(this.checkBoolean == 'true') {
  		this._cartService.buy_from_cart().subscribe((data) => {
          if(data['error']) {
            alert(data['error']);
          }
          else {
            this.orderId = data['data']['order_id'];
            this.order_buy_product = data['data']['buy_products'];
            this.total_pay = data['data']['total_pay']
          }  		    
  	    });
  	} else {
      var form = new FormData();
      form.append('quantity', this.route.snapshot.queryParams['quantity']);
      form.append('product_id', this.route.snapshot.queryParams['id']);
  		this._productService.post_buy_product(form).subscribe((data) => {  	      
            if(data['error']) {
              alert(data['error']);
            } else {
              this.order_buy_product = data['data']['buy_product'];
              this.orderId = data['data']['order_id'];
              this.total_pay = data['data']['total_pay'];
            } 	      	
      	});
    }
    

    this._stripeService.elements(this.elementsOptions)
    .subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {
          iconStyle: 'solid',
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: 'Helvetica',
              fontSize: '18px',
            }
          }
        });
        this.card.mount('#card-element');
      }
  });
}

  get validate() {
    return this.checkoutForm.controls;
  }

  Submit_Checkout() { 
    this.checkoutForm.controls['order_id'].setValue(this.orderId);
    this._checkoutService.post_checkout(this.checkoutForm.value).subscribe((data) => { 
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }           
    });
  }

  buy() {
    this.submitted = true;
    this.loading = true;
    this.stripeData = this.stripeForm.value
    this._stripeService.createToken(this.card,{})
    .subscribe(result => {
      if(result.token) {
        this.stripeData['token']=result.token
        console.log(this.stripeData);
        this._checkoutService.payment_gateway(this.stripeForm.value)
        .subscribe((res) => {
          console.log(res);
        });
      }
      else {
        this.paymentStatus = result.error.message;
        console.log(this.paymentStatus);
      }
    });
  }


}



