import { Injectable } from '@angular/core';
import { Products } from '../modals/products';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL = environment.apiURL;
  rconcatString: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get_product(): Observable<Products> {
    return this.http.get<Products>(this.apiURL+"/product_listing/?page=1&size=6");   
  }

  public get_product_with_filter(category: string): Observable<Products> {
    console.log(category);
    return this.http.get<Products>(this.apiURL+`/product_listing/filter/?f_cat=`+category+`&page=1&size=2&f_asc=false`);
  }

  public get_product_info(id: number): Observable<Products> {
    return this.http.get<Products>(this.apiURL+`/product_info/`+id+`/`);
  }

  public purchase_product(formData: any) {
    let form: FormData = new FormData();
    form.append('product_id', formData.product_id);
    form.append('quantity', formData.quantity); 

    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      this.rconcatString = bearer.concat(removeQuotes);
    }
    return this.http.post<Products>(this.apiURL+`/buy_product/`, formData,
    { headers: { Authorization: this.rconcatString } });

  }

  public getProductList(page: number): Observable<Products> {
    console.log(page);
    return this.http.get<Products>(this.apiURL+`/product_listing/?page=`+page+`&size=4`);
  }

  public postReview(product_id, review) {
    

    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      this.rconcatString = bearer.concat(removeQuotes);
    }
    var form = new FormData();
    form.append('review', review);
    return this.http.post(this.apiURL+`/review/`+product_id+`/`, form, {
      headers: { Authorization: this.rconcatString }
    });
    
  } 

  public post_buy_product(formData: any): Observable<Products> {
    console.log(formData);
    let form: FormData = new FormData();
    form.append('product_id', formData.product_id);
    form.append('quantity', formData.quantity); 

    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      this.rconcatString = bearer.concat(removeQuotes);
    }
    return this.http.post<Products>(this.apiURL+`/buy_product`+`/`, formData,
    { headers: { Authorization: this.rconcatString}});
  }

}
