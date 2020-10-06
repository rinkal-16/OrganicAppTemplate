import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modals/login';
import { stringify } from 'querystring'; 
import { Router } from '@angular/router';
import { empty } from 'rxjs/internal/observable/empty';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  public redirectUrl: string;

  loginData: Login;
  
  constructor(private http: HttpClient, private router: Router) { }

  public get_login(): Observable<Login> {
    return this.http.get<Login>("https://fde0c9e1b0ce.ngrok.io/lrf/login/");   
  }

  public post_login(formData: any): Observable<Login> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    form.append('pswd', formData.password);   
    const token = localStorage.getItem('token');
    let bearer : string = "Bearer ";
    let stringToken : string = localStorage.getItem('token');
    if(! empty) {
      var removeQuotes = stringToken.split('"').join('');
    }  
    var concatString : string = bearer + stringToken
    var concatString : string = bearer.concat(removeQuotes);
    return this.http.post<Login>("https://fde0c9e1b0ce.ngrok.io/lrf/login/", form, 
    {
      headers: {'Authorization': concatString}
    });
    this.isLoggedIn = true;
    if(this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
    // {
    //   email: formData.email, pswd: formData.password
    // }) 
     
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  
  
}
