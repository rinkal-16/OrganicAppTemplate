import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  product_data : any;
  category_data : any;


  constructor(private _productService: ProductService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { 
    this.productForm = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this._productService.get_product().subscribe((data) => {
      console.log(data);
      this.product_data = data['data']['products'];
      this.category_data = data['data']['category'];
    })
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.productForm.get('checkArray') as FormArray;  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(checkArray.value[0]);
    this._productService.get_product_with_filter(checkArray.value[0]).subscribe((data) => {
      console.log(data);
      this.product_data = data['data']['products'];
      
    })
  }

  submit() {
    //this.productForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
    console.log(this.productForm.value);
    this._router.navigate(['/cart',this.productForm.value.quantity, this.productForm.value.product_id]);
  }

  Direct_Cart() {
    //this.productForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
    console.log(this.productForm.value);
    this._router.navigate(['/cart',this.productForm.value.quantity, this.productForm.value.product_id]);
  }

  
}
