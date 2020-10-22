import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  Token: string;

  constructor() { }

  getToken() {
    const token = localStorage.getItem('token');
    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let tokenString : string = localStorage.getItem('token');    
      var removeQuotes = tokenString.split('"').join('');     
      var concatToken : string = bearer + tokenString;
      this.Token = bearer.concat(removeQuotes);
    }
    return this.Token;
  }
}
