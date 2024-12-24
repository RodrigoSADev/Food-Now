export interface IFoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

export interface IFoodData {
  hamburguer: IFoodItem[];
  pizza: IFoodItem[];
  bebidas: IFoodItem[];
}
