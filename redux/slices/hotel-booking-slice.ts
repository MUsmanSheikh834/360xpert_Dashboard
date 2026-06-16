import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HotelBooking } from "@/app/[locale]/(hotel)/hotelbooking/type";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface HotelBookingState {
  bookings: HotelBooking[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    count: number;
  };
  stats: {
    totalbookings: number;
    totalbookingsbadge: number;
    occupied: number;
    occupiedbadge: number;
    checkin: number;
    checkinbadge: number;
    checkout: number;
    checkoutbadge: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: HotelBookingState = {
  bookings: [],
  pagination: { total: 0, page: 1, pages: 1, count: 0 },
  stats: {
    totalbookings: 0,
    totalbookingsbadge: 0,
    occupied: 0,
    occupiedbadge: 0,
    checkin: 0,
    checkinbadge: 0,
    checkout: 0,
    checkoutbadge: 0,
  },
  loading: false,
  error: null,
};

export const fetchHotelBookings = createAsyncThunk(
  "hotelBookings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/hotel-bookings");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch");
    }
  }
);

const hotelBookingSlice = createSlice({
  name: "hotelBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelBookings.fulfilled, (state, action) => {
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
          totalbookings: res.totalbookings,
          totalbookingsbadge: res.totalbookingsbadge,
          occupied: res.occupied,
          occupiedbadge: res.occupiedbadge,
          checkin: res.checkin,
          checkinbadge: res.checkinbadge,
          checkout: res.checkout,
          checkoutbadge: res.checkoutbadge,
        };
      })
      .addCase(fetchHotelBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default hotelBookingSlice.reducer;
