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
    form.append('currency', formData.currency);
    form.append('token', formData.token);
    console.log(formData.order_id);
    
    this.token = this._appService.getToken();   
    return this.http.post<Checkout>(this.apiURL+`/checkout/`,form,
    { headers: { Authorization: this.token } });      
  }

  public get_checkout(id: number): Observable<Checkout> {
    console.log(id); 
    this.token = this._appService.getToken();
    return this.http.get<Checkout>(this.apiURL+`/checkout/?order_id=${id}`,
    { headers: { Authorization: this.token } }); 
  }

  

}
