import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICart } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartService = inject(CartService);

  cart$: Signal<ICart> = this.cartService.cart;
}
