import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    isLoading: false,
    validationError: null,
    posts: [],
  },

  reducers: {
    setPosts(state, action) {
      state.isLoading = true;
      state.posts = action.payload;
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

export default postsSlice.reducer;
export const { setPosts, setIsLoading, setValidationError } =
  postsSlice.actions;
