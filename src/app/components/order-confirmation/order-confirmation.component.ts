import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-order-confirmation',
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent {
  checkoutService = inject(CheckoutService);

  currentStep = 1;

  ngOnInit(): void {
    this.simulateOrderProgress();
  }

  resetOrder(): void {
    this.currentStep = 1;
  }

  simulateOrderProgress(): void {
    setInterval(() => {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    }, 3000);
  }
}
