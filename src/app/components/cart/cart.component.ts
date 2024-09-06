import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
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

  cart$: Signal<Cart> = this.cartService.cart;
  deliveryValue = 5;

  addItem(food: FoodItem): void {
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

  removeItem(productId: number): void {
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

  confirmOrder() {
    const paymentValid = this.checkoutService.validatePayment();
    const addressValid = this.checkoutService.validateAddress();

    console.log('Address from service: ', this.checkoutService.address());

    if (paymentValid && addressValid) {
      console.log('Pedido confirmado com:', {
        payment: this.checkoutService.getPaymentMethod(),
        address: this.checkoutService.getAddress(),
      });
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

  clearCart(): void {
    this.cartService.clearCart();
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Carrinho limpo!',
      text: 'Todos os itens foram removidos do carrinho.',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
