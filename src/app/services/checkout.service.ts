import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  paymentMethod = signal('');
  showPaymentErrorMessage = signal(false);

  // Métodos relacionados ao pagamento
  getPaymentMethod(): string {
    return this.paymentMethod();
  }

  setPaymentMethod(method: string): void {
    this.paymentMethod.set(method);
  }
}
