/* eslint-disable linebreak-style */

import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state.notification)
  if (!message) {
    return null
  }

  return <div className={type === 'error' ? 'error' : 'success'}>{message}</div>
}

export default Notification
