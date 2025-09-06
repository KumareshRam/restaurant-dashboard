export interface OrderItem {
  Item_Name: string;
  Item_Price: number;
  Item_Type?: string;
  Quantity: number;
  Rating?: string;
  Total_Price: number;
}

export interface Order {
  Order_ID: number;
  Customer_Name: string;
  Customer_Phone: string;
  Customer_Address: string;
  Items: OrderItem[];
  Order_Type: 'Online' | 'Dine In';
  Order_Status: 'Delivered' | 'In Transit' | 'Pending';
  Delivery_Person: string;
  Delivery_Status: string;
}

export interface ProcessedData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  deliveredOrders: number;
  pendingOrders: number;
  inTransitOrders: number;
  orderTypeData: { name: string; value: number; color: string }[];
  topItems: { name: string; quantity: number; revenue: number }[];
  deliveryPerformance: { name: string; deliveries: number }[];
  statusData: { name: string; value: number; color: string }[];
  revenueTrend: { day: string; revenue: number }[];
}
