import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ICart, ICartItem } from '../../interfaces/cart.interface';
import { IFoodItem } from '../../interfaces/food.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);

  cart$: Signal<ICart> = this.cartService.cart;
  deliveryValue = 5;

  onIncrease(food: IFoodItem): void {
    this.cartService.addToCart(food);
  }

  onDecrease(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onRemove(item: ICartItem) {
    this.cartService.clearItemFromCart(item);
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Removido do carrinho!',
      text: `${item.name} removido com sucesso!`,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
