import { Injectable, signal } from '@angular/core';
import { IAddress } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  paymentMethod = signal('');
  showPaymentErrorMessage = signal(false);

  address = signal<IAddress>({
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
    return !!this.paymentMethod();
  }

  // Métodos relacionados ao endereço
  getAddress(): IAddress {
    return this.address();
  }

  setAddress(address: IAddress): void {
    this.address.set(address);
  }

  validateAddress(): boolean {
    const { cep, city, neighborhood, street, number } = this.address();
    return !!cep && !!city && !!neighborhood && !!street && !!number;
  }
}
