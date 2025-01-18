import '../styles/Goals.css'
import Goal from '../components/Goal'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

Goals.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Goals({ isAuthenticated }) {
  const [goals, setGoals] = useState([])
  const [newGoalName, setNewGoalName] = useState('')
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [currentGoal, setCurrentGoal] = useState(null)

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/goals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setGoals(response.data)
      } catch (error) {
        console.error('Error fetching goals:', error)
      }
    }

    fetchGoals()
    return () => {}
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setGoals(goals.filter((goal) => goal._id !== id))
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }

  const handleUpdate = (goal) => {
    setCurrentGoal(goal)
    setIsUpdateFormOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:3000/goals',
        { name: newGoalName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setGoals([...goals, response.data.newGoal])
    } catch (error) {
      console.error('Error creating goal:', error)
    }
    setNewGoalName('')
    setIsCreateFormOpen(false)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `http://localhost:3000/goals/${currentGoal.id}`,
        { name: currentGoal.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setGoals(
        goals.map((goal) =>
          goal._id === response.data._id
            ? { ...goal, name: response.data.name }
            : goal
        )
      )
      setIsUpdateFormOpen(false)
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />
  }

  return (
    <>
      <Navbar />
      <main className='pane goals'>
        {goals.length === 0 && <p>There are no goals yet, create some!</p>}

        {goals.map((goal) => (
          <Goal
            key={goal._id}
            id={goal._id}
            name={goal.name}
            showGenerateTodos
            handleDelete={handleDelete}
            onEdit={handleUpdate}
          />
        ))}
        <button
          className='addGoal fab'
          onClick={() => setIsCreateFormOpen(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
          </svg>
        </button>

        <dialog open={isCreateFormOpen}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            className='icon'
          >
            <path d='M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z' />
          </svg>

          <div className='headline'>Create a goal</div>

          <form onSubmit={handleSubmit}>
            <div className='formControl'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                id='name'
                required
                placeholder='a smart goal'
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
              />
            </div>

            <div className='actions'>
              <button
                className='text'
                type='button'
                onClick={() => setIsCreateFormOpen(false)}
              >
                Cancel
              </button>
              <button type='submit' className='filled'>
                Create
              </button>
            </div>
          </form>
        </dialog>

        <dialog open={isUpdateFormOpen}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            className='icon'
          >
            <path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
          </svg>

          <div className='headline'>Update a goal</div>

          <form onSubmit={handleUpdateSubmit}>
            <div className='formControl'>
              <label htmlFor='name'>Updated name:</label>
              <input
                type='text'
                name='name'
                id='name'
                value={currentGoal?.name || ''}
                onChange={(e) =>
                  setCurrentGoal({ ...currentGoal, name: e.target.value })
                }
                required
              />
            </div>

            <div className='actions'>
              <button
                className='text'
                type='button'
                onClick={() => setIsUpdateFormOpen(false)}
              >
                Cancel
              </button>
              <button type='submit' className='filled'>
                Update
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}
