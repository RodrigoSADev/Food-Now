import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceMock: jest.Mocked<CartService>;

  beforeEach(async () => {
    cartServiceMock = {
      cart: jest
        .fn()
        .mockReturnValue(of({ items: [], totalPrice: 0, totalQuantity: 0 })),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the total quantity of items in the cart', () => {
    cartServiceMock.cart.mockReturnValue({
      items: [],
      totalPrice: 0,
      totalQuantity: 5,
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="header-cart-quantity"]')?.textContent
    ).toContain('5');
  });

  it('should not display the total quantity if it is zero', () => {
    cartServiceMock.cart.mockReturnValue({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('s')?.textContent).toBeFalsy();
  });

  it('should display the logo with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('[data-test="header-logo"]');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('food-now-logo.png');
    expect(logo?.getAttribute('alt')).toBe('Logo Food Now');
    expect(logo?.getAttribute('style')).toContain('width: 100px');
  });

  it('should have a button that links to the checkout page and icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-test="header-cart-button"]');
    const icon = compiled.querySelector('[data-test="header-cart-icon"]');
    expect(button).toBeTruthy();
    expect(icon).toBeTruthy();
  });
});
