import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICart } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartService = inject(CartService);

  cart$: Signal<ICart> = this.cartService.cart;
}
