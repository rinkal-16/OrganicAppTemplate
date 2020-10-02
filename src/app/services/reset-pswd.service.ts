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
    return this.http.get<any>("https://38d1047e86e1.ngrok.io/lrf/reset_password/RGSMMH/");    
  }

  public post_resetpswd(formData: any): Observable<any> {
    return this.http.post<ResetPswd>("https://38d1047e86e1.ngrok.io/lrf/reset_password/RGSMMH/", {
      pswd1: formData.password, pswd2: formData.confirmpassword
    })   
  }

}
