import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../app/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'organicApp';

  constructor(private router: Router, private _cartService: CartService) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  cart() {
    this._cartService.get_cart().subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/cart']);
  }
}
