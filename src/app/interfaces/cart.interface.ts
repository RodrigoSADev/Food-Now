import { FoodItem } from './food.interface';

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
