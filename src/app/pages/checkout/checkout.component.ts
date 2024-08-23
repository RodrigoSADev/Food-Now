import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { PaymentFormComponent } from 'src/app/components/payment-form/payment-form.component';
import { CartComponent } from 'src/app/components/cart/cart.component';

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
export class CheckoutComponent {}
