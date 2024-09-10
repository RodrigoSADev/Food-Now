import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  formBuild = inject(FormBuilder);
  checkoutService = inject(CheckoutService);
  orderService = inject(OrderService);

  paymentForm = this.formBuild.group({
    paymentMethod: ['', [Validators.required]],
  });

  onSelectPaymentMethod(method: string) {
    // Seleciona o método de pagamento e dispara um evento para o service
    if (this.paymentForm.valid) {
      this.checkoutService.setPaymentMethod(method);
      this.checkoutService.showPaymentErrorMessage.set(false); // Esconde a mensagem de erro quando um método é selecionado
    }
  }
}
