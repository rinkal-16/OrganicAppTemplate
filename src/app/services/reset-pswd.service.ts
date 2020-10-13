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
    return this.http.get<any>("https://ef840d9c09d3.ngrok.io/lrf/reset_password/");    
  }

  public post_resetpswd(formData: any, token: string): Observable<any> {
    let form: FormData = new FormData();
    form.append('pswd1', formData.password);
    form.append('pswd2', formData.confirmpassword); 
    
    return this.http.post<ResetPswd>("https://ef840d9c09d3.ngrok.io/lrf/reset_password/"+token,  form);  
  }

}
