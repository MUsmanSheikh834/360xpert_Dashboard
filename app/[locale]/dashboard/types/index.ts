import React from "react";

export interface RecentBooking {
  name: string;
  contactNo: string;
  email: string;
  code: string;
  airportFrom: string;
  airportTo: string;
  departure: string;
  arrival: string;
  status: string;
}

export interface FlightBooking {
  name: string;
  manually: boolean;
  contactNo: string;
  email: string;
  reservationNo: string;
  flightNo: string;
  airportFrom: string;
  airportTo: string;
  departureDatetime: string;
  returnDate: string;
  class: string;
  payment: string;
  status: string;
}

export interface HotelBooking {
  name: string;
  manually: boolean;
  contactNo: string;
  email: string;
  bookingId: string;
  roomNo: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  paymentStatus: string;
  status: string;
}

export interface MetricData {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  conversionRate: number;
  orders: number;
  growth: number;
  bounceRate: number;
  pageViews: number;
}

export interface ChartDataPoint {
  month?: string;
  revenue?: number;
  users?: number;
  orders?: number;
  product?: string;
  sales?: number;
  profit?: number;
  name?: string;
  value?: number;
  color?: string;
  time?: string;
  active?: number;
}

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: any;
}

export interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  icon?: React.ComponentType<any>;
  searchKey?: keyof T;
  filterOptions?: {
    key: keyof T;
    options: FilterOption[];
  };
  isLoading?: boolean;
  showPagination?: boolean;
  defaultPageSize?: number;
}

export interface DashboardProps {
  isLoading?: boolean;
  data?: {
    metrics?: MetricData;
    recentBookings?: RecentBooking[];
  };
}
