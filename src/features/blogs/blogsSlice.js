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
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
    },
    updateBlog: (state, action) => {
      state.blogs = state.blogs.map(blog =>
        blog.id === action.payload.id ? action.payload : blog,
      )
    },
  },
})

export const { setBlogs, createBlog, updateBlog, removeBlog } =
  blogsSlice.actions

export default blogsSlice.reducer
