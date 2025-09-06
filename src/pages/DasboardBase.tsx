import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Clock,
  DollarSign,
  Star,
  Truck
} from 'lucide-react';
import { ordersData } from '@/data/orders';
import { processOrderData } from '@/utils/dataProcessor';
import { Order } from '@/types';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';

type TimeFrame = 'today' | 'week' | 'month';

const DashboardBase: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('today');

  const processedData = useMemo(() => {
    return processOrderData(ordersData);
  }, []);

  return (
    <>
      <Head>
        <title>Restaurant Dashboard | Business Analytics</title>
        <meta name="description" content="Restaurant owner dashboard for business analytics and insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Dashboard</h1>
            <p className="text-gray-600">Monitor your restaurant's performance and make data-driven decisions</p>
          </div>

          {/* Time Filter */}
          <div className="mb-6">
            <div className="flex space-x-2">
              {(['today', 'week', 'month'] as TimeFrame[]).map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedTimeframe === timeframe
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={`$${processedData.totalRevenue.toFixed(2)}`}
              icon={DollarSign}
              trend="up"
              trendValue="12.5"
              color="green"
            />
            <StatCard
              title="Total Orders"
              value={processedData.totalOrders}
              icon={ShoppingCart}
              trend="up"
              trendValue="8.2"
              color="blue"
            />
            <StatCard
              title="Avg Order Value"
              value={`$${processedData.avgOrderValue.toFixed(2)}`}
              icon={TrendingUp}
              trend="up"
              trendValue="5.1"
              color="purple"
            />
            <StatCard
              title="Pending Orders"
              value={processedData.pendingOrders}
              icon={Clock}
              color="yellow"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <ChartCard title="Daily Revenue Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Order Type Distribution */}
            <ChartCard title="Order Type Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={processedData.orderTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {processedData.orderTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Recent Orders Table */}
          <ChartCard title="Recent Orders" className="mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.slice(-5).reverse().map((order: Order) => {
                    const orderTotal = order.Items.reduce((sum, item) => sum + item.Total_Price, 0);
                    return (
                      <tr key={order.Order_ID} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">#{order.Order_ID}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{order.Customer_Name}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.Order_Type === 'Online' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                            }`}>
                            {order.Order_Type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.Order_Status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.Order_Status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {order.Order_Status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">${orderTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">View Customers</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                <ShoppingCart className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700">New Order</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                <Star className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Reviews</span>
              </button>
              <button className="flex items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200">
                <Truck className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-700">Deliveries</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBase;
