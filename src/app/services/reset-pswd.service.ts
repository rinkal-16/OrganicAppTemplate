import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResetPswd } from '../modals/reset-pswd';

@Injectable({
  providedIn: 'root'
})
export class ResetPswdService {

  resetpswdData: ResetPswd;

  constructor(private http: HttpClient) { }

  public get_resetpswd(): Observable<any> {
    return this.http.get<any>("https://23b6cab7c290.ngrok.io/lrf/reset_password/RGSMMH/");    
  }

  public post_resetpswd(formData: any): Observable<any> {
    let form: FormData = new FormData();
    form.append('pswd1', formData.password);
    form.append('pswd2', formData.confirmpassword); 
    
    return this.http.post<ResetPswd>("https://23b6cab7c290.ngrok.io/lrf/reset_password/RGSMMH/", form, {
      headers: {'Content-type': 'application/form-data; chartset=utf-8'}
    }); 
    // {
    //   pswd1: formData.password, pswd2: formData.confirmpassword
    // })   
  }

}
