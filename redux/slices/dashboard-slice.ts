import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RecentBooking } from "@/app/[locale]/dashboard/types";
import { axiosInstance } from "@/lib/axios/axios-instance";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartDataPoint {
  month: string;
  flights: number;
  hotels: number;
}

interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

interface CountryDataPoint {
  id: string;
  code: string;
  name: string;
  flag: string;
  percentage: number;
  color: string;
}

interface DashboardState {
  stats: {
    hotelAndFlight: { flights: number; hotels: number; badge: number };
    activeFlightAndRooms: { activeFlights: number; occupiedRooms: number; badge: number };
    revenue: { total: number; badge: number };
    completed: { total: number; badge: number };
  };
  chart: {
    data: ChartDataPoint[];
    total: number;
  };
  pie: {
    data: PieDataPoint[];
    total: number;
  };
  countries: {
    total: number;
    badge: number;
    data: CountryDataPoint[];
  };
  recentBookings: {
    data: RecentBooking[];
    total: number;
    page: number;
    pages: number;
    count: number;
  };
  loading: {
    stats: boolean;
    chart: boolean;
    pie: boolean;
    countries: boolean;
    recentBookings: boolean;
  };
  error: string | null;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: DashboardState = {
  stats: {
    hotelAndFlight: { flights: 0, hotels: 0, badge: 0 },
    activeFlightAndRooms: { activeFlights: 0, occupiedRooms: 0, badge: 0 },
    revenue: { total: 0, badge: 0 },
    completed: { total: 0, badge: 0 },
  },
  chart: {
    data: [],
    total: 0,
  },
  pie: {
    data: [],
    total: 0,
  },
  countries: {
    total: 0,
    badge: 0,
    data: [],
  },
  recentBookings: {
    data: [],
    total: 0,
    page: 1,
    pages: 1,
    count: 0,
  },
  loading: {
    stats: false,
    chart: false,
    pie: false,
    countries: false,
    recentBookings: false,
  },
  error: null,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard/cards");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
    }
  }
);

export const fetchDashboardChart = createAsyncThunk(
  "dashboard/fetchChart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard-/barchart");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch chart");
    }
  }
);

export const fetchDashboardPie = createAsyncThunk(
  "dashboard/fetchPie",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard/piechart");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch pie");
    }
  }
);

export const fetchDashboardCountries = createAsyncThunk(
  "dashboard/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard/map");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch countries");
    }
  }
);

export const fetchRecentBookings = createAsyncThunk(
  "dashboard/fetchRecentBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard/table");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
    }
  }
);
export const fetchAllDashboardData = createAsyncThunk(
  "dashboard/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [stats, chart, pie, countries, recentBookings] = await Promise.all([
        axiosInstance.get("/dashboard/cards"),
        axiosInstance.get("/dashboard/barchart"),
        axiosInstance.get("/dashboard/piechart"),
        axiosInstance.get("/dashboard/map"),
        axiosInstance.get("/dashboard/table"),
      ]);

      return {
        stats: stats.data,
        chart: chart.data,
        pie: pie.data,
        countries: countries.data,
        recentBookings: recentBookings.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ─── Stats ─── */
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading.stats = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error = action.payload as string;
      })

      /* ─── Chart ─── */
      .addCase(fetchDashboardChart.pending, (state) => {
        state.loading.chart = true;
        state.error = null;
      })
      .addCase(fetchDashboardChart.fulfilled, (state, action) => {
        state.loading.chart = false;
        state.chart = action.payload;
      })
      .addCase(fetchDashboardChart.rejected, (state, action) => {
        state.loading.chart = false;
        state.error = action.payload as string;
      })

      /* ─── Pie ─── */
      .addCase(fetchDashboardPie.pending, (state) => {
        state.loading.pie = true;
        state.error = null;
      })
      .addCase(fetchDashboardPie.fulfilled, (state, action) => {
        state.loading.pie = false;
        state.pie = action.payload;
      })
      .addCase(fetchDashboardPie.rejected, (state, action) => {
        state.loading.pie = false;
        state.error = action.payload as string;
      })

      /* ─── Countries ─── */
      .addCase(fetchDashboardCountries.pending, (state) => {
        state.loading.countries = true;
        state.error = null;
      })
      .addCase(fetchDashboardCountries.fulfilled, (state, action) => {
        state.loading.countries = false;
        state.countries = action.payload;
      })
      .addCase(fetchDashboardCountries.rejected, (state, action) => {
        state.loading.countries = false;
        state.error = action.payload as string;
      })

      /* ─── Recent Bookings ─── */
      .addCase(fetchRecentBookings.pending, (state) => {
        state.loading.recentBookings = true;
        state.error = null;
      })
      .addCase(fetchRecentBookings.fulfilled, (state, action) => {
        state.loading.recentBookings = false;
        state.recentBookings = action.payload;
      })
      .addCase(fetchRecentBookings.rejected, (state, action) => {
        state.loading.recentBookings = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllDashboardData.pending, (state) => {
        // set all loading to true at once
        state.loading.stats = true;
        state.loading.chart = true;
        state.loading.pie = true;
        state.loading.countries = true;
        state.loading.recentBookings = true;
        state.error = null;
      })
      .addCase(fetchAllDashboardData.fulfilled, (state, action) => {
        const { stats, chart, pie, countries, recentBookings } = action.payload;
        state.loading = {
          stats: false,
          chart: false,
          pie: false,
          countries: false,
          recentBookings: false,
        };
        state.stats = stats;
        state.chart = chart;
        state.pie = pie;
        state.countries = countries;
        state.recentBookings = recentBookings;
      })
      .addCase(fetchAllDashboardData.rejected, (state, action) => {
        state.loading = {
          stats: false,
          chart: false,
          pie: false,
          countries: false,
          recentBookings: false,
        };
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
