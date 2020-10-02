import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signup } from '../modals/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  signupData: Signup;

  constructor(private http: HttpClient) { }

  public get_signup(): Observable<any> {
    return this.http.get<any>("https://38d1047e86e1.ngrok.io/lrf/signup/");    
  }

  public post_signup(formData: any): Observable<Signup> {
    return this.http.post<Signup>("https://38d1047e86e1.ngrok.io/lrf/signup/", {
      email: formData.email, fname: formData.firstname, lname: formData.lastname, pswd1: formData.password, pswd2: formData.confirmpassword
    })   
  }

}
 
