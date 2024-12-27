import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { OrderConfirmationComponent } from './order-confirmation.component';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let cartServiceMock: jest.Mocked<CartService>;
  let checkoutServiceMock: jest.Mocked<CheckoutService>;

  beforeEach(async () => {
    cartServiceMock = {
      totalPrice: jest.fn().mockReturnValue(100),
    } as unknown as jest.Mocked<CartService>;

    checkoutServiceMock = {
      getAddress: jest.fn().mockReturnValue({
        street: 'Street',
        number: '123',
        neighborhood: 'Neighborhood',
        city: 'City',
      }),
      getSavedPaymentMethod: jest.fn().mockReturnValue('Cartão de Crédito'),
    } as unknown as jest.Mocked<CheckoutService>;

    await TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
        { provide: CheckoutService, useValue: checkoutServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display order information correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="order-title"]')?.textContent
    ).toContain('Seu pedido foi confirmado!');
    expect(
      compiled.querySelector('[data-test="order-status"]')?.textContent
    ).toContain('Estamos preparando o seu pedido!');
    expect(
      compiled.querySelector('[data-test="order-info"]')?.textContent
    ).toContain('Informações do Pedido');
    expect(
      compiled.querySelector('[data-test="order-step-status"]')?.textContent
    ).toContain('Status do Pedido');
    expect(
      compiled.querySelector('[data-test="order-total"]')?.textContent
    ).toContain('Valor Total:  R$100.00');
    expect(
      compiled.querySelector('[data-test="order-payment-method"]')?.textContent
    ).toContain('Cartão de Crédito');
  });

  it('should update currentStep every 3 seconds', (done) => {
    jest.useFakeTimers();
    component.simulateOrderProgress();
    jest.advanceTimersByTime(3000);
    expect(component.currentStep).toBe(2);
    jest.advanceTimersByTime(3000);
    expect(component.currentStep).toBe(3);
    jest.advanceTimersByTime(3000);
    expect(component.currentStep).toBe(3);
    jest.useRealTimers();
    done();
  });

  it('should reset order', () => {
    component.currentStep = 3;
    component.resetOrder();
    expect(component.currentStep).toBe(1);
  });

  it('should display the back button when currentStep is 3', () => {
    component.currentStep = 3;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector('button[routerLink="/"]');
    expect(backButton).toBeTruthy();
    expect(backButton?.textContent).toContain('Voltar');
  });
});
