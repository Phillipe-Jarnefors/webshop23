export interface Product {
  _id: string;
  name: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  isDeleted: boolean;
}
