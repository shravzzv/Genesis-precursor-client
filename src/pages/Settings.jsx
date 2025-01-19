import '../styles/Settings.css'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

Settings.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
}

export default function Settings({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/users/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setEmail(response.data.email)
      } catch (error) {
        console.error('Error fetching email:', error)
      }
    }

    fetchEmail()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
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
