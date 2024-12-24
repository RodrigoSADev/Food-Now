import { IFoodItem } from './food.interface';

export interface ICartItem extends IFoodItem {
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}
