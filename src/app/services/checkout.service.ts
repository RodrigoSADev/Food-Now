import { Injectable, signal } from '@angular/core';
import { Address } from '../interfaces/address.interface';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  paymentMethod = signal('');
  showPaymentErrorMessage = signal(false);

  address = signal<Address>({
    cep: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
  });
  showAddressErrorMessage = signal(false);

  // Métodos relacionados ao pagamento
  getPaymentMethod(): string {
    return this.paymentMethod();
  }
  setPaymentMethod(method: string): void {
    this.paymentMethod.set(method);
  }

  validatePayment(): boolean {
    return this.getPaymentMethod() !== '';
  }

  // Métodos relacionados ao endereço
  getAddress(): Address {
    return this.address();
  }

  setAddress(address: Address): void {
    this.address.set(address);
  }
  validateAddress(): boolean {
    return (
      this.getAddress().cep !== '' &&
      this.getAddress().city !== '' &&
      this.getAddress().neighborhood !== '' &&
      this.getAddress().street !== '' &&
      this.getAddress().number !== ''
    );
  }
}
