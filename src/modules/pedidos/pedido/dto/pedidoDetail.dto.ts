export class PedidoDetailDto {
  id: number;
  nameClient: string;
  lastNameClient: string;
  phone: number;
  dateOrder: string;
  orderDeliveryDate: string;
  products!: Product[];
  total!: number;
  status!: string;
}
export interface Product {
  name: string;
  price: number;
  quantity: number;
  totalPartial: number;
}
