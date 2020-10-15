import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product_data : any;
  productInfoForm: FormGroup;

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
    });
  }

  AddCart() {
    this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
    console.log(this.productInfoForm.value);
    this._cartService.post_cart(this.productInfoForm.value).subscribe((data) => {
      console.log(data);
    });
    
    this._router.navigate(['/cart']);
  }

  Purchase(event: any) {
    this._router.navigate(['/checkout']);
  }

  

}
