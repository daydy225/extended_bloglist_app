/* eslint-disable linebreak-style */
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ addBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createBlog = event => {
    event.preventDefault()
    addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2 data-test="create-new-title">Create new</h2>
      <div>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              data-test="title-input"
              type={title.type}
              name="Title"
              value={title.value}
              id="title"
              onChange={title.onChange}
            />
          </div>
          <div>
            author:
            <input
              data-test="author-input"
              type={author.type}
              name="Author"
              value={author.value}
              id="author"
              onChange={author.onChange}
            />
          </div>
          <div>
            url:
            <input
              data-test="url-input"
              type={url.type}
              name="Url"
              value={url.value}
              id="url"
              onChange={url.onChange}
            />
          </div>
          <button data-test="create-button" type="submit">
            create
          </button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
