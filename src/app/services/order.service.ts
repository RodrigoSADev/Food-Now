import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private storageOrderKey = 'order';
  private storageOrderStepKey = 'orderStep';

  // Armazena os dados do pedido no localStorage
  saveOrderData(data: { address: Address; paymentMethod: string }): void {
    localStorage.setItem(this.storageOrderKey, JSON.stringify(data));
  }

  // Recupera os dados do localStorage
  getOrderData(): { address: Address; paymentMethod: string } | null {
    const data = localStorage.getItem(this.storageOrderKey);
    return data ? JSON.parse(data) : null;
  }

  // Limpa os dados do localStorage
  clearOrderData(): void {
    localStorage.removeItem(this.storageOrderKey);
  }

  // Obtém a etapa atual do pedido do localStorage ou retorna 1 se não existir
  getCurrentStep(): number {
    const savedStep = localStorage.getItem(this.storageOrderStepKey);
    return savedStep ? parseInt(savedStep, 10) : 1;
  }

  // Define a etapa atual do pedido e armazena no localStorage
  setCurrentStep(step: number): void {
    localStorage.setItem(this.storageOrderStepKey, step.toString());
  }

  // Reseta a etapa do pedido e remove do localStorage
  resetOrder(): void {
    localStorage.removeItem(this.storageOrderStepKey);
  }
}
