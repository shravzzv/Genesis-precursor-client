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

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/signin',
      element: <Signin />,
    },
    {
      path: '/goals',
      element: <Goals />,
    },
    {
      path: '/todos',
      element: <Todos />,
    },
    {
      path: '/habits',
      element: <Habits />,
    },
    {
      path: '/journals',
      element: <Journals />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ])

  return <RouterProvider router={router} />
}
