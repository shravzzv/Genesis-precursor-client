import '../styles/Habits.css'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Habit from '../components/Habit'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

Habits.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Habits({ isAuthenticated }) {
  const [habits, setHabits] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentHabit, setCurrentHabit] = useState(null)
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [repeatDaysError, setRepeatDaysError] = useState(false)
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    repeatDays: [],
  })

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/habits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setHabits(response.data)
      } catch (error) {
        console.error('Error fetching habits:', error)
      }
    }

    fetchHabits()
    return () => {}
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/habits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setHabits(habits.filter((habit) => habit._id !== id))
    } catch (error) {
      console.error('Error deleting habit:', error)
    }
  }

  const handleUpdate = (habit) => {
    setCurrentHabit(habit)
    setIsUpdateFormOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (newHabit.repeatDays.length === 0) {
      setRepeatDaysError(true)
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:3000/habits',
        newHabit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setHabits([...habits, response.data.newHabit])
    } catch (error) {
      console.error('Error creating habit:', error)
    } finally {
      setIsLoading(false)
      setRepeatDaysError(false)
    }
    setNewHabit({
      title: '',
      description: '',
      repeatDays: [],
    })
    setIsCreateFormOpen(false)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (currentHabit.repeatDays.length === 0) {
      setRepeatDaysError(true)
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `http://localhost:3000/habits/${currentHabit.id}`,
        currentHabit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setHabits(
        habits.map((habit) =>
          habit._id === response.data.updatedHabit._id
            ? { ...habit, ...response.data.updatedHabit }
            : habit
        )
      )
      setIsUpdateFormOpen(false)
    } catch (error) {
      console.error('Error updating habit:', error)
    } finally {
      setRepeatDaysError(false)
      setIsLoading(false)
    }
  }

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const today = new Date().toLocaleString('en-US', { weekday: 'long' })
  const todayHabits = habits.filter((habit) => habit.repeatDays.includes(today))

  const handleCheckboxChange = (day) => {
    setNewHabit((prev) => {
      if (prev.repeatDays.includes(day)) {
        return {
          ...prev,
          repeatDays: prev.repeatDays.filter((d) => d !== day),
        }
      } else {
        return {
          ...prev,
          repeatDays: [...prev.repeatDays, day],
        }
      }
    })
  }

  const handleUpdateCheckboxChange = (day) => {
    setCurrentHabit((prev) => {
      if (prev.repeatDays.includes(day)) {
        return {
          ...prev,
          repeatDays: prev.repeatDays.filter((d) => d !== day),
        }
      } else {
        return {
          ...prev,
          repeatDays: [...prev.repeatDays, day],
        }
      }
    })
  }

  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />
  }

  return (
    <>
      <Navbar />
      <main className='pane'>
        <h2 className='heading'>
          <span>Today</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z' />
          </svg>
        </h2>

        {todayHabits.length === 0 && <p>There are no habits for today</p>}

        <div className='habits'>
          {todayHabits.map((habit) => (
            <Habit
              key={habit._id}
              id={habit._id}
              title={habit.title}
              description={habit.description}
              repeatDays={habit.repeatDays}
              isToday
              handleDelete={handleDelete}
              onEdit={handleUpdate}
            />
          ))}

          <button
            className='addHabit fab'
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
        </div>

        <h2 className='heading'>
          <span>All habits</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z' />
          </svg>
        </h2>

        <div className='habits'>
          {habits.map((habit) => (
            <Habit
              key={habit._id}
              id={habit._id}
              title={habit.title}
              description={habit.description}
              repeatDays={habit.repeatDays}
              handleDelete={handleDelete}
              onEdit={handleUpdate}
            />
          ))}

          {habits.length === 0 && <p>You haven&apos;t added any habits yet.</p>}
        </div>

        <dialog open={isCreateFormOpen}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            className='icon'
          >
            <path d='m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z' />
          </svg>
          <div className='headline'>Create a habit</div>

          <form onSubmit={handleSubmit}>
            <div className='formControl'>
              <label htmlFor='title'>Title:*</label>
              <input
                type='text'
                name='title'
                id='title'
                value={newHabit.title}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, title: e.target.value })
                }
                required
                autoFocus
              />
            </div>

            <div className='formControl'>
              <label htmlFor='description'>Description:</label>
              <textarea
                name='description'
                id='description'
                rows='3'
                value={newHabit.description}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, description: e.target.value })
                }
              ></textarea>
            </div>

            <div>Repeat Days:*</div>
            <div className='formControl'>
              {daysOfWeek.map((day, index) => (
                <div key={index}>
                  <input
                    type='checkbox'
                    id={day}
                    name='repeatDays'
                    value={day}
                    checked={newHabit.repeatDays.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                  />
                  <label htmlFor={day}>{day}</label>
                </div>
              ))}
              {repeatDaysError && (
                <span className='error'>Select atleast one repeat day!</span>
              )}
            </div>

            <div className='actions'>
              <button
                className='text'
                type='button'
                onClick={() => {
                  setIsCreateFormOpen(false)
                  setRepeatDaysError(false)
                }}
              >
                Cancel
              </button>
              <button type='submit' className='filled'>
                {isLoading ? 'Creating...' : 'Create'}
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

          <div className='headline'>Update a habit</div>

          <form onSubmit={handleUpdateSubmit}>
            <div className='formControl'>
              <label htmlFor='title'>Title:*</label>
              <input
                type='text'
                name='title'
                id='title'
                value={currentHabit?.title || ''}
                onChange={(e) =>
                  setCurrentHabit({ ...currentHabit, title: e.target.value })
                }
                required
              />
            </div>

            <div className='formControl'>
              <label htmlFor='description'>Description:</label>
              <textarea
                name='description'
                id='description'
                rows='3'
                value={currentHabit?.description || ''}
                onChange={(e) =>
                  setCurrentHabit({
                    ...currentHabit,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div>Repeat Days:*</div>
            <div className='formControl'>
              {daysOfWeek.map((day, index) => (
                <div key={index}>
                  <input
                    type='checkbox'
                    id={day}
                    name='repeatDays'
                    value={day}
                    checked={currentHabit?.repeatDays.includes(day)}
                    onChange={() => handleUpdateCheckboxChange(day)}
                  />
                  {day}
                  <label htmlFor={day}></label>
                </div>
              ))}
              {repeatDaysError && (
                <span className='error'>Select atleast one repeat day!</span>
              )}
            </div>

            <div className='actions'>
              <button
                className='text'
                type='button'
                onClick={() => {
                  setIsUpdateFormOpen(false)
                  setRepeatDaysError(false)
                }}
              >
                Cancel
              </button>
              <button type='submit' className='filled'>
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}
