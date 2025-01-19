import '../styles/Todos.css'
import Todo from '../components/Todo'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

Todos.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Todos({ isAuthenticated }) {
  const [todos, setTodos] = useState([])
  const [goals, setGoals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    deadline: '',
    goal: '',
  })

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'https://genesis-precursor-server-production.up.railway.app/todos',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setTodos(response.data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }

    fetchTodos()
    return () => {}
  }, [])

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'https://genesis-precursor-server-production.up.railway.app/goals',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
      await axios.delete(
        `https://genesis-precursor-server-production.up.railway.app/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleUpdate = (todo) => {
    setCurrentTodo(todo)
    setIsUpdateFormOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'https://genesis-precursor-server-production.up.railway.app/todos',
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTodos([...todos, response.data.newTodo])
    } catch (error) {
      console.error('Error creating todo:', error)
    } finally {
      setIsLoading(false)
    }
    setNewTodo({
      title: '',
      description: '',
      deadline: '',
      goal: '',
    })
    setIsCreateFormOpen(false)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `https://genesis-precursor-server-production.up.railway.app/todos/${currentTodo.id}`,
        currentTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTodos(
        todos.map((todo) =>
          todo._id === response.data.updatedTodo._id
            ? { ...todo, ...response.data.updatedTodo }
            : todo
        )
      )
      setIsUpdateFormOpen(false)
    } catch (error) {
      console.error('Error updating todo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />
  }

  return (
    <>
      <Navbar />
      <main className='pane todos'>
        {todos.length === 0 && <p>There are no todos yet. Create some!</p>}

        {todos.map((todo) => (
          <Todo
            key={todo._id}
            id={todo._id}
            title={todo.title}
            description={todo.description || ''}
            deadline={todo.deadline || ''}
            goalName={todo.goal.name || ''}
            goalId={todo.goal._id}
            handleDelete={handleDelete}
            onEdit={handleUpdate}
          />
        ))}
        <button
          className='addTodo fab'
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
            <path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q48 0 93.5 11t87.5 32q15 8 19.5 24t-5.5 30q-10 14-26.5 18t-32.5-4q-32-15-66.5-23t-69.5-8q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-8-.5-15.5T798-511q-2-17 6.5-32.5T830-564q16-5 30 3t16 24q2 14 3 28t1 29q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-328 372-373q11-11 27.5-11.5T852-781q11 11 11 28t-11 28L452-324q-12 12-28 12t-28-12L282-438q-11-11-11-28t11-28q11-11 28-11t28 11l86 86Z' />
          </svg>
          <div className='headline'>Create a todo</div>

          <form onSubmit={handleSubmit}>
            <div className='formControl'>
              <label htmlFor='title'>Title:*</label>
              <input
                type='text'
                name='title'
                id='title'
                placeholder='Enter a fun title!'
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
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
                placeholder='Describe your todo...'
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className='formControl'>
              <label htmlFor='deadline'>Deadline:</label>
              <input
                type='datetime-local'
                name='deadline'
                id='deadline'
                value={newTodo.deadline}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, deadline: e.target.value })
                }
                required
              />
            </div>

            <div className='formControl'>
              <label htmlFor='goal'>Goal:</label>
              <select
                name='goal'
                id='goal'
                value={newTodo.goal}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, goal: e.target.value })
                }
                required
              >
                <option value='' disabled>
                  select a goal
                </option>
                {goals.map((goal) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.name}
                  </option>
                ))}
              </select>
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

          <div className='headline'>Update a todo</div>

          <form onSubmit={handleUpdateSubmit}>
            <div className='formControl'>
              <label htmlFor='title'>Title:*</label>
              <input
                type='text'
                name='title'
                id='title'
                value={currentTodo?.title}
                onChange={(e) =>
                  setCurrentTodo({ ...currentTodo, title: e.target.value })
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
                value={currentTodo?.description || ''}
                onChange={(e) =>
                  setCurrentTodo({
                    ...currentTodo,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className='formControl'>
              <label htmlFor='deadline'>Deadline:</label>
              <input
                type='datetime-local'
                name='deadline'
                id='deadline'
                value={currentTodo?.deadline || ''}
                onChange={(e) =>
                  setCurrentTodo({ ...currentTodo, deadline: e.target.value })
                }
              />
            </div>

            <div className='formControl'>
              <label htmlFor='goal'>Goal:</label>
              <select
                name='goal'
                id='goal'
                value={currentTodo?.goal || ''}
                onChange={(e) =>
                  setCurrentTodo({ ...currentTodo, goal: e.target.value })
                }
                required
              >
                <option value='' disabled>
                  select a goal
                </option>
                {goals.map((goal) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.name}
                  </option>
                ))}
              </select>
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
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}
