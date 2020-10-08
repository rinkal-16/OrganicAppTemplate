import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerateVerify } from '../modals/generate-verify';

@Injectable({
  providedIn: 'root'
})
export class GenerateVerifyService {

  generateVerify: GenerateVerify;

  constructor(private http: HttpClient) { }

  public get_gnrtvrfcnt(): Observable<any> {
    return this.http.get<any>("https://dec9f985aa0b.ngrok.io/lrf/generate_verification/");    
  }

  public post_gnrtvrfcnt(formData: any): Observable<GenerateVerify> {
    let form: FormData = new FormData();
    form.append('email', formData.email);
    
    return this.http.post<GenerateVerify>("https://dec9f985aa0b.ngrok.io/lrf/generate_verification/", form);
  }
}