import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
 
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product_data : any;
  productInfoForm: FormGroup;
  review_data: any;
  buyFromCart: boolean;
  valueReview: any;

  @ViewChild('review', { static: false }) review:ElementRef;

  constructor(private _productService: ProductService, private _cartService: CartService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productInfoForm = this.formBuilder.group({
      product_id: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });  
    
    const id = this.route.snapshot.params['id'];
    this._productService.get_product_info(id).subscribe((data) => {
      console.log(data);
      this.product_data = data['data']['product'];
      this.review_data = data['data']['review'];
    });
  }

  AddCart() {
    this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
    console.log(this.productInfoForm.value);

    this._router.navigate(['/cart',this.productInfoForm.value.quantity, this.productInfoForm.value.product_id]);        
  }

  Purchase() {
    console.log(this.route.snapshot.params);
     
    this.productInfoForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);
    this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['product_id']);
    console.log(this.productInfoForm.value);
    this._productService.purchase_product(this.productInfoForm.value).subscribe((data) => {
      console.log(data);
      this.buyFromCart = data['data']['buy_from_cart'];
      console.log(this.buyFromCart);
    });
    if(this.buyFromCart === true) {
      this._router.navigate(['/checkout'], { queryParams: { buy_from_cart: true}});
    } else {
      this._router.navigate(['/checkout'], { queryParams: { buy_from_cart: false}});
    }
    
  }

  PostReview() {
    this.valueReview = this.review.nativeElement.value;
    console.log(this.review.nativeElement.value);
    this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.params['id']);
    this._productService.postReview(this.productInfoForm.value['product_id'], this.review.nativeElement.value).subscribe((data) => {
      console.log(data);  
      if(data['error']) {
        alert(data['error']);
      } else {
        alert(data['meta']['success']);
      }

    });
    this.productInfoForm.reset();
  }

  

}
 
