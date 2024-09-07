import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  checkoutService = inject(CheckoutService);

  currentStep = 1;

  ngOnInit(): void {
    // Simula o avanço das etapas
    this.simulateOrderProgress();
  }

  simulateOrderProgress() {
    setInterval(() => {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    }, 5000); // Avançar para a próxima etapa a cada 5 segundos
  }
}
