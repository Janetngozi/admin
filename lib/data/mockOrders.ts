import { Order, OrderStatus } from '@/lib/types/Order';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#SB-10284',
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Premium Ballpoint Pens',
        sku: 'PEN-001',
        qty: 1,
        price: 29.99,
        image: '/Rectangle 10.png',
      },
    ],
    createdDate: 'Oct 12, 2025',
    estimatedDelivery: 'Oct 27, 2025',
    total: 29.99,
    image: '/Rectangle 10.png',
  },
  {
    id: '2',
    orderNumber: '#SB-10284',
    status: 'confirmed',
    items: [
      {
        id: '2',
        name: 'Desk Organizer Set',
        sku: 'ORG-002',
        qty: 2,
        price: 45.99,
        image: '/Rectangle 11.png',
      },
    ],
    createdDate: 'Oct 17, 2025',
    estimatedDelivery: 'Oct 27, 2025',
    total: 45.99,
    image: '/Rectangle 11.png',
  },
  {
    id: '3',
    orderNumber: '#SB-10284',
    status: 'delivered',
    items: [
      {
        id: '3',
        name: 'Sticky Notes Collection',
        sku: 'STK-003',
        qty: 3,
        price: 12.99,
        image: '/Rectangle 12.png',
      },
    ],
    createdDate: 'Oct 17, 2025',
    estimatedDelivery: 'Oct 27, 2025',
    total: 12.99,
    image: '/Rectangle 12.png',
  },
  {
    id: '4',
    orderNumber: '#SB-10284',
    status: 'cancelled',
    items: [
      {
        id: '4',
        name: 'Wireless Keyboard',
        sku: 'KEY-004',
        qty: 1,
        price: 79.99,
        image: '/Rectangle 13.png',
      },
    ],
    createdDate: 'Oct 17, 2025',
    estimatedDelivery: 'Oct 27, 2025',
    total: 79.99,
    image: '/Rectangle 13.png',
  },
  {
    id: '5',
    orderNumber: '#SB-10284',
    status: 'confirmed',
    items: [
      {
        id: '5',
        name: 'Monitor Stand Pro',
        sku: 'MNT-005',
        qty: 1,
        price: 59.99,
        image: '/Rectangle 24.png',
      },
    ],
    createdDate: 'Oct 17, 2025',
    estimatedDelivery: 'Oct 27, 2025',
    total: 59.99,
    image: '/Rectangle 24.png',
  },
];

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return mockOrders.filter((order) => order.status === status);
};

export const getOngoingOrders = (): Order[] => {
  return mockOrders.filter((order) => order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped');
};

export const getCompletedOrders = (): Order[] => {
  return mockOrders.filter((order) => order.status === 'delivered' || order.status === 'cancelled');
};
