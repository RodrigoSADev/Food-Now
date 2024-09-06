export interface Address {
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  saveAddress?: boolean;
}
