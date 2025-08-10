import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: {
    leaderboard: []
  },
  reducers: {
    setLeaderboard(state, action) {
      state.leaderboard = action.payload;
    }
  }
});

export const premiumActions= premiumSlice.actions;
export default premiumSlice.reducer;
