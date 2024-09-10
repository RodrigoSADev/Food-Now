import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { PaymentFormComponent } from 'src/app/components/payment-form/payment-form.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';
import { OrderService } from 'src/app/services/order.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddressFormComponent,
    PaymentFormComponent,
    CartComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  checkService = inject(CheckoutService);

  cart$: Signal<Cart> = this.cartService.cart;

  ngOnInit(): void {
    this.checkService.setAddress({
      cep: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
    });
    this.checkService.setPaymentMethod('');
  }
}
