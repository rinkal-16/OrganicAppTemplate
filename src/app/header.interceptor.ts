import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../app/services/login.service';
import { ResetPswdService } from '../app/services/reset-pswd.service';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private _loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request);
        
  }
}
