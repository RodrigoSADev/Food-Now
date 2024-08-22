export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

export interface FoodData {
  hamburguer: FoodItem[];
  pizza: FoodItem[];
  bebidas: FoodItem[];
}
