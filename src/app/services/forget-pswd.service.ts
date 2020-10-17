import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForgetPswd } from '../modals/forget-pswd';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPswdService {

  apiURL = environment.apiURL;

  forgetpswdData: ForgetPswd;

  constructor(private http: HttpClient) { }

  public get_forgetpswd(): Observable<any> {
    return this.http.get<any>(this.apiURL+"/forgot_password/");    
  }

  public post_forgetpswd(formData: any): Observable<ForgetPswd> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    
    return this.http.post<ForgetPswd>(this.apiURL+"/forgot_password/", form);
  }

}
