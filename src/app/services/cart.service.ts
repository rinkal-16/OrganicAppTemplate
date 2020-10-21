import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../modals/cart';
import { Router } from '@angular/router'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiURL = environment.apiURL;

  cartData: Cart;

  constructor(private http: HttpClient, private router: Router) { }

  public post_cart(formData: any): Observable<Cart> {
    let form: FormData = new FormData();
    form.append('product_id', formData.product_id);
    form.append('quantity', formData.quantity);

    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      var concatString : string = bearer.concat(removeQuotes);
    }
    return this.http.post<Cart>(this.apiURL+`/cart/`,form, 
    { headers: { Authorization: concatString}});   
  }

  public delete_cart(id: number): Observable<Cart> {
    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      var concatString : string = bearer.concat(removeQuotes);
    }
    return this.http.delete<Cart>(this.apiURL+`/cart/`+id+`/` , 
    { headers: { Authorization: concatString } });
  }

  public get_cart(): Observable<Cart> {
    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      var concatString : string = bearer.concat(removeQuotes);
    }
    return this.http.get<Cart>(this.apiURL+`/cart/`, 
    { headers: { Authorization: concatString } });
  }

  public buy_from_cart(): Observable<Cart> {
    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      var concatString : string = bearer.concat(removeQuotes);
    }
    return this.http.post<Cart>(this.apiURL+`/buy_cart/`, {},
    { headers: { Authorization: concatString } });
  }

  

}


