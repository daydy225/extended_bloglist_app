import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'
import blogsReducer from '../features/blogs/blogsSlice'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})
