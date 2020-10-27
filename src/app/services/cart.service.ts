import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../modals/cart';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  apiURL = environment.apiURL;
  cartData: Cart;
  token: any;

  constructor(private http: HttpClient, private _appService: AppService) { }

  public post_cart(formData: any): Observable<Cart> {
    let form: FormData = new FormData();
    form.append('product_id', formData.product_id);
    form.append('quantity', formData.quantity);
    this.token = this._appService.getToken();    
    return this.http.post<Cart>(this.apiURL+`/cart/`,form, 
    { headers: { Authorization: this.token }});   
  }

  public delete_cart(id: number): Observable<Cart> {
    this.token = this._appService.getToken();    
    return this.http.delete<Cart>(this.apiURL+`/cart/${id}/` , 
    { headers: { Authorization: this.token }});
  }

  public get_cart(): Observable<Cart> {
    this.token = this._appService.getToken();    
    return this.http.get<Cart>(this.apiURL+`/cart/`, 
    { headers: { Authorization: this.token }});
  }

  public buy_from_cart(): Observable<Cart> {
    this.token = this._appService.getToken();   
    return this.http.post<Cart>(this.apiURL+`/buy_cart/`, {},
    { headers: { Authorization: this.token }});
  }

}


