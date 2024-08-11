import { computed, Injectable, signal, Signal } from '@angular/core';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { FoodItem } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>(this.loadCartFromLocalStorage() || []);

  cart: Signal<Cart> = computed(() => {
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

  private loadCartFromLocalStorage(): CartItem[] | null {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : null;
  }

  private updateCartItem(food: FoodItem, quantityChange: number): void {
    const existingItem = this.cartItems().find((item) => item.id === food.id);

    if (existingItem) {
      this.cartItems.update((cartItems) =>
        cartItems
          .map((item) =>
            item.id === food.id
              ? { ...item, quantity: item.quantity + quantityChange }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } else if (quantityChange > 0) {
      this.cartItems.update((cartItems) => [
        ...cartItems,
        { ...food, quantity: 1 },
      ]);
    }

    this.updateLocalStorage();
  }

  addToCart(food: FoodItem): void {
    this.updateCartItem(food, 1);
  }

  removeFromCart(foodId: number): void {
    const food = this.cartItems().find((item) => item.id === foodId);
    if (food) {
      this.updateCartItem(food, -1);
    }
  }

  clearCart(): void {
    this.cartItems.update(() => []);
    this.updateLocalStorage();
  }
}
