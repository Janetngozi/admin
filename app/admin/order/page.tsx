// 'use client';

// import React, { useState } from 'react';
// import { ChevronDown, Eye, Trash2, Search, Download, ChevronRight, ChevronLeft } from 'lucide-react';
// import Link from 'next/link';

// type OrderStatus =
//   | 'Order Confirmed'
//   | 'Payment Approved'
//   | 'Order Processing'
//   | 'Order Shipping';

// type PaymentStatus = 'Unpaid' | 'Paid';

// interface Order {
//   id: string;
//   name: string;
//   customerType: 'Commercial' | 'Government';
//   date: string;
//   po: string;
//   orderStatus: OrderStatus;
//   total: string;
//   items: number;
//   trackingNumber: string;
//   paymentStatus: PaymentStatus;
// }

// const orders: Order[] = [
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Commercial',
//     date: 'Dec 15, 2025',
//     po: '----------',
//     orderStatus: 'Order Confirmed',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Unpaid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Government',
//     date: 'Dec 15, 2025',
//     po: 'PO-123456',
//     orderStatus: 'Payment Approved',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Government',
//     date: 'Dec 15, 2025',
//     po: 'PO-123456',
//     orderStatus: 'Order Processing',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Unpaid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Commercial',
//     date: 'Dec 15, 2025',
//     po: '----------',
//     orderStatus: 'Order Shipping',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Commercial',
//     date: 'Dec 15, 2025',
//     po: '----------',
//     orderStatus: 'Order Confirmed',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Unpaid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Government',
//     date: 'Dec 15, 2025',
//     po: 'PO-123456',
//     orderStatus: 'Payment Approved',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Commercial',
//     date: 'Dec 15, 2025',
//     po: '----------',
//     orderStatus: 'Order Processing',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Unpaid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Government',
//     date: 'Dec 15, 2025',
//     po: 'PO-123456',
//     orderStatus: 'Order Shipping',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Commercial',
//     date: 'Dec 15, 2025',
//     po: '----------',
//     orderStatus: 'Payment Approved',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Unpaid',
//   },
//   {
//     id: '#STC-123456',
//     name: 'John Doe',
//     customerType: 'Government',
//     date: 'Dec 15, 2025',
//     po: 'PO-123456',
//     orderStatus: 'Order Confirmed',
//     total: '$450',
//     items: 5,
//     trackingNumber: 'UPS 1Z45W9X70320418523',
//     paymentStatus: 'Paid',
//   },
// ];

// const getOrderStatusColor = (status: OrderStatus) => {
//   switch (status) {
//     case 'Order Confirmed':
//       return 'bg-white text-gray-700 border border-gray-300';
//     case 'Payment Approved':
//       return 'bg-blue-50 text-blue-600 border border-blue-200';
//     case 'Order Processing':
//       return 'bg-orange-50 text-orange-600 border border-orange-200';
//     case 'Order Shipping':
//       return 'bg-green-50 text-green-600 border border-green-200';
//     default:
//       return 'bg-gray-100 text-gray-700 border border-gray-200';
//   }
// };

// const getPaymentStatusColor = (status: PaymentStatus) => {
//   switch (status) {
//     case 'Paid':
//       return 'bg-green-50 text-green-600 border border-green-200';
//     case 'Unpaid':
//       return 'bg-red-50 text-red-600 border border-red-200';
//     default:
//       return 'bg-gray-100 text-gray-700 border border-gray-200';
//   }
// };
// const Order = () => {
//   const [sortDropdown, setSortDropdown] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [expandedView, setExpandedView] = useState(false);

//   const toggleSort = (column: string) => {
//     setSortDropdown(sortDropdown === column ? null : column);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
        
//         {/* Search and Export */}
//         <div className="flex items-center gap-4 mb-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by product name or order number or PO"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             />
//           </div>
//           <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
//             <Download className="w-4 h-4" />
//             Export orders
//           </button>
//         </div>

