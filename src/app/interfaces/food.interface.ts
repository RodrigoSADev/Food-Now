export interface FoodItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface FoodData {
  hamburguer: FoodItem[];
  pizza: FoodItem[];
  bebidas: FoodItem[];
}
