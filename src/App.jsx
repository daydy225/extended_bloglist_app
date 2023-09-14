import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useAuth, useField, useResource } from './hooks'

const App = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const username = useField('text')
  const password = useField('password')

  const [user, authService] = useAuth(baseUrl)
  const [blogs, blogsService] = useResource(baseUrl)

  const handleLogin = event => {
    event.preventDefault()
    authService.login(username.value, password.value)
  }

  const blogFormRef = useRef()
  const addBlogs = async newObject => {
    blogFormRef.current.toggleVisibility()

    blogsService.create(newObject)
  }

  const updateBlogs = (id, newObject) => blogsService.update(id, newObject)

  const deleteBlogs = id => blogsService.remove(id)

  const logout = event => {
    event.preventDefault()
    authService.logout()
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm
          handleSubmit={handleLogin}
          usernameInput={username}
          passwordInput={password}
        />{' '}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button type="button" onClick={logout}>
          logout
        </button>
      </div>

      <br />
      <Togglable
        buttonLabel="create new"
        buttonLabel2="cancel"
        ref={blogFormRef}
      >
        <BlogForm addBlog={addBlogs} />
      </Togglable>

      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          update={updateBlogs}
          deleteBlog={deleteBlogs}
          user={user}
        />
      ))}
    </div>
  )
}
export default App
