import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@api";

const initialState = {
  data: [],
  status: null,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = initialState.data;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error?.message;
      });
  },
  selectors: {
    selectData: (state) => state.data,
    selectStatus: (state) => state.status,
  },
});

export const { addData, clearData, removeData } = dataSlice.actions;
export const { selectData, selectStatus } = dataSlice.selectors;

export default dataSlice.reducer;

export const fetchData = createAsyncThunk(
  "data/fetchdata",
  async (endpoint, { signal, rejectWithValue }) => {
    try {
      const data = await getData(endpoint, signal);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data ?? e.message);
    }
  },
  {
    condition(endpoint, { getState }) {
      const {
        data: { status },
      } = getState();

      if (status === "loading" || !endpoint) return false;
      return true;
    },
  }
);
