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
    return this.http.get<any>("https://6595ebe5cfce.ngrok.io/lrf/signup/");    
  }

  public post_signup(formData: any): Observable<Signup> {
    let form: FormData = new FormData();
    form.append('fname', formData.firstname);
    form.append('lname', formData.lastname);
    form.append('email', formData.email);
    form.append('pswd1', formData.password); 
    form.append('pswd2', formData.confirmpassword);
    
    return this.http.post<Signup>("https://6595ebe5cfce.ngrok.io/lrf/signup/", form);  
   
  }

}
 
