import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceMock: jest.Mocked<CartService>;

  beforeEach(async () => {
    cartServiceMock = {
      cart: jest
        .fn()
        .mockReturnValue(of({ items: [], totalPrice: 0, totalQuantity: 0 })),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render error message when cart is empty', () => {
    cartServiceMock.cart.mockReturnValue({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="checkout-empty-cart-icon"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="checkout-empty-cart"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="checkout-empty-cart"]')?.textContent
    ).toContain('Seu carrinho está vazio');
  });

  it('should render the checkout title', () => {
    cartServiceMock.cart.mockReturnValue({
      items: [],
      totalPrice: 10,
      totalQuantity: 10,
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="checkout-title"]')?.textContent
    ).toContain('Finalize seu pedido');
  });

  it('should render the back button', () => {
    cartServiceMock.cart.mockReturnValue({
      items: [],
      totalPrice: 10,
      totalQuantity: 10,
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector(
      '[data-test="checkout-back-button"]'
    );
    expect(backButton).toBeTruthy();
    expect(backButton?.textContent).toContain('Voltar');
  });
});
