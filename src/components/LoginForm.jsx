/* eslint-disable linebreak-style */
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          data-test="login-username"
          type="text"
          placeholder="username"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <input
          data-test="login-password"
          type="password"
          placeholder="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button data-test="login-button" type="submit">
        login
      </button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
