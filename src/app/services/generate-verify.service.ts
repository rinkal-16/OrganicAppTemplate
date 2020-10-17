import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerateVerify } from '../modals/generate-verify';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GenerateVerifyService {

  apiURL = environment.apiURL;

  generateVerify: GenerateVerify;

  constructor(private http: HttpClient) { }

  public get_gnrtvrfcnt(): Observable<any> {
    return this.http.get<any>(this.apiURL+"/generate_verification/");    
  }

  public post_gnrtvrfcnt(formData: any): Observable<GenerateVerify> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    
    return this.http.post<GenerateVerify>(this.apiURL+"/generate_verification/", form);
  }
}