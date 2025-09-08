import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Order } from '@/types';

const TableLayout: React.FC<{ currentOrders: Order[], orderBy: 'Customer_Name' | 'Total', orderDirection: 'asc' | 'desc', handleSort: (property: 'Customer_Name' | 'Total') => void }> = (props) => {
  return (

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Order ID
            </TableCell>
            <TableCell sortDirection={props.orderBy === 'Customer_Name' ? props.orderDirection : false}>
              <TableSortLabel
                active={props.orderBy === 'Customer_Name'}
                direction={props.orderBy === 'Customer_Name' ? props.orderDirection : 'asc'}
                onClick={() => props.handleSort('Customer_Name')}
              >
                Customer
              </TableSortLabel>
            </TableCell>
            <TableCell>
              Type
            </TableCell>
            <TableCell>
              Status
            </TableCell>
            <TableCell sortDirection={props.orderBy === 'Total' ? props.orderDirection : false}>
              <TableSortLabel
                active={props.orderBy === 'Total'}
                direction={props.orderBy === 'Total' ? props.orderDirection : 'asc'}
                onClick={() => props.handleSort('Total')}
              >
                Total
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.currentOrders.map((order: Order) => {
            const orderTotal = order.Items.reduce((sum, item) => sum + item.Total_Price, 0);
            return (
              <TableRow key={order.Order_ID} hover>
                <TableCell>#{order.Order_ID}</TableCell>
                <TableCell>{order.Customer_Name}</TableCell>
                <TableCell>{order.Order_Type}</TableCell>
                <TableCell>{order.Order_Status}</TableCell>
                <TableCell>${orderTotal.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLayout;