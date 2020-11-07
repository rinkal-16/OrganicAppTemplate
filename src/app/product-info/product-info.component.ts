import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

    productInfoForm: FormGroup;
    product_data : any;  
    review_data: any;
    buyFromCart: boolean;
    valueReview: any;  
    qunty_model: any;

    @ViewChild('review', { static: false }) review:ElementRef;
    @ViewChild('qty', { static:false }) qty:ElementRef;
    valueQuan: number;
    
    constructor(private _productService: ProductService, private _cartService: CartService, private _router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.productInfoForm = this.formBuilder.group({
            product_id: new FormControl('', Validators.required),
            quantity: new FormControl('', Validators.required)
        });        
        const id = this.route.snapshot.params['id'];
        
        this._productService.get_product_info(id).subscribe((data) => {
            console.log(data);
            if(data['error']) {
                alert(data['error'])
            } else {
                console.log(data);
                this.product_data = data['data']['product'];
                this.review_data = data['data']['review'];
            }
            
        });      
    }

    AddCart() {
        if(!this.valueQuan) {
            this.productInfoForm.controls['quantity'].setValue(1);
        }
        this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
        this._router.navigate(['/cart',this.valueQuan, this.productInfoForm.value.product_id]);        
    }

    

    valueChange(value) {
        this.valueQuan = value;
        console.log(value);
        this.productInfoForm.controls['quantity'].setValue(value);
        if(value === undefined) {
          this.valueQuan = 1;      
        }    
      }

   
    Purchase() {
       
        this.valueQuan = this.qty.nativeElement.value;    
        if(!this.valueQuan) {
            this.productInfoForm.controls['quantity'].setValue(1);
        }     
        this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['id']);        
        var form = new FormData();
        form.append('quantity', this.productInfoForm.value.quantity);
        form.append('product_id', this.productInfoForm.value.product_id);
        console.log(this.productInfoForm.value);
        this._productService.post_buy_product(form).subscribe((data) => {
            console.log(data);
            if(data['error']) {
                alert(data['error']);
            } else {
                this.buyFromCart = data['data']['buy_from_cart'];
                this._router.navigate(['payment-details'], { queryParams: {
                    buy_from_cart : data['data']['buy_from_cart'], 'order_id' : data['data']['order_id'], 'addressFlag' : data['data']['address_available'], 'cardFlag' : data['data']['card_available']
                }})
                
            }
        });
          
    }
    
    PostReview() {
        this.valueReview = this.review.nativeElement.value;
        this.productInfoForm.controls['product_id'].setValue(this.route.snapshot.params['id']);
        this._productService.postReview(this.productInfoForm.value['product_id'], this.review.nativeElement.value).subscribe((data) => {
            if(data['error']) {
                alert(data['error']);
            } else {
                alert(data['meta']['success']);
                this.review_data = data['data']['product_review'];        
                this.productInfoForm.reset();
            }
        });
        this.productInfoForm.reset();
    }
}
 
