import { Order } from '@/lib/types/Order';

const ORDERS_STORAGE_KEY = 'stec_orders';

export const saveOrder = (order: Order): void => {
  try {
    const existingOrders = getOrders();
    const updatedOrders = [order, ...existingOrders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Failed to save order:', error);
  }
};

export const getOrders = (): Order[] => {
  try {
    const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Failed to get orders:', error);
    return [];
  }
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find((order) => order.id === id);
};

export const clearOrders = (): void => {
  try {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear orders:', error);
  }
};
