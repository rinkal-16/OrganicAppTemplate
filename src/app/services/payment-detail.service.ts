import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';
import { Addressdetail  } from '../modals/payment-detail';
import { Carddetail } from '../modals/card-detail';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient, private _appService: AppService) { }

  apiURL = environment.apiURL;
  token: any;

  address_detail(formData: any): Observable<Addressdetail> {  
    console.log(formData);      
    let form = new FormData();
    form.append('addr_line1', formData.addr_line1);
    form.append('addr_line2', formData.addr_line2);
    form.append('city', formData.city);
    form.append('state', formData.state);
    form.append('country', formData.country);
    form.append('postal_code', formData.postal_code);
    form.append('phone', formData.phone);
    this.token = this._appService.getToken();
    return this.http.post<Addressdetail>(this.apiURL+`/address/`,form, 
    { headers: { Authorization: this.token } });  
  }

  card_detail(formData: any, orderId: string): Observable<Carddetail> {
    let date = formData.exp_month.split("-");
    let form = new FormData();
    form.append('card_name', formData.card_holder);
    form.append('card_number', formData.card_number);
    form.append('card_cvc', formData.cvc);
    form.append('card_exp_month', date[1]);
    form.append('card_exp_year', date[0]);
    form.append('order_id', orderId);
    console.log(formData);
    console.log(orderId);
    this.token = this._appService.getToken();
    return this.http.post<Carddetail>(this.apiURL+`/card_detail/`,form,
    { headers: { Authorization: this.token } });
   
  }


}
