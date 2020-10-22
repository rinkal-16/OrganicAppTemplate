import { Injectable } from '@angular/core';
import { Products } from '../modals/products';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL = environment.apiURL;
  rconcatString: string;
  pricebool: Boolean;
  token: any;

  constructor(private http: HttpClient, private router: Router, private _appService: AppService) { }

  public get_product(): Observable<Products> {
    return this.http.get<Products>(this.apiURL+"/product_listing/?page=1&size=6");   
  }

  public get_product_with_filter(category: string): Observable<Products> {
    console.log(category);
    return this.http.get<Products>(this.apiURL+`/product_listing/filter/?f_cat=`+category+`&page=1&size=2&f_asc=false`);
  }

  public getProductList(page: number): Observable<Products> {
    console.log(page);
    return this.http.get<Products>(this.apiURL+`/product_listing/?page=`+page+`&size=4`);
  }

  public getProduct_with_List_Filter(category: string, price: string, page: number) {
    console.log(category, price, page);
    if(price !== undefined) {
      if (price == 'low to high') {
        this.pricebool = true;
        console.log('low to high', this.pricebool);
      } 
      else {
        this.pricebool = false;
      }
    }
    else {
      this.pricebool = false;
    }
    return this.http.get<Products>(this.apiURL+`/demo/?f_cat=`+category+`&page=`+page+`&size=4&f_search&f_asc=`+this.pricebool);
  }

  public get_product_info(id: number): Observable<Products> {
    return this.http.get<Products>(this.apiURL+`/product_info/`+id+`/`);
  }

  public purchase_product(formData: any) {
    let form: FormData = new FormData();
    form.append('product_id', formData.product_id);
    form.append('quantity', formData.quantity); 
    
    this.token = this._appService.getToken();

    return this.http.post<Products>(this.apiURL+`/buy_product/`, formData,
    { headers: { Authorization: this.token } });
  }

  public postReview(product_id, review) {    
    var form = new FormData();
    form.append('review', review);

    this.token = this._appService.getToken();
    
    return this.http.post(this.apiURL+`/review/`+product_id+`/`, form, {
      headers: { Authorization: this.token }
    });
    
  } 

  public post_buy_product(formData: any): Observable<Products> {    
    console.log(formData);    
    
    this.token = this._appService.getToken();

    return this.http.post<Products>(this.apiURL+`/buy_product/`, formData,
    { headers: { Authorization: this.token }});
  }

}




