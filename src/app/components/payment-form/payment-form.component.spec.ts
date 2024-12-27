import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService } from '../../services/checkout.service';
import { PaymentFormComponent } from './payment-form.component';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFormComponent],
      providers: [CheckoutService],
    }).compileComponents();

    checkoutService = TestBed.inject(CheckoutService);
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.paymentForm.value;
    expect(formValues).toEqual({ paymentMethod: '' });
  });

  it('should call setPaymentMethod and setSavedPaymentMethod when a payment method is selected', () => {
    component.paymentForm.patchValue({ paymentMethod: 'credito' });
    component.onSelectPaymentMethod('Cartão de Crédito');
    expect(checkoutService.getSavedPaymentMethod()).toBe('Cartão de Crédito');
    expect(checkoutService.showPaymentErrorMessage()).toBe(false);
  });

  it('should not call setPaymentMethod or setSavedPaymentMethod if the form is invalid', () => {
    component.paymentForm.patchValue({ paymentMethod: '' });
    component.onSelectPaymentMethod('Cartão de Crédito');
    expect(checkoutService.getSavedPaymentMethod()).toBe('');
  });

  it('should render payment method options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cashOption = compiled.querySelector('input[id="cash"]');
    const creditOption = compiled.querySelector('input[id="credit"]');
    const debitOption = compiled.querySelector('input[id="debit"]');
    expect(cashOption).toBeTruthy();
    expect(creditOption).toBeTruthy();
    expect(debitOption).toBeTruthy();
  });

  it('should display the correct labels for payment methods', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cashLabel = compiled.querySelector('[data-test="payment-cash-text"]');
    const creditLabel = compiled.querySelector(
      '[data-test="payment-credit-text"]'
    );
    const debitLabel = compiled.querySelector(
      '[data-test="payment-debit-text"]'
    );
    expect(cashLabel?.textContent).toContain('Dinheiro');
    expect(creditLabel?.textContent).toContain('Cartão de Crédito');
    expect(debitLabel?.textContent).toContain('Cartão de Débito');
  });

  it('should display the correct icons for payment methods', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cashIcon = compiled.querySelector('[data-test="payment-cash-icon"]');
    const creditIcon = compiled.querySelector(
      '[data-test="payment-credit-icon"]'
    );
    const debitIcon = compiled.querySelector(
      '[data-test="payment-debit-icon"]'
    );
    expect(cashIcon?.classList).toContain('bi-cash');
    expect(creditIcon?.classList).toContain('bi-credit-card');
    expect(debitIcon?.classList).toContain('bi-bank');
  });

  it('should display an error message if no payment method is selected', () => {
    checkoutService.showPaymentErrorMessage.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessage = compiled.querySelector(
      '[data-test="payment-error-message"]'
    );
    expect(errorMessage).toBeTruthy();
    expect(errorMessage?.textContent).toContain(
      'Por favor, escolha uma forma de pagamento.'
    );
  });
});
