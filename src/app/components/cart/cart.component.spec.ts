import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ICartItem } from '../../interfaces/cart.interface';
import { IFoodItem } from '../../interfaces/food.interface';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: jest.Mocked<CartService>;
  let checkoutServiceMock: jest.Mocked<CheckoutService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    cartServiceMock = {
      cart: jest
        .fn()
        .mockReturnValue(of({ items: [], totalPrice: 0, totalQuantity: 0 })),
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearItemFromCart: jest.fn(),
      clearCart: jest.fn(),
      totalPrice: { set: jest.fn() } as any,
    } as unknown as jest.Mocked<CartService>;

    checkoutServiceMock = {
      validatePayment: jest.fn(),
      validateAddress: jest.fn(),
      showPaymentErrorMessage: { set: jest.fn() } as any,
      showAddressErrorMessage: { set: jest.fn() } as any,
      setPaymentMethod: jest.fn(),
    } as unknown as jest.Mocked<CheckoutService>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: CheckoutService, useValue: checkoutServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase item quantity in cart', () => {
    const foodItem: IFoodItem = {
      id: 1,
      name: 'Pizza',
      price: 10,
      description: '',
      image: '',
      alt: '',
    };
    component.onIncrease(foodItem);
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(foodItem);
  });

  it('should decrease item quantity in cart', () => {
    component.onDecrease(1);
    expect(cartServiceMock.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should remove item from cart', () => {
    const cartItem: ICartItem = {
      id: 1,
      name: 'Pizza',
      price: 10,
      quantity: 1,
      description: '',
      image: '',
      alt: '',
    };
    component.onRemove(cartItem);
    expect(cartServiceMock.clearItemFromCart).toHaveBeenCalledWith(cartItem);
  });

  it('should confirm order if payment and address are valid', () => {
    checkoutServiceMock.validatePayment.mockReturnValue(true);
    checkoutServiceMock.validateAddress.mockReturnValue(true);
    component.onConfirmOrder();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/confirm-order']);
    expect(cartServiceMock.clearCart).toHaveBeenCalled();
    expect(checkoutServiceMock.setPaymentMethod).toHaveBeenCalledWith('');
  });

  it('should show payment error message if payment is invalid', () => {
    checkoutServiceMock.validatePayment.mockReturnValue(false);
    checkoutServiceMock.validateAddress.mockReturnValue(true);
    component.onConfirmOrder();
    expect(
      checkoutServiceMock.showPaymentErrorMessage.set
    ).toHaveBeenCalledWith(true);
  });

  it('should show address error message if address is invalid', () => {
    checkoutServiceMock.validatePayment.mockReturnValue(true);
    checkoutServiceMock.validateAddress.mockReturnValue(false);
    component.onConfirmOrder();
    expect(
      checkoutServiceMock.showAddressErrorMessage.set
    ).toHaveBeenCalledWith(true);
  });
});
