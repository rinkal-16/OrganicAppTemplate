import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSummary } from '../modals/order-summary';
import { Router } from '@angular/router'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(private http: HttpClient, private router: Router) { }
  
}
