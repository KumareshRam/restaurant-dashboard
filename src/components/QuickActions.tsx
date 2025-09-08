import { Truck, ShoppingCart, Star, Users } from 'lucide-react';
import React from 'react';

const QuickActions: React.FC = () => {
  return (
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
  );
};

export default QuickActions;