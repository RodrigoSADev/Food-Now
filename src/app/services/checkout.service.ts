import { Injectable, signal } from '@angular/core';
import { IAddress } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  paymentMethod = signal('');
  savedPaymentMethod = signal('');
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
  setPaymentMethod(method: string): void {
    this.paymentMethod.set(method);
  }

  validatePayment(): boolean {
    return !!this.paymentMethod();
  }

  getSavedPaymentMethod(): string {
    return this.savedPaymentMethod();
  }

  setSavedPaymentMethod(method: string): void {
    this.savedPaymentMethod.set(method);
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
