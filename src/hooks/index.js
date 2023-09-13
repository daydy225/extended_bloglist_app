import { useEffect, useState } from 'react'
import axios from 'axios'

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
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/blogs`)
        setResources(data.sort((a, b) => b.likes - a.likes))
      } catch (error) {
        console.error(error)
      }
    }

    fetchResources()
  }, [baseUrl])

  const create = async (resource, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const response = await axios.post(`${baseUrl}/blogs`, resource, config)
      setResources([...resources, response.data])
    } catch (error) {
      console.error(error)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}

// make hook to authenticate user
export const useAuth = baseUrl => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = window.localStorage.getItem('loggedUserBlogApp')
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          }
          const response = await axios.get(`${baseUrl}/users/get-data`, config)
          setUser(response.data)
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

      setUser(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUserBlogApp')
    setUser(null)
  }

  const service = {
    login,
    logout,
  }

  return [user, service]
}
