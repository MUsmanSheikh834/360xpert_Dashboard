import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface FlightRow {
  airline: string;
  airlineLogo: string;
  departureCode: string;
  departureTime: string;
  departureAirline: string;
  stops: number;
  stopRoute: string;
  duration: string;
  durationRoute: string;
  arrivalCode: string;
  arrivalTime: string;
  arrivalAirline: string;
  pnr: string;
  baggage: string;
}

interface Ticket {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  class: string;
  flights: FlightRow[];
}

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

interface FlightBookingDetailState {
  status: string;
  paymentStatus: string;
  entryMethod: string;
  ticket: Ticket | null;
  leadPassenger: LeadPassenger | null;
  passengers: Passenger[];
  paymentInfo: PaymentInfo | null;
  paymentSummary: PaymentSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: FlightBookingDetailState = {
  status: "",
  paymentStatus: "",
  entryMethod: "",
  ticket: null,
  leadPassenger: null,
  passengers: [],
  paymentInfo: null,
  paymentSummary: null,
  loading: false,
  error: null,
};

export const fetchFlightBookingDetail = createAsyncThunk(
  "flightBookingDetail/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/flightbookingdetails");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch flight booking detail"
      );
    }
  }
);

const flightBookingDetailSlice = createSlice({
  name: "flightBookingDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        const res = action.payload;
        state.status = res.status;
        state.paymentStatus = res.paymentStatus;
        state.entryMethod = res.entryMethod;
        state.ticket = res.ticket;
        state.leadPassenger = res.leadPassenger;
        state.passengers = res.passengers;
        state.paymentInfo = res.paymentInfo;
        state.paymentSummary = res.paymentSummary;
      })
      .addCase(fetchFlightBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flightBookingDetailSlice.reducer;
