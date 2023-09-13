import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useAuth, useField, useResource } from './hooks'

const App = () => {
  // const [notificationMsg, setNotificationMsg] = useState({
  //   message: '',
  //   type: 'error',
  // })
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
  const addBlogs = newObject => {
    blogFormRef.current.toggleVisibility()

    blogsService.create(newObject)
    // try {
    //   blogService.setToken(user.token)
    //   const addedBlogs = await blogService.create(newObject)
    //   setNotificationMsg({
    //     message: `a new blog ${addedBlogs.title} by ${addedBlogs.author} added`,
    //   })
    //   setTimeout(() => {
    //     setNotificationMsg({
    //       message: null,
    //     })
    //   }, 5000)
    // } catch (exeption) {
    //   setNotificationMsg({
    //     message: 'An error occured while adding a new blog',
    //     type: 'error',
    //   })
    //   setTimeout(() => {
    //     setNotificationMsg({
    //       message: null,
    //     })
    //   }, 5000)
    // }
  }

  const updateBlogs = async (id, newObject) => {
    try {
      await blogsService.update(id, newObject)
    } catch (error) {
      console.log('delete error', error)
    }
    // try {
    //   console.log('updateBlogs', id, newObject)
    //   const updatedBlogs = await blogService.update(id, newObject)
    //   setBlogs(blogs.map(blog => (blog.id === id ? updatedBlogs : blog)))
    // } catch (exeption) {
    //   setNotificationMsg({
    //     message: 'An error occured while updating a blog',
    //     type: 'error',
    //   })
    //   setTimeout(() => {
    //     setNotificationMsg({
    //       message: null,
    //     })
    //   }, 5000)
    // }
  }

  const deleteBlogs = async id => {
    blogsService.remove(id)
    // try {
    //   blogService.setToken(user.token)
    //   await blogService.deleteBlog(id)
    //   // setBlogs(blogs.filter(blog => blog.id !== id))
    // } catch (exeption) {
    //   setNotificationMsg({
    //     message: 'An error occured while deleting a blog',
    //     type: 'error',
    //   })
    //   setTimeout(() => {
    //     setNotificationMsg({
    //       message: null,
    //     })
    //   }, 3000)
    // }
  }

  const logout = event => {
    event.preventDefault()
    authService.logout()
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {/* <Notification
          message={notificationMsg.message}
          type={notificationMsg.type}
        /> */}
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
      {/* <Notification
        message={notificationMsg.message}
        type={notificationMsg.type}
      /> */}
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
