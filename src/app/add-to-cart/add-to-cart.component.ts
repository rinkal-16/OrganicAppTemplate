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

  cart_data : any;
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
    
    if(JSON.stringify(this.route.snapshot.params) == '{}') {
      this._cartService.get_cart().subscribe((data) => {
        if(data['status_code'] == 404) {
          this.emptyCart = true;        
        }
        if(data['error']) {
          alert(data['error']);
        } else {
          this.bucketCart = true;
          this.cart_data = data['data']['cart_product'];
          this.total = data['data']['total_price'];
        }       
      });
    } else {      
      this.addToCartForm.controls['product_id'].setValue(this.route.snapshot.params['product_id']);
      this.addToCartForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);     
      this._cartService.post_cart(this.addToCartForm.value).subscribe((data) => {
        if(data['status_code'] == 404) {
          this.emptyCart = true;        
        }
        if(data['error']) {
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
      if(data['status_code'] == 404) {
        this.emptyCart = true;        
      }
      if(data['error']) {
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
      if(data['error']) {
        alert(data['error']);
         
        if(data['status_code'] == 404) {
          this._router.navigate( ['payment-details'], { queryParams: { order_id : this.orderId } });
        }
      } else {
        this.buyFromCart = data['data']['buy_from_cart'];
        this.orderId = data['data']['order_id'];
        this.addrAvailability = data['data']['address_available'];
        this.cardAvailability = data['data']['card_available'];   
        console.log(this.addrAvailability);
        console.log( this.cardAvailability);
        if(this.addrAvailability == true && this.cardAvailability == true) {
          this._router.navigate( ['checkout'], { queryParams: { order_id : this.orderId } });
        } else if (this.addrAvailability == false) {
          this._router.navigate( ['payment-details'], { queryParams: { order_id : this.orderId } });
        } else if (this.addrAvailability == true && this.cardAvailability == false) {
          this._router.navigate( ['payment-details'], { queryParams: { order_id : this.orderId } });
        }
        //this._router.navigate( ['payment-details'], { queryParams: { order_id : this.orderId } });
      }      
    });
    
    
    // if(this.buyFromCart = true) {
    //   this._router.navigate( ['checkout'], { queryParams: { buy_from_cart: true } });
    // } else {
    //   this._router.navigate( ['checkout'], { queryParams: { buy_from_cart: false } });
    // }
  }

  add_product() {
    this._router.navigate(['products']);
  }
}
