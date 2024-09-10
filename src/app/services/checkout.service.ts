import { Injectable, signal } from '@angular/core';
import { Address } from '../interfaces/address.interface';
import { OrderService } from './order.service';
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

  constructor(private orderService: OrderService) {
    // Carrega dados do localStorage ao iniciar
    const savedData = this.orderService.getOrderData();
    if (savedData) {
      this.paymentMethod.set(savedData.paymentMethod);
      this.address.set(savedData.address);
    }
  }

  // Métodos relacionados ao pagamento
  getPaymentMethod(): string {
    return this.paymentMethod();
  }
  setPaymentMethod(method: string): void {
    this.paymentMethod.set(method);
    this.saveToLocalStorage();
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
    this.saveToLocalStorage();
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

  // Salva os dados no localStorage
  private saveToLocalStorage(): void {
    this.orderService.saveOrderData({
      address: this.getAddress(),
      paymentMethod: this.getPaymentMethod(),
    });
  }
}
