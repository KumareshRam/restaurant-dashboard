import { Order, ProcessedData } from '@/types/index'

export const processOrderData = (orders: Order[]): ProcessedData => {
  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.Items.reduce((itemSum, item) => itemSum + item.Total_Price, 0);
  }, 0);

  // Calculate order statistics
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.Order_Status === 'Delivered').length;
  const pendingOrders = orders.filter(order => order.Order_Status === 'Pending').length;
  const inTransitOrders = orders.filter(order => order.Order_Status === 'In Transit').length;

  // Calculate average order value (handle division by zero)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Order type distribution
  const orderTypeData = [
    {
      name: 'Online',
      value: orders.filter(order => order.Order_Type === 'Online').length,
      color: '#8B5CF6'
    },
    {
      name: 'Dine In',
      value: orders.filter(order => order.Order_Type === 'Dine In').length,
      color: '#10B981'
    }
  ];

  // Top selling items
  const itemSales: Record<string, { quantity: number; revenue: number }> = {};
  orders.forEach(order => {
    order.Items.forEach(item => {
      if (itemSales[item.Item_Name]) {
        itemSales[item.Item_Name].quantity += item.Quantity;
        itemSales[item.Item_Name].revenue += item.Total_Price;
      } else {
        itemSales[item.Item_Name] = {
          quantity: item.Quantity,
          revenue: item.Total_Price
        };
      }
    });
  });

  const topItems = Object.entries(itemSales)
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 5)
    .map(([name, data]) => ({ name, ...data }));

  // Delivery performance
  const deliveryPersons: Record<string, number> = {};
  orders.forEach(order => {
    if (order.Delivery_Person) {
      if (deliveryPersons[order.Delivery_Person]) {
        deliveryPersons[order.Delivery_Person]++;
      } else {
        deliveryPersons[order.Delivery_Person] = 1;
      }
    }
  });

  const deliveryPerformance = Object.entries(deliveryPersons)
    .map(([name, deliveries]) => ({ name, deliveries }))
    .sort((a, b) => b.deliveries - a.deliveries);

  // Order status distribution
  const statusData = [
    { name: 'Delivered', value: deliveredOrders, color: '#10B981' },
    { name: 'In Transit', value: inTransitOrders, color: '#F59E0B' },
    { name: 'Pending', value: pendingOrders, color: '#EF4444' }
  ];

  // Revenue trend (simulated daily data)
  const revenueTrend = [
    { day: 'Mon', revenue: totalRevenue * 0.12 },
    { day: 'Tue', revenue: totalRevenue * 0.15 },
    { day: 'Wed', revenue: totalRevenue * 0.18 },
    { day: 'Thu', revenue: totalRevenue * 0.14 },
    { day: 'Fri', revenue: totalRevenue * 0.16 },
    { day: 'Sat', revenue: totalRevenue * 0.13 },
    { day: 'Sun', revenue: totalRevenue * 0.12 }
  ];

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    deliveredOrders,
    pendingOrders,
    inTransitOrders,
    orderTypeData,
    topItems,
    deliveryPerformance,
    statusData,
    revenueTrend
  };
};


export type TimeFrame = 'today' | 'week' | 'month';

// Utility functions for date filtering
export const getDateRange = (timeframe: TimeFrame): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date();

  switch (timeframe) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      return { start, end: now };
    case 'week':
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      return { start, end: now };
    case 'month':
      start.setDate(now.getDate() - 30);
      start.setHours(0, 0, 0, 0);
      return { start, end: now };
    default:
      return { start, end: now };
  }
};

export const isOrderInTimeframe = (order: Order, timeframe: TimeFrame): boolean => {
  if (!order.Order_Date) {
    // If no date, assume it's recent for demo purposes
    return true;
  }

  const orderDate = new Date(order.Order_Date);
  const { start, end } = getDateRange(timeframe);

  return orderDate >= start && orderDate <= end;
};

