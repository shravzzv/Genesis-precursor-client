import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

Error.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Error({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />
  }

  return (
    <>
      <Navbar />
      <main className='pane'>
        <h1>Error</h1>
        <p>This is the error page.</p>
      </main>
    </>
  )
}
