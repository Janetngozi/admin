export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  qty: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  createdDate: string;
  estimatedDelivery: string;
  total: number;
  image?: string;
}
