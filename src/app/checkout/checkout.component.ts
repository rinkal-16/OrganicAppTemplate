import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { ProductService } from '../services/product.service';

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
  
  constructor(private formBuilder: FormBuilder, private _cartService: CartService, private route: ActivatedRoute, private _checkoutService: CheckoutService, private _productService: ProductService ) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      shipping_address: new FormControl('', Validators.required),
      order_id: new FormControl('', Validators.required)
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

}