// Generate realistic dates for existing orders (for demo purposes)
export const addDemoOrderDates = (orders: Order[]): Order[] => {
  return orders.map((order, index) => {
    if (!order.Order_Date) {
      const now = new Date();
      let daysAgo: number;
      const orderPosition = index / orders.length;
      
      if (orderPosition < 0.2) {
        daysAgo = 0;
      } else if (orderPosition < 0.4) {
        daysAgo = 1;
      } else {
        daysAgo = Math.floor(Math.random() * 28) + 2;
      }
      
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);

      const orderDate = new Date(now);
      orderDate.setDate(now.getDate() - daysAgo);
      orderDate.setHours(now.getHours() - hoursAgo);
      orderDate.setMinutes(now.getMinutes() - minutesAgo);

      return {
        ...order,
        Order_Date: orderDate.toISOString()
      };
    }
    return order;
  });
};

// Get previous timeframe date range for comparison
export const getPreviousDateRange = (timeframe: TimeFrame): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date();
  const end = new Date();
  
  switch (timeframe) {
    case 'today':
      // Yesterday
      start.setDate(now.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(now.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    case 'week':
      // Previous week (8-14 days ago)
      start.setDate(now.getDate() - 14);
      start.setHours(0, 0, 0, 0);
      end.setDate(now.getDate() - 7);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    case 'month':
      // Previous month (31-60 days ago)
      start.setDate(now.getDate() - 60);
      start.setHours(0, 0, 0, 0);
      end.setDate(now.getDate() - 30);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    default:
      return { start, end };
  }
};

// Check if order is in previous timeframe
export const isOrderInPreviousTimeframe = (order: Order, timeframe: TimeFrame): boolean => {
  if (!order.Order_Date) {
    return false;
  }
  
  const orderDate = new Date(order.Order_Date);
  const { start, end } = getPreviousDateRange(timeframe);
  
  return orderDate >= start && orderDate <= end;
};

// Calculate percentage change between current and previous periods
export const calculatePercentageChange = (current: number, previous: number): { value: string; trend: 'up' | 'down' | undefined } => {
  if (previous === 0) {
    return { 
      value: current > 0 ? '+100.0' : '0.0', 
      trend: current > 0 ? 'up' : undefined 
    };
  }
  
  const change = ((current - previous) / previous) * 100;
  
  return {
    value: change >= 0 ? `+${Math.abs(change).toFixed(1)}` : `-${Math.abs(change).toFixed(1)}`,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : undefined
  };
};

// Process data with comparison to previous period
export interface ProcessedDataWithComparison extends ProcessedData {
  revenueChange: { value: string; trend: 'up' | 'down' | undefined };
  ordersChange: { value: string; trend: 'up' | 'down' | undefined };
  avgOrderValueChange: { value: string; trend: 'up' | 'down' | undefined };
}

export const processOrderDataWithComparison = (
  orders: Order[], 
  timeframe: TimeFrame
): ProcessedDataWithComparison => {
  const ordersWithDates = addDemoOrderDates(orders);
  
  // Get current period data
  const currentOrders = ordersWithDates.filter(order => 
    isOrderInTimeframe(order, timeframe)
  );
  const currentData = processOrderData(currentOrders);
  
  // Get previous period data  
  const previousOrders = ordersWithDates.filter(order => 
    isOrderInPreviousTimeframe(order, timeframe)
  );
  const previousData = processOrderData(previousOrders);
  
  // Calculate percentage changes
  const revenueChange = calculatePercentageChange(
    currentData.totalRevenue, 
    previousData.totalRevenue
  );
  
  const ordersChange = calculatePercentageChange(
    currentData.totalOrders, 
    previousData.totalOrders
  );
  
  const avgOrderValueChange = calculatePercentageChange(
    currentData.avgOrderValue, 
    previousData.avgOrderValue
  );
  
  return {
    ...currentData,
    revenueChange,
    ordersChange,
    avgOrderValueChange
  };
};