import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Checkout } from '../modals/checkout';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  apiURL = environment.apiURL;

  checkoutData: Checkout;
  rconcatString: any;

  constructor(private http: HttpClient, private router: Router) { }

  

  public post_checkout(formData: any): Observable<Checkout> {
    let form = new FormData();
    form.append('order_id', formData.order_id);
    form.append('shipping_addr', formData.shipping_address);

    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      this.rconcatString = bearer.concat(removeQuotes);
    }

    return this.http.post<Checkout>(this.apiURL+`/checkout/`,form,
    { headers: { Authorization: this.rconcatString } });   
  }

}
