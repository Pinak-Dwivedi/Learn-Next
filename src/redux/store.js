import { configureStore } from "@reduxjs/toolkit";
import userReduer from "@/redux/slices/userSlice";
import postsReducer from "@/redux/slices/postsSlice";

const store = configureStore({
  reducer: {
    user: userReduer,
    posts: postsReducer,
  },
});

export default store;
