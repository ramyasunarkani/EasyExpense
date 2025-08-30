import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    expenses: [],
  },
  reducers: {
    setReport(state, action) {
      state.expenses = action.payload;
    },
    clearReport(state) {
      state.expenses = [];
    },
  },
});

export const reportActions = reportSlice.actions;
export default reportSlice.reducer;