//         {/* View Toggle */}
//         <button
//           onClick={() => setExpandedView(!expandedView)}
//           className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
//         >
//           {expandedView ? (
//             <>
//               <ChevronLeft className="w-4 h-4" />
//               Show Less Columns
//             </>
//           ) : (
//             <>
//               Show All Columns
//               <ChevronRight className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-white border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
//                   Order ID
//                 </th>
//                 <th className="px-4 py-3 text-left whitespace-nowrap">
//                   <div className="flex items-center gap-1">
//                     <span className="text-xs font-medium text-gray-600">Name</span>
//                     <div className="relative">
//                       <button
//                         onClick={() => toggleSort('name')}
//                         className="relative"
//                       >
//                         <ChevronDown className="w-3 h-3 text-gray-400" />
//                       </button>
//                       {sortDropdown === 'name' && (
//                         <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[140px]">
//                           <button className="w-full px-3 py-2 text-left text-xs hover:bg-blue-600 hover:text-white text-gray-700">
//                             Sort From A-Z
//                           </button>
//                           <button className="w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-gray-700">
//                             Sort From Z-A
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 text-left whitespace-nowrap">
//                   <div className="flex items-center gap-1">
//                     <span className="text-xs font-medium text-gray-600">Customer Type</span>
//                     <button onClick={() => toggleSort('customerType')}>
//                       <ChevronDown className="w-3 h-3 text-gray-400" />
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 text-left whitespace-nowrap">
//                   <div className="flex items-center gap-1">
//                     <span className="text-xs font-medium text-gray-600">Date</span>
//                     <button onClick={() => toggleSort('date')}>
//                       <ChevronDown className="w-3 h-3 text-gray-400" />
//                     </button>
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 text-left whitespace-nowrap">
//                   <div className="flex items-center gap-1">
//                     <span className="text-xs font-medium text-gray-600">PO</span>
//                     <button onClick={() => toggleSort('po')}>
//                       <ChevronDown className="w-3 h-3 text-gray-400" />
//                     </button>
//                   </div>
//                 </th>
                
//                 {expandedView && (
//                   <>
//                     <th className="px-4 py-3 text-left whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <span className="text-xs font-medium text-gray-600">Order Status</span>
//                         <button onClick={() => toggleSort('orderStatus')}>
//                           <ChevronDown className="w-3 h-3 text-gray-400" />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
//                       Total
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
//                       Items
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
//                       Tracking Number
//                     </th>
//                     <th className="px-4 py-3 text-left whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <span className="text-xs font-medium text-gray-600">Payment Status</span>
//                         <button onClick={() => toggleSort('paymentStatus')}>
//                           <ChevronDown className="w-3 h-3 text-gray-400" />
//                         </button>
//                       </div>
//                     </th>
//                   </>
//                 )}
                
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {orders.map((order, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                     {order.id}
//                   </td>
//                   <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                     {order.name}
//                   </td>
//                   <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                     {order.customerType}
//                   </td>
//                   <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                     {order.date}
//                   </td>
//                   <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                     {order.po}
//                   </td>
                  
//                   {expandedView && (
//                     <>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <span
//                           className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getOrderStatusColor(
//                             order.orderStatus
//                           )}`}
//                         >
//                           {order.orderStatus}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                         {order.total}
//                       </td>
//                       <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                         {order.items}
//                       </td>
//                       <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
//                         {order.trackingNumber}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <span
//                           className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getPaymentStatusColor(
//                             order.paymentStatus
//                           )}`}
//                         >
//                           {order.paymentStatus}
//                         </span>
//                       </td>
//                     </>
//                   )}
                  
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <Link
//                         href={`/admin/orders/${order.id.replace('#', '')}`}
//                         className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors border border-green-200"
//                       >
//                         <Eye className="w-4 h-4 text-green-600" />
//                       </Link>
//                       <button className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200">
//                         <Trash2 className="w-4 h-4 text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Order;


'use client';

import React, { useState } from 'react';
import { ChevronDown, Eye, Trash2, Search, Download, ChevronRight, ChevronLeft, Check } from 'lucide-react';

// Types
type OrderStatus = 'Order Confirmed' | 'Payment Approved' | 'Order Processing' | 'Order Shipping';
type PaymentStatus = 'Unpaid' | 'Paid';

interface Order {
  id: string;
  name: string;
  customerType: 'Commercial' | 'Government';
  date: string;
  po: string;
  orderStatus: OrderStatus;
  total: string;
  items: number;
  trackingNumber: string;
  paymentStatus: PaymentStatus;
}

// Sample orders data
const initialOrders: Order[] = [
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Confirmed',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Payment Approved',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Order Processing',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Shipping',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Confirmed',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Payment Approved',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Processing',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Order Shipping',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Payment Approved',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Order Confirmed',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
];


// Helper functions
const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Order Confirmed':
      return 'bg-white text-gray-700 border border-gray-300';
    case 'Payment Approved':
      return 'bg-blue-50 text-blue-600 border border-blue-200';
    case 'Order Processing':
      return 'bg-orange-50 text-orange-600 border border-orange-200';
    case 'Order Shipping':
      return 'bg-green-50 text-green-600 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

const getPaymentStatusColor = (status: PaymentStatus) => {
  return status === 'Paid'
    ? 'bg-green-50 text-green-600 border border-green-200'
    : 'bg-red-50 text-red-600 border border-red-200';
};

// Main App Component
const OrderManagementSystem = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedView, setExpandedView] = useState(false);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedOrderId ? (
        <OrdersListView
          orders={orders}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          expandedView={expandedView}
          setExpandedView={setExpandedView}
          onViewOrder={handleViewOrder}
        />
      ) : (
        <OrderDetailsView
          order={selectedOrder!}
          onBack={handleBackToOrders}
          onUpdateOrder={(updatedOrder) => {
            setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
          }}
        />
      )}
    </div>
  );
};

