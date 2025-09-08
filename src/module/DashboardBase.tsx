import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import {
  Search,
  X,
  Filter
} from 'lucide-react';
import { ordersData } from '@/data/orders';
import ChartCard from '@/components/ChartCard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { TimeFrame, addDemoOrderDates, isOrderInTimeframe, processOrderDataWithComparison } from '@/utils/dataProcessor';
import PaginationLayer from './PaginationLayer';
import TableLayout from './TableLayout';
import FilterLayer from './FilterLayer';
import KeyMetrics from './KeyMetrics';
import ChartLayer from './ChartLayer';

const DashboardBase: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('today');
  const [orderBy, setOrderBy] = useState<'Customer_Name' | 'Total'>('Customer_Name');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  
  // Temporary filter state (only applied when Apply is clicked)
  const [tempFilterType, setTempFilterType] = useState<string>('');
  const [tempFilterStatus, setTempFilterStatus] = useState<string>('');
  
  const RECORDS_PER_PAGE = 10;

  const processedData = useMemo(() => {
    // Use comparison function to get dynamic percentages
    return processOrderDataWithComparison(ordersData, selectedTimeframe);
  }, [selectedTimeframe]);

  const handleSort = (property: 'Customer_Name' | 'Total') => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderBy(property);
    setOrderDirection(isAsc ? 'desc' : 'asc');
  };

  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Set temporary state to current filter values when opening
    setTempFilterType(filterType);
    setTempFilterStatus(filterStatus);
    setFilterAnchorEl(event.currentTarget);
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
    setFilterAnchorEl(null);
  };

  const handleApplyFilters = () => {
    // Apply temporary filters to actual filter state
    setFilterType(tempFilterType);
    setFilterStatus(tempFilterStatus);
    setCurrentPage(1);
    handleFilterClose();
  };

  const handleClearTempFilters = () => {
    setTempFilterType('');
    setTempFilterStatus('');
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterStatus, selectedTimeframe]);

  const { filteredAndSortedOrders, totalPages } = useMemo(() => {
    // First add demo dates to orders if they don't exist
    let filteredOrders = addDemoOrderDates([...ordersData]);

    // Apply timeframe filter
    filteredOrders = filteredOrders.filter(order => 
      isOrderInTimeframe(order, selectedTimeframe)
    );

    // Apply search filter
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(order => 
        order.Customer_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Order_ID.toString().includes(searchTerm)
      );
    }

    // Apply type filter
    if (filterType) {
      filteredOrders = filteredOrders.filter(order => order.Order_Type === filterType);
    }

    // Apply status filter
    if (filterStatus) {
      filteredOrders = filteredOrders.filter(order => order.Order_Status === filterStatus);
    }

    // Apply sorting
    const sortedResults = filteredOrders.sort((a, b) => {
      let aValue: string | number, bValue: string | number;
        if (orderBy === 'Total') {
          aValue = a.Items.reduce((sum, item) => sum + item.Total_Price, 0);
          bValue = b.Items.reduce((sum, item) => sum + item.Total_Price, 0);
        } else {
        const aProp = a[orderBy];
        const bProp = b[orderBy];
        // Handle non-comparable properties by converting to string
        aValue = typeof aProp === 'object' ? String(aProp) : aProp;
        bValue = typeof bProp === 'object' ? String(bProp) : bProp;
        }
        if (aValue < bValue) return orderDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return orderDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedResults.length / RECORDS_PER_PAGE);
    
    return {
      filteredAndSortedOrders: sortedResults,
      totalPages
    };
  }, [orderBy, orderDirection, searchTerm, filterType, filterStatus, selectedTimeframe, RECORDS_PER_PAGE]);

  // Get current page records
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
    const endIndex = startIndex + RECORDS_PER_PAGE;
    return filteredAndSortedOrders.slice(startIndex, endIndex);
  }, [filteredAndSortedOrders, currentPage, RECORDS_PER_PAGE]);

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
            <p className="text-gray-600">Monitor your restaurant&apos;s performance and make data-driven decisions</p>
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
        <KeyMetrics processedData={processedData} />
        <ChartLayer processedData={processedData} />
          {/* Recent Orders Table */}
          <ChartCard title={
            (searchTerm || filterType || filterStatus) 
              ? `Filtered Orders (${selectedTimeframe === 'today' ? 'Today' : selectedTimeframe === 'week' ? 'This Week' : 'This Month'})` 
              : `Recent Orders (${selectedTimeframe === 'today' ? 'Today' : selectedTimeframe === 'week' ? 'This Week' : 'This Month'})`
          } className="mb-8">
            {/* Search Control */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ flex: 1, maxWidth: '400px' }}>
                <TextField
                  fullWidth
                  label="Search Orders"
                  placeholder="Search by customer name or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleFilterOpen}
                          size="small"
                          sx={{ 
                            color: (filterType || filterStatus) ? 'primary.main' : 'text.secondary',
                            backgroundColor: (filterType || filterStatus) ? 'primary.light' : 'transparent',
                            '&:hover': {
                              backgroundColor: (filterType || filterStatus) ? 'primary.light' : 'action.hover'
                            }
                          }}
                        >
                          <Filter size={18} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              {/* Clear All Button */}
              {(searchTerm || filterType || filterStatus) && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('');
                    setFilterStatus('');
                    setCurrentPage(1);
                  }}
                  startIcon={<X size={16} />}
                  sx={{ whiteSpace: 'nowrap', alignSelf: 'center' }}
                >
                  Clear All
                </Button>
              )}
            </Box>

            {/* Filter Popper */}
           <FilterLayer filterOpen={filterOpen} filterAnchorEl={filterAnchorEl} handleFilterClose={handleFilterClose} handleApplyFilters={handleApplyFilters} handleClearTempFilters={handleClearTempFilters} tempFilterType={tempFilterType} tempFilterStatus={tempFilterStatus} setTempFilterType={setTempFilterType} setTempFilterStatus={setTempFilterStatus} />
            {/* Results Summary */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {currentOrders.length} of {filteredAndSortedOrders.length} order{filteredAndSortedOrders.length !== 1 ? 's' : ''} 
              for {selectedTimeframe === 'today' ? 'today' : selectedTimeframe === 'week' ? 'this week' : 'this month'}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterType && ` • Type: ${filterType}`}
              {filterStatus && ` • Status: ${filterStatus}`}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </Typography>
            <TableLayout currentOrders={currentOrders} orderBy={orderBy} orderDirection={orderDirection} handleSort={handleSort} />
            <PaginationLayer totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </ChartCard>         
        </div>
      </div>
    </>
  );
};

export default DashboardBase;
