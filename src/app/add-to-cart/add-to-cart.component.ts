import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  cart_data : any;
  addToCartForm: FormGroup;

  constructor(private _cartService: CartService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addToCartForm = this.formBuilder.group({
      product_id: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    }); 
    console.log(this.route.snapshot.params);
    this.addToCartForm.controls['product_id'].setValue(this.route.snapshot.params['product_id']);
    this.addToCartForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);
        
    console.log(this.route.snapshot.params);
    this._cartService.post_cart(this.addToCartForm.value).subscribe((data) => {
      console.log(data);
      this.cart_data = data['data']['cart_product'];
    });
  }

  Remove(item) {
    console.log(item);
    this._cartService.delete_cart(item).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      } else {
        this.cart_data = data['data']['cart_product'];
      }      
    });    
  }

  checkout() {
    this._router.navigate(['checkout']);
  }

}
