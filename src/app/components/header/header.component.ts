import { Component, inject, Signal } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { Cart } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartService = inject(CartService);
  cart$: Signal<Cart> = this.cartService.cart;
}
