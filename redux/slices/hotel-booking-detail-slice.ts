import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface LeadPassenger {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  country: string;
  passengerType: string;
}

interface Passenger {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  contactNumber: string;
  country: string;
  passengerType: string;
}

interface PaymentInfo {
  name: string;
  date: string;
  transactionId: string;
  totalPayment: number;
}

interface PaymentSummary {
  payment: number;
  subtotal: number;
  discount: number;
  taxes: number;
  received: number;
}

interface HotelBookingDetailState {
  status: string;
  entryMethod: string;
  leadPassenger: LeadPassenger | null;
  passengers: Passenger[];
  paymentInfo: PaymentInfo | null;
  paymentSummary: PaymentSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: HotelBookingDetailState = {
  status: "",
  entryMethod: "",
  leadPassenger: null,
  passengers: [],
  paymentInfo: null,
  paymentSummary: null,
  loading: false,
  error: null,
};

export const fetchHotelBookingDetail = createAsyncThunk(
  "hotelBookingDetail/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/hotelbookingdetails");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch hotel booking detail"
      );
    }
  }
);

const hotelBookingDetailSlice = createSlice({
  name: "hotelBookingDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.entryMethod = action.payload.entryMethod;
        state.leadPassenger = action.payload.leadPassenger;
        state.passengers = action.payload.passengers;
        state.paymentInfo = action.payload.paymentInfo;
        state.paymentSummary = action.payload.paymentSummary;
      })
      .addCase(fetchHotelBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default hotelBookingDetailSlice.reducer;
