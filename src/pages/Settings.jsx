import '../styles/Settings.css'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'
import { Navigate, useNavigate } from 'react-router-dom'

Settings.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
}

export default function Settings({ isAuthenticated, setIsAuthenticated }) {
  const email = 'test@email.com'
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    setIsAuthenticated(false)
    navigate('/signin')
  }

  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />
  }

  return (
    <>
      <Navbar />
      <main className='pane settings'>
        <h1>GENESIS</h1>
        <p>email: {email}</p>

        <div className='theme'>
          <span>Theme:</span>
          <select name='theme' id='theme' defaultValue='system'>
            <option value='system'>System</option>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </div>

        <button
          className='filled logout scale-in-center'
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className='copyright'>
          <p>
            &copy; 2025 Sai Shravan Vadla. All rights reserved.
            <a
              href='https://github.com/shravzzv/Genesis-precursor-client/issues'
              target='_blank'
              rel='noopener noreferrer'
            >
              Submit an issue
            </a>
          </p>
        </div>
      </main>
    </>
  )
}
