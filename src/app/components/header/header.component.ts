import { Component, inject, Signal } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartService = inject(CartService);
  cart$: Signal<Cart> = this.cartService.cart;
}
