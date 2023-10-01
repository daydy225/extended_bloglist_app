import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from '../features/notification/notificationSlice'

import {
  setBlogs,
  createBlog,
  updateBlog,
  removeBlog,
} from '../features/blogs/blogsSlice'

import { setUser } from '../features/user/userSlice'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useResource = baseUrl => {
  const { blogs } = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blogs`)
        const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
        dispatch(setBlogs(sortedBlogs))
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchResources()
  }, [baseUrl])

  const create = async resource => {
    try {
      const token = window.localStorage.getItem('loggedUserBlogApp')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        const response = await axios.post(`${baseUrl}/blogs`, resource, config)
        dispatch(createBlog(response.data))
        dispatch(
          setNotification({
            message: `Blog ${response.data.title} created successfully`,
            type: 'success',
          }),
        )
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const update = async (id, resource) => {
    try {
      const token = window.localStorage.getItem('loggedUserBlogApp')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }

        const response = await axios.put(
          `${baseUrl}/blogs/${id}`,
          resource,
          config,
        )
        dispatch(updateBlog(response.data))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async id => {
    try {
      const token = window.localStorage.getItem('loggedUserBlogApp')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        await axios.delete(`${baseUrl}/blogs/${id}`, config)
        dispatch(removeBlog(id))
        dispatch(
          setNotification({
            message: `Blog ${
              resources.find(r => r.id === id).title
            } deleted successfully`,
            type: 'success',
          }),
        )
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const service = {
    create,
    update,
    remove,
  }

  return [blogs, service]
}

// make hook to authenticate user
export const useAuth = baseUrl => {
  // const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = window.localStorage.getItem('loggedUserBlogApp')
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          }
          const response = await axios.get(`${baseUrl}/users/get-data`, config)
          dispatch(setUser(response.data))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      })

      window.localStorage.setItem('loggedUserBlogApp', response.data.token)

      dispatch(setUser(response.data))
      dispatch(
        setNotification({
          message: `Welcome ${response.data.username}!`,
          type: 'success',
        }),
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      console.error(error)
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUserBlogApp')
    dispatch(setUser(null))
  }

  const service = {
    login,
    logout,
  }

  return [user, service]
}
