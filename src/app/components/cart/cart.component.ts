import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cart, CartItem } from 'src/app/interfaces/cart.interface';
import { FoodItem } from 'src/app/interfaces/food.interface';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);
  router = inject(Router);

  cart$: Signal<Cart> = this.cartService.cart;
  deliveryValue = 5;

  onIncrease(food: FoodItem): void {
    this.cartService.addToCart(food);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Adicionado ao carrinho!',
      text: `Item adicionado com sucesso!`,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  onDecrease(productId: number): void {
    this.cartService.removeFromCart(productId);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Removido do carrinho!',
      text: `Item removido com sucesso!`,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  onRemove(item: CartItem) {
    this.cartService.clearItemFromCart(item);
  }

  onConfirmOrder() {
    const paymentValid = this.checkoutService.validatePayment();
    const addressValid = this.checkoutService.validateAddress();

    if (paymentValid && addressValid) {
      this.router.navigate(['/confirm-order']);
      this.cartService.clearCart();
    } else {
      if (!paymentValid) {
        this.checkoutService.showPaymentErrorMessage.set(true);
        console.log('Pagamento inválido, faltam informações obrigatórias.');
      }
      if (!addressValid) {
        this.checkoutService.showAddressErrorMessage.set(true);
        console.log('Endereço inválido, faltam informações obrigatórias.');
      }
    }
  }
}
