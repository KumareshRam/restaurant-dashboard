# Restaurant Dashboard - Project Documentation

## Overview

A modern, responsive restaurant dashboard built with Next.js that provides comprehensive business analytics and order management capabilities for restaurant owners. The dashboard offers real-time insights into revenue, orders, customer data, and delivery performance with interactive charts and filtering capabilities.

## Tech Stack

### Frontend Framework & Core Technologies
- **Next.js 15.5.2** - React framework for production-grade web applications
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.x** - Static type checking for better development experience

### UI Libraries & Styling
- **Material-UI (MUI) 7.3.2** - Comprehensive React UI framework
  - `@emotion/react` & `@emotion/styled` - CSS-in-JS styling solution
- **Tailwind CSS 4.x** - Utility-first CSS framework for custom styling
- **Lucide React 0.542.0** - Modern icon library with consistent design

### Data Visualization
- **Recharts 3.1.2** - Composable charting library built on React components
  - Line charts for revenue trends
  - Pie charts for order type distribution
  - Responsive design support

### Development Tools & Configuration
- **ESLint 9.x** - Code linting and quality assurance
- **PostCSS** - CSS processing and transformation
- **TypeScript Configuration** - Strict type checking enabled

## Project Architecture

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── ChartCard.tsx   # Wrapper component for charts
│   ├── StatCard.tsx    # Metric display cards with trend indicators
│   └── QuickActions.tsx # Action buttons component
├── data/
│   └── orders.ts       # Sample order data (20 mock orders)
├── module/             # Feature modules/pages
│   ├── DashboardBase.tsx   # Main dashboard container
│   ├── KeyMetrics.tsx      # Key performance indicators
│   ├── ChartLayer.tsx      # Data visualization components
│   ├── FilterLayer.tsx     # Advanced filtering UI
│   ├── TableLayout.tsx     # Order data table
│   └── PaginationLayer.tsx # Table pagination
├── pages/              # Next.js routing
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # Document structure
│   └── index.tsx       # Main page entry
├── styles/
│   └── globals.css     # Global styles
├── types/
│   └── index.ts        # TypeScript type definitions
└── utils/
    └── dataProcessor.ts # Data processing and analytics logic
