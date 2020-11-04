import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { ProductService } from '../services/product.service';
import { PaymentDetailService } from '../services/payment-detail.service';
import { Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

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
  stripeToken: string;
  getProductFromCart: any;
  addrdetail: any;
  carddetail: any;

  addr_form : boolean = false;
  card_form : boolean = false;

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
    currency: new FormControl('', [Validators.required]),
  });
    
  constructor(private formBuilder: FormBuilder, private _cartService: CartService, private route: ActivatedRoute, private _checkoutService: CheckoutService, private _productService: ProductService, private _paymentService: PaymentDetailService, private _router: Router ) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({      
      order_id: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      token: new FormControl('', Validators.required)
    }); 

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
            console.log(this.total_pay);
            this.stripeToken = data['data']['token'];
            this._checkoutService.get_checkout(this.orderId).subscribe((data) => {
              console.log(data); 
              console.log(this.orderId);
              this.getProductFromCart = data['data']['products'];
              this.addrdetail = data['data']['address'];  
              this.carddetail = data['data']['card']; 
              console.log(this.addrdetail);
              console.log(this.carddetail);     
            }); 
          }  		    
  	    });
  	} else {
      var form = new FormData();
      form.append('quantity', this.route.snapshot.queryParams['quantity']);
      form.append('product_id', this.route.snapshot.queryParams['id']);
  		this._productService.post_buy_product(form).subscribe((data) => {  
        console.log(data);	      
            if(data['error']) {
              alert(data['error']);
            } else {
              this.order_buy_product = data['data']['buy_product'];
              this.orderId = data['data']['order_id'];
              this.total_pay = data['data']['total_pay'];
              this.stripeToken = data['data']['token'];
              this._checkoutService.get_checkout(this.orderId).subscribe((data) => {
                console.log(data);
                console.log(this.orderId);  
                this.getProductFromCart = data['data']['products'];
                this.addrdetail = data['data']['address'];  
                this.carddetail = data['data']['card']; 
                console.log(this.addrdetail);
                console.log(this.carddetail);  
              }); 
            } 	      	
      	});
    }

  }

  get validate() {
    return this.checkoutForm.controls;
  }

  Submit_Checkout() { 
    this.checkoutForm.controls['order_id'].setValue(this.orderId);
    this.checkoutForm.controls['token'].setValue(this.stripeToken);
    console.log(this.checkoutForm.value);
    this._checkoutService.post_checkout(this.checkoutForm.value).subscribe((data) => { 
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }           
    });
  }

  change_Address() {    
    this._router.navigate(['payment-details']);
    this.addr_form = true;
    this._paymentService.get_address_detail().subscribe((data) => {
      console.log(data);
    });
  }

  change_Card() {
    this._router.navigate(['payment-details']);
    this.addr_form = false;
    this._paymentService.get_card_detail().subscribe((data) => {
      console.log(data);
    });
  }


}



