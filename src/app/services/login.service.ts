import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../modals/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginData: Login;

  constructor(private http: HttpClient) { }

  public get_login(): Observable<Login> {
    return this.http.get<Login>("https://38d1047e86e1.ngrok.io/lrf/login/");   
  }

  public post_login(formData: any): Observable<Login> {
    return this.http.post<Login>("https://38d1047e86e1.ngrok.io/lrf/login/", 
    { email: formData.email, pswd: formData.password })   
  }
}