```

### Design Patterns
- **Modular Component Architecture** - Separation of concerns with dedicated modules
- **TypeScript Interfaces** - Strict typing for data structures and props
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **State Management** - React hooks for local state management
- **Data Processing Layer** - Separate utility functions for business logic

## Features

### 📊 Key Performance Indicators (KPIs)
- **Total Revenue** - Aggregated sales data with period-over-period comparison
- **Total Orders** - Order count with trend analysis
- **Average Order Value** - Calculated AOV with percentage changes
- **Pending Orders** - Real-time pending order tracking

### 📈 Data Visualization
- **Daily Revenue Trend** - Interactive line chart showing revenue patterns
- **Order Type Distribution** - Pie chart breakdown (Online vs Dine In)
- **Delivery Performance** - Analysis of delivery personnel efficiency
- **Order Status Analytics** - Visual breakdown of order statuses

### ⏱️ Time-based Analytics
- **Today** - Current day performance metrics
- **This Week** - 7-day rolling window analysis
- **This Month** - 30-day performance overview
- **Period Comparison** - Automatic percentage change calculations

### 🔍 Advanced Search & Filtering
- **Real-time Search** - Filter by customer name or order ID
- **Multi-criteria Filtering**:
  - Order Type (Online/Dine In)
  - Order Status (Delivered/In Transit/Pending)
- **Combined Filters** - Multiple filters can be applied simultaneously
- **Clear Filters** - One-click filter reset functionality

### 📋 Order Management
- **Sortable Data Table** - Sort by customer name or order total
- **Detailed Order Information**:
  - Order ID, Customer details
  - Order type and current status
  - Calculated order totals
- **Pagination** - Efficient handling of large datasets (10 records per page)
- **Responsive Table** - Mobile-optimized table display

### 🎯 Interactive Features
- **Hover Effects** - Visual feedback on interactive elements
- **Loading States** - Smooth transitions and state management
- **Filter Persistence** - Maintains filter state during navigation
- **Dynamic Updates** - Real-time calculation updates

## Implementation Details

### Data Processing (`dataProcessor.ts`)
- **Real-time Analytics** - Processes raw order data into meaningful metrics
- **Percentage Change Calculations** - Compares current vs previous periods
- **Dynamic Date Handling** - Generates demo dates for realistic time-based filtering
- **Top Items Analysis** - Identifies best-selling products
- **Delivery Performance Tracking** - Analyzes delivery personnel efficiency

### State Management
- **React Hooks** - useState and useMemo for optimal performance
- **Computed Values** - Memoized calculations to prevent unnecessary re-renders
- **Filter State** - Temporary vs applied filter states for better UX

### Type Safety
- **Comprehensive Interfaces**:
  - `Order` - Complete order structure
  - `OrderItem` - Individual item details
  - `ProcessedData` - Analytics results
  - `TimeFrame` - Period selection types

### Performance Optimizations
- **Memoization** - React.useMemo for expensive calculations
- **Lazy Loading** - Efficient data processing only when needed
- **Pagination** - Reduces DOM elements for better performance
- **Responsive Charts** - Recharts ResponsiveContainer for optimal rendering

### User Experience Enhancements
- **Intuitive Navigation** - Clear time period selection
- **Visual Feedback** - Trend indicators with color coding
- **Accessible Design** - Material-UI accessibility features
- **Mobile Responsive** - Tailwind CSS responsive utilities

## Data Structure

### Order Model
```typescript
interface Order {
  Order_ID: number;
  Customer_Name: string;
  Customer_Phone: string;
  Customer_Address: string;
  Items: OrderItem[];
  Order_Type: 'Online' | 'Dine In';
  Order_Status: 'Delivered' | 'In Transit' | 'Pending';
  Delivery_Person: string;
  Delivery_Status: string;
  Order_Date?: string; // ISO date string
}
```

### Analytics Output
```typescript
interface ProcessedData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  deliveredOrders: number;
  pendingOrders: number;
  inTransitOrders: number;
  orderTypeData: Array<{name: string; value: number; color: string}>;
  topItems: Array<{name: string; quantity: number; revenue: number}>;
  deliveryPerformance: Array<{name: string; deliveries: number}>;
  statusData: Array<{name: string; value: number; color: string}>;
  revenueTrend: Array<{day: string; revenue: number}>;
  revenueChange?: {value: string; trend: 'up' | 'down' | undefined};
  ordersChange?: {value: string; trend: 'up' | 'down' | undefined};
  avgOrderValueChange?: {value: string; trend: 'up' | 'down' | undefined};
}
```

## Sample Data
- **20 Mock Orders** - Realistic restaurant data covering various cuisines
- **Diverse Order Types** - Mix of online and dine-in orders
- **Multiple Cuisines** - Pizza, Asian, American, Mexican, Italian dishes
- **Realistic Pricing** - Market-appropriate item pricing
- **Delivery Personnel** - Multiple delivery staff for performance analysis

## Getting Started

### Prerequisites
- Node.js (16.x or later)
- npm, yarn, pnpm, or bun package manager

### Installation
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production
```bash
npm run build
npm start
```

## Future Enhancement Opportunities

### Features
- Real-time order notifications
- Customer analytics and segmentation
- Inventory management integration
- Revenue forecasting
- Staff performance analytics
- Multi-location support

### Technical Improvements
- Backend API integration
- Real-time data updates with WebSocket
- Advanced caching strategies
- Database integration
- Authentication and authorization
- API rate limiting and error handling

### UI/UX Enhancements
- Dark mode support
- Advanced chart interactions
- Export functionality (PDF/Excel)
- Custom dashboard layouts
- Advanced filtering options
- Keyboard shortcuts

## License
This project is private and proprietary.

---

*This documentation covers the current state of the Restaurant Dashboard as of the latest build. For technical support or feature requests, please contact the development team.*