export default OrderManagementSystem;

// Orders List View Component
function OrdersListView({ 
  orders, 
  searchQuery, 
  setSearchQuery, 
  expandedView, 
  setExpandedView, 
  onViewOrder 
}: {
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  expandedView: boolean;
  setExpandedView: (v: boolean) => void;
  onViewOrder: (id: string) => void;
}) {
  const [sortDropdown, setSortDropdown] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or order number or PO"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export orders
          </button>
        </div>

        <button
          onClick={() => setExpandedView(!expandedView)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          {expandedView ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              Show Less Columns
            </>
          ) : (
            <>
              Show All Columns
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Customer Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  PO
                </th>
                
                {expandedView && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 whitespace-nowrap">
                      Order Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Tracking Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Payment Status
                    </th>
                  </>
                )}
                
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.customerType}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.po}
                  </td>
                  
                  {expandedView && (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getOrderStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {order.total}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {order.items}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {order.trackingNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </>
                  )}
                  
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewOrder(order.id)}
                        className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors border border-green-200"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Order Details View Component
function OrderDetailsView({ 
  order, 
  onBack,
  onUpdateOrder 
}: { 
  order: Order; 
  onBack: () => void;
  onUpdateOrder: (order: Order) => void;
}) {
  const [currentStage, setCurrentStage] = useState<number>(() => {
    // Initialize stage based on order status
    switch (order.orderStatus) {
      case 'Order Confirmed': return 1;
      case 'Payment Approved': return 2;
      case 'Order Processing': return 3;
      case 'Order Shipping': return 4;
      default: return 1;
    }
  });

  const stages = [
    { id: 1, label: 'Payment processed', status: 'Order Confirmed' },
    { id: 2, label: 'Order confirmed', status: 'Payment Approved' },
    { id: 3, label: 'Order processing', status: 'Order Processing' },
    { id: 4, label: 'Order shipping', status: 'Order Shipping' },
  ];

  const timelineItems = [
    {
      id: 1,
      title: 'Order created for 3 items',
      description: 'Order initialized with 3 line items and awaiting approval',
      completed: currentStage >= 1,
    },
    {
      id: 2,
      title: 'Order payment',
      description: 'Payment of $904.50 confirmed via card transaction TRN-69233.',
      completed: currentStage >= 1,
      badge: 'Paid',
    },
    {
      id: 3,
      title: 'Proforma invoice issued',
      description: 'Preliminary invoice P-INV-2025-1042 generated upon payment confirmation, sent to customer email.',
      completed: currentStage >= 1,
      hasButton: true,
    },
    {
      id: 4,
      title: 'Order confirmed',
      description: 'Order has been verified by admin and is ready for fulfillment',
      completed: currentStage >= 2,
      current: currentStage === 1,
    },
    {
      id: 5,
      title: 'Order processing',
      description: 'Warehouse team notified - items queued for packaging.',
      completed: currentStage >= 3,
      current: currentStage === 2,
    },
    {
      id: 6,
      title: 'Order shipping',
      description: 'Shipment dispatched via FedEx Ground. Tracking number PDX-41720008 assigned.',
      completed: currentStage >= 4,
      current: currentStage === 3,
    },
    {
      id: 7,
      title: 'Final invoice issued',
      description: 'Invoice INV-2025-1052 generated post-shipment with confirmed charges.',
      completed: currentStage > 4,
      current: currentStage === 4,
    },
  ];

  const handleAdvanceStage = () => {
    if (currentStage < 4) {
      const newStage = currentStage + 1;
      setCurrentStage(newStage);
      
      // Update order status
      const newStatus = stages[newStage - 1].status as OrderStatus;
      onUpdateOrder({ ...order, orderStatus: newStatus });
    }
  };

  const getProgressBarColors = () => {
    return stages.map((_, index) => {
      if (index < currentStage - 1) return 'bg-green-500';
      if (index === currentStage - 1) return 'bg-orange-500';
      return 'bg-gray-200';
    });
  };

  const progressColors = getProgressBarColors();
  const canAdvance = currentStage < 4;
  const buttonText = currentStage === 1 ? 'Begin Order Processing' : 
                     currentStage === 2 ? 'Start Shipping' :
                     currentStage === 3 ? 'Complete Order' : 'Order Complete';

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="space-y-6">
        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-900">{order.id.replace('#', '')}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {order.paymentStatus}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
            </div>
            {currentStage < 3 && (
              <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Refund
              </button>
            )}
          </div>
          <p className="text-gray-500 mb-6">{order.date} at 06:35 AM</p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
            </div>
            <div className="flex gap-1">
              {progressColors.map((color, index) => (
                <div 
                  key={index}
                  className={`flex-1 h-2 ${color} ${index === 0 ? 'rounded-l-full' : ''} ${index === progressColors.length - 1 ? 'rounded-r-full' : ''}`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              {stages.map(stage => (
                <span key={stage.id}>{stage.label}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Estimated shipping period: <span className="font-semibold text-gray-900">Dec 16th to Dec 19th, 2025</span>
            </p>
            {canAdvance && (
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleAdvanceStage}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>

        {/* All Items Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">Image</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">SHARPIE Fine Point Markers Black</td>
                  <td className="px-6 py-4 text-sm text-gray-900">3</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
          <div className="space-y-6">
            {timelineItems.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-500' : item.current ? 'bg-orange-500' : 'bg-gray-200'
                  }`}>
                    {item.completed && <Check className="w-5 h-5 text-white" />}
                  </div>
                  {index < timelineItems.length - 1 && (
                    <div className={`w-0.5 h-full mt-2 ${
                      item.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      {item.badge && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {item.badge}
                        </span>
                      )}
                      {item.hasButton && (
                        <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition-colors">
                          Download invoice
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      Dec 15th, 2025 at 06:35 AM
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment and Customer Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mastercard</p>
                    <p className="text-sm text-gray-600">**** **** **** 6465</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cardholder Name</p>
                <p className="font-medium text-gray-900">{order.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-medium text-gray-900">TRN-69233</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">$1050</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">$120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 -mx-6 -mb-6 mt-4">
              <div className="flex justify-between">
                <span className="font-bold text-white">Order total</span>
                <span className="font-bold text-white">$1170.00</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{order.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">Johndoe123@gmail.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium text-gray-900">+1 (303) 555-7890</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
                <div className="text-sm text-gray-900">
                  <p>{order.name}</p>
                  <p>1234 E Colfax Avenue, Denver, CO, 80218</p>
                  <p>United States</p>
                  <p>(303) 555-7890</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Billing Address</p>
                <p className="font-medium text-gray-900">Same with shipping address</p>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Delivery Window</p>
                <p className="font-medium text-gray-900">Delivery between 27 October and 29 October</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-xs">🚚</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Type</p>
                  <p className="font-medium text-gray-900">Door delivery</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Cost</p>
                <p className="font-medium text-gray-900">$24.95</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}