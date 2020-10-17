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

  constructor(private http: HttpClient, private router: Router) { }

  public get_product(): Observable<Products> {
    return this.http.get<Products>(this.apiURL+"/product_listing/");   
  }

  public get_product_with_filter(category: string): Observable<Products> {
    console.log(category);
    return this.http.get<Products>(this.apiURL+`/product_listing/filter/?f_cat=`+category+`&page=1&size=2&f_asc=false`);
  }

  public get_product_info(id: number): Observable<Products> {
    return this.http.get<Products>(this.apiURL+`/product_info/`+id+`/`);
  }
}
