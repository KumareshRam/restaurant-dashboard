import StatCard from '@/components/StatCard';
import { ProcessedData } from '@/types';
import { DollarSign, TrendingUp, ShoppingCart, Clock } from 'lucide-react';
import React from 'react';

const KeyMetrics: React.FC<{ processedData: ProcessedData }> = (props) => {
  const {processedData} = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Revenue"
        value={`$${processedData.totalRevenue.toFixed(2)}`}
        icon={DollarSign}
        trend={processedData.revenueChange?.trend}
        trendValue={processedData.revenueChange?.value}
        color="green"
      />
      <StatCard
        title="Total Orders"
        value={processedData.totalOrders}
        icon={ShoppingCart}
        trend={processedData.ordersChange?.trend}
        trendValue={processedData.ordersChange?.value}
        color="blue"
      />
      <StatCard
        title="Avg Order Value"
        value={`$${processedData.avgOrderValue.toFixed(2)}`}
        icon={TrendingUp}
        trend={processedData.avgOrderValueChange?.trend}
        trendValue={processedData.avgOrderValueChange?.value}
        color="purple"
      />
      <StatCard
        title="Pending Orders"
        value={processedData.pendingOrders}
        icon={Clock}
        color="yellow"
      />
    </div>       

  );
};

export default KeyMetrics;