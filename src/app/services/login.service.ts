import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modals/login';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginData: Login;
  

  constructor(private http: HttpClient) { }

  public get_login(): Observable<Login> {
    return this.http.get<Login>("https://23b6cab7c290.ngrok.io/lrf/login/");   
  }

  public post_login(formData: any): Observable<Login> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    form.append('pswd', formData.password);   
    const token = localStorage.getItem('token');
    let bearer : string = "Bearer ";
    let stringToken : string = localStorage.getItem('token');
    var removeQuotes = stringToken.split('"').join('');
    var concatString : string = bearer + stringToken
    var concatString : string = bearer.concat(removeQuotes);
    return this.http.post<Login>("https://23b6cab7c290.ngrok.io/lrf/login/", form, {
      headers: {'Authorization ': concatString}
    });
    // {
    //   email: formData.email, pswd: formData.password
    // }) 
     
  }
  
  
}
