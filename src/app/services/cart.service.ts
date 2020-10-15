import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../modals/cart';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
    return this.http.post<Cart>("https://aa09bb498911.ngrok.io/lrf/cart/",form, 
    { headers: { Authorization: concatString}});   
  }

}
