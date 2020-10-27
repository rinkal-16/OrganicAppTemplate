import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modals/login';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL = environment.apiURL;
  isLoggedIn: boolean = false;
  public redirectUrl: string;
  loginData: Login;
    
  constructor(private http: HttpClient, private router: Router) { }

  public get_login(): Observable<Login> {
    return this.http.get<Login>(this.apiURL+"/login/");   
  }

  public post_login(formData: any): Observable<Login> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    form.append('pswd', formData.password);   
    
    if(this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
    return this.http.post<Login>(this.apiURL+"/login/", form);     
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  
  
}
