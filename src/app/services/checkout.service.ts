import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  rconcatString: any;
  token: any;

  constructor(private http: HttpClient, private router: Router, private _appService: AppService) { }

  public post_checkout(formData: any): Observable<Checkout> {
    let form = new FormData();
    form.append('order_id', formData.order_id);
    form.append('shipping_addr', formData.shipping_address);

    this.token = this._appService.getToken();
    
    return this.http.post<Checkout>(this.apiURL+`/checkout/`,form,
    { headers: { Authorization: this.rconcatString } });   
  }

}
