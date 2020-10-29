import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checkout } from '../modals/checkout';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  apiURL = environment.apiURL;
  checkoutData: Checkout;
  token: any;
  
  constructor(private http: HttpClient, private _appService: AppService) { }

  public post_checkout(formData: any): Observable<Checkout> {
    let form = new FormData();
    form.append('order_id', formData.order_id);
    form.append('shipping_addr', formData.shipping_address);    
    this.token = this._appService.getToken();   
    return this.http.post<Checkout>(this.apiURL+`/checkout/`,form,
    { headers: { Authorization: this.token } });      
  }

  public payment_gateway(formData: any): Observable<Checkout> {
    let form = new FormData();
    form.append('token', formData.token['id']);
    form.append('name', formData.name);
    form.append('addr_line1', formData.addr_line1);
    form.append('addr_line2', formData.addr_line2);
    form.append('amount', formData.amount);
    form.append('city', formData.city);
    form.append('state', formData.state);
    form.append('currency', formData.currency);
    form.append('country', formData.country);
    form.append('postal_code', formData.postal_code);  
    form.append('phone', formData.phone);
    this.token = this._appService.getToken();
    return this.http.post<Checkout>(this.apiURL+`/stripe/`, form, 
    { headers: { Authorization: this.token } }); 
  }

}
