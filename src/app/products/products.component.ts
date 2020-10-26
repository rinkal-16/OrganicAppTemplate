import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../modals/products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  filterForm: FormGroup;
  searchForm: FormGroup;
  product_data : any;
  category_data : any;
  price_data: any;
  category_name: string = undefined;
  price_name: string = undefined; 
  search_name: string = undefined; 
  name: any;
  dataDefined: Boolean;

  @ViewChild('quan', {static:false}) quan:ElementRef;
  valueQuan: number;

  constructor(private _productService: ProductService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { 
    this.productForm = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      product_id: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });  

    this.filterForm = this.formBuilder.group({
      category: new FormControl('', Validators.required)
    })

    this.searchForm = this.formBuilder.group({
      search: new FormControl('', Validators.required)
     
    })
   
    this._productService.get_product().subscribe((data) => {
      console.log(data);
      this.product_data = data['data']['products'];
      this.category_data = data['data']['category'];
      this.price_data = data['data']['price_filter'];
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
    this._productService.get_product_with_filter(checkArray.value[0]).subscribe((data) => {
      this.product_data = data['data']['products'];      
    })
  }

  valueChange(value) {
    this.valueQuan = value;
    console.log(value);
    if(value === undefined) {
      this.valueQuan = 1;      
    }    
  }

  onCategorySelect(event) {
    	const value = event.target.value;      
      this.category_name = value;
    	this.filterForm.controls['category'].setValue(value);
    	const category = this.filterForm.value.category;
  }

  onPriceSelect(event) {
    const value = event.target.value;
    this.price_name = value;
  }

  searchFilter() {
    console.log(this.searchForm.value);
    this.search_name = this.searchForm.value.search;   
  }

  submit() {    
    this._router.navigate(['/cart',this.productForm.value.quantity, this.productForm.value.product_id]);
  }

  Direct_Cart(product_id: any) {    
    //this.valueQuan = this.quan.nativeElement.value;
    console.log(this.valueQuan);
    this.productForm.controls['product_id'].setValue(product_id);    
    this._router.navigate(['/cart',this.valueQuan, product_id]); 
  }

  index: number;
  pageOfItems: Array<Products>;

  onChangePage(OfItems: any) {
    this.pageOfItems = OfItems;
    return this.pageOfItems;
  }  
}
