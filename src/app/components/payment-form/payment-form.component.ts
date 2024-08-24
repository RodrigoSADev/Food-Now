import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  formBuild = inject(FormBuilder);

  paymentForm = this.formBuild.group({
    paymentMethod: [null as string | null, Validators.required],
  });

  onSubmit() {
    if (this.paymentForm.valid) {
      const selectedPayment = this.paymentForm.value.paymentMethod;
      console.log('Forma de pagamento selecionada:', selectedPayment);
      // Adicione a lógica para enviar os dados do formulário
    } else {
      console.log('Por favor, selecione uma forma de pagamento.');
    }
  }
}
