import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  checkoutService = inject(CheckoutService);
  orderService = inject(OrderService);

  currentStep = 1;

  ngOnInit(): void {
    // Obtém a etapa do pedido do serviço
    this.currentStep = this.orderService.getCurrentStep();

    // Simula o avanço das etapas
    this.simulateOrderProgress();
  }

  simulateOrderProgress() {
    setInterval(() => {
      if (this.currentStep < 3) {
        this.currentStep++;
        this.orderService.setCurrentStep(this.currentStep);
      }
    }, 5000); // Avançar para a próxima etapa a cada 5 segundos
  }
}
