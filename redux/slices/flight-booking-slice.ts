import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FlightBooking } from "@/app/[locale]/(flight)/flightbooking/type";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface FlightBookingState {
  bookings: FlightBooking[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    count: number;
  };
  stats: {
    pending: number;
    pendingBadge: number;
    confirmed: number;
    confirmedBadge: number;
    manual: number;
    manualBadge: number;
    cancelled: number;
    cancelledBadge: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: FlightBookingState = {
  bookings: [],
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
    count: 0,
  },
  stats: {
    pending: 0,
    pendingBadge: 0,
    confirmed: 0,
    confirmedBadge: 0,
    manual: 0,
    manualBadge: 0,
    cancelled: 0,
    cancelledBadge: 0,
  },
  loading: false,
  error: null,
};

export const fetchFlightBookings = createAsyncThunk(
  "flightBookings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/flight-bookings");
      return response.data; // ← return the whole response now, not just .data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch");
    }
  }
);

const flightBookingSlice = createSlice({
  name: "flightBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightBookings.fulfilled, (state, action) => {
        state.loading = false;
        const res = action.payload;
        state.bookings = res.data;
        state.pagination = {
          total: res.total,
          page: res.page,
          pages: res.pages,
          count: res.count,
        };
        state.stats = {
          pending: res.pending,
          pendingBadge: res.pendingBadge,
          confirmed: res.confirmed,
          confirmedBadge: res.confirmedBadge,
          manual: res.manual,
          manualBadge: res.manualBadge,
          cancelled: res.cancelled,
          cancelledBadge: res.cancelledBadge,
        };
      })
      .addCase(fetchFlightBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flightBookingSlice.reducer;
