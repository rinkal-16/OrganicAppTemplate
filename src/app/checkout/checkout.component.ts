import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  order_data: any;
  order_buy_product: any;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _cartService: CartService, private route: ActivatedRoute, private _checkoutService: CheckoutService ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      shipping_address: new FormControl('', Validators.required),
      order_id: new FormControl('', Validators.required)
    });
    console.log(this.route.snapshot);
    this._cartService.buy_from_cart().subscribe((data) => {
      console.log(data);  
      const order_data = data['data']['order_id'];
      const order_buy_product = data['data']['buy_products']; 
      
    });
  }

  get validate() {
    return this.checkoutForm.controls;
  }

  Submit_Checkout($event) { 
    this.checkoutForm.controls['order_id'].setValue(this.order_data);
    this._checkoutService.post_checkout(this.checkoutForm.value).subscribe((data) => {
      console.log(data);
      alert(data['error']);
    })
    
  }

}
