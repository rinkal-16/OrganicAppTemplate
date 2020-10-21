import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  order_data: any;
  order_buy_product: any;
  orderId: number;
  checkBoolen: boolean;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _cartService: CartService, private route: ActivatedRoute, private _checkoutService: CheckoutService, private _productService: ProductService ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      shipping_address: new FormControl('', Validators.required),
      order_id: new FormControl('', Validators.required)
    });

    console.log(this.route.snapshot.queryParams);
    this.checkBoolen = this.route.snapshot.queryParams['buy_from_cart'];
    var form = new FormData();
    form.append('quantity', this.route.snapshot.queryParams['quantity']);
    form.append('product_id', this.route.snapshot.queryParams['id']);
    console.log(form);
    if(this.checkBoolen === true) {
      this._cartService.buy_from_cart().subscribe((data) => {
        console.log(data);  
        this.order_data = data['data']['order_id'];
        this.order_buy_product = data['data']['buy_products'];             
      });
    } else {
      this._productService.post_buy_product(form).subscribe((data) => {
        console.log(data);
        if(data['error']) {
          alert(data['error']);
        } else {
          this.order_data = data['data']['order_id'];
          this.order_buy_product = data['data']['buy_product']; 
        }        
      })
    }    
  }

  get validate() {
    return this.checkoutForm.controls;
  }

  Submit_Checkout($event) { 
    this.checkoutForm.controls['order_id'].setValue(this.order_data);
    this._checkoutService.post_checkout(this.checkoutForm.value).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }
      
    })
    
  }

}
