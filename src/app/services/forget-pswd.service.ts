import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForgetPswd } from '../modals/forget-pswd';

@Injectable({
  providedIn: 'root'
})
export class ForgetPswdService {

  forgetpswdData: ForgetPswd;

  constructor(private http: HttpClient) { }

  public get_forgetpswd(): Observable<any> {
    return this.http.get<any>("https://988cbe80f9a7.ngrok.io/lrf/forgot_password/");    
  }

  public post_forgetpswd(formData: any): Observable<ForgetPswd> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    
    return this.http.post<ForgetPswd>("https://988cbe80f9a7.ngrok.io/lrf/forgot_password/", form);
  }

}
