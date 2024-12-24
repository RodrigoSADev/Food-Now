import { computed, Injectable, Signal, signal } from '@angular/core';
import { ICart, ICartItem } from '../interfaces/cart.interface';
import { IFoodItem } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<ICartItem[]>(this.loadCartFromLocalStorage() || []);

  cart: Signal<ICart> = computed(() => {
    const items = this.cartItems();
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { items, totalQuantity, totalPrice };
  });

  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private loadCartFromLocalStorage(): ICartItem[] | null {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : null;
  }

  private updateCartItem(food: IFoodItem, quantityChange: number): void {
    this.cartItems.update((cartItems) => {
      const existingItem = cartItems.find((item) => item.id === food.id);
      if (existingItem) {
        return cartItems
          .map((item) =>
            item.id === food.id
              ? { ...item, quantity: item.quantity + quantityChange }
              : item
          )
          .filter((item) => item.quantity > 0);
      } else if (quantityChange > 0) {
        return [...cartItems, { ...food, quantity: 1 }];
      }
      return cartItems;
    });
    this.updateLocalStorage();
  }

  addToCart(food: IFoodItem): void {
    this.updateCartItem(food, 1);
  }

  removeFromCart(foodId: number): void {
    const food = this.cartItems().find((item) => item.id === foodId);
    if (food) {
      this.updateCartItem(food, -1);
    }
  }

  clearItemFromCart(item: ICartItem): void {
    this.updateCartItem(item, -item.quantity);
  }

  clearCart(): void {
    this.cartItems.update(() => []);
    this.updateLocalStorage();
  }
}
