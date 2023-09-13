/* eslint-disable linebreak-style */
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, usernameInput, passwordInput }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          data-test="login-username"
          type="text"
          placeholder="username"
          value={usernameInput.value}
          name="Username"
          onChange={usernameInput.onChange}
        />
      </div>
      <div>
        <input
          data-test="login-password"
          type="password"
          placeholder="password"
          value={passwordInput.value}
          name="Password"
          onChange={passwordInput.onChange}
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
  usernameInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired,
}

export default LoginForm
