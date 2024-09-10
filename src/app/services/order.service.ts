import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private storageKey = 'order';

  saveOrderData(data: { address: Address; paymentMethod: string }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getOrderData(): { address: Address; paymentMethod: string } | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearOrderData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
