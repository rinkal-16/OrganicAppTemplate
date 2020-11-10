import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  cart_data: any;
  addToCartForm: FormGroup;
  buyFromCart: boolean;
  total: any;
  orderId: any;
  addrAvailability: boolean;
  cardAvailability: boolean;

  bucketCart: boolean = false;
  emptyCart: boolean = false;

  constructor(private _cartService: CartService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addToCartForm = this.formBuilder.group({
      product_id: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });

    // this.bucketCart = true;
    // this.emptyCart = false;

    if (JSON.stringify(this.route.snapshot.params) == '{}') {
      this._cartService.get_cart().subscribe((data) => {
        console.log(data);
        if (data['status_code'] == 404) {
          this.emptyCart = true;
          
        }
        if (data['error']) {
          alert(data['error']);
        } else {
          this.bucketCart = true;
          
          this.cart_data = data['data']['cart_product'];
          console.log(this.cart_data);
          this.total = data['data']['total_price'];
        }
      });
    } else {
      this.addToCartForm.controls['product_id'].setValue(this.route.snapshot.params['product_id']);
      this.addToCartForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);
      this._cartService.post_cart(this.addToCartForm.value).subscribe((data) => {
        if (data['status_code'] == 404) {
          this.emptyCart = true;
          
        }
        if (data['error']) {
          alert(data['error']);
        } else {
          this.bucketCart = true;
         
          this.cart_data = data['data']['cart_product'];
          this.total = data['data']['total_price'];
        }
      });
    }
  }

  Remove(item) {
    this._cartService.delete_cart(item).subscribe((data) => {
      if (data['status_code'] == 404) {
        this.emptyCart = true;
      }
      if (data['error']) {
        alert(data['error']);
        this.bucketCart = false;
        this.emptyCart = true;
      } else {
        this.bucketCart = true;
        this.cart_data = data['data']['cart_product'];
      }
    });
  }

  checkout() {
    this._cartService.buy_from_cart().subscribe((data) => {
      console.log(data);
      if (data['error']) {
        alert(data['error']);        
      } 
      else {
        this.buyFromCart = data['data']['buy_from_cart'];
        console.log(this.buyFromCart);
        this.orderId = data['data']['order_id'];
        this.addrAvailability = data['data']['address_available'];
        this.cardAvailability = data['data']['card_available'];
        console.log(this.addrAvailability);
        console.log(this.cardAvailability);
        this._router.navigate(['payment-details'], { queryParams: { 'buy_from_cart': data['data']['buy_from_cart'], 'order_id': this.orderId, 'addressFlag': data['data']['address_available'], 'cardFlag': data['data']['card_available'] }})
        
      }
    });     
  }

  add_product() {
    this._router.navigate(['products']);
  }
  
}



