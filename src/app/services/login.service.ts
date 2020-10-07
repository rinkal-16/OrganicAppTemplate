import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modals/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  public redirectUrl: string;

  loginData: Login;
  
  constructor(private http: HttpClient, private router: Router) { }

  public get_login(): Observable<Login> {
    return this.http.get<Login>("https://988cbe80f9a7.ngrok.io/lrf/login/");   
  }

  public post_login(formData: any): Observable<Login> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    form.append('pswd', formData.password);   
    const token = localStorage.getItem('token');
    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      var concatString : string = bearer.concat(removeQuotes);
    }
         
    //this.isLoggedIn = true;
    if(this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
    return this.http.post<Login>("https://988cbe80f9a7.ngrok.io/lrf/login/", form); 
    // {
    //   headers: {'Authorization': concatString}
    // });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  
  
}
