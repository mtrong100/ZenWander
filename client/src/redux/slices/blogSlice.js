import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    isLoading: false,
  },
  reducers: {
    loadingBlogs: (state, action) => {
      state.isLoading = action.payload;
    },
    storeBlogs: (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loadingBlogs, storeBlogs } = blogSlice.actions;

export default blogSlice.reducer;
