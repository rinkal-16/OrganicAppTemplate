import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getToken() {
    const token = localStorage.getItem('token');
    if(localStorage.getItem('token')) {
      let bearer : string = "Bearer ";
      let stringToken : string = localStorage.getItem('token');    
      var removeQuotes = stringToken.split('"').join('');     
      var concatString : string = bearer + stringToken
      var concatString : string = bearer.concat(removeQuotes);
    }
  }
}
