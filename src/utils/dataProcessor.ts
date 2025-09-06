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

  // Calculate average order value
  const avgOrderValue = totalRevenue / totalOrders;

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
