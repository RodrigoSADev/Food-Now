import { TestBed } from '@angular/core/testing';
import { IFoodItem } from '../interfaces/food.interface';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const mockFoodItem: IFoodItem = {
    id: 1,
    name: 'Pizza',
    price: 10,
    description: '',
    image: '',
    alt: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();
    service.cartItems.set([]);
    service.totalPrice.set(0);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty cart', () => {
    expect(service.cartItems()).toEqual([]);
    expect(service.totalPrice()).toBe(0);
  });

  it('should add an item to the cart', () => {
    service['updateCartItem'](mockFoodItem, 1);
    expect(service.cartItems()).toEqual([{ ...mockFoodItem, quantity: 1 }]);
  });

  it('should update the quantity of an existing item in the cart', () => {
    service['updateCartItem'](mockFoodItem, 1);
    service['updateCartItem'](mockFoodItem, 2);
    expect(service.cartItems()).toEqual([{ ...mockFoodItem, quantity: 3 }]);
  });

  it('should remove an item from the cart if quantity is zero', () => {
    service['updateCartItem'](mockFoodItem, 1);
    service['updateCartItem'](mockFoodItem, -1);
    expect(service.cartItems()).toEqual([]);
  });

  it('should calculate the total price and quantity correctly', () => {
    const mockFoodItem2: IFoodItem = {
      id: 2,
      name: 'Burger',
      price: 5,
      description: '',
      image: '',
      alt: '',
    };
    service['updateCartItem'](mockFoodItem, 2);
    service['updateCartItem'](mockFoodItem2, 3);
    expect(service.cart().totalQuantity).toBe(2);
    expect(service.cart().totalPrice).toBe(15);
  });

  it('should save and load cart items from localStorage', () => {
    service['updateCartItem'](mockFoodItem, 1);
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(savedCart).toEqual([{ ...mockFoodItem, quantity: 1 }]);
    localStorage.setItem(
      'cart',
      JSON.stringify([{ ...mockFoodItem, quantity: 2 }])
    );
    const loadedCart = service['loadCartFromLocalStorage']();
    expect(loadedCart).toEqual([{ ...mockFoodItem, quantity: 2 }]);
  });
});
