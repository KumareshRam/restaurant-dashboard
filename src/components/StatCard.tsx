import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'blue' | 'green' | 'yellow' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${colorClasses[color]} transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-100' :
            color === 'green' ? 'bg-green-100' :
              color === 'yellow' ? 'bg-yellow-100' :
                'bg-purple-100'
          }`}>
          <Icon className={`h-6 w-6 ${color === 'blue' ? 'text-blue-600' :
              color === 'green' ? 'text-green-600' :
                color === 'yellow' ? 'text-yellow-600' :
                  'text-purple-600'
            }`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;