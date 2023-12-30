import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoading: false,
    validationError: null,
    user: null,
  },

  reducers: {
    setUser(state, action) {
      state.isLoading = true;
      state.user = action.payload;
      state.isLoading = false;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setValidationError(state, action) {
      state.validationError = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setIsLoading, setValidationError } = userSlice.actions;
