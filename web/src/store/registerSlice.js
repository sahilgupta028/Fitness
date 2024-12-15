// store/registerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  height: "",
  weight: "",
  fitnessGoal: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { updateField, resetForm } = registerSlice.actions;
export default registerSlice.reducer;
