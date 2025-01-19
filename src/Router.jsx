import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Error from './pages/Error'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Goals from './pages/Goals'
import Todos from './pages/Todos'
import Habits from './pages/Habits'
import Journals from './pages/Journals'
import Settings from './pages/Settings'
import { useState } from 'react'

export default function Router() {
  const token = localStorage.getItem('token')
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing isAuthenticated={isAuthenticated} />,
    },
    {
      path: '/signup',
      element: (
        <Signup
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
    },
    {
      path: '/signin',
      element: (
        <Signin
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
    },
    {
      path: '/goals',
      element: <Goals isAuthenticated={isAuthenticated} />,
    },
    {
      path: '/todos',
      element: <Todos isAuthenticated={isAuthenticated} />,
    },
    {
      path: '/habits',
      element: <Habits isAuthenticated={isAuthenticated} />,
    },
    {
      path: '/journals',
      element: <Journals isAuthenticated={isAuthenticated} />,
    },
    {
      path: '/settings',
      element: (
        <Settings
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
    },
    {
      path: '*',
      element: <Error isAuthenticated={isAuthenticated} />,
    },
  ])

  return <RouterProvider router={router} />
}
