import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cart, CartItem } from 'src/app/interfaces/cart.interface';
import { FoodItem } from 'src/app/interfaces/food.interface';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

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
  orderService = inject(OrderService);

  cart$: Signal<Cart> = this.cartService.cart;
  deliveryValue = 5;

  onIncrease(food: FoodItem): void {
    this.cartService.addToCart(food);
  }

  onDecrease(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onRemove(item: CartItem) {
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

  onConfirmOrder() {
    const paymentValid = this.checkoutService.validatePayment();
    const addressValid = this.checkoutService.validateAddress();

    if (paymentValid && addressValid) {
      this.router.navigate(['/confirm-order']);
      this.cartService.clearCart();
      this.orderService.resetOrder();
    } else {
      if (!paymentValid) {
        this.checkoutService.showPaymentErrorMessage.set(true);
      }
      if (!addressValid) {
        this.checkoutService.showAddressErrorMessage.set(true);
      }
    }
  }
}
