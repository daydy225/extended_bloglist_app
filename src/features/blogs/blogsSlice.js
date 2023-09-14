import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload
    },
    createBlog: (state, action) => {
      state.blogs = [...state.blogs, action.payload]
    },
  },
})

export const { setBlogs, createBlog } = blogsSlice.actions

export default blogsSlice.reducer